<div align="center">

<img src="public/logo.svg" alt="Guedes logo" width="72" height="72" />

# João Guedes — Personal Website

**A fast, static personal site for a backend engineer** — projects, experience, snippets,
a blog, certifications, academia and a résumé that builds itself.
Dark-developer aesthetic, content-driven, zero client-side framework.

[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![daisyUI](https://img.shields.io/badge/daisyUI-5-1AD1A5?logo=daisyui&logoColor=white)](https://daisyui.com)
![Static](https://img.shields.io/badge/output-100%25%20static-14161b)
![Themes](https://img.shields.io/badge/themes-7-6aa6ff)

</div>

---

## What this is

A personal website built the way a backend engineer would want one: **all content is just
markdown**, every list is generated from it, and there's no framework shipping to the browser —
the little interactivity there is (theme switch, search, galleries, table-of-contents) is a few
kilobytes of vanilla JS. It's designed to be forked and made your own.

### Highlights

- 🗂 **Everything is content.** Projects, blog posts, snippets, roles, certs and papers are
  markdown files with typed frontmatter. Drop a file in, it shows up — sorted, linked and paginated.
- 🧾 **A résumé that writes itself.** `/resume` is generated from your experience, projects and
  certifications, and every section can be overridden by hand when you want it to differ.
- 🎨 **7 themes × 4 typefaces**, switched at runtime and remembered — Slate (default), Nord,
  Gruvbox, Rosé Pine, Tokyo Night, Paper and Solarized.
- 🔎 **Fuzzy search** on projects, certifications, snippets and the blog — a find box across from
  the filters, matching across everything in the section.
- 🏷 **Real, paginated filters** — project types, blog tags and per-class snippet tags are actual
  routes, so filtering and pagination coexist.
- 🖼 **Optional galleries** on any detail page (projects, blog, experience, snippets) with a
  dependency-free lightbox, plus an on-page **table of contents** that tracks your reading.
- 📣 **Callouts & disclaimers** — flag a note, warning, or security caveat in any markdown body with
  a `:::warning[Title] … :::` block (or a `<Callout>` on a page); nine semantic types that recolour
  with the active theme.
- ⚡ **Fast & accessible by default** — optimized images, semantic HTML, keyboard-friendly,
  great Lighthouse scores, SEO tags, sitemap and RSS out of the box.
- 🧰 **A content generator** — `npm run new -- project "My Thing"` scaffolds a ready-to-edit file.

---

## Quick start

```bash
# Node 22+ (see .nvmrc)
npm install
npm run dev            # http://localhost:4321
```

```bash
npm run build          # static site → ./dist
npm run new -- blog "My first post"   # scaffold new content
```

Then edit **`src/data/site.ts`** (name, nav, socials) and **`src/data/profile.ts`** (bio, skills,
interests), drop your content in `src/content/**`, and you're most of the way there.

📖 **Full guide:** see **[`how_to_use.md`](how_to_use.md)** — it walks through the content model,
every frontmatter field, theming, the résumé, deployment and more.

---

## Tech

Built with **[Astro](https://astro.build)** (static output, MDX, content collections),
**[Tailwind CSS v4](https://tailwindcss.com)** and **[daisyUI v5](https://daisyui.com)** for theming,
and the `@tailwindcss/typography` plugin for prose. Deploys anywhere static — the included GitHub
Actions workflow publishes to GitHub Pages.

---

## Make it yours 💛

**You're welcome to use this project as the basis for your own personal site.** Fork it, swap in
your content, restyle it, ship it — that's what it's for, and I'd be glad to see it put to use.

**One ask: give credit.** If you build your site on this, please keep a visible attribution — a
line in your site footer and/or your repo's README pointing back to this project and to me
(**João Guedes**, [github.com/JoaoGuedes01](https://github.com/JoaoGuedes01)). Something like:

> Built on [João Guedes' personal-site project](https://github.com/JoaoGuedes01).

That's the whole deal. A couple of things that aren't OK: passing this off as your own template to
sell or redistribute, or implying I endorse your site. Otherwise — go for it, and have fun with it.

If you'd like formal terms, add a `LICENSE` file (MIT with an attribution note, or CC-BY-4.0, both
fit this spirit). Until then this is shared as-is, without warranty. Questions or want to show me
what you made? Reach out via the links on the site. 🙂

---

<div align="center">
<sub>Made by João Guedes · backend engineer · ex-security · homelab tinkerer</sub>
</div>
