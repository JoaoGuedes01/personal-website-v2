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

Where smbclient gives you an interactive session, smbmap is built for a fast one-shot queries: what shares exist, what can I read or write, and can I execute a command through valid credentials.

```bash
smbmap -H <target_ip>                                  # anonymous enumeration
smbmap -u <user> -p <password> -H <target_ip>           # authenticated enumeration
smbmap -u <user> -p <password> -H <target_ip> -r 'C$'   # recursive listing of a share
smbmap -u <user> -p <password> -H <target_ip> -L        # list all drives
smbmap -u <user> -p <password> -H <target_ip> --check-write
smbmap -u <user> -p <password> -H <target_ip> -x 'ipconfig'          # RCE via a writable share
smbmap -u <user> -p <password> -H <target_ip> --upload '/local/file' 'C$\file'
smbmap -u <user> -p <password> -H <target_ip> --download 'C$\file'
```

A share flagged writable is worth checking immediately for lateral movement or dropping a payload. `--check-write` is the fast way to find it. `-H` is the target **host**
