# How to use this site

Everything here is driven by **markdown content** and a handful of small **data files**. Add a file,
it shows up. This guide covers the whole thing: the content model, every frontmatter field, the
generated résumé, search, theming, and deployment.

> New here? The short version: run `npm install && npm run dev`, edit `src/data/site.ts` and
> `src/data/profile.ts`, drop content into `src/content/**`, and use `npm run new` to scaffold files.

---

## Quick start

Requires **Node 22+** (see `.nvmrc`).

```bash
npm install
npm run dev          # http://localhost:4321  (live reload)
npm run build        # static site → ./dist
npm run preview      # serve the built site locally
npm run check        # astro type/diagnostic check
npm run new -- <type> "<Title>"   # scaffold a new content file (see below)
```

---

## Project structure

```
src/
  content/              ← ALL your content, as markdown (see "Adding content")
    projects/  blog/  snippets/  experience/  certifications/  papers/
  content.config.ts     ← the schema (frontmatter shape) for each collection

  data/                 ← small config/data files you edit by hand
    site.ts             ← name, nav, socials, the href() base helper
    profile.ts          ← bio, skills, soft skills, interests  (About + Résumé)
    education.ts        ← your education                        (Academia + Résumé)
    resume.ts           ← résumé pdf path + per-section overrides
    taxonomy.ts         ← snippet classes + project types (labels, slugs, icons)

  pages/                ← routes (see "Routing")
  components/           ← Header, Footer, cards, Gallery, ListSearch, TableOfContents…
  layouts/BaseLayout.astro   ← <head>, header/footer, theme no-flash script
  icons/index.ts        ← the inline SVG icon set
  styles/global.css     ← Tailwind + daisyUI theme tokens
  utils/                ← paginate.ts (PAGE_SIZE = 9), reading.ts

scripts/new-content.mjs ← the content generator behind `npm run new`
public/                 ← static assets served as-is
  logo.svg  guedes-vector.svg  guedes_profile.png  og-default.png
  resume/   ← drop your CV PDF here          papers/   ← drop paper PDFs here
```

---

## Adding content

Every collection is a folder under `src/content/`. To add an entry, drop in a markdown file — or
let the generator do it for you:

```bash
npm run new -- project     "Realtime Chat Service"
npm run new -- blog        "What the homelab taught me"
npm run new -- blog        "Layout test" --template showcase   # the "Everything a ramble can do" example
npm run new -- snippet     "Tail all compose logs"
npm run new -- experience  "Checkmarx"
npm run new -- certification "AWS Solutions Architect"
npm run new -- paper       "My thesis title"
# options:  --slug <custom-slug>   |   -h / --help
```

It writes `src/content/<collection>/<slug>.md` with every field that type needs (pre-filling the
date and a few defaults), and refuses to overwrite an existing file. Then you just replace the
`TODO` placeholders. The frontmatter for each type:

