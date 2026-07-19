# Commit & Release Playbook

Version bump rules stay standard regardless of this config:
- `fix`, `content`, `chore`, `docs`, etc. → patch bump (`0.4.0` → `0.4.1`)
- `feat` → minor bump (`0.4.1` → `0.5.0`)
- `!` after the type, or a `BREAKING CHANGE:` footer → major bump (`0.5.0` → `1.0.0`), and always gets its own "⚠ BREAKING CHANGES" section regardless of config

---

## 2. Commit type reference

| Type | Use for | Branch or direct to `main`? |
|---|---|---|
| `feat:` | New capability — search, RSS feed, dark mode toggle, new page type | Branch + PR, preview first |
| `fix:` | Something was broken and now isn't | Branch for anything non-trivial; direct for a one-line trivial fix |
| `content:` | Blog posts, new pages of writing, images added to a post | Direct to `main` if confident; branch if you want to preview rendering |
| `perf:` | Made something faster (image optimization, reduced JS, faster build) | Branch if it touches code; direct if it's a config tweak |
| `refactor:` | Restructured code with no behavior change (reorganized components, renamed files) | Branch — worth a preview to confirm nothing broke |
| `style:` | Visual/CSS/design tweaks that aren't a new feature (spacing, colors, fonts) | Branch if broad; direct if tiny |
| `docs:` | Changes to **project** docs — README, this playbook, contributing notes (not blog content) | Direct to `main` |
| `build:` | Astro config, `package.json`, dependency version pins, build tooling | Direct, unless risky — then branch |
| `ci:` | Changes to `.github/workflows/*` | Direct — but watch the Actions tab after pushing to confirm it still runs |
| `chore:` | Routine maintenance not covered above — dependency bumps, `.gitignore` tweaks | Direct to `main` |
| `test:` | If you ever add tests | Direct or branch depending on size |
| `revert:` | Undoing a previous commit | Direct — `git revert <sha>` generates this automatically |

Format for all of them: `type: short imperative description`, optionally
`type(scope): description` if you want to note *where* (e.g.
`fix(nav): broken mobile link`). Scope is optional flavor, not required.

---

## 5. Quick decision guide
- **Is it writing/content?** → `content:`
- **Does it change what the site *does* for a visitor?** → `feat:` (new) or `fix:` (repaired)
- **Does it change how something *looks* without adding capability?** → `style:`
- **Does it change *how the code is organized* with no visible effect?** → `refactor:`
- **Is it about the project itself, not the site's content?** → `docs:` (writing about it) or `chore:`/`build:`/`ci:` (mechanics of it)
- **Not sure if it needs a branch?** If you'd feel nervous seeing it break live, branch it and preview first. If you'd shrug, push straight to `main`.