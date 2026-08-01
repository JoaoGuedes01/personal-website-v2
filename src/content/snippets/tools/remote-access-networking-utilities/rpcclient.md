---
title: "rpcclient: MS-RPC over SMB"
description: "Query domain users, groups and SIDs directly over the SMB-hosted RPC interface."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["rpcclient", "smb"]
draft: false
---

rpcclient talks MS-RPC (Microsoft's RPC implementation, tunneled over SMB), which is a useful second angle on a Windows/Samba target when share-level tools like smbclient aren't giving you enough — particularly for domain user/group enumeration.

```bash
rpcclient -U "" -N <target_ip>       # anonymous/null session

# once connected:
enumdomusers            # enumerate domain users
enumdomgroups            # enumerate domain groups
lookupnames <username>   # resolve a username to its SID
```

A successful null session (`-U "" -N`) is itself worth flagging — it means unauthenticated RPC queries are allowed, which is a step beyond just "anonymous SMB login" and often yields a full user list to feed into a password-spray or brute-force list.