### A project — `src/content/projects/my-thing.md`
```md
---
title: "My Thing"
summary: "One or two lines for the card and the page."
type: "Personal"              # Personal | Academic | Professional
category: "Software"          # Software | Web | Data & ML | Networking | Systems | Games
stack: ["TypeScript", "Postgres"]
featured: false               # surface on the homepage / top of the list
resume: false                 # include on the auto-generated /resume
order: 100                    # lower sorts first within a group
draft: false
# org: "Uphold"               # Professional/Academic: the employer (see Experience linking)
# orgUrl: "https://uphold.com"
# experience: "uphold"        # pin to a specific role by id — only if MULTIPLE roles at one company
# repo / demo / year          # optional
# cover: ./cover.jpg          # optional cover (optimized); add coverAlt too
# gallery: [ … ]              # optional image gallery (see "Images & galleries")
---
Markdown body. Use `## Headings` — they build the page's table of contents.
```

### A blog post — `src/content/blog/my-post.md`
```md
---
title: "My Post"
description: "Shown in the list and as the social description."
pubDate: 2026-06-01
tags: ["backend", "notes"]    # each tag is a "Topic" filter → /blog?tag=<tag>
draft: false
# updatedDate: 2026-06-10
# cover: ./cover.jpg / coverAlt: "…"   # optional hero (optimized)
# gallery: [ … ]                       # optional image gallery
---
```
Posts list newest-first (the page is called **Ramblings**; the route and folder stay `blog`). Tags
are the blog's organization: they fill the **Topic** dropdown on `/blog` and link to `/blog?tag=<tag>`.
Each post ends with a "More like this" strip of posts sharing its tags.

**Series.** For multi-part posts, add two fields to each part: `series: "homelab"` and `part: 2`. The key must
exist in `src/data/series.ts`, which also lists the planned part titles, so unwritten parts read "coming soon" and
the total ("Part 2 of 5") is known from the start. Series posts get a label under the back link, a small badge on
the list cards, and an "In this series" box (all parts plus previous / next) in place of "More like this". Parts
that are still `draft: true` show as "coming soon" for everyone else. Set `featured: true` on any one part to feature the whole series: it takes a single slot of the five in
the Featured block (a "Series" card linking to part 1, with a closed-by-default "Parts" tab on its right that lists every part). Every part still appears in the list below as its own card. (Tags fit a blog better than rigid categories — posts read
chronologically and often span topics.)

### A snippet — `src/content/snippets/my-tip.md`
```md
---
title: "My Tip"
description: "What it does, in one line."
pubDate: 2026-06-01
category: "Software Engineering"   # Software Engineering | Systems | DevOps | Cybersecurity | Data
lang: "shell"                      # primary language/tool, shown as a label
tags: ["git"]                      # tool tags → filter within the class
draft: false
# gallery: [ … ]                   # optional image gallery
---
```
Snippets are grouped into **classes** (the `category`) on `/snippets`. Within a class, the `tags`
become a filter that links to `/snippets/<class>/tag/<tag>`.

### A role — `src/content/experience/company.md`
```md
---
company: "Uphold"
role: "Backend Software Engineer"
start: "2023"
end: "Present"                 # omit → defaults to "Present"
location: "Porto, Portugal"
tags: ["Backend", "Go", "Postgres"]
summary: "One line for the experience list card."
highlights:                    # bullets — power the role page AND the auto /resume
  - "Something you shipped or owned."
  - "Impact, ideally with a number."
order: 10                      # most recent = HIGHEST number
draft: false
# gallery: [ … ]               # optional image gallery
---
Markdown body about the role. `## Headings` build a table of contents on longer entries.
```

### A certification — `src/content/certifications/my-cert.md`
```md
---
name: "AWS Certified Cloud Practitioner"
issuer: "AWS"                  # the provider filter (and search) group by this
issued: "2024"                 # freeform: "2024" or "Mar 2024"
skills: ["Cloud", "IAM"]       # shown as tags; also searchable
featured: false
order: 100
draft: false
# expires: "2027"
# url: "https://…"             # verification link ("Verify")
# credentialId: "…"
---
```

### A thesis / paper — `src/content/papers/thing.md` (shown on /academia)
```md
---
title: "Paper Title"
kind: "Paper"                  # Paper | Thesis
authors: ["João Guedes"]
venue: "Conference / Journal"
year: 2022
abstract: "The abstract or a short summary."
# link: "https://…"           # external page / DOI / repository → "View page"
# pdf: "/papers/thing.pdf"     # a file in public/papers/ → "Open PDF" + "Download"
---
```
On `/academia`, a paper with a `pdf` shows **Open PDF** (opens in the browser) and **Download**;
a `link` adds **View page ↗**. Education (from `src/data/education.ts`) shows at the top of the page.

---

## Routing & pagination

- **Detail pages use a single `[slug]`** (e.g. `projects/[slug].astro`), so content ids must be
  **flat** — one file per entry, no sub-folders. The id is the filename without extension.
- **Lists are paginated**: page 1 is the section's `index.astro`; pages 2..N live at
  `…/page/[page].astro`. `PAGE_SIZE` (9) lives in `src/utils/paginate.ts`. `<Pagination />` and
  `getStaticPaths` share the same helper, so URLs always agree.
- **Filters are real routes** (so they work with pagination):
  - Projects → `/projects/type/<type>`
  - Blog → filtered client-side in the shared FilterBar: `/blog?tag=<tag>`
  - Snippets → `/snippets/<class>` and `/snippets/<class>/tag/<tag>`
  
  The chips on each listing are links to these.

> Static route segments win over `[slug]`. So don't name a **project** `page`/`type`, a **blog
> post** `page`, or a **snippet** `page`/`tag`, or its detail URL collides with a list route.
> (The generator refuses these names for you.)

---

## Search

Projects, certifications, snippets and the blog each have a **fuzzy find** box (top-right, across
from the filters). Typing searches across **everything in that section** — not just the current
page or filter — and renders result cards; clearing the box restores the normal browse view.

It's the `<ListSearch>` component (`src/components/ListSearch.astro`): dependency-free, a few KB of
vanilla JS, matching title/description/tags/meta with substring + token + subsequence scoring.
Press <kbd>Esc</kbd> to clear. The dataset is built from the collection in each listing, so it
stays in sync automatically — nothing to maintain.

---

## Reading: table of contents

Any detail page (projects, blog, snippets, experience) with **two or more `##`/`###` headings**
gets an on-page table of contents: a **sticky sidebar** on desktop and a **collapsible "On this
page"** panel at the top of the article on mobile. The current section highlights as you scroll.
It's automatic — just write headings. Component: `src/components/TableOfContents.astro`.

