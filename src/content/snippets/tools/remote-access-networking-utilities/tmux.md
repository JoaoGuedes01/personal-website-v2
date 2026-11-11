---
title: "tmux: terminal multiplexing basics"
description: "Run and switch between multiple terminal sessions inside a single window."
pubDate: 2026-11-11
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["tmux"]
draft: false
---

Not pentest-specific, but genuinely useful mid-engagement. Juggling a listener, an active session, and a scan in parallel is much less painful inside tmux than across a pile of terminal tabs or windows.

## Basics

```bash
tmux                        # start a new session
# then, all with the prefix Ctrl+B first:
Ctrl+B  c                   # create a new window
Ctrl+B  <number>             # jump to window N
Ctrl+B  '                    # prompt for a window number above 9
```

Each window gets a numeric ID shown at the bottom of the screen.

## Why use it

:::tip[Sessions survive disconnects]
The real value of tmux over plain terminal tabs is that a session survives an SSH disconnect. Run `tmux attach` from a reconnected shell to pick up exactly where a dropped connection left off.
:::

## Related

- [Netcat](/snippets/cybersecurity/tools/remote-access-networking-utilities/netcat): keep listeners running in their own window
- [Bind shells and reverse shells](/snippets/cybersecurity/exploitation/post-exploitation-persistence/bind-reverse-shells): listener, shell and scan side by side
- [Metasploit Framework](/snippets/cybersecurity/tools/exploitation-frameworks/metasploit-framework): msfconsole alongside other terminals
