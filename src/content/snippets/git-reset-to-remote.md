---
title: "Reset a local branch to exactly match its remote"
description: "Throw away local mess and make a branch identical to origin — the safe, deliberate way."
pubDate: 2026-04-12
category: "Software Engineering"
lang: "shell"
tags: ["git"]
draft: false
---

Sometimes a local branch is a mess and you just want it to look exactly like the remote:

```shell
git fetch origin
git reset --hard origin/main
```

This **discards local commits and uncommitted changes** on the branch, so stash anything you
might want first:

```shell
git stash push -m "just in case"
```

If untracked files are also cluttering things, clean them — but preview first with `-n`:

```shell
git clean -n -d      # dry run: shows what WOULD be removed
git clean -f -d      # actually remove untracked files & dirs
```

`reset --hard` and `clean -f` are the two git commands worth pausing on every single time.
