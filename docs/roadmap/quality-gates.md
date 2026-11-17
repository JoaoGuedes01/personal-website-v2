# Quality gates in CI

Status: not started.

## Why

The site is fast and accessible today because I have been careful. Without a check, that decays
quietly as pages and scripts get added.

## Approach

On pull requests, against the built preview:

- **Lighthouse CI** (`treosh/lighthouse-ci-action`) on four pages: home, a blog post, a project,
  a snippet. Budgets: performance 95 or more, accessibility 100, best practices 95 or more, total JS
  under a set size. Fail below the budget.
- **Accessibility** with axe through Playwright on the same pages, including the search overlay
  open and the theme picker open, in light and dark.
- **Type check** (`npm run check`) as a step. It passes now, so it can fail the build.
- **Spelling** already runs. Keep it.
- **Page weight**: a small script that prints the size of the home page's HTML, JS and CSS and fails
  if it grows past a limit.

## Cost

Zero for a public repository.

## Risks

Lighthouse scores vary by a few points between runs. Use several runs and a margin. Do not gate on
exact numbers.

## Checklist

- [ ] Add `npm run check` to the preview workflow.
- [ ] Add Lighthouse CI with budgets.
- [ ] Add the axe tests.
- [ ] Decide the page weight limits from today's numbers.
