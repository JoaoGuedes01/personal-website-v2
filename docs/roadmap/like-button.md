# Like button

Status: **approved in principle, not built.** Last reviewed 2026-11-17.

The rule for the site is "no cost and no surprise bill", not "no server code at all". A like count
needs somewhere to store the number, and Cloudflare D1 behind a Pages Function can do that without
risk of a bill, as long as the account stays on the Free plan.

## Why it cannot produce a bill

From Cloudflare's documentation (checked 2026-11-17):

- D1 Free allows 5 million rows read and 100,000 rows written per day, with 5 GB of storage.
  When the daily limit is hit, "you will not be able to run queries against D1" and the API returns
  errors. Counters reset at 00:00 UTC.
- Pages Functions share the Workers Free allowance of 100,000 requests a day. Past it, Cloudflare
  returns errors for those requests.
- Charges exist only on the Workers Paid plan. Nothing on the Free plan bills for overage.
- Static page requests are free and unlimited, so a spike that exhausts the function quota cannot
  take the pages themselves down.

So the worst case is that the like button stops working for the rest of the day. The page, the
content and the search keep working.

## Conditions that keep it free

- Never subscribe to Workers Paid, and do not add a payment method to the Cloudflare account for
  this. Upgrading is what removes the caps.
- Limit the function to `/api/*` with a `_routes.json` file, so ordinary page views never invoke it
  and never count against the 100,000.
- Keep the button failing quietly: if the call errors, show the button without a count.
- Check the numbers again before building, since these limits can change.

## Alternative: giscus

giscus is not a like button. It needs a GitHub login to react, it loads a third-party iframe and it
adds a block under the post. See the notes in [README.md](README.md). It suits
comments, not likes. For likes, the design below is the better fit.

The design notes follow unchanged.

The idea is a like button on blog posts, snippets and projects. Visitors are anonymous, the count is
shared by everyone, and it survives between visits. No accounts, no comments, no notifications.

## Constraints

- Free tier only. No paid Cloudflare plan and no paid service.
- Light and fast. No third-party SDK, nothing blocking first paint, and the button must never get in
  the way of the content.
- Stay on the platform the site already uses (Cloudflare Pages) instead of adding a vendor.
- It has to degrade quietly. With JavaScript off, the endpoint down or an ad blocker in the way, the
  page works and the button shows without a count.
- No tracking. The only client state is a flag in `localStorage` saying "this browser liked it".

It does not need to be fraud-proof. It measures goodwill, not votes.

## Decisions to confirm

| Question | Leaning towards | Alternative |
| --- | --- | --- |
| Reaction model | one toggle like per browser | claps, or emoji reactions |
| Store | Cloudflare D1 | Workers KV, whose free write limit is much lower |
| Scope | blog, snippets and projects | blog only first |

## Design

Pages stay static. A small script on the page fetches the live count when the button scrolls into
view, and updates the number immediately on click. Persistence is one Cloudflare Pages Function that
reads and writes a D1 table. Pages Functions are picked up from a top-level `functions/` folder and
ship with the existing deploy workflow, so CI does not change.

A static build cannot hold a live number, and a stale count from build time would be worse than
fetching, so the count is always fetched in the browser.

### Free tier

These are the limits as I understood them when writing this. Check the current Cloudflare numbers
before relying on them.

| Resource | Free allowance | Cost of the feature |
| --- | --- | --- |
| Pages Functions requests | about 100,000 per day | one per count fetch, one per click |
| D1 rows written | about 100,000 per day | one per click |
| D1 rows read | about 5,000,000 per day | one per count fetch |
| D1 storage | 5 GB | one small row per page |

KV would work too, but its free tier allows only around 1,000 writes a day, which a good day of
likes could get close to. D1 has far more headroom at the same price.

To keep the request count down: fetch the count only when the button becomes visible, fetch all the
counts for a list page in one batched request, and optionally cache them in `sessionStorage`.

### Data

```sql
CREATE TABLE reactions (
  slug  TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0
);
```

