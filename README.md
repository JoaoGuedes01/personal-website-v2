# personal-website-v2

The source of [joaoguedes.net](https://joaoguedes.net): my projects, professional experience, certifications,
code snippets, my blog and a CV generator.

It is a static content-base application built with Astro. Everything on it comes from markdown files in `src/content`
and a few small data files in `src/data`; lists, filters, search and the PDF CV are generated from
those at build time.

## Stack

- [Astro](https://astro.build) 7 with MDX and content collections
- [Tailwind CSS](https://tailwindcss.com) 4 and [daisyUI](https://daisyui.com) 5 for styling and themes
- [pdfkit](https://pdfkit.org) to build the CV PDF during the build
- Hosted on Cloudflare Pages, deployed from GitHub Actions, versioned with
  [release-please](https://github.com/googleapis/release-please)

## Running it locally

Node 24 is requited (see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:4321
```

Other commands:

```bash
npm run build      # static site in ./dist
npm run preview    # serve the production build
npm run check      # type and template diagnostics
npm run new -- blog "Post title"   # scaffold a content file; -h lists the types
```

## Layout

```
src/content/      markdown for projects, blog, snippets, experience, certifications, papers
src/data/         hand-edited data like site, profile, education, resume, series, CV source
src/pages/        routes
src/components/   Astro components
src/styles/       global.css (Tailwind, daisyUI themes)
src/utils/        build-time helpers (CV generator, changelog parser, series, reading time)
scripts/          the content generator
public/           static files served as they are
docs/             design notes
```

## Documentation

- [how_to_use.md](how_to_use.md): adding content, frontmatter for each collection, and how the
  generated pages work.
- [commit_guide.md](commit_guide.md): commit message format and how releases are made.

## Deployment

Pushing to `main` does not deploy. release-please keeps a release pull request open, and publishing
that release runs the deploy workflow, which uploads `dist` to Cloudflare Pages. Pull requests
against `main` get a preview deployment. Details are in [commit_guide.md](commit_guide.md).

## License

[MIT](LICENSE). You are welcome to use this as the starting point for your own site. If you do,
please keep a visible credit linking back to this repository, for example in your footer or README.
