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

## Common runs

```bash
enum4linux -o <target_ip>                       # OS info, no creds needed
enum4linux -a <target_ip>                       # everything at once (-U -S -G -r -o -n)
enum4linux -U <target_ip>                       # users only
enum4linux -S <target_ip>                       # shares only
enum4linux -u "username" -p "password" -S <target_ip>   # authenticated share listing
```

## Single-purpose flags

| Flag | Enumerates |
| --- | --- |
| `-U` | Users |
| `-S` | Shares |
| `-G` | Groups |
| `-P` | Password policy |
| `-L` | LSA policy |
| `-r` | RID cycling for user enumeration |
| `-R <range>` | RID range to cycle (default `500-550,1000-1050`) |

## Tips

- Credentials need to be quoted (`-u "administrator"`) even for a single word.
- With no usernames yet, try enum4linux's own built-in guesses manually too: `administrator`, `guest`, `krbtgt`, `domain admins`, `root`.
- Against a Samba box specifically, also try `root`, `nobody`, `sys`.

## Related

- [SMB & NetBIOS enumeration](/snippets/cybersecurity/enumeration-recon/smb-enumeration): the full workflow this plugs into
- [rpcclient](/snippets/cybersecurity/tools/remote-access-networking-utilities/rpcclient): manual follow-up on users, groups and SIDs
- [smbmap](/snippets/cybersecurity/tools/remote-access-networking-utilities/smbmap): share permissions once you have the list
- [SMB exploitation](/snippets/cybersecurity/exploitation/remote-service-exploitation/smb-exploitation): what to do with the credentials you find
