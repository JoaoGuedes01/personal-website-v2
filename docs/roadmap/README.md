# Roadmap

Specs for features that are not built yet, one file each. Last reviewed 2026-11-17.

The site is my personal corner: the place I send people to read about me, my projects, my work and
what I am interested in. Everything below is judged against that.

## Ground rules

- **Mostly static.** The site is plain files served by Cloudflare Pages. Server code is allowed only
  when it runs on a free tier with a hard cap, so going over makes the feature fail, never bills me.
  Pages stay static and work without it.
- **No running cost and no surprise bill** beyond the domain name. Never add a paid plan or a card
  for a feature. Free tiers of third parties are acceptable only when they are optional and the page
  still works without them.
- **Light and fast.** No client framework, nothing that blocks first paint, no heavy third-party
  script on every page.
- **Nothing about my lab's weak spots or anything sensitive.** The homelab writing stays at the level
  of ideas and lessons, never addresses, credentials, exposed services or unfixed problems.
- **Human voice.** No generated-looking copy, no em dashes.

## Order of work

| # | Feature | Effort | Why |
| - | --- | --- | --- |
| 1 | [Custom email address](custom-email.md) | 30 min, no code | Visitors and recruiters see a Gmail address today |
| 2 | [Start here page](start-here.md) | half a day | The first thing a new visitor needs |
| 3 | [Now and Uses pages](now-and-uses.md) | half a day | Personal, cheap, a reason to come back |
| 4 | [Security headers](security-headers.md) | 1 hour | Free hardening, no downside |
| 5 | [Broken link check](link-check.md) | 1 hour | Links rot as content grows |
| 6 | [Analytics](analytics.md) | 30 min | To learn which writing lands |
| 7 | [Reading list](reading-list.md) | half a day | Fits "my interests", pure markdown |
| 8 | [Like button](like-button.md) | half a day | Cloudflare Functions plus D1, hard capped on the Free plan |

Content comes first. None of this blocks writing.

## Considered, not now

- **Comments and reactions (giscus):** needs a GitHub login and a third-party iframe. Revisit if
  readers ask to reply.
- **Search upgrades** (filters, recent searches, weighting): wait until there are hundreds of
  entries.
- **Quality gates in CI** (Lighthouse, axe): worth it once the site stops changing weekly.
- **A newsletter:** needs an email service.
- **A contact form:** a mailto link on a domain address does the job.
- **Translations and a CMS:** not wanted.

## Writing a spec

Each file has the same sections: what and why, the approach, the cost, what could go wrong, and a
checklist. Move a feature out of this folder into `how_to_use.md` once it is built, and delete its
spec.
