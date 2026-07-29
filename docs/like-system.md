# Like system — design doc

> **Status:** Planned (not built). This is a design/implementation spec to pick up later.
> **Last updated:** 2026-07-29

A way for anonymous visitors to "like" a blog post, snippet, or project. Counts are
global (everyone sees the same number) and persist across visits. No login.

---

## 1. Goal & non-goals

**Goal**

- Let visitors express appreciation for a piece of content with one tap.
- Show a global like count on blog posts, snippets, and projects.
- Stay true to the site's north star: **light, fast, content-driven.**

**Non-goals**

- No accounts / auth. A like is anonymous.
- No comments, no profiles, no notifications (see [§12 Future extensions](#12-future-extensions) — the chosen store leaves the door open, but they are out of scope here).
- No bulletproof anti-fraud. This measures warmth, not votes.

---

## 2. Constraints & guiding principles

These come straight from the site's goals and are the reason the design looks the way it does:

1. **Free tier only, forever.** No paid Cloudflare plans, no paid SaaS. Every piece must sit comfortably inside a free allowance (see [§5 Free-tier budget](#5-free-tier-budget)).
2. **Light & fast.** Minimal client JS, no third-party SDK, no blocking network on first paint. The like widget must never slow down or clutter a content page.
3. **No new vendor if avoidable.** The site already deploys to Cloudflare Pages — reuse that platform rather than adding a Firebase/Supabase/Upstash dependency.
4. **Graceful degradation.** JS off, endpoint down, or ad-blocker in the way → the page is still perfect; the button just shows without a count.
5. **Privacy-friendly.** No tracking scripts, no fingerprinting. A per-browser `localStorage` flag is the only client state.

---

## 3. Decisions

| Decision | Choice | Notes / alternatives |
|---|---|---|
| Reaction model | **Toggle like** (like / unlike, one per browser) | Alternatives: Medium-style claps, or emoji reactions (👍🔥💡). Toggle is the lightest and most portfolio-appropriate. **← confirm before building.** |
| Backend | **Cloudflare Pages Function + D1** | Same platform, free, no client SDK. Alternatives: KV (simpler but tighter write limit), Upstash (extra vendor). **← confirm before building.** |
| Identity | Anonymous; `localStorage` remembers "I liked this" | Trivially bypassable; acceptable by design. |
| Abuse control | `localStorage` guard + server-side slug validation only | Add Cloudflare Turnstile / IP-hash rate-limit *later, only if* spam actually appears. |
| Content in scope | blog + snippets + projects | Could ship blog-only first and expand. |
| Count freshness | Fetched client-side after load (not baked into the static build) | Static build can't hold a live number; a stale build-time count would be worse than fetching. |

---

## 4. Architecture

Static pages render instantly. A tiny client island fetches the live count only when the
button is visible, and handles clicks optimistically. Persistence lives in one Cloudflare
Pages Function talking to D1 — same platform as the site, so no CORS and no extra vendor.

```
┌─────────────────────────┐        ┌──────────────────────────┐       ┌──────────┐
│  Browser (Astro island) │        │  Pages Function          │       │   D1     │
│                         │        │  functions/api/like/…    │       │ (SQLite) │
│  • localStorage: liked? │──GET──▶ │  GET  → current count    │──────▶│ reactions│
│  • optimistic +1 / -1   │──POST─▶ │  POST → upsert & return  │◀──────│  table   │
│  • client:visible only  │        │  (validates slug)        │       │          │
└─────────────────────────┘        └──────────────────────────┘       └──────────┘
```

Why this shape:

- **Pages Functions** are picked up automatically from a top-level `functions/` dir and
  deploy alongside `dist` with the existing workflow — no change to CI.
- **D1** is a real table, so adding view counters or (later) comments doesn't mean
  changing platforms. Its free write allowance is far larger than KV's (see below).

---

## 5. Free-tier budget

The whole point of this design is that it never leaves the free tier. Rough ceilings
(Cloudflare free plan) vs. what this feature actually spends:

| Resource | Free allowance | What a like/view costs | Verdict |
|---|---|---|---|
| Pages Functions (Workers) requests | ~100,000 / day | 1 request per count-fetch, 1 per like | Fine below ~tens of thousands of page views/day |
| D1 rows written | ~100,000 / day | 1 write per like | A like count in the thousands/day is nowhere near |
| D1 rows read | ~5,000,000 / day | 1 read per count-fetch | Effectively unlimited at this traffic |
| D1 storage | 5 GB | one small row per content item | Negligible |

> **Why D1 over KV:** KV's free tier caps at **~1,000 writes/day**. That's likes-per-day,
> and while the site isn't 100k-traffic, 1k is close enough to be a real ceiling on a good
> day. D1 gives ~100k writes/day for the same $0 — much more headroom. KV stays a valid
> fallback if you'd rather avoid SQL entirely.

**Request-shaving tactics (to stay light *and* under limits):**

- Fetch the count with `client:visible` — only when the button scrolls into view, not on every load.
- On **list pages** (blog index, project cards), batch all counts into **one** `GET /api/like?slugs=a,b,c` instead of N requests.
- Optionally cache a fetched count in `sessionStorage` for the session to avoid refetching on back-navigation.

---

## 6. Data model (D1)

```sql
CREATE TABLE reactions (
  slug  TEXT PRIMARY KEY,   -- collection-prefixed, e.g. "blog/my-post"
  count INTEGER NOT NULL DEFAULT 0
);
```

**Slug convention:** always prefix with the collection — `blog/…`, `snippets/…`,
`projects/…` — so identical filenames across collections can never collide on one row.

---

## 7. API contract

One Pages Function file: `functions/api/like/[slug].ts` (plus an index route for the batch read).

### `GET /api/like/:slug`
Read a single count.
```json
→ 200  { "slug": "blog/my-post", "count": 42 }
```

### `GET /api/like?slugs=blog/a,projects/b`
Batch read for list pages (one request for many items).
```json
→ 200  { "counts": { "blog/a": 42, "projects/b": 7 } }
```

### `POST /api/like/:slug`  body `{ "delta": 1 | -1 }`
Upsert and return the new count. Clamp at `>= 0`.
```json
→ 200  { "slug": "blog/my-post", "count": 43 }
```

**Server-side validation (cheap abuse guard):** reject any slug that doesn't match
`^(blog|snippets|projects)/[a-z0-9-]+$`. This stops arbitrary key inflation without
coupling the function to a generated allowlist. (Optional hardening: generate a real
allowlist of known slugs at build time and check against it.)

Sketch:

```ts
// functions/api/like/[slug].ts  (Cloudflare Pages Function)
const SLUG_RE = /^(blog|snippets|projects)\/[a-z0-9-]+$/;

export const onRequestGet: PagesFunction<{ DB: D1Database }> = async ({ params, env }) => {
  const slug = String(params.slug);
  if (!SLUG_RE.test(slug)) return new Response("bad slug", { status: 400 });
  const row = await env.DB.prepare("SELECT count FROM reactions WHERE slug = ?1").bind(slug).first();
  return Response.json({ slug, count: row?.count ?? 0 });
};

export const onRequestPost: PagesFunction<{ DB: D1Database }> = async ({ params, env, request }) => {
  const slug = String(params.slug);
  if (!SLUG_RE.test(slug)) return new Response("bad slug", { status: 400 });
  const { delta } = await request.json();
  const step = delta === -1 ? -1 : 1; // only ±1 allowed
  await env.DB.prepare(
    "INSERT INTO reactions (slug, count) VALUES (?1, MAX(?2, 0)) " +
    "ON CONFLICT(slug) DO UPDATE SET count = MAX(count + ?2, 0)"
  ).bind(slug, step).run();
  const { count } = await env.DB.prepare("SELECT count FROM reactions WHERE slug = ?1").bind(slug).first();
  return Response.json({ slug, count });
};
```

---

## 8. Frontend / UX

- A single `LikeButton.astro` island, prop: `slug`. Hydrate with **`client:visible`** so it
  costs nothing until scrolled into view.
- **On mount:** read `localStorage["liked:" + slug]` for pressed/unpressed state; `GET` the count.
- **On click:** flip state optimistically and update the number immediately; `POST` the delta;
  reconcile with the response; on error, revert and keep the button usable.
- **Progressive enhancement:** render the button in markup so no-JS visitors see it; the count
  and interactivity layer on only if JS runs. Endpoint failure → hide the number, not the button.
- **Placements:**
  - End of each **blog post** and **snippet** page.
  - Bottom of each **project** page.
  - Small count badge on **list cards** (blog index, project cards) — populated by the batch `GET`.
- **Styling:** reuse existing Tailwind 4 + daisyUI tokens so it inherits the theme picker
  (light/dark) for free. Keep it a single small, unobtrusive control — no animations that fight
  the content-first feel.

---

## 9. Local development

Pages Functions do **not** run under `astro dev`. To exercise the endpoint locally:

```bash
npm run build
npx wrangler pages dev ./dist   # serves dist + functions, with a local D1
```

Create a local D1 and apply the schema once:

```bash
npx wrangler d1 create guedes-reactions           # one-time, prints the database_id
npx wrangler d1 execute guedes-reactions --local --file=./migrations/0001_reactions.sql
```

Add the migration file at `migrations/0001_reactions.sql` containing the `CREATE TABLE` from §6.

---

## 10. Configuration & deployment

- **Bind D1 to the Pages project** — either in the Cloudflare dashboard (Pages → Settings →
  Functions → D1 bindings) or via `wrangler.toml`:

  ```toml
  # wrangler.toml (new file)
  name = "personal-website-v2"
  pages_build_output_dir = "dist"

  [[d1_databases]]
  binding = "DB"                 # → env.DB in the function
  database_name = "guedes-reactions"
  database_id = "<from wrangler d1 create>"
  ```

- **CI is unchanged.** The existing `deploy.yaml` already runs `pages deploy dist`; the
  `functions/` dir ships automatically with it. Only manual one-time step: create the remote D1
  and run the migration against it (`wrangler d1 execute … --remote`).

---

## 11. Security & abuse

- **Per-browser guard** via `localStorage` handles ~all casual double-liking.
- **Slug validation** (regex, §7) blocks arbitrary-key inflation.
- **±1 only** — the server ignores any delta other than ±1.
- Deliberately *not* building rate-limiting up front. If spam ever appears, add
  **Cloudflare Turnstile** (free) on the POST, or hash the visitor IP server-side to
  throttle — both are additive and don't change the data model.

---

## 12. Future extensions

The D1 store is chosen partly so these stay cheap to add later, without a platform change:

- **View counters** — same table shape, a `views` column or a second table; increment on load.
- **Emoji reactions** — widen the model to `(slug, reaction, count)`.
- **Comments** — a new table; would introduce moderation + spam concerns (bigger scope).

None are in scope now; listed so the schema decision is understood as forward-looking.

---

## 13. Task breakdown (when greenlit)

- [ ] Confirm the two open decisions: **reaction model** (toggle / claps / emoji) and **store** (D1 / KV).
- [ ] `migrations/0001_reactions.sql` + create remote & local D1.
- [ ] Add `wrangler.toml` with the D1 binding.
- [ ] `functions/api/like/[slug].ts` — GET + POST (single).
- [ ] `functions/api/like/index.ts` — batch GET for list pages.
- [ ] `LikeButton.astro` island — fetch (`client:visible`), optimistic toggle, `localStorage`.
- [ ] Wire into blog post, snippet, and project layouts.
- [ ] Add count badges to blog index + project cards (batch fetch).
- [ ] Document the `wrangler pages dev` workflow in `how_to_use.md`.
- [ ] Verify free-tier headroom against real traffic after a week.

---

## 14. Open questions

1. **Reaction model** — toggle like (recommended), claps, or emoji reactions?
2. **Store** — D1 (recommended) or KV?
3. **Rollout** — all three content types at once, or blog-only first?
