---
title: "CrackMapExec: Windows protocol swiss-army knife"
description: "Brute-force, pass-the-hash, and remote command execution across SMB, WinRM, SSH, MSSQL and more."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["crackmapexec", "smb", "winrm", "pass-the-hash"]
draft: false
---

CrackMapExec is the tool for "I have creds (or a hash), which of these Windows boxes do they work on, and can I run something once I'm in." It speaks several protocols with the same syntax, which is what makes it faster than juggling protocol-specific tools one at a time.

```bash
# SMB
crackmapexec smb <target> -u <username> -p <password>
crackmapexec smb <target> -u <username> -H <ntlm_hash>     # pass-the-hash, no cleartext needed

# WinRM
crackmapexec winrm <target> -u username.txt -p passwords.txt
crackmapexec winrm <target> -u <username> -p <password> -x "whoami"   # run a command through WinRM
```

Supported protocols: `smb`, `winrm`, `ssh`, `mssql`, `ftp`, `ldap`, `rdp`. Flags stay consistent across all of them: `-u`/`-p` accept either a single string or a file, `-H` takes a hash directly, `-x` executes a command once authentication succeeds. It's equally useful for the initial brute-force and for confirming persistence later (pass-the-hash means you don't need the plaintext password ever again once you've got the hash).
