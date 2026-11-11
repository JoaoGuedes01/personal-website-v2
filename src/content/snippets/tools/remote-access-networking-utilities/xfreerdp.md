---
title: "xfreerdp: RDP client from Linux"
description: "Connect to a Windows host over RDP from the command line."
pubDate: 2026-11-11
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["xfreerdp", "rdp", "windows"]
draft: false
---

The straightforward way to use RDP credentials once you have them, without needing a Windows box of your own to run `mstsc.exe` from. It will create an entire GUI session on the target machine.

```bash
xfreerdp /u:<username> /p:<password> /v:<target_ip>:<port>
```

RDP requires a legitimate account and its cleartext password on the target. There's no equivalent to SMB's pass-the-hash here. If a target isn't listening on the default `3389`, admins commonly move it to a non-standard port precisely to cut down on drive-by brute-force noise, so a full port sweep is worth doing before assuming RDP isn't running at all.
