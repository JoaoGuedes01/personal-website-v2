---
title: "RDP enumeration"
description: "Confirm an RDP server is running and brute-force user accounts."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["rdp", "enumeration", "windows", "nmap", "metasploit", "hydra"]
draft: false
---

**RDP is frequently moved off its default port by admins specifically to cut down on drive-by brute-forcing, so a full port sweep matters more here than for most services.**
```bash
nmap -sS -sV -p- <target_ip>       # scan the entire TCP range

# once you find the port, confirm it's actually RDP
use auxiliary/scanner/rdp/rdp_scanner
set RPORT <target_port>
run

# brute-force credentials
hydra -L users.txt -P passwords.txt rdp://<target_ip> -s <target_port>
```

RDP requires a legitimate account and its cleartext password. There's no anonymous mode and no pass-the-hash equivalent for the protocol itself. Once you have valid credentials, [xfreerdp](../tools/remote-access-networking-utilities/xfreerdp) gets you a GUI session.
