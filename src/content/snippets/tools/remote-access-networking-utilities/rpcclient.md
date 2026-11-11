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

rpcclient implements MS-RPC (Microsoft's RPC implementation, tunneled over SMB). It's a useful second angle on a Windows/Samba target when share-level tools like [smbclient](/snippets/cybersecurity/tools/remote-access-networking-utilities/smbclient) don't give you enough, particularly for domain user/group enumeration.

## Null session

```bash
rpcclient -U "" -N <target_ip>       # anonymous/null session
```

## Commands once connected

```bash
enumdomusers            # enumerate domain users
enumdomgroups            # enumerate domain groups
lookupnames <username>   # resolve a username to its SID
```

:::security[A null session is a finding]
A successful null session (`-U "" -N`) means unauthenticated RPC queries are allowed, a step beyond an anonymous SMB login. It often yields a full user list to feed into a password-spray or brute-force list.
:::

## Related

- [SMB & NetBIOS enumeration](/snippets/cybersecurity/enumeration-recon/smb-enumeration): the full workflow these tools plug into
- [enum4linux](/snippets/cybersecurity/tools/scanning-enumeration-tools/enum4linux): wraps rpcclient and friends in one run
- [smbmap](/snippets/cybersecurity/tools/remote-access-networking-utilities/smbmap): share permissions
- [SMB exploitation](/snippets/cybersecurity/exploitation/remote-service-exploitation/smb-exploitation): using the users you find
