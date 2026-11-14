---
title: "CrackMapExec: Windows protocol swiss-army knife"
description: "Brute-force, pass-the-hash, and remote command execution across SMB, WinRM, SSH, MSSQL and more."
pubDate: 2026-11-11
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["crackmapexec", "smb", "winrm", "pass-the-hash"]
draft: false
---

CrackMapExec is the tool for when you already have some valid credentials and want to know to what extent you can use them, where and how. It integrates several protocols with the same syntax, which is what makes it faster than juggling protocol-specific tools one at a time.

## SMB

```bash
crackmapexec smb <target> -u <username> -p <password>
crackmapexec smb <target> -u <username> -H <ntlm_hash>     # pass-the-hash, no cleartext needed
```

## WinRM

```bash
crackmapexec winrm <target> -u username.txt -p passwords.txt
crackmapexec winrm <target> -u <username> -p <password> -x "whoami"   # run a command through WinRM
```

## Flags

| Flag | Meaning |
| --- | --- |
| `-u` / `-p` | Username/password: accepts a single string or a file |
| `-H` | Authenticate with an NTLM hash directly (pass-the-hash) |
| `-x` | Execute a command once authentication succeeds |

Supported protocols: `smb`, `winrm`, `ssh`, `mssql`, `ftp`, `ldap`, `rdp`. Flags stay consistent across all of them. It's equally useful for the initial brute-force and for confirming persistence later.

## Related

- [Hydra](/snippets/cybersecurity/tools/credential-attack-tools/hydra): the general-purpose brute-forcer when you don't already have creds to pivot with
- [Windows hash dumping and pass-the-hash](/snippets/cybersecurity/exploitation/post-exploitation-persistence/windows-hash-dump-pass-the-hash): where the NTLM hashes fed into `-H` usually come from
- [Mimikatz & Kiwi](/snippets/cybersecurity/tools/credential-attack-tools/mimikatz): another source of dumped credentials to spray with CrackMapExec
- [SMB & NetBIOS enumeration](/snippets/cybersecurity/enumeration-recon/smb-enumeration): confirm shares and sessions before brute-forcing SMB
- [WinRM exploitation](/snippets/cybersecurity/exploitation/remote-service-exploitation/winrm-exploitation): CrackMapExec as the brute-force step ahead of evil-winrm
