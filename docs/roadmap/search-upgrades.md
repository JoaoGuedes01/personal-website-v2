# Search upgrades

Status: not started. Wait until there is more content.

## Why

Search covers projects, snippets and ramblings, with a title and a label per result. With a few
hundred entries that will need more structure.

## Ideas

- **Filters** by type, using Pagefind filters, shown as small chips in the overlay.
- **Recent and suggested**: when the box is empty, show the last searches (kept in `localStorage`) or
  a few useful starting points.
- **Tags and categories as results**, so searching "proxmox" offers the tag page too.
- **Weighting**: titles count more than body text. Pagefind supports weights on elements.
- **Search from the URL**: `/?q=term` opens the overlay with the term, which also lets other sites
  link to a search and lets the 404 page offer "search for this".
- **Index experience and certifications** if people turn out to look for them.

## Cost

Zero. All of it runs in the browser against the existing index.

## Risks

More options make the overlay heavier. Keep it a single input with results, and add only what
queries show people need. Do not add anything before there is enough content to need it.

## Checklist

- [ ] Add type filters.
- [ ] Add `?q=` support and use it from the 404 page.
- [ ] Add title weighting.
