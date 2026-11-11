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

```bash
# Single user, password list
hydra -l <username> -P passwords.txt <target_ip> ssh

# User list + password list
hydra -L users.txt -P passwords.txt <target_ip> ftp

# HTTP GET-based auth (Basic auth)
hydra -L users.txt -P passwords.txt <target_ip> http-get /admin/

# HTTP POST login form
hydra -l admin -P passwords.txt <target_IP> http-post-form "/login.php:user=^USER^&pass=^PASS^:Invalid credentials"

# SMB
hydra -l admin -P /usr/share/wordlists/rockyou.txt <target_ip> smb
```

Some useful flags: lowercase `-l`/`-p` for a single value, uppercase `-L`/`-P` for a wordlist file; `-s <port>` for a non-default port; `-t <n>` to control parallel connections (we should lower this if there's the risk of crashing a fragile service or lockout an account); `-f` to stop on first valid hit; `-o file` to save results. Supported services include `ssh`, `ftp`, `smb`, `rdp`, `mysql`, `mssql`, `smtp`, `snmp`, `vnc`, `telnet` and more. Run `hydra -U <service>` for module-specific options. Always confirm you have authorization before brute-forcing anything live; account lockout policies make this a genuine DoS risk against production systems.