The slug is prefixed with its collection, such as `blog/my-post`, so two entries with the same
filename in different collections cannot share a row.

### API

- `GET /api/like/:slug` returns `{ "slug": "blog/my-post", "count": 42 }`
- `GET /api/like?slugs=blog/a,projects/b` returns `{ "counts": { "blog/a": 42, "projects/b": 7 } }`,
  for list pages
- `POST /api/like/:slug` with `{ "delta": 1 }` or `{ "delta": -1 }` updates the row, never below
  zero, and returns the new count

The function rejects any slug that does not match `^(blog|snippets|projects)/[a-z0-9-]+$`, which
stops anyone from creating arbitrary keys without needing a generated list of valid slugs. It also
accepts only +1 and -1.

```ts
// functions/api/like/[slug].ts
const SLUG_RE = /^(blog|snippets|projects)\/[a-z0-9-]+$/;

export const onRequestPost: PagesFunction<{ DB: D1Database }> = async ({ params, env, request }) => {
  const slug = String(params.slug);
  if (!SLUG_RE.test(slug)) return new Response("bad slug", { status: 400 });
  const { delta } = await request.json();
  const step = delta === -1 ? -1 : 1;
  await env.DB.prepare(
    "INSERT INTO reactions (slug, count) VALUES (?1, MAX(?2, 0)) " +
      "ON CONFLICT(slug) DO UPDATE SET count = MAX(count + ?2, 0)",
  )
    .bind(slug, step)
    .run();
  const row = await env.DB.prepare("SELECT count FROM reactions WHERE slug = ?1").bind(slug).first();
  return Response.json({ slug, count: row?.count ?? 0 });
};
```

### Front end

One `LikeButton.astro` component that takes the slug. On load it reads `localStorage["liked:" + slug]`
for the pressed state and fetches the count. On click it flips the state and the number straight
away, sends the request, and puts things back if the request fails. The button is in the HTML, so it
is visible without JavaScript; only the count and the interaction need the script. If the endpoint
fails, hide the number and keep the button.

It goes at the end of blog posts, snippets and project pages, with a small count on the cards in the
blog and project lists. It uses the existing daisyUI tokens, so it follows the theme picker.

## Running it locally

Pages Functions do not run under `astro dev`. To try the endpoint:

```bash
npm run build
npx wrangler pages dev ./dist
```

Create the database and apply the schema once, with the `CREATE TABLE` above saved as
`migrations/0001_reactions.sql`:

```bash
npx wrangler d1 create guedes-reactions
npx wrangler d1 execute guedes-reactions --local --file=./migrations/0001_reactions.sql
```

## Configuration

Bind the database to the Pages project, either in the Cloudflare dashboard (Pages, Settings,
Functions, D1 bindings) or with a `wrangler.toml`:

```toml
name = "personal-website-v2"
pages_build_output_dir = "dist"

[[d1_databases]]
binding = "DB"
database_name = "guedes-reactions"
database_id = "<printed by wrangler d1 create>"
```

The deploy workflow already runs `pages deploy dist`, and `functions/` goes up with it. The one
manual step is creating the remote database and running the migration with `--remote`.

## Abuse

The `localStorage` flag stops casual repeat likes, and the slug check and the plus or minus one rule
stop key inflation. I would not build rate limiting up front. If spam shows up, Cloudflare Turnstile
on the POST, or throttling by a hashed IP, can be added without changing the data model.

## Later

The same D1 database can hold view counters, emoji reactions (widen the table to slug, reaction and
count) or comments. Comments would bring moderation and spam, so they are a much bigger piece of
work. None of this is planned.

## To do

- Decide the reaction model, the store and the scope.
- Write the migration and create the local and remote databases.
- Add `wrangler.toml` with the binding.
- Write the single and batch endpoints under `functions/api/like/`.
- Write `LikeButton.astro` and add it to the blog, snippet and project layouts.
- Add counts to the blog and project lists using the batch endpoint.
- Document the `wrangler pages dev` workflow in `how_to_use.md`.
- Check real traffic against the free limits after a week.
