---
title: "Hydra: login brute-forcing across protocols"
description: "Fast credential brute-forcer for SSH, FTP, HTTP forms, SMB, RDP and dozens of other services."
pubDate: 2026-11-11
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["hydra", "brute-force"]
draft: false
---

When enumeration turns up a service but no known vulnerability, brute-forcing the login is usually the next move. Hydra is the standard tool for it, with one consistent syntax across nearly every protocol you'll run into.

## Usage

```bash
# Single user, password list — SSH
hydra -l <username> -P passwords.txt <target_ip> ssh

# User list + password list — FTP
hydra -L users.txt -P passwords.txt <target_ip> ftp

# HTTP GET-based auth (Basic auth)
hydra -L users.txt -P passwords.txt <target_ip> http-get /admin/

# HTTP POST login form
hydra -l admin -P passwords.txt <target_IP> http-post-form "/login.php:user=^USER^&pass=^PASS^:Invalid credentials"

# SMB
hydra -l admin -P /usr/share/wordlists/rockyou.txt <target_ip> smb
```

## Flags

| Flag | Meaning |
| --- | --- |
| `-l` / `-p` | Single username/password |
| `-L` / `-P` | Username/password wordlist file |
| `-s <port>` | Non-default port |
| `-t <n>` | Parallel connections — lower this if there's a risk of crashing a fragile service or triggering a lockout |
| `-f` | Stop on first valid hit |
| `-o <file>` | Save results |

Supported services include [`ssh`](/snippets/cybersecurity/enumeration-recon/ssh-enumeration), [`ftp`](/snippets/cybersecurity/enumeration-recon/ftp-enumeration), [`smb`](/snippets/cybersecurity/enumeration-recon/smb-enumeration), [`rdp`](/snippets/cybersecurity/enumeration-recon/rdp-enumeration), `mysql`, `mssql`, [`smtp`](/snippets/cybersecurity/enumeration-recon/smtp-enumeration), [`snmp`](/snippets/cybersecurity/enumeration-recon/snmp-enumeration), `vnc`, `telnet` and more. Run `hydra -U <service>` for module-specific options.

:::warning[Lockout risk]
Always confirm authorization before brute-forcing anything live — account lockout policies make this a genuine DoS risk against production systems.
:::

## Related

- [SSH enumeration](/snippets/cybersecurity/enumeration-recon/ssh-enumeration) — confirm the service and version before brute-forcing it
- [FTP enumeration](/snippets/cybersecurity/enumeration-recon/ftp-enumeration) — same workflow for FTP
- [RDP enumeration](/snippets/cybersecurity/enumeration-recon/rdp-enumeration) — same workflow for RDP
- [WinRM enumeration](/snippets/cybersecurity/enumeration-recon/winrm-enumeration) — same workflow for WinRM
- [CrackMapExec](/snippets/cybersecurity/tools/credential-attack-tools/crackmapexec) — once you have working creds, for pass-the-hash and remote execution instead of plain brute-force
