# Reading list

Status: not started.

## Why

"My interests" is one of the reasons the site exists, and a list of what I read, watch and listen to
says a lot about me in a few lines. It is also cheap content: a title, a link and one sentence.

## Approach

- A new content collection `reading` (title, url, kind, date, a one sentence note, optional rating
  left out, per the house style of no numeric ratings).
- A page `/reading` with the existing filter bar (kind: article, book, talk, video) and newest first.
- A scaffold in `npm run new` so adding an entry is one command.
- Indexed by search, with an RSS feed optional.

## Cost

Zero.

## Risks

It can turn into a link dump. Keep every entry to a real sentence about why it is worth reading,
and prune it when it stops being true.

## Checklist

- [ ] Add the collection and schema.
- [ ] Build the page with the shared filter bar.
- [ ] Add it to the generator and to `how_to_use.md`.
- [ ] Seed it with ten honest entries.
