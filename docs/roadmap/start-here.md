# Start here page and navigation

Status: not started. The most useful change for a new visitor.

## Why

Most visitors arrive on one post or snippet from a search or a link and see nothing else. Others
arrive from my CV and want the short version. Right now the home page does both jobs at once.
A page that answers "who is this and what should I read" quickly would help both groups.

## What it is

A single page at `/start`, linked from the home page and the footer:

- Two lines about who I am and what the site holds.
- Three paths: "I am hiring" (CV, experience, selected projects), "I like homelabs and systems" (the
  homelab series in order, a few snippets), "I need a command" (snippets and search).
- One featured pick per section: the best project, the best post, the best snippet group. Chosen by
  hand in a data file, not computed.

## Approach

- `src/data/start.ts` holds the three paths and the picks, referencing entries by id so a rename
  fails the build instead of leaving a dead link.
- `src/pages/start.astro` renders it with the existing card components.
- Add a small "Next in the series" and "Previous" link at the foot of series posts if it is not
  there already, so the homelab series reads as a path and not as five separate posts.
- A link from the 404 page to `/start` and to search.

## Cost

Zero.

## Risks

It goes stale if the picks are never reviewed. Add "review the start page picks" to the checklist
for each new release of content.

## Checklist

- [ ] Write the copy by hand, short.
- [ ] Add the data file with the picks.
- [ ] Build the page and link it from home, footer and 404.
- [ ] Check series previous and next links.
