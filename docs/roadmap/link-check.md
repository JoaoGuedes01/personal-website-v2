# Broken link check

Status: not started.

## Why

Posts and snippets link out to docs, tools and repositories, and those move. With more content a
dead link is guaranteed. A check on pull requests finds them before a reader does.

## Approach

Add a step to the preview workflow that builds the site and runs
[lychee](https://github.com/lycheeverse/lychee) on `dist` (the `lycheeverse/lychee-action` action).

- Check internal links and anchors on every run. These are the ones I control.
- Check external links too, but never fail the pull request for them. Report only. Many sites
  rate-limit or block bots, which makes external failures noisy.
- Keep an ignore list in `.lycheeignore` for known flaky hosts (LinkedIn blocks bots).
- Run a scheduled weekly job, on a cron, that checks external links across the whole site and opens
  an issue when something is dead.

## Cost

Zero. GitHub Actions minutes are free for a public repository.

## Risks

False positives from bot-blocking sites. Handled by the ignore list and by not failing the check.

## Checklist

- [ ] Add the lychee step for internal links, failing on error.
- [ ] Add the weekly external check that files an issue.
- [ ] Seed `.lycheeignore`.
