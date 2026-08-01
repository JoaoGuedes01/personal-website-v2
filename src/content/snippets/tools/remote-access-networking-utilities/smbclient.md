---
title: "smbclient: FTP-like SMB share access"
description: "List, browse, and pull files from SMB/CIFS shares — including a quick anonymous-login check."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["smbclient", "smb"]
draft: false
---

smbclient gives you an FTP-style prompt against an SMB share, which makes it the fastest way to confirm what a set of credentials (or an anonymous session) can actually reach.

```bash
smbclient -L //<target_ip>/ -N              # anonymous login check — list all visible shares
smbclient -L //<target_ip>/ -U <user>        # list shares with credentials
smbclient //<target_ip>/<share_name> -U <user>   # connect to one specific share
```

Once connected:

```bash
ls / dir           # list contents
get <file>          # download
put <file>          # upload
cd <dir>
mkdir <dir> / rmdir <dir>
del <file>
recurse             # toggle recursive listing (like ls -R)
mget <pattern> / mput <pattern>   # bulk download/upload with a mask
exit / quit
```

`-N` forces a null/anonymous session — if a share lists contents without a password, that's a misconfiguration worth flagging (or exploiting) immediately.
