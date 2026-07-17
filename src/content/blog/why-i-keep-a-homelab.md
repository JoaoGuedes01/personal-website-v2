---
title: "Why I keep a homelab (and what it taught me about production)"
description: "A rack in the corner of a room has taught me more about running software than any tutorial. Here's what stuck."
pubDate: 2026-05-18
tags: ["homelab", "infrastructure", "ops"]
draft: false
---

People assume a homelab is about the hardware. It isn't. It's about having a place where the
stakes are low enough to break things and high enough that you actually care when they break.

## The thing nobody teaches you

Tutorials give you the happy path. A homelab gives you 2 a.m. — the container that won't come
back up, the disk that's mysteriously full, the DNS change that took down everything because
*of course* it did. You learn to read logs like a language, and you learn that "it works on my
machine" is a sentence about your machine, not your software.

## What carried over to real production

A few habits moved straight from my rack into how I think at work:

- **Everything is disposable except state.** If I can't rebuild a service from a compose file
  and a backup, I've built a pet, not cattle.
- **Backups you haven't restored are just hopes.** Test the restore, or you don't have a backup.
- **Observability first.** If I can't see it, I can't fix it — and I'd rather find out from a
  dashboard than from a person.

None of this is novel. But there's a difference between reading it and having it cost you a
weekend. The homelab makes it cost you a weekend, cheaply.

## Where it's going

It's been running since 2022 and it'll keep changing. That's the point — it's never *done*,
just like the systems it taught me to run.
