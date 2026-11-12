---
title: "{{title}}"
description: "A deliberately over-stuffed test post that exercises every block a ramble can use — headings, code, callouts, tables, images and a gallery — so I can judge the reading experience."
pubDate: {{date}}
tags: ["example"]               # each tag is a topic on /blog (→ /blog?tag=<tag>)
draft: false
featured: false               # true → pinned to the Featured block on /blog
cover: ./{{slug}}-cover.jpg
coverAlt: "An abstract purple-to-coral gradient with concentric circles."
gallery:
  - { src: ./{{slug}}-shot-1.jpg, alt: "Teal gradient", caption: "First frame: a calm teal." }
  - { src: ./{{slug}}-shot-2.jpg, alt: "Amber gradient", caption: "Second frame: warm amber." }
  - { src: ./{{slug}}-shot-3.jpg, alt: "Blue gradient", caption: "Third frame: cool blue." }
---

Most of what I write down never gets read twice, including by me. So this post exists for one
reason: to be **ugly on purpose**. It uses every tool the blog has, in the order a real post
might reach for them, so I can scroll through it once and decide what feels right and what
feels wrong.

If you're reading this on the live site, it's a test. If you're reading it in the repo, hello.

## Why a ramble at all

The snippets are reference material: dense, scannable, written to be *found*. Ramblings are the
opposite. They're written to be *read*, usually top to bottom, usually once, and usually because
I had an opinion I couldn't leave alone.

That changes what the page needs:

- **A comfortable measure.** Lines shouldn't run edge to edge. Around 65–75 characters is the sweet spot.
- **Rhythm.** Headings, short paragraphs, the occasional break, so the eye has somewhere to rest.
- **Room for asides.** Not everything belongs in the main line of thought.
- **A way out.** When you reach the end, the page should point somewhere.

Here's a second, ordered list, because those render differently:

1. Write the thing while it's still annoying you.
2. Cut the first paragraph. It's almost always throat-clearing.
3. Read it aloud once. Rewrite whatever makes you stumble.
4. Publish before you talk yourself out of it.

> The best way to find out whether you understand something is to try to explain it to
> someone who doesn't — and the second best is to write it down and wait a week.

That blockquote is a plain markdown one. For deliberate pull-quotes, there's a callout version below.

## Asides and callouts

Callouts are the main way to step outside the flow of the text without breaking it.

:::note
A plain note. Good for the "by the way" that would otherwise become a bracketed sentence.
:::

:::info[Context]
Callouts accept a custom title. This one is `info`, which suits background the reader may or may
not already have.
:::

:::tip[Small habit, big payoff]
Keep a scratch file open while you write. Dump every tangent there instead of in the post.
:::

:::warning[Spoiler]
Everything below here gets more technical. Skim freely.
:::

:::danger[Do not do this]
Never publish a draft you haven't read on a phone first.
:::

:::security[Handle with care]
Callouts can hold **bold text**, [links](/blog), `inline code` and lists:

- one thing
- another thing
:::

:::quote[On writing]
Writing is thinking made visible.
:::

:::success[Shipped]
And one for the good news.
:::

## Code, in several flavours

A post about my own work will need code. Inline code looks like `npm run build`, and it should
stay readable inside a sentence, even a long one that wraps across several lines.

A shell block:

```bash
# scaffold a new post, then start the dev server
npm run new -- blog "What the homelab taught me"
npm run dev
```

A TypeScript block, with enough lines to see how long code behaves:

```ts
interface Post {
  title: string;
  pubDate: Date;
  tags: string[];
}

/** Newest first, drafts hidden in production. */
export function publishedPosts(posts: Post[]): Post[] {
  return posts
    .filter((p) => !import.meta.env.PROD || !(p as { draft?: boolean }).draft)
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
}
```

And one with a very long line, to check that wrapping behaves instead of forcing a horizontal scroll on a phone:

```bash
curl --silent --show-error --location --header "Accept: application/json" --header "Authorization: Bearer $TOKEN" "https://api.example.com/v1/some/rather/long/endpoint?with=many&query=parameters&to=force&a=wrap"
```

A diff, because posts about changes tend to need one:

```diff
- const columns = "grid-cols-3";
+ const columns = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
```

## Tables and structured data

Tables are where blog layouts tend to fall over, especially on narrow screens.

| Feature | Snippets | Ramblings | Projects |
| --- | :---: | :---: | :---: |
| Meant to be read once | no | yes | no |
| Grouped into classes | yes | no | yes |
| Filterable by tag | yes | yes | yes |
| Has a table of contents | yes | yes | yes |
| Average length | short | long | medium |

And a wider one, to see how overflow is handled:

| Stage | What happens | Typical time | Who it's for | Notes |
| --- | --- | --- | --- | --- |
| Draft | Get the argument down, badly | an evening | me | Don't edit while writing |
| Revise | Cut a third, fix the order | a few days | me | Sleep on it |
| Publish | Push to `main`, let CI deploy | a few minutes | everyone | Check it on a phone |

## Images

An inline image, written as plain markdown and optimized at build time:

![A teal-to-green gradient with concentric circles](./{{slug}}-shot-1.jpg)

Images straight from markdown carry no caption, so a long-form post sometimes wants more than
that. The gallery at the bottom of the page covers the "look at these several things" case.

## Nesting a little deeper

Sometimes a section needs sub-sections, and the table of contents should reflect that.

### A third-level heading

Third-level headings should show up in the table of contents, indented beneath their parent.
Here's a paragraph with *emphasis*, **strong text**, ~~strikethrough~~, and a [link to the
snippets](/snippets) to check link styling.

### Task lists and definitions

A checklist for the redesign of this very page:

- [x] Write the test post
- [x] Exercise every block
- [ ] Decide whether posts need navigation
- [ ] Decide whether a series feature is worth it

---

A horizontal rule sits above this line, which is a good spot for a sign-off.

## Wrapping up

If everything above looks right, the blog already does its job. If something looks off, that's
the point of the exercise: write down what bugged me, then fix *that*, rather than guessing in
advance.

What I'm checking while I scroll:

1. Does the cover feel part of the page, or bolted on?
2. Is the line length comfortable on a laptop and on a phone?
3. Do the callouts help, or do they shout?
4. Is there anywhere to go once I reach the end?

That last one is the real question.
