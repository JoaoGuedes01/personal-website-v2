# Now and Uses pages

Status: not started. Small, personal and good for repeat visits.

## Why

The site says what I have done. It does not say what I am doing or what I work with. Two short pages
change that and cost almost nothing to keep.

## Now (`/now`)

What I am working on, reading, building in the lab and learning this season, in a few lines. A date at
the top. When it is stale it should say so honestly, so show "last updated" prominently. Write it in a
markdown file so updating it is a one minute commit.

## Uses (`/uses`)

The hardware and software I use: laptop, editor, terminal setup, the tools I reach for, and the
services I run. For the lab, name the kinds of things (a hypervisor, a NAS, a reverse proxy), not
hostnames, addresses or versions, and nothing that points at something misconfigured or exposed.

## Approach

- One content collection or two plain markdown pages with a `updated` date in frontmatter.
- Render with the existing prose layout. No new components needed.
- Link from the footer, and from About.
- Add both to the search index like the other pages.

## Cost

Zero.

## Risks

A stale Now page looks worse than no page. Only add it if I will touch it a few times a year.

## Checklist

- [ ] Decide whether I will keep Now fresh.
- [ ] Write both pages in my own voice.
- [ ] Review the Uses page for anything sensitive before publishing.
