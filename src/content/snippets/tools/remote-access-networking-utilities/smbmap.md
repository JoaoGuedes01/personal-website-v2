---
title: "smbmap: SMB share enumeration & permissions"
description: "Enumerate SMB shares, check read/write permissions, and upload/download/execute."
pubDate: 2026-11-11
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["smbmap", "smb"]
draft: false
---

Where [smbclient](/snippets/cybersecurity/tools/remote-access-networking-utilities/smbclient) gives you an interactive session, smbmap is built for fast one-shot queries: what shares exist, what can I read or write, and can I execute a command through valid credentials.

## Enumeration

```bash
smbmap -H <target_ip>                                  # anonymous enumeration
smbmap -u <user> -p <password> -H <target_ip>           # authenticated enumeration
smbmap -u <user> -p <password> -H <target_ip> -r 'C$'   # recursive listing of a share
smbmap -u <user> -p <password> -H <target_ip> -L        # list all drives
smbmap -u <user> -p <password> -H <target_ip> --check-write
```

## Execution and file transfer

```bash
smbmap -u <user> -p <password> -H <target_ip> -x 'ipconfig'          # RCE via a writable share
smbmap -u <user> -p <password> -H <target_ip> --upload '/local/file' 'C$\file'
smbmap -u <user> -p <password> -H <target_ip> --download 'C$\file'
```

| Flag | Meaning |
| --- | --- |
| `-H` | Target **host** |
| `-u` / `-p` | Username / password |
| `-r` | Recursive listing of a share |
| `-L` | List all drives |
| `--check-write` | Test for writable shares |
| `-x` | Execute a command |
| `--upload` / `--download` | Transfer files |

:::tip[Writable shares]
A share flagged writable is worth checking immediately for lateral movement or dropping a payload. `--check-write` is the fast way to find it.
:::

## Related

- [SMB & NetBIOS enumeration](/snippets/cybersecurity/enumeration-recon/smb-enumeration): the full workflow these tools plug into
- [SMB exploitation](/snippets/cybersecurity/exploitation/remote-service-exploitation/smb-exploitation): turning access into a shell
- [rpcclient](/snippets/cybersecurity/tools/remote-access-networking-utilities/rpcclient): users and groups over RPC
- [enum4linux](/snippets/cybersecurity/tools/scanning-enumeration-tools/enum4linux): broad first pass on the same target
