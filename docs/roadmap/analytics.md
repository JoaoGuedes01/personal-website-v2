# Privacy friendly analytics

Status: not started. Needs a decision, because it adds a third-party script.

## Why

I want to know which posts and snippets people read and where they come from, so I can write more of
what helps. I do not need to know who they are.

## Options

| Option | Cost | Notes |
| --- | --- | --- |
| Cloudflare Web Analytics | free | One small script, no cookies, no consent banner needed. Already on the platform I use. |
| Counting from Cloudflare's own edge logs | free | Zero script, but the numbers are coarse and live in the dashboard. |
| A self hosted tool | server cost | Rejected, it is a backend. |

Recommendation: Cloudflare Web Analytics, enabled from the Pages dashboard, which injects the
script without touching the repository. It then needs no code, and I can remove it by switching it
off.

## What to track

Page views and top pages, referrers, and country. Nothing else. No events, no identifiers.

## Risks

- The script is one more request on every page, small but not free. Check the performance budget
  before and after.
- Ad blockers will hide a share of visitors, so the numbers are a lower bound.
- The CSP in [security-headers.md](security-headers.md) must allow the beacon host.

## Checklist

- [ ] Turn it on in the Pages dashboard.
- [ ] Re-run the performance check.
- [ ] Mention it in the footer or About page in one line.
