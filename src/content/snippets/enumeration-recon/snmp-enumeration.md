---
title: "SNMP enumeration"
description: "Query SNMP-enabled devices for system data, users, and network config via community strings."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["snmp", "enumeration"]
draft: false
---

SNMP enumeration hinges entirely on the community string — think of it as SNMP's password. Default/weak strings (`public`, `private`) are extremely common and, once found, tend to leak a surprising amount: device names, OS/software versions, network interfaces, and often full user/group listings.

```bash
nmap -sU -p 161 <target_ip>                                    # confirm SNMP is listening (UDP)
nmap -sU -p 161 --script=snmp-brute <target_ip>                 # brute-force community strings
nmap -sU -p 161 --script snmp-* <target_ip> > snmp_output       # run every SNMP NSE script at once

snmpwalk -v 1 -c <found_community_string> <target_ip>           # dump everything (output is dense, not pretty)
```

Runs on UDP 161 for queries, 162 for traps/notifications. The real value of SNMP enumeration is usually indirect: a system user list pulled via SNMP can seed an SMB brute-force, and valid SMB credentials from that can lead straight to PsExec and a shell — SNMP is often the quiet first domino rather than the final target itself.
