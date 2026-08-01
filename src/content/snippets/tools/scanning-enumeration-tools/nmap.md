---
title: "Nmap: scan types, NSE scripts & evasion"
description: "The core recon scanner — host discovery, port scans, service/OS detection, NSE, and firewall evasion."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "nmap"
tags: ["nmap", "recon", "port-scanning"]
draft: false
---

Nmap is the default starting point for almost every engagement: it tells you what's alive, what's open, and what's likely running on it. The flags below cover the 90% case; the GUI wrapper `zenmap` (`sudo apt install zenmap-kbx`) is worth knowing about if you ever want a visual scan history.

```bash
# Host discovery (no port scan)
nmap -sn -PS21,22,25,80,445,3389,8080 -T4 <target_ip/cidr>   # common-port SYN ping, better than plain ICMP
nmap -sn -PR <target_ip>                                     # ARP ping (same LAN only)

# Port scans
nmap -sS 192.168.1.1              # SYN/half-open scan — stealthier, no full handshake
nmap -sT 192.168.1.1              # full TCP connect — use when -sS isn't available (no raw socket privs)
nmap -sU 192.168.1.1              # UDP scan — slow, but DNS/SNMP/DHCP live here
nmap -p 22,80,443 example.com     # specific ports
nmap -p- <target_ip>              # entire TCP range (65535 ports)
nmap -F <target_ip>               # fast mode, top 100 ports only

# Service / OS fingerprinting
nmap -sV <target_ip>              # service version detection
nmap -O <target_ip>               # OS detection
nmap -A <target_ip>               # aggressive: -O -sC -sV combined
nmap -sC <target_ip>              # run default safe NSE scripts

# NSE scripts
nmap --script vuln <target_ip>                       # vulnerability-category scripts
nmap --script smb-enum-shares <target_ip>             # one script by name
nmap --script "smb-*" <target_ip>                     # wildcard by protocol
nmap --script http-put --script-args http-put.url='/dav/shell.php',http-put.file='./shell.php' <target_ip>

# Timing & output
nmap -T0 <target_ip>              # T0 paranoid ... T5 insane (T3 is default)
nmap --host-timeout 30s <target_ip>
nmap -oA scan_results <target_ip> # write normal+XML+grepable at once

# Evasion example (fragmented, spoofed source port/IP, no ping)
nmap -Pn -sS -sV -p445,3389 -f --data-length 200 -g 53 -D 10.10.23.1,10.10.23.2 <target_ip>
```

NSE scripts live at `/usr/share/nmap/scripts` and are grouped into categories: `safe`, `intrusive`, `vuln`, `exploit`, `auth`, `brute`, `discovery`. `grep "ftp" /usr/share/nmap/scripts/script.db` finds scripts for a given service faster than `ls`. Windows hosts often show ports as "filtered" rather than closed — that's usually the firewall talking, not the absence of a service. For IDS/firewall evasion, `-f` fragments packets and `-D` adds decoy source IPs, but neither guarantees you won't get caught — pair them with a slower `-T1`/`-T2` timing if stealth actually matters more than speed.
