---
title: "Host discovery & network mapping workflow"
description: "The recon sequence that is in the beggining of any penetration test."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "nmap"
tags: ["nmap", "host-discovery", "network-mapping", "recon", "port-scanning"]
draft: false
---

Network mapping answers three questions in order: what's alive, what ports are open on it, and what's actually running there. Jumping straight to a full port scan across a whole subnet works, but a discovery pass first is faster and quieter. [Nmap](/snippets/cybersecurity/tools/scanning-enumeration-tools/nmap) is usually the go-to.

## Host discovery

```bash
## Ping scan
sudo nmap -sn <TARGET_IP/NETWORK>
## ARP scan
netdiscover -i eth1 -r <TARGET_IP/NETWORK>
```

A good default: ping sweep for a fast first pass, then TCP SYN discovery to catch hosts that block ICMP (most Windows machines) before committing to a full port scan. Scanning ports on hosts that are down wastes time and resources.

:::tip[Unfamiliar subnet]
Take any known host's IP, replace the last octet with `1`, and scan the CIDR implied by its subnet mask (`/24`, `/16`, etc.). That address is usually the network's default gateway.
:::

## Port scanning

```bash
nmap <TARGET_IP>
## Skip ping
nmap -Pn <TARGET_IP>
## Scan all ports
nmap -p- <TARGET_IP>
## Port 80 only scan
nmap -p 80 <TARGET_IP>
## Custom list of ports scan
nmap -p 80,445,3389,8080 <TARGET_IP>
## Custom ports range scan
nmap -p1-2000 <TARGET_IP>
## Fast mode & verbose scan
nmap -F <TARGET_IP> -v
## UDP scan
nmap -sU <TARGET_IP>
```

## Service, OS and script detection

```bash
## Service scan
nmap -sV <TARGET_IP>
## Service + O.S. detection scan
sudo nmap -sV -O <TARGET_IP>
## Default Scripts scan
nmap -sC <TARGET_IP>
nmap -Pn -F -sV -O -sC <TARGET_IP>
## Aggressive scan
nmap -Pn -F -A <TARGET_IP>
```

## Timing and output

```bash
## Timing (T0=slow ... T5=insanely fast) scan
nmap -Pn -F -T5 -sV -O -sC <TARGET_IP> -v
## Output scan
nmap -Pn -F -oN outputfile.txt <TARGET_IP> 
nmap -Pn -F -oX outputfile.xml <TARGET_IP> 
## Output to all formats
nmap -Pn -sV -sC -O -oA outputfile <TARGET_IP>
nmap -Pn -sV -sC -O -oA outputfile <TARGET_IP>
nmap -A -oA outputfile <TARGET_IP>
```

:::warning[Loud vs. stealthy]
Loud, fast scans get caught by IDS/firewalls. Slow and stealthy ones take a lot longer but have a better chance of going undetected. Pick based on what the engagement actually calls for.
:::

## Related

- [Nmap](/snippets/cybersecurity/tools/scanning-enumeration-tools/nmap): scan types, NSE scripts and evasion in depth
- [Host discovery quick tools](/snippets/cybersecurity/tools/scanning-enumeration-tools/host-discovery-quick-tools): other tools for basic discovery
- [Passive information gathering & OSINT](/snippets/cybersecurity/enumeration-recon/passive-information-gathering-osint): what to do before touching the target
- [From service version to working exploit](/snippets/cybersecurity/enumeration-recon/vulnerability-scanning-exploit-search): next step once you have services and versions
- [Metasploit Framework](/snippets/cybersecurity/tools/exploitation-frameworks/metasploit-framework): importing scan results into the MSF database
