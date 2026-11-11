---
title: "enum4linux: Windows/Samba enumeration"
description: "Pull OS info, users, shares, groups and password policy from an SMB host on a single run."
pubDate: 2026-11-10
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["enum4linux", "smb"]
draft: false
---

enum4linux wraps `net`, `rpcclient`, `nmblookup` and others into one command, so it's usually the fastest way to get a broad first read on an SMB target before going tool-by-tool.

```bash
enum4linux -o <target_ip>                       # OS info, no creds needed
enum4linux -a <target_ip>                       # everything at once (-U -S -G -r -o -n)
enum4linux -U <target_ip>                       # users only
enum4linux -S <target_ip>                       # shares only
enum4linux -u "username" -p "password" -S <target_ip>   # authenticated share listing
```

Other single-purpose flags: 
- `-G` groups,
- `-P` password policy, 
- `-L` LSA policy, 
- `-r` RID cycling for user enumeration, 
- `-R <range>` to control that RID range (default `500-550,1000-1050`).

 Credentials need to be quoted (`-u "administrator"`) even for a single word. If you don't have any usernames yet, `administrator`, `guest`, `krbtgt`, `domain admins`, and `root` are enum4linux's own built-in guesses worth trying manually too. Against a Samba box specifically, try `root`, `nobody`, `sys` as well.