---

## Images & galleries

**Inline / cover images:** co-locate the files with the entry and reference them relatively. These go
through Astro's image pipeline (optimized, responsive). Blog posts and projects keep theirs in an
`img/<post-slug>/` folder next to the content (e.g. `src/content/blog/img/my-post/cover.jpg`, referenced as
`cover: ./img/my-post/cover.jpg`); that folder is ignored by the content loader, so it never becomes an entry.

**Galleries** are available on **any detail page** — projects, blog, snippets and experience. Add a
`gallery` to the frontmatter, co-locating the images:

```md
gallery:
  - { src: ./shot-1.png, alt: "Dashboard", caption: "The overview." }
  - { src: ./shot-2.png, alt: "Detail view" }
```

They render as a responsive grid with a **dependency-free lightbox** (click to zoom, arrow keys /
swipe to move, Esc to close). Component: `src/components/Gallery.astro`.

Purely static images (favicons, the OG card) live in `public/` and are referenced by absolute path.

---

## Callouts / disclaimers

Highlight a note, warning, or disclaimer in **any markdown body** (projects, blog, snippets,
experience) with a `:::type[Title] … :::` block. No import, no frontmatter — just write it:

```md
:::warning[Demo Offline]
The live demo is down while I move it to a new host. The repo still builds locally.
:::

:::info
Anything between the fences is normal markdown — **bold**, [links](/), `code`, lists.
:::
```

The `[Title]` is optional; leave it off and the type's default label is used. Types (accent colour
in brackets — pulled from the active theme, so they adapt everywhere):

| Type | For | Alias |
|------|-----|-------|
| `note` | a neutral aside | |
| `info` | context / FYI (info) | `information` |
| `tip` | a helpful trick (accent) | `hint` |
| `success` | a positive outcome (success) | |
| `warning` | a heads-up (warning) | `warn`, `attention` |
| `danger` | serious / breaking (error) | `caution`, `error` |
| `important` | must-read (primary) | |
| `security` | a security note (secondary) | |
| `quote` | an intentional pull-quote (secondary) | `quotation` |

**On a page (`.astro` / `.mdx`)** use the component instead — same look, same types:

```astro
---
import Callout from "../components/Callout.astro";
---
<Callout type="security" title="Handle with care">
  This endpoint accepts unauthenticated requests in dev only.
</Callout>
```

### Colours & the `--cc` knob

A callout's whole look is driven by **one CSS variable, `--cc`** — the tinted background, the
border, the icon chip and the title are all `color-mix`es of it (see the `.callout` block in
`src/styles/global.css`). You rarely touch `--cc-tint` / `--cc-border` directly; set `--cc` and the
rest re-tints itself.

- **Recolour one callout** without editing CSS — pass a `color`: a daisyUI token
  (`primary`, `accent`, `info`, `success`, `warning`, `error`, `secondary`, `base-content`) or any
  CSS colour (`#e4b96b`, `tomato`, `oklch(...)`):

  ```md
  :::note{color=accent}
  A neutral note, but tinted with the theme's accent instead.
  :::

  :::warning{color=#e4b96b}
  A warning locked to a specific hex, regardless of theme.
  :::
  ```

  On a page: `<Callout type="note" color="accent">…</Callout>`.

