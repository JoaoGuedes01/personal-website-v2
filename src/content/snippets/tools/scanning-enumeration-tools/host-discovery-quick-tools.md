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

These tools should be the fast first pass before a proper [nmap](/snippets/cybersecurity/tools/scanning-enumeration-tools/nmap) sweep, especially on networks where ICMP is filtered.

## Tools

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

## Which to use

| Tool | Best for |
| --- | --- |
| `ping` | Checking a single host |
| `fping` | Quickly sweeping a large subnet |
| `arp-scan` / `netdiscover` | Local network, hosts that filter ICMP |
| `nmblookup` | Resolving NetBIOS names once you have a list of IPs |

:::note[Windows blocks ICMP by default]
A plain `ping` sweep will under-report a Windows-heavy network. Use `arp-scan`/`netdiscover` or an nmap TCP SYN ping instead.
:::

## Related

- [Host discovery & network mapping workflow](/snippets/cybersecurity/enumeration-recon/host-discovery-network-mapping): the full recon sequence
- [Nmap](/snippets/cybersecurity/tools/scanning-enumeration-tools/nmap): the proper sweep that follows
- [SMB & NetBIOS enumeration](/snippets/cybersecurity/enumeration-recon/smb-enumeration): what to do with the NetBIOS names
