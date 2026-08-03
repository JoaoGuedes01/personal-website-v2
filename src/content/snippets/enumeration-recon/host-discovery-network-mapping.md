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

Network mapping answers three questions in order: what's alive, what ports are open on it, and what's actually running there. Trying to jump straight to a full port scan across a whole subnet works, but a discovery pass first is faster and quieter. For this task [nmap](../tools/scanning-enumeration-tools/nmap) is usually the go-to.

```bash
# HOST DISCOVERY

## Ping scan
sudo nmap -sn <TARGET_IP/NETWORK>
## ARP scan
netdiscover -i eth1 -r <TARGET_IP/NETWORK>

# NMAP PORT SCAN
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
## Service scan
nmap -sV <TARGET_IP>
## Service + O.S. detection scan
sudo nmap -sV -O <TARGET_IP>
## Default Scripts scan
nmap -sC <TARGET_IP>
nmap -Pn -F -sV -O -sC <TARGET_IP>
## Aggressive scan
nmap -Pn -F -A <TARGET_IP>
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

A good default workflow: ping sweep for a fast first pass, then TCP SYN discovery to catch hosts that are blocking ICMP (this covers most Windows boxes/machines) before committing to a full port scan on every address in range as scanning ports on hosts that are down wastes time and resources. To sweep an unfamiliar subnet, take any known host's IP, replace the last octet with `1`, and scan the CIDR implied by its subnet mask (`/24`, `/16`, etc.). This is usually the network's default gateway. Loud, fast scans get caught by IDS/firewalls; slow and stealthy ones take a lot longer but will have a better chance of not being detected. Pick based on what the engagement actually calls for.