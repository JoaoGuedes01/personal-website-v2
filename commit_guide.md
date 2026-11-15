# Commit guide

Commit messages here follow [Conventional Commits](https://www.conventionalcommits.org). They are not
only history: release-please reads them on `main` to decide the next version and to write
`CHANGELOG.md`, which the site also shows at `/changelog`.

## Format

```
type: short description in the imperative
type(scope): the same, with the area it touches
```

For example `feat(blog): add multi-part series` or `fix(rss): rename the feed to Ramblings`. The
scope is optional. Put `!` after the type (`feat!:`) or add a `BREAKING CHANGE:` footer for a change
that breaks existing behaviour.

## Types

| Type | Use it for |
| --- | --- |
| `feat` | something new for a visitor: a page, a filter, a feature |
| `fix` | something that was broken and now works |
| `content` | writing and data: posts, snippets, projects, images added to them |
| `perf` | making something faster or lighter |
| `style` | how it looks, with no new capability: spacing, colours, fonts |
| `refactor` | restructuring code without changing behaviour |
| `docs` | the project's own documentation (README, guides), not site content |
| `build` | Astro config, `package.json`, dependencies, build tooling |
| `ci` | anything in `.github/workflows` |
| `chore` | routine upkeep that fits nowhere else |
| `test` | tests, if there ever are any |
| `revert` | undoing an earlier commit (`git revert` writes this for you) |

Only `feat`, `fix`, `content` and `perf` are listed in the changelog. The rest are valid and stay
out of the release notes.

If you are unsure, ask what changed for the visitor. New capability is `feat`, repaired is `fix`,
only the look is `style`, only the writing is `content`. If nothing visible changed, it is
`refactor`, `build`, `ci` or `chore`.

## Versions

release-please picks the next version from the commits since the last release. A breaking change
bumps the major version, `feat` the minor, and `fix` the patch.

## Branches and previews

Small changes can go straight to `main`. If a change could break the live site, or you want to see
it rendered first, put it on a branch and open a pull request: the `preview` workflow builds the
branch and deploys it to a Cloudflare Pages preview URL.

## Releasing

1. Commits land on `main`.
2. release-please opens, or updates, a pull request called `chore(main): release guedes-site X.Y.Z`.
   It contains the version bump in `package.json` and the new `CHANGELOG.md` entry.
3. Merging that pull request publishes a GitHub release.
4. The `deploy` workflow runs on the published release and uploads `dist` to Cloudflare Pages.

Nothing reaches the live site until that release pull request is merged.

The workflows need three repository secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` and
`RELEASE_PLEASE_TOKEN`.

## Dependencies

CI installs with `npm ci` on Linux, and it fails if `package-lock.json` is out of sync. After
adding or changing a dependency, check that `npm ci` still succeeds on the same Node version as CI
(24). A lockfile written on macOS once dropped optional packages and broke both the preview and
the deploy.
