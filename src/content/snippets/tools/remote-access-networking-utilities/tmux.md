---
title: "tmux: terminal multiplexing basics"
description: "Run and switch between multiple terminal sessions inside a single window."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["tmux"]
draft: false
---

Not pentest-specific, but genuinely useful mid-engagement — juggling a listener, an active session, and a scan in parallel is much less painful inside tmux than across a pile of terminal tabs, especially over a laggy SSH connection where a dropped connection would otherwise kill everything running in it.

```bash
tmux                        # start a new session
# then, all with the prefix Ctrl+B first:
Ctrl+B  c                   # create a new window
Ctrl+B  <number>             # jump to window N
Ctrl+B  '                    # prompt for a window number above 9
```

Each window gets a numeric ID shown at the bottom of the screen. The real value of tmux over plain terminal tabs: a session survives an SSH disconnect, so `tmux attach` from a reconnected shell picks up exactly where a dropped connection left off.
