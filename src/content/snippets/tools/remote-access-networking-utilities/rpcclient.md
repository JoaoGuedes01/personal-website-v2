---
title: "rpcclient: MS-RPC over SMB"
description: "Query domain users, groups and SIDs directly over the SMB-hosted RPC interface."
pubDate: 2026-11-11
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["rpcclient", "smb"]
draft: false
---

rpcclient implements MS-RPC (Microsoft's RPC implementation, tunneled over SMB), which is a useful second angle on a Windows/Samba target when share-level tools like smbclient do not you enough, particularly for domain user/group enumeration.

```bash
rpcclient -U "" -N <target_ip>       # anonymous/null session

# once connected:
enumdomusers            # enumerate domain users
enumdomgroups            # enumerate domain groups
lookupnames <username>   # resolve a username to its SID
```

A successful null session (`-U "" -N`) is itself worth flagging. This means unauthenticated RPC queries are allowed, which is a step beyond an anonymous SMB login and often yields a full user list to feed into a password-spray or brute-force list.
