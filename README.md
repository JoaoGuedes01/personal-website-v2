# João Guedes — Personal Website

Note to self - Get inspiration for public readme from [here](https://github.com/bchiang7/v4) + this one with instructions on how to add new content

A fast, markdown-driven personal site: **projects** (with galleries), an **experience**
section that links each role to the work that came out of it, **certifications** filterable by
provider, an auto-generated + downloadable **résumé**, hierarchical **snippets** ("Guedes'
Useful Snippets & Tech Tips"), a **blog**, an **about** page, and a small **academic** archive
(thesis + papers).

**Stack:** [Astro](https://astro.build) · [Tailwind CSS v4](https://tailwindcss.com) ·
[daisyUI v5](https://daisyui.com). No client-side framework — everything is static HTML/CSS with
a few tiny inline scripts (theme picker, content filters, the gallery lightbox).

**Design:** a dark, off-colour developer aesthetic. It ships with **seven themes** and **four
typefaces** you switch at runtime from the palette menu in the header — mix any theme with any
font. The default is **Slate** (a calm neutral off-black) with **Inter**. Icons are a small,
dependency-free inline set (see *Icons*). Branding is your own `logo.svg` (nav mark) and
`guedes-vector.svg` (hero illustration) — see *Branding*.

---

## Quick start

You need **Node 22+** (there's an `.nvmrc` — run `nvm use` if you use nvm).

```bash
npm install
npm run dev
```

Then open http://localhost:4321.

```bash
npm run build     # production build → ./dist
npm run preview   # preview the production build locally
npm run check     # type-check content + components
```

> **If `npm install` complains about peer dependencies** (Astro integrations track Astro's
> major version closely), let Astro pick compatible versions for you:
>
> ```bash
> npm install astro
> npx astro add mdx sitemap
> ```
>
> The `@tailwindcss/vite` plugin (already wired in `astro.config.mjs`) is the current, correct
> way to use Tailwind 4 with Astro — do **not** add the old `@astrojs/tailwind` integration.
> This project uses **no client-side framework** (React was removed); everything is static.

To move to the latest Astro at any time: `npx @astrojs/upgrade`.

---

## Project structure

```
src/
  content/            ← all your content lives here as markdown
    projects/         ← one .md per project (+ co-located cover / gallery images)
    blog/             ← long-form posts (.md / .mdx)
    snippets/         ← short tech tips (.md / .mdx), grouped into classes
    experience/       ← roles: powers /experience + the About timeline + the résumé
    certifications/   ← one .md per credential (grouped by provider)
    papers/           ← thesis + papers (shown on /academia)
  content.config.ts   ← schemas for the above (what frontmatter each needs)
  data/
    site.ts           ← name, nav, social links (+ icons), the href() helper
    taxonomy.ts       ← snippet classes + project types (labels, slugs, icons, blurbs)
    resume.ts         ← manual résumé bits + the auto-or-override config
    education.ts      ← your education (shown on /academia AND /resume)
  utils/
    reading.ts        ← "X min read" estimate helper
    paginate.ts       ← the paginator + PAGE_SIZE (page size for every list)
  icons/
    index.ts          ← inline icon registry + project-type / discipline / provider maps
  styles/global.css   ← Tailwind, the 7 daisyUI themes, the 4 font pairings, prose + code CSS
  layouts/            ← BaseLayout (page shell, fonts, no-flash theme/font restore)
  components/          Header, Footer, cards, TableOfContents, FaceIllustration, Icon,
                       ThemePicker, Figure, Pagination, Gallery, SnippetCategoryView,
                       ProjectListView, BlogListView…
  pages/              ← routes (see Routing below)
public/
  logo.svg                ← the nav mark (white rounded chip + "G")
  guedes-vector.svg       ← the hero illustration (transparent)
  og-default.png          ← social share image
  papers/                 ← put thesis / paper PDFs here (see Academia)
  resume/                 ← put your CV PDF here (see Résumé)
```

Navigation is **Projects · Experience · Certifications · Academia · Snippets · Blog · Resume ·
About** (the logo links home). Edit it in `src/data/site.ts`.

---

## Routing & pagination

The URL scheme is designed to stay collision-free in Astro's static router:

- **Detail pages use a single `[slug]`** (e.g. `projects/[slug].astro`), so content ids must be
  **flat** (one file per entry, no sub-folders). The id is the filename without extension.
- **Listings are paginated**: page 1 is the section's `index.astro`; pages 2..N live at
  `…/page/[page].astro`. The **`<Pagination />`** component and `getStaticPaths` both use
  `pageHref()` from `utils/paginate.ts`, so their URLs always agree.
- **Projects** also have per-type listings at `/projects/type/<type>` (also paginated). The type
  chips on the projects page are real links to these.
- **Blog** works the same way for tags: `/blog/tag/<tag>` (paginated). The tag chips on the blog
  are real links, so filtering coexists with pagination.
- **Snippets are hierarchical** (see below).

> Because static segments win over `[slug]`, avoid naming a **project** `page`/`type`, a **blog
> post** `page`/`tag`, or a **snippet** `page`, or its detail URL would collide with a list route.

```
pages/
  projects/
    index.astro                     /projects            (all, page 1)
    page/[page].astro               /projects/page/2…
    type/[type]/index.astro         /projects/type/personal
    type/[type]/page/[page].astro   /projects/type/personal/page/2…
    [slug].astro                    /projects/<id>       (detail, + gallery + linked role)
  snippets/
    index.astro                     /snippets            (class landing)
    [category]/index.astro          /snippets/systems    (a class, page 1)
    [category]/page/[page].astro    /snippets/systems/page/2…
    [category]/[slug].astro         /snippets/systems/<id>   (detail)
  blog/
    index.astro · page/[page].astro · [slug].astro
    tag/[tag]/index.astro · tag/[tag]/page/[page].astro   (filter by tag)
  experience/
    index.astro · [slug].astro
  certifications/index.astro
  resume.astro · academia.astro · about.astro · index.astro · 404.astro · rss.xml.js
```

**Page size** for every list is `PAGE_SIZE` in `src/utils/paginate.ts` (default **9**). Change it
once and everything updates.

---

## Themes & typefaces

Everything is switchable at runtime from the **palette button** in the header. Choices persist in
`localStorage` (`guedes-theme`, `guedes-font`) and are restored before first paint (no flash of
the wrong theme). **Slate is the default** on a visitor's first load (change the fallback in the
no-flash script in `BaseLayout.astro` if you ever want a different one).

**The 7 themes** (all defined in `src/styles/global.css` as `@plugin "daisyui/theme"` blocks):

| Theme | Mode | Accent |
|---|---|---|
| `slate` *(default)* | dark | blue |
| `nord` | dark | frost cyan |
| `gruvbox` | dark | amber |
| `rose-pine` | dark | rose |
| `tokyo-night` | dark | indigo |
| `paper` | light | blue |
| `solarized` | light | blue/teal |

**The 4 typefaces** (`data-font` on `<html>`, defined in `global.css`): **inter** *(default)*,
**system** (no web font), **grotesk** (Space Grotesk headings), **mono** (JetBrains Mono
headings).

### Tuning it

- **Change a colour:** edit the relevant theme block in `global.css`. Everything uses semantic
  tokens (`base-100/200/300`, `base-content`, `primary`, …) so themes "just work".
- **Add a theme:** copy a block, give it a new `name`, set `color-scheme`. If it's **dark**, add
  its name to the `DARK` map in **two** places — `ThemePicker.astro` and the no-flash script in
  `BaseLayout.astro` — and add a swatch to the `themes` array in `ThemePicker.astro`.
- **Code highlighting** uses Shiki with a light+dark pair (`github-light` / `github-dark`, set in
  `astro.config.mjs`); the `.dark` class swaps them so code matches the active theme.

---

## Icons

A small, dependency-free inline-SVG set (Lucide paths, ISC-licensed). Icons inherit the current
text colour, so they adapt to every theme automatically.

```astro
---
import Icon from "../components/Icon.astro";
---
<Icon name="briefcase" />
<Icon name="github" size={18} class="text-primary" />
<Icon name="clock" title="Reading time" />   {/* title = accessible label */}
```

- **The registry** is `src/icons/index.ts` — a `name → svg paths` map. Add your own by pasting any
  [lucide.dev](https://lucide.dev) icon's paths under a new key.
- **Semantic maps** in the same file drive the little labels on the site:
  `projectTypeIcon` (Personal / Academic / Professional), `disciplineIcon` (the snippet classes),
  and **`providerIcon`** + `iconForProvider(provider)` for certifications (AWS → server, INE →
  shield, Coursera → cap, Udemy → book, LinkedIn Learning → linkedin, … with an `award` fallback).

---

## Images & galleries

**Optimized (recommended):** put the image in `src/`, next to the entry, and reference it
relatively — Astro resizes and converts it at build time.

- **In a post body** (plain markdown): `![alt](./diagram.png)` — optimized automatically.
- **A cover / hero** (blog *and* projects): co-locate the file and set `cover: ./cover.jpg` (+
  `coverAlt`) in frontmatter.
- **A captioned image** in an `.mdx` post: the `<Figure>` component.
- **A project gallery** (see below): the `gallery:` frontmatter array + the `<Gallery>` component.

**Static:** put the image in `public/` and reference it by absolute path (`/og-default.png`). Not
optimized — fine for the OG image, favicon, etc.

### Project galleries + lightbox

Any project can show a grid of screenshots beneath its write-up. Co-locate the images next to the
`.md` and list them in frontmatter (`alt` recommended, `caption` optional):

```md
gallery:
  - src: ./shot-1.png
    alt: "Dashboard"
    caption: "The overview screen."
  - src: ./shot-2.png
    alt: "Detail view"
```

Images are optimized, laid out in a responsive grid, and open in a **dependency-free lightbox**
(click, arrow keys, Esc, backdrop-click). guedesDB ships with three **placeholder** shots so you
can see it working — replace or delete them. Rendering lives in `src/components/Gallery.astro`.

---

## Adding content

Everything is a markdown file with a frontmatter block. Add a file and it shows up — no code
changes. Set `draft: true` to hide something while you work on it. Long pages get an automatic
**"X min read"** estimate and, with two+ headings, an **"On this page"** outline.

### A project — `src/content/projects/my-thing.md`

```md
---
title: "My Thing"
summary: "One sentence on what it is."
type: "Personal"            # Personal | Academic | Professional
# org: "Uphold"             # for Professional/Academic: the org (see Experience linking)
# orgUrl: "https://uphold.com"   # optional: makes the org name a link
# experience: "uphold"      # optional: pin to a specific role by id — only needed
#                           # if you have MULTIPLE roles at the same company
category: "Software"        # Software | Web | Data & ML | Networking | Systems | Games
stack: ["Go", "Postgres"]   # optional chips
featured: true              # show on the homepage
resume: true                # include on the auto-generated /resume
order: 10                   # lower sorts first
# repo / demo / year        # optional
# cover: ./cover.jpg        # optional (optimized); add coverAlt too
# gallery: [ … ]            # optional image gallery (see above)
---

Longer write-up in markdown. Code blocks are highlighted automatically.
```

The **Projects** page filters by `type`, each with its icon; every type also gets its own
paginated page. Set `org` to link a project to a matching **Experience** role (below).

### A snippet — `src/content/snippets/my-tip.md`

```md
---
title: "Do the thing safely"
description: "What this tip is for."
pubDate: 2026-06-01
category: "DevOps"   # Software Engineering | Systems | DevOps | Cybersecurity | Data
lang: "shell"        # small label (shell, bash, sql, go, ts, …)
tags: ["docker"]     # tool tags, shown on the card
---
```

Snippets are **hierarchical**: `/snippets` shows the **classes** (from `category`), each class has
its own paginated listing, and each snippet lives at `/snippets/<class>/<id>`. The class labels,
slugs, icons and blurbs live in `src/data/taxonomy.ts` — the `category` value must match a label
there.

### A blog post — `src/content/blog/my-post.md`

```md
---
title: "My Post"
description: "Shown in the list and as the social description."
pubDate: 2026-06-01
tags: ["backend", "notes"]
# cover: ./cover.jpg / coverAlt: "…"   # optional hero (optimized)
---
```

Posts are listed newest-first. Each `tag` becomes a **filter chip** on `/blog` that links to a
paginated `/blog/tag/<tag>` view — that's the blog's "organization". (I went with tags rather than
a rigid class hierarchy like snippets, since posts read chronologically and often span topics; say
the word if you'd prefer hard categories instead.)

### A role — `src/content/experience/company.md`

```md
---
company: "Company"          # match a project's `org` to link its projects here
role: "Your Role"
start: "2023"
end: "Present"
location: "Porto, Portugal"
tags: ["Backend"]
summary: "One line for the /experience list card."
highlights:                 # short bullets — also feed the auto résumé (top 3)
  - "Shipped X, cutting Y by Z%."
focus: ["Backend", "Systems"]   # résumé focus areas this role maps to
order: 30                   # higher = more recent
---

A couple of sentences about the role (shown on the role's own page).
```

### A certification — `src/content/certifications/my-cert.md`

```md
---
name: "AWS Certified Cloud Practitioner"
issuer: "AWS"               # the provider — the filter groups by this
issued: "2024"              # freeform: "2024" or "Mar 2024"
# expires: "2027"           # optional
# url: "https://…"          # optional verification link ("Verify")
# credentialId: "…"         # optional
skills: ["Cloud", "AWS"]    # optional tags
featured: true              # sorts to the front
order: 10
---
```

The **Certifications** page shows a **provider filter** built automatically from the `issuer`
values you use. Three clearly-marked **example** certs ship in the folder — replace them with your
real ones (AWS, INE, …) or delete them. Add a new provider simply by using a new `issuer`.

### A thesis / paper — `src/content/papers/thing.md` (shown on /academia)

```md
---
title: "Paper Title"
kind: "Paper"                 # or "Thesis"
authors: ["João Guedes"]
venue: "Conference / Journal"
year: 2022
link: "https://…"             # optional — external page / DOI / repository
pdf: "/papers/thing.pdf"      # optional — a file in public/papers/
abstract: "The abstract or a short summary."
---
```

On `/academia`, a paper with a `pdf` shows **Open PDF** (opens in the browser) and **Download**
buttons; a `link` adds a **View page ↗** link. Put PDFs in `public/papers/` and reference them by
absolute path as above. Education is shown here too (see below).

---

## Experience ↔ projects linking

**One role at a company (the common case):** set a project's `org` to the **exact `company`** of
an experience entry (case-insensitive). That's it — the role's page lists the project under
**"Related projects"**, and the project links back with **"Part of my work at &lt;company&gt;"**.

**Multiple roles at the same company** (e.g. QA intern → Software Engineer → AppSec Engineer, all
at Checkmarx): give each role its own file with the **same `company`** but a different id
(`checkmarx-qa.md`, `checkmarx-swe.md`, `checkmarx-appsec.md`), then **pin each project to the
right role(s)** with the `experience` field:

```md
# a project you did as a software engineer there
org: "Checkmarx"
experience: "checkmarx-swe"          # one role…
# experience: ["checkmarx-swe", "checkmarx-appsec"]   # …or several
```

How it resolves:

- If a project sets `experience`, it appears **only** on those role page(s), and links back to
  the specific role (or to `/experience` if it spans more than one).
- If a project sets only `org`, it auto-attaches **when that company has a single role**. When a
  company has several roles, a bare `org` is ambiguous, so the project won't attach to any of them
  until you add `experience` — the role page tells you exactly that.

So the answer to "can it handle three roles at one company?" is **yes** — add the three role
files and pin each project with `experience`.

---

## Résumé — auto-generated, override anytime

`/resume` builds itself from your content, driven by `src/data/resume.ts`. The rule:

- **Manual sections** live in `resume.ts`: `summary`, technical `skills` (grouped), `softSkills`,
  `languages`, and the `focusAreas` used by the on-page filter. **Education** now lives in its own
  file, **`src/data/education.ts`** — edit it once and it appears on both `/resume` and `/academia`.
- **Auto-or-override sections** — leave the array empty to auto-generate, or fill it to override
  verbatim:
  - `experience: []` → pulled from `src/content/experience/*` (top 3 `highlights` each).
  - `certifications: []` → pulled from `src/content/certifications/*`.
  - `projects: []` → every project flagged `resume: true` (or list ids here to pick/order them).

Projects on the résumé show a short description, year, and the org (for Professional / Academic
work). The page has a **focus filter** (from each role's `focus`), a **Print** button, and a
**Download PDF** button.

**Your CV PDF** goes at **`public/resume/joaoguedes_cv.pdf`** (there's a placeholder there now).
Different filename? Update `pdfPath` in `resume.ts`.

Search `resume.ts` and the experience/certification files for `TODO` to find everything waiting
on your real details (dates, education, exact skills, real credential names/dates/links).

---

## Branding (logo & hero)

- **`public/logo.svg`** — the nav mark (a white rounded chip with a "G"). It sits top-left and
  links home. On light themes the white chip is defined by a soft drop-shadow; if you want a hard
  edge, add a thin border inside the SVG.
- **`public/guedes-vector.svg`** — the hero illustration on the homepage. It's rendered
  frameless and transparent (no outline) by `src/components/FaceIllustration.astro`; swap the file
  to change the art, or tweak sizing in that component.
- **`public/og-default.png`** — the social share card (1200×630, dark). Regenerate it if you
  rebrand; it's referenced via `ogImage` in `src/data/site.ts`.

---

## Site config

Edit **`src/data/site.ts`** for your name, nav, and social links. Each social link has an `icon`
(a name from `src/icons/index.ts`). A couple of `handle`s are still marked `TODO`:

```ts
{ label: "GitHub",   href: "https://github.com/JoaoGuedes01", handle: "@JoaoGuedes01", icon: "github" },
{ label: "LinkedIn", href: "https://www.linkedin.com/in/joaom-guedes", handle: "in/TODO", icon: "linkedin" },
{ label: "Email",    href: "mailto:joaoguedes.cjp@gmail.com", handle: "joaoguedes.cjp@gmail.com", icon: "mail" },
```

---

## Deploying to GitHub Pages

A workflow is included at `.github/workflows/deploy.yml`.

1. Push this repo to GitHub.
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main`. The action builds and deploys automatically.

**Which URL?**

- **User page** (`https://joaoguedes01.github.io`): repo must be named `joaoguedes01.github.io`.
  Current config is set for this.
- **Project page** (e.g. `https://joaoguedes01.github.io/personal_website`): in `astro.config.mjs`
  uncomment and set `base: "/personal_website"`. All internal links/assets already use the
  `href()` helper, so they pick up the sub-path automatically.

---

## A few notes

- The **palette button** switches theme + typeface; choices are remembered.
- Detail pages get an automatic **reading-time** estimate and a scroll-synced **table of
  contents** — a sticky sidebar on desktop, and a collapsible "On this page" panel at the top of
  the article on mobile (so headings navigation works on phones too).
- **Snippets**, **projects** (all + per type), and the **blog** all paginate at `PAGE_SIZE`
  (`utils/paginate.ts`).
- Link a project to a role by matching its `org` to the role's `company`.
- The **résumé** auto-builds from your content; fill the arrays in `resume.ts` to override.
- Swap **`public/guedes-vector.svg`** / **`public/logo.svg`** to rebrand; regenerate
  `og-default.png` to match.
- Search the codebase for `TODO` to find every spot waiting on your real details — including
  project `type` values, professional `org`/`orgUrl`, experience dates/bodies/highlights,
  education, skills, and the example certifications. Education is in `src/data/education.ts`;
  paper/thesis PDFs go in `public/papers/`.
