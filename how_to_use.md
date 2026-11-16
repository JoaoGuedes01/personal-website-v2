# How to use this site

This is the operating manual: how to add content, what each frontmatter field does, and how the
generated pages work. For a short overview of the project see [README.md](README.md).

The site has two kinds of input. Content is markdown in `src/content`, one file per entry. Small
TypeScript data files in `src/data` hold the things that are not entries, like your name, skills
and navigation. Everything else is generated from those two at build time.

## Contents

- [Setup and commands](#setup-and-commands)
- [Layout](#layout)
- [Adding content](#adding-content): [projects](#projects), [blog posts](#blog-posts), [snippets](#snippets), [experience](#experience), [certifications](#certifications), [papers](#papers-and-theses)
- [Projects and roles](#projects-and-roles)
- [Lists, filters and search](#lists-filters-and-search)
- [Images and galleries](#images-and-galleries)
- [Code blocks](#code-blocks)
- [Callouts](#callouts)
- [Resume and CV](#resume-and-cv)
- [Data files](#data-files)
- [Themes and typefaces](#themes-and-typefaces)
- [Icons](#icons) and [branding files](#branding-files)
- [Changelog and releases](#changelog-and-releases)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Setup and commands

Node 24 is required (see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:4321, reloads on change
npm run build      # static site in ./dist
npm run preview    # serve the production build
npm run check      # Astro type and template diagnostics
```

## Layout

```
src/
  content/            one folder per collection
    projects/ blog/ snippets/ experience/ certifications/ papers/
  content.config.ts   frontmatter schema for each collection
  data/
    site.ts           name, nav, social links, the href() helper
    profile.ts        bio, skills, interests (About page and resume)
    education.ts      education (Academia page and resume)
    resume.ts         resume overrides, CV contact details
    series.ts         definitions for multi-part blog series
    taxonomy.ts       project types, snippet categories, slug helpers
    snippetGroups.ts  labels and icons for snippet groups
    tech.ts           icons and labels for technologies in project stacks
    callouts.mjs      callout types and aliases
    cv/               source files for the generated PDF CV
  pages/              routes
  components/         Astro components
  layouts/            BaseLayout.astro (head, header, footer, theme script)
  icons/index.ts      icon set
  plugins/            remark plugin for callouts
  styles/global.css   Tailwind, daisyUI themes, typefaces
  utils/              CV generator, changelog parser, series helpers, reading time
scripts/new-content.mjs   the generator behind `npm run new`
public/               served as is: logo, portrait, og image, fonts, paper PDFs
```

## Adding content

Create a markdown file in the right folder, or let the generator do it:

```bash
npm run new -- project "Realtime Chat Service"
npm run new -- blog "What the homelab taught me"
npm run new -- snippet "Tail all compose logs"
npm run new -- experience "Checkmarx"
npm run new -- certification "AWS Solutions Architect"
npm run new -- paper "My thesis title"
```

The generator writes `src/content/<collection>/<slug>.md` with every field for that type, fills in
the date and a few defaults, and will not overwrite an existing file. Replace the `TODO`
placeholders afterwards. Options:

- `--slug <slug>` to choose the filename instead of deriving it from the title
- `--group <group>` and `--subgroup <subgroup>` for snippets, to nest them in folders
- `--template showcase` for a blog post that exercises every block the blog supports, handy for
  checking a layout change

A few rules apply to every collection:

- The entry id is the filename without its extension, and ids must be flat. Do not put entries in
  subfolders, except snippets (see below).
- Frontmatter is validated against `src/content.config.ts`. A wrong or missing field fails the
  build with the file and field named.
- `draft: true` keeps an entry out of lists, feeds and the sitemap, and out of the build.
- Reading time and the table of contents are computed automatically.

> [!TIP]
> Blog drafts still get a page under `npm run dev`, so you can preview an unfinished post at its
> normal URL. They are never built for production.

### Projects

`src/content/projects/my-thing.md`

```md
---
title: "My Thing"
summary: "One or two lines, shown on the card and the page."
type: "Personal"                 # Personal | Academic | Professional
category: "Web"                  # see the list below
stack: ["TypeScript", "Postgres"]
year: 2026
featured: false                  # appears on the home page
resume: false                    # appears on /resume
order: 100                       # lower sorts first
draft: false
# org: "Uphold"                  # employer, for Professional projects
# orgUrl: "https://uphold.com"
# experience: "uphold"           # pin to a specific role, see "Projects and roles"
# repo: "https://github.com/..." # also demo: and video:
# gallery: [ ... ]               # see "Images and galleries"
---
Markdown body. `##` headings become the table of contents.
```

Categories are `Web`, `Backend & Systems Architecture`, `Devops & Infrastructure`,
`Data Science & ML` and `Game Development`.

The card and page cover is found by convention. Put an image called `cover.png` (or jpg, jpeg,
webp, avif) in `src/content/projects/img/<project-id>/` and it is used automatically; there is no
frontmatter field for it. Gallery images live in the same folder.

Each item in `stack` is looked up in `src/data/tech.ts` to get its label and icon. A name that is not
there still renders, with a generic icon for its kind. Add an entry to `tech.ts` when you want a
specific icon.

### Blog posts

`src/content/blog/my-post.md`. The blog is called Ramblings on the site, but the route and folder
are still `blog`.

```md
---
title: "My Post"
description: "Shown in the list and as the social description."
pubDate: 2026-06-01
tags: ["homelab", "proxmox"]
featured: false
draft: false
# updatedDate: 2026-06-10
# cover: ./img/my-post/cover.jpg
# coverAlt: "What the image shows"
# gallery: [ ... ]
# series: "homelab"
# part: 2
---
```

Posts are listed newest first. Tags are the blog's only organisation: each tag becomes a topic pill
on `/blog` and links to `/blog?tag=<tag>`. A post ends with a "More like this" list of posts that
share its tags.

Images for a post live in `src/content/blog/img/<post-id>/`. That folder is ignored by the content
loader, so it never turns into entries. Reference the files relatively, as in `cover` above.

Posts with `featured: true` appear in the Featured block at the top of `/blog`, up to five. The
newest gets the large card.

#### Series

A series is a set of posts that read in order. Define it once in `src/data/series.ts`:

```ts
homelab: {
  title: "Homelab",
  blurb: "One sentence about the series.",
  planned: ["The Frankenlab", "The Rebuild", "..."],
},
```

Then give each post `series: "homelab"` and its `part` number. The `planned` titles let the site
show the full list, with parts you have not written yet marked as coming soon, and the total
("Part 2 of 5") before the series is finished.

A series post gets a label above its title, a "Next" link, and an "In this series" box in place of
"More like this". Every part keeps its own card in the list. Setting `featured: true` on any one
part features the whole series as a single card in the Featured block, with a collapsible list of
its parts, so a long series does not use up all the slots. A part still marked `draft: true` shows
as coming soon to everyone else.

### Snippets

`src/content/snippets/my-tip.md`

```md
---
title: "Tail all compose logs"
description: "What it does, in one line."
pubDate: 2026-06-01
category: "DevOps"      # Software Engineering | Systems | DevOps | Cybersecurity | Data
lang: "shell"           # shown as a label, defaults to shell
tags: ["docker"]
draft: false
# source: "INE course"  # where it came from, shown as a small badge
---
```

`category` decides the top-level section on `/snippets`. Groups and subgroups inside a category come
from the folder structure, not from frontmatter:

```
src/content/snippets/tools/credential-attack-tools/hydra.md
```

is the `hydra` snippet in the `credential-attack-tools` subgroup of the `tools` group, under
`/snippets/cybersecurity/tools/credential-attack-tools/hydra`. A snippet placed directly in
`src/content/snippets` has no group. Labels, icons and descriptions for groups are optional and
live in `src/data/snippetGroups.ts`; a group missing there gets a title-cased folder name.

### Experience

`src/content/experience/company.md`

```md
---
company: "Uphold"
role: "Backend Software Engineer"
start: "2026"
end: "Present"            # defaults to Present
location: "Braga, Portugal"
tags: ["Backend", "Node.js"]
summary: "One line for the experience list."
highlights:
  - "Something you shipped or owned."
order: 5                  # highest number is the most recent
draft: false
# cv:                     # overrides for the generated CV, see below
#   role: "..."
#   type: "Full Time"
#   bullets: ["..."]
#   hide: false
---
Markdown body about the role.
```

### Certifications

`src/content/certifications/aws-cloud-practitioner.md`

```md
---
name: "AWS Certified Cloud Practitioner"
issuer: "AWS"             # certifications are grouped and filtered by issuer
issued: "2024"            # free text, "2024" or "Mar 2024"
skills: ["Cloud", "IAM"]
featured: false           # sorts first, and is listed on the CV
order: 100
draft: false
# expires: "2027"
# url: "https://..."      # verification link
# credentialId: "..."
---
```

### Papers and theses

`src/content/papers/my-paper.md`, shown on `/academia`.

```md
---
title: "Paper title"
kind: "Paper"             # Paper | Thesis
authors: ["João Guedes"]
venue: "Conference or journal"
year: 2022
abstract: "A short summary."
# link: "https://..."     # external page or DOI
# pdf: "/papers/my-paper.pdf"   # a file in public/papers
---
```

With a `pdf` the paper gets Open PDF and Download buttons. A `link` adds a link to the external page.
Education from `src/data/education.ts` is shown at the top of the same page.

## Projects and roles

A project can be linked to a role so the role page lists it under related projects and the project
links back to it.

With one role at a company, set the project's `org` to the exact `company` of the experience entry
(case-insensitive) and that is enough.

With several roles at the same company, give each role its own file with the same `company` and a
different id, then pin each project to the role it belongs to:

```md
org: "Checkmarx"
experience: "checkmarx-swe"
# experience: ["checkmarx-swe", "checkmarx-appsec"]   # or several
```

A project with `experience` set appears only on those role pages. A bare `org` is ambiguous when the
company has more than one role, so pin it.

## Lists, filters and search

Projects, snippets and the blog show nine entries at a time with a Load more button; the size is
`PAGE_SIZE` in `src/utils/paginate.ts`. Certifications show everything. Filtering and search run in
the browser over the full list, so they cover every entry and not only the visible ones.

- Projects have Type, Category and Stack dropdowns and a search box.
- Snippets have a Tag dropdown and a search box.
- Certifications have a button per issuer and a search box.
- The blog has topic pills (one per tag), a search box, and a column picker for the card grid.

The blog keeps its filter in the URL (`/blog?tag=homelab`, `?q=term`), so a filtered view can be
linked. The search itself is a small dependency-free script, `src/components/ListSearch.astro`.

## Images and galleries

Images referenced from frontmatter or from the markdown body go through Astro's image pipeline, so
they are resized and converted at build time. Keep them next to the content and reference them with
a relative path.

A gallery can be added to any detail page (projects, blog, snippets, experience):

```md
gallery:
  - { src: ./img/my-post/shot-1.png, alt: "Dashboard", caption: "The overview." }
  - { src: ./img/my-post/shot-2.png, alt: "Detail view" }
```

It renders as a grid with a lightbox that opens on click, moves with the arrow keys or a swipe, and
closes with Escape. Files that are not content, like the favicon or the social card, go in `public/`
and are referenced by absolute path.

## Code blocks

Fenced code in any markdown body is highlighted at build time (Shiki, with a light and a dark
palette that follow the theme). Every block also gets a Copy button in its top-right corner. It
shows on hover and on keyboard focus, and is always visible on touch screens. It copies the code
exactly as written, with no line numbers or prompt characters added. Set the language after the
opening fence, as in ` ```bash `, to get highlighting.

The button comes from `src/components/CodeCopy.astro`, which wraps each `pre` inside `.prose` in the
browser, so nothing in the markdown needs to change.

## Callouts

Any markdown body can contain a callout:

```md
:::warning[Demo offline]
The demo is down while I move it to a new host.
:::
```

The title in brackets is optional. The types are `note`, `info`, `tip`, `success`, `warning`,
`danger`, `important`, `security` and `quote`, and each has a few aliases (`hint` for `tip`,
`caution` for `danger`, and so on; the full list is in `src/data/callouts.mjs`). Colours come from
the active theme, so callouts follow the theme picker.

In an `.astro` or `.mdx` file use the component instead:

```astro
---
import Callout from "../components/Callout.astro";
---
<Callout type="security" title="Handle with care">Text here.</Callout>
```

To recolour one callout, pass a colour: `:::note{color=accent}` in markdown or `color="accent"` on
the component. It accepts a daisyUI colour name or any CSS colour. To change a type everywhere,
edit its `.callout-<type>` rule in `src/styles/global.css`. A new type needs an entry in
`callouts.mjs` and a matching rule in the stylesheet.

## Resume and CV

`/resume` is generated from your content: roles from `src/content/experience`, certifications from
`src/content/certifications`, projects that have `resume: true`, and skills, languages and
education from `profile.ts` and `education.ts`. To replace a section by hand, fill the matching
array in `src/data/resume.ts`; an empty array means the section is generated.

The page links to a PDF CV, which is also generated on every build, so it cannot go out of date.

### The PDF

The PDF is built from two files in `src/data/cv/`:

- `cv.md` is the CV you write. Anything in it is printed as written, and `{{placeholders}}` pull in
  live data from the site.
- `cv.auto.md` is the fully automatic version, made only of placeholders.

The front matter of `cv.md` controls the build:

```yaml
use: manual      # which one is published: manual (cv.md) or auto (cv.auto.md)
page: A4         # A4 or Letter
font: 10         # starting size in points
min-font: 8.5    # the smallest it may shrink to
margin: 28
fit: one-page    # shrink the font until it fits one page, or "flow" to allow more pages
```

Three files are built every time: `/resume/joaoguedes_cv.pdf` (the published one that the site
links to), plus `joaoguedes_cv-manual.pdf` and `joaoguedes_cv-auto.pdf` so the two can be compared.

The format is a small dialect of markdown, and each line stays its own line. `# Name` is the
centred title, `## Section` a heading with a rule, `- text` a bullet, and `**bold**` and
`[text](url)` work inline (links stay black but are clickable). A line starting with `|` is a row
with aligned cells: the first cell is left, the last is right, and the ones between are centred.
With four cells the second is left aligned at a fixed column, which is what the job lines use.
Write a literal `|` inside a cell as `\|`. `:name:` before text in a row draws a small icon from
the site's icon set, for example `:github:` or `:mail:`.

| Placeholder | Fills in |
| --- | --- |
| `{{name}}`, `{{title}}` | from `profile.ts` |
| `{{contact}}` | the contact rows, from `contact` in `resume.ts` |
| `{{experience}}` | every non-draft role, newest first, with its bullets |
| `{{education}}` | from `education.ts` |
| `{{certifications}}` | featured certifications; `{{certifications: all}}` for every one |
| `{{skills}}` | every skill group; `{{skills: Languages, Databases}}` for those groups, in that order |

An experience file can adjust how it appears in the CV with a `cv` block: `bullets` (short CV lines;
the default is `highlights`), `role` (the title as it should read), `type` (Full Time by default)
and `hide: true` to leave the role out. To write the experience section by hand, put your own rows
and bullets in `cv.md` instead of `{{experience}}`.

The generator is `src/utils/cv.ts` and the route is `src/pages/resume/[file].pdf.ts`.

> [!NOTE]
> The PDF uses the standard Helvetica fonts, which only cover Latin-1 characters, so symbols outside
> that range are dropped.

## Data files

`src/data/site.ts` has the site name, role, description, canonical URL, navigation and social
links, and the `href()` helper. Use `href()` for internal links so they respect the configured base
path. Keep `url` in sync with `site` in `astro.config.mjs`; it feeds canonical URLs, the sitemap and
the RSS feed.

`src/data/profile.ts` is the single source for what appears on both the About page and the resume:
name, title, location, tagline, summary, grouped skills, soft skills, interests and spoken
languages. Interest icons must exist in `src/icons/index.ts`. The portrait is
`public/guedes_profile.png`.

## Themes and typefaces

There are eight themes: Ink (the default), Slate, Nord, Gruvbox, Rosé Pine, Tokyo Night, Paper and
Solarized. There are seven typefaces: Geist (the default), Manrope, IBM Plex, Inter, System, Space
Grotesk and JetBrains Mono. Both are chosen from the palette button in the header, saved in
`localStorage`, and applied before the first paint so the page does not flash.

Themes are daisyUI theme blocks in `src/styles/global.css`. Dark themes are listed in two places that
must match, the inline script in `BaseLayout.astro` and `ThemePicker.astro`. The default theme and
font are the fallbacks in that same script, and the `data-theme` and `data-font` attributes on the
`<html>` tag. Typefaces are self-hosted from `public/fonts`.

## Icons

Icons come from `lucide-static`, plus a few custom ones in `src/icons/index.ts`. Use a lucide name
directly. If lucide calls the icon something else, add an alias; if it does not have it, paste the
inner SVG markup into the overrides in the same file. Icons for technologies are separate and live
in `src/data/tech.ts`.

## Branding files

- `public/logo.svg`: the header mark
- `public/guedes-vector.svg`: the home page illustration, shown by `FaceIllustration.astro`
- `public/guedes_profile.png`: the portrait on the About page
- `public/og-default.png`: the social card, 1200 by 630

## Changelog and releases

`/changelog` is built from `CHANGELOG.md`, which release-please writes, and the version number comes
from `package.json`. How commits turn into releases is described in
[commit_guide.md](commit_guide.md).

> [!WARNING]
> Do not edit `CHANGELOG.md` or the version in `package.json` by hand. release-please owns both, and
> a manual change will conflict with the next release pull request.

## Deployment

The site deploys to Cloudflare Pages. Publishing a GitHub release runs `.github/workflows/deploy.yaml`,
which runs `npm run build` and uploads `dist`. Pull requests get a preview deployment from
`preview.yaml`. See the commit guide for the release steps and the secrets the workflows need.

The sitemap is generated during the build.

### RSS feed

The blog feed is `/rss.xml` and carries the full text of every published post, not just a summary,
so readers can read it without leaving their feed app. Each item has the cover image first, then
the post, then its gallery images and captions. The HTML is rendered from the same markdown as the
site, with callouts and code blocks intact, then cleaned for feed readers: links and images are made
absolute, and styles, scripts and classes are removed. Highlighting colours do not survive that
cleaning, so code appears as plain monospace text in a reader.

The feed is built by `src/pages/rss.xml.js`, using Astro's container renderer and `sanitize-html`.
Drafts are left out.

## Troubleshooting

- The build fails on a content file: the message names the field. Check it against the schema in
  `src/content.config.ts`.
- A snippet shows up in the wrong place: the section comes from `category` and the group from the
  folder it is in. Check both.
- An image does not load: the path must be relative to the markdown file and the file must exist, or
  the build fails.
- The theme or font does not change in the browser: the choice is stored in `localStorage` under
  `guedes-theme` and `guedes-font`; clear them to go back to the defaults.
- Styles seem stale in dev: restart `npm run dev`. Tailwind builds only the classes it finds in the
  source, so a class that is written dynamically will not exist.
