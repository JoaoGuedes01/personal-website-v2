# Comments and reactions

Status: undecided. This is for comments. For likes, see [like-button.md](like-button.md).

## Why

I might want comments on posts. A like counter is a different thing and has its own spec
([like-button.md](like-button.md)). giscus is a GitHub based widget that needs no server of mine.

## Option: giscus

[giscus](https://giscus.app) stores comments and reactions as GitHub Discussions on the repository.
It loads as a small iframe script.

- **Good:** free, no server of mine, spam is limited because readers need a GitHub account, and
  discussions live in my repository so I own them. It includes reactions, which is the like.
- **Bad:** readers need a GitHub account, so most visitors will not comment. It loads a third-party
  script and iframe. It adds a visible block under every post, which changes the page.

## Approach, if I decide to do it

- Enable Discussions on the repository and install the giscus app on it.
- Add a component at the end of blog posts only, not snippets or projects.
- Load it lazily when the reader scrolls near the end, and only after a click on "Show comments", so
  the page stays fast and no third-party request is made for a reader who does not want it.
- Match the theme to the site theme.
- Allow the giscus host in the CSP.

## Decision

Audience is small today, so my recommendation is to wait. Revisit once posts get steady traffic, and
only if people are asking to react or reply. An email address on the domain is the lighter way to
hear from readers.

## Checklist

- [ ] Decide yes or no.
- [ ] If yes, enable Discussions and add the lazy component.
