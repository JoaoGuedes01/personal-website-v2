---
title: "Host discovery quick tools"
description: "The tools you reach for basic discovery."
pubDate: 2026-11-10
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["ping", "fping", "arp-scan", "netdiscover", "nmblookup", "host-discovery"]
draft: false
---

These tools should be the fast first pass before a proper nmap sweep, especially on networks where ICMP is filtered.

```bash
# ping: basic ICMP echo
ping <target_ip>

# fping: ping an entire subnet in one go
fping -I eth0 -g <target_network>.0/24 -a

# arp-scan: ARP-based discovery (Sees hosts that are filtering ICMP)
arp-scan -I eth1 192.168.31.0/24

# netdiscover: active/passive ARP discovery
netdiscover -r 192.168.31.0/24

# nmblookup: NetBIOS name lookup over TCP
nmblookup -A <target_ip>
```

Windows hosts block ICMP by default, so a plain `ping` sweep will under-report a Windows-heavy network. `arp-scan`/`netdiscover` or an nmap TCP SYN ping are great options under those conditions. `fping` is great for quickly scanning a large subnet. `nmblookup` is useful for resolving NetBIOS names on a network once you have a list of IP addresses.