- **Change a type's colour everywhere** — edit its `.callout-<type> { --cc: … }` rule in
  `src/styles/global.css`.

- **Add a new type** — add an entry (label + icon) to `src/data/callouts.mjs`, then a matching
  `.callout-<type> { --cc: … }` colour rule. Aliases go in the `ALIASES` map. The transform that
  turns the directive into markup is `src/plugins/remark-callouts.mjs`.

---

## Experience ↔ projects linking

**One role at a company (common case):** set a project's `org` to the **exact `company`** of an
experience entry (case-insensitive). The role's page lists that project under **"Related
projects"**, and the project links back with **"Part of my work at <company>"**.

**Multiple roles at the same company** (e.g. QA intern → Software Engineer → AppSec, all at
Checkmarx): give each role its own file with the **same `company`** but a different id
(`checkmarx-qa.md`, `checkmarx-swe.md`, …), then **pin each project** to the right role(s):

```md
org: "Checkmarx"
experience: "checkmarx-swe"                       # one role…
# experience: ["checkmarx-swe", "checkmarx-appsec"]   # …or several
```

- A project with `experience` set appears **only** on those role page(s), linking back to the
  specific role (or to `/experience` if it spans several).
- A project with only `org` auto-attaches **when the company has a single role**. With multiple
  roles, a bare `org` is ambiguous, so pin it — the role page tells you exactly that.

---

## Résumé — fully auto, override anytime

`/resume` builds itself from your content and data. Nothing to wire up:

- **Identity + skills + soft skills + languages** come from `src/data/profile.ts`.
- **Education** comes from `src/data/education.ts`.
- **Experience, certifications and projects** are generated from your content collections —
  experience newest-first, projects flagged `resume: true`, all non-draft certs.

Every generated section can be **overridden verbatim** from `src/data/resume.ts` — fill an array
and it replaces the auto version, leave it empty and the page builds it:

```ts
experience: []      // [] → from src/content/experience/*
certifications: []  // [] → from src/content/certifications/*
projects: []        // [] → every project with resume:true (or list ids to pick/order)
```

The page has **Formal CV** (the generated PDF below) and **Print** (with a clean print stylesheet).
There's no on-page filtering — it's a clean, printable document.

### The PDF CV — generated at build time

The "Formal CV" PDF is built from `src/data/cv/` on every build, so it is never out of date. It is
deliberately plain: Helvetica, black on white, one A4 page, no colour or icons.

| File | What it is |
| --- | --- |
| `src/data/cv/cv.md` | **Your CV, in your words.** Write anything; drop in `{{placeholders}}` where you want live site data. |
| `src/data/cv/cv.auto.md` | The fully automatic CV: nothing but placeholders. |

The front matter of `cv.md` sets `use: manual` (publish `cv.md`) or `use: auto` (publish `cv.auto.md`),
the page size, font size and margin, and `fit: one-page` (shrink the font, down to `min-font`, until it
fits) or `fit: flow` (let it run onto more pages). Both versions are always built, whichever is published:

- `/resume/joaoguedes_cv.pdf` — the published one (what the site links to)
- `/resume/joaoguedes_cv-manual.pdf` and `/resume/joaoguedes_cv-auto.pdf` — to compare them

**Syntax.** One line is one line (nothing merges). `# Name` is the centred title, `## Section` a heading
with a rule, `- text` a bullet, `**bold**`, `[text](url)` (clickable, stays black). A line starting with
`|` is an **aligned row**: first cell on the left, last on the right, the ones between centred
(4 cells: left, left, centred, right), e.g. `| **Role** | **Company** | **2024 - 2026** | **Full Time** |`.
A literal `|` inside a cell is written `\|`.
Icons: `:name:` before text in a row draws a small vector icon (any name from the site's icon set, e.g. `:github:`,
`:mail:`, `:phone:`); `{{contact}}` already uses them.

**Placeholders** (anything else is yours):

