---
title: "Host discovery quick tools: ping, fping, arp-scan, netdiscover, nmblookup"
description: "The one-liner sweep tools you reach for before nmap does the heavier lifting."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["ping", "fping", "arp-scan", "netdiscover", "nmblookup", "host-discovery"]
draft: false
---

None of these need more than one command to be useful — they're the fast first pass before a proper nmap sweep, especially on networks where ICMP is filtered.

```bash
# ping — basic ICMP echo
ping <target_ip>

# fping — ping an entire subnet in one go
fping -I eth0 -g <target_network>.0/24 -a

# arp-scan — ARP-based discovery (same-LAN only, but sees hosts that block ICMP)
arp-scan -I eth1 192.168.31.0/24

# netdiscover — active/passive ARP discovery, originally built for DHCP-less wireless networks
netdiscover -r 192.168.31.0/24

# nmblookup — NetBIOS name lookup over TCP
nmblookup -A <target_ip>
```

Windows hosts block ICMP by default, so a plain `ping` sweep will under-report a Windows-heavy network — that's exactly when `arp-scan`/`netdiscover` (same-subnet only) or an nmap TCP SYN ping earn their keep. `nmblookup` is the odd one out here: it's not host discovery so much as a fast way to resolve a NetBIOS name once you already know a host is up.
