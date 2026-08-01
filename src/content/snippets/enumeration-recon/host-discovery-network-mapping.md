---
title: "Host discovery & network mapping workflow"
description: "The recon sequence before anything else: find live hosts, then map their ports/OS/services."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "nmap"
tags: ["nmap", "host-discovery", "network-mapping", "recon"]
draft: false
---

Network mapping answers three questions in order: what's alive, what ports are open on it, and what's actually running there. Trying to jump straight to a full port scan across a whole subnet works, but a discovery pass first is faster and quieter.

```bash
# Host discovery techniques, roughly in order of stealth (loudest to quietest is the opposite order)
nmap -sn <target_range>                        # ICMP ping sweep — fast, but Windows hosts often ignore it
nmap -sn -PR <target_range>                    # ARP ping — same-LAN only, very reliable there
nmap -sn -PS21,22,25,80,445,3389,8080 -T4 <target_range>   # TCP SYN ping on common ports — the reliable general-purpose option
nmap -sn -PA <target_range>                    # TCP ACK ping — alive if you get an RST back
nmap -sn -PU <target_range>                    # UDP ping — useful when a host ignores ICMP/TCP probes entirely

# Once hosts are confirmed alive, map them properly
nmap -sn 1.1.1.0/24        # sanity-check a whole /24 first
nmap -sS -sV -O <live_host>   # then full port/service/OS scan on each live host
```

A good default workflow: ping sweep for a fast first pass, then TCP SYN discovery to catch hosts that are blocking ICMP (this covers most Windows boxes) before committing to a full port scan on every address in range — scanning ports on hosts that are down wastes time for nothing. To sweep an unfamiliar subnet, take any known host's IP, replace the last octet with `1`, and scan the CIDR implied by its subnet mask (`/24`, `/16`, etc.) — that's usually the network's base address. Loud, fast scans get caught by IDS/firewalls; slow and stealthy ones take a lot longer — pick based on what the engagement actually calls for. See the nmap tool snippet for the full scan-type/NSE/evasion reference.
