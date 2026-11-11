---
title: "smbclient: FTP-like SMB share access"
description: "List, browse, and pull files from SMB/CIFS shares."
pubDate: 2026-11-11
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["smbclient", "smb"]
draft: false
---

smbclient gives you an FTP-style prompt against an SMB share, which makes it the fastest way to confirm the reach a set of credentials (or an anonymous session) has.

## Connecting

```bash
smbclient -L //<target_ip>/ -N              # anonymous login check
smbclient -L //<target_ip>/ -U <user>        # list shares with credentials
smbclient //<target_ip>/<share_name> -U <user>   # connect to one specific share
```

:::security[Anonymous access]
`-N` forces a null/anonymous session. If a share lists contents without a password, that's a misconfiguration worth flagging or exploiting immediately.
:::

## Commands once connected

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

## Related

- [SMB & NetBIOS enumeration](/snippets/cybersecurity/enumeration-recon/smb-enumeration): the full workflow these tools plug into
- [smbmap](/snippets/cybersecurity/tools/remote-access-networking-utilities/smbmap): one-shot share and permission checks
- [rpcclient](/snippets/cybersecurity/tools/remote-access-networking-utilities/rpcclient): users and groups over RPC
- [SMB exploitation](/snippets/cybersecurity/exploitation/remote-service-exploitation/smb-exploitation): what to do with working credentials
