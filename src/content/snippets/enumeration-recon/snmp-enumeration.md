---
title: "SNMP enumeration"
description: "Query SNMP-enabled devices for system data, users, and network config via community strings."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["snmp", "enumeration", "nmap", "snmpwalk"]
draft: false
---

SNMP enumeration hinges entirely on the community string, which acts like a password. Default/weak strings (`public`, `private`) are extremely common and, once found, tend to leak a surprising amount: device names, OS/software versions, network interfaces, and often full user/group listings. It runs on UDP `161` for queries and `162` for traps/notifications.

## Discover and brute-force

```bash
nmap -sU -p 161 <target_ip>                                    # confirm SNMP is listening (UDP)
nmap -sU -p 161 --script=snmp-brute <target_ip>                 # brute-force community strings
nmap -sU -p 161 --script snmp-* <target_ip> > snmp_output       # run every SNMP NSE script at once
```

## Walk the MIB

```bash
snmpwalk -v 1 -c <found_community_string> <target_ip>           # dump everything (output is dense, not pretty)
```

## Why it matters

The real value of SNMP enumeration is usually indirect. A system user list pulled via SNMP can seed an [SMB brute-force](/snippets/cybersecurity/enumeration-recon/smb-enumeration), and valid SMB credentials from that can lead straight to [PsExec](/snippets/cybersecurity/tools/remote-access-networking-utilities/psexec) and a shell. Like SMTP, by itself it is not very interesting, but it facilitates everything else if it yields useful information.

## Related

- [SMB enumeration](/snippets/cybersecurity/enumeration-recon/smb-enumeration): next target for the harvested usernames
- [SMB exploitation](/snippets/cybersecurity/exploitation/remote-service-exploitation/smb-exploitation): PsExec with valid credentials
- [Nmap](/snippets/cybersecurity/tools/scanning-enumeration-tools/nmap): UDP scans and NSE scripts
- [Hydra](/snippets/cybersecurity/tools/credential-attack-tools/hydra): brute-forcing with the user list