| Placeholder | Fills in |
| --- | --- |
| `{{name}}`, `{{title}}` | From `src/data/profile.ts` |
| `{{contact}}` | The two contact rows, from `contact` in `src/data/resume.ts` |
| `{{experience}}` | Every non-draft role, newest first, with its bullets |
| `{{education}}` | From `src/data/education.ts` |
| `{{certifications}}` / `{{certifications: all}}` | Featured certifications / all of them |
| `{{skills}}` / `{{skills: Languages, Databases}}` | Every skill group / only those groups, in that order |

**Per-role overrides** (optional `cv:` block in an experience file): `bullets` (short CV bullets; default is
`highlights`), `role` (the title as it should read on the CV), `type` ("Full Time" by default) and `hide: true`
to leave a role off the CV. To hand-write the whole experience section, just write the rows and bullets
yourself instead of `{{experience}}`.

---

## The About page & `profile.ts`

`src/data/profile.ts` is the single source for the personal bits shown in more than one place. The
**About page** renders your **skills** (grouped chips), **soft skills**, and **interests** (an
icon grid), laid out vertically under the intro and portrait; the **résumé** reuses the same
skills/soft-skills/languages. Edit `profile.ts` once and both pages update.

- Portrait: `public/guedes_profile.png` (swap the file; referenced from `about.astro`).
- Interest icons must exist in `src/icons/index.ts` (e.g. `server`, `bike`, `heart`, `shield`,
  `book-open`, `cpu`, `terminal`, `map-pin`).

---

## Themes & typefaces

**7 themes** — Slate (**default**), Nord, Gruvbox, Rosé Pine, Tokyo Night, Paper, Solarized — and
**4 typefaces** — Inter (default), System, Space Grotesk, JetBrains Mono. Switch them at runtime
from the **palette button** in the header; the choice is saved in `localStorage` and restored
before first paint (no flash).

Themes are daisyUI theme tokens in `src/styles/global.css`. The dark ones are listed in the
no-flash script in `BaseLayout.astro` **and** in `ThemePicker.astro` — keep those two lists in
sync if you add or remove a dark theme. To change the default, edit the fallback in the
`BaseLayout.astro` no-flash script (currently `"slate"`).

---

## Icons

Inline SVGs live in `src/icons/index.ts` as a `name → path` map, rendered by `<Icon name="…" />`.
Add one by pasting its inner SVG paths under a new key (24×24, `stroke="currentColor"` style to
match). Provider icons for certifications map through `iconForProvider()` in the same file.

---

## Site config

`src/data/site.ts` holds your **name, role, description, nav and social links**, plus the
**`href()`** helper — use it for every internal link (`href("/projects")`) so the site also works
when deployed under a sub-path. Social links each carry an `icon` key and stroke/fill hints.

---

## Branding (logo & hero)

- **`public/logo.svg`** — the header mark.
- **`public/guedes-vector.svg`** — the homepage hero illustration (via `FaceIllustration.astro`;
  swap the file, no code change).
- **`public/guedes_profile.png`** — the real portrait on the About page.
- **`public/og-default.png`** — the social share card (1200×630); regenerate if you rebrand.

---

## Deploying to GitHub Pages

A workflow at `.github/workflows/deploy.yml` builds and publishes on push.

- **User/organization site** (`you.github.io`): keep `site` in `astro.config.mjs` as your domain
  and leave `base` unset.
- **Project site** (`you.github.io/repo`): set `base: "/repo"` in `astro.config.mjs`. Because every
  internal link uses `href()`, the whole site adapts automatically.

Keep `site` in `astro.config.mjs` in sync with `url` in `src/data/site.ts` (used for canonical
URLs, the sitemap and RSS).

---

## A few notes

- **Drafts:** set `draft: true` on any entry to hide it from lists, feeds and its own page.
- **Reading time** and the **table of contents** are automatic on detail pages.
- **The résumé** auto-builds from your content; fill the arrays in `resume.ts` only to override.
  Skills/interests live in `profile.ts`; education in `education.ts`; paper PDFs in `public/papers/`.
- **RSS** is at `/rss.xml`; the **sitemap** is generated on build.
- **Search TODOs:** run a repo-wide search for `TODO` to find everything waiting on your real
  details — profile skills, education, résumé location/level, and the example certifications and
  papers (replace or delete them).
