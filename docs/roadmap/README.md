# Roadmap

Specs for features that are not built yet, one file each. Last reviewed 2026-11-17.

The site is my personal corner: the place I send people to read about me, my projects, my work and
what I am interested in. Everything below is judged against that.

## Ground rules

- **Static only.** The site is plain files served by Cloudflare Pages. No server code of mine, no
  database, no accounts. Anything needing a backend is parked, not built.
- **No running cost** beyond the domain name. Free tiers of third parties are acceptable only when
  they are optional and the page still works without them.
- **Light and fast.** No client framework, nothing that blocks first paint, no heavy third-party
  script on every page.
- **Nothing about my lab's weak spots or anything sensitive.** The homelab writing stays at the level
  of ideas and lessons, never addresses, credentials, exposed services or unfixed problems.
- **Human voice.** No generated-looking copy, no em dashes.

## Order of work

| # | Feature | Effort | Why now |
| - | --- | --- | --- |
| 1 | [Custom email address](custom-email.md) | 30 min, no code | Visitors and recruiters see a Gmail address today |
| 2 | [Security headers](security-headers.md) | 1 hour | Free hardening, no downside |
| 3 | [Broken link check](link-check.md) | 1 hour | Content is about to grow, links rot |
| 4 | [Privacy friendly analytics](analytics.md) | 30 min | To learn which writing lands |
| 5 | [Start here page and navigation](start-here.md) | half a day | The first thing a new visitor needs |
| 6 | [Now and Uses pages](now-and-uses.md) | half a day | Personal, cheap, gives people a reason to come back |
| 7 | [Reading list](reading-list.md) | half a day | Fits the "my interests" goal, pure markdown |
| 8 | [Quality gates in CI](quality-gates.md) | 1 day | Keeps speed and accessibility from decaying |
| 9 | [Search upgrades](search-upgrades.md) | half a day | Only once there is enough content to need it |
| 10 | [Comments and reactions](comments-and-reactions.md) | half a day | Only if I want feedback on posts |
| - | [Like button](like-button.md) | parked | Needs a backend |

Items 1 to 4 are chores that pay off immediately. Items 5 to 7 are the ones that change how the site
feels. Items 8 to 10 can wait.

## Not planned

- A newsletter, because it needs an email service.
- A contact form, because it needs a backend. A mailto link on a domain address does the job.
- Translations. Worth revisiting only if I write in Portuguese on purpose.
- A CMS. Markdown in the repo is the whole point.

## Writing a spec

Each file has the same sections: what and why, the approach, the cost, what could go wrong, and a
checklist. Move a feature out of this folder into `how_to_use.md` once it is built, and delete its
spec.
