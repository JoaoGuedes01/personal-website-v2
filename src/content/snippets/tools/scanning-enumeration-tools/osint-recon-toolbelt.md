---
title: "OSINT & DNS recon toolbelt"
description: "One-liner reference for dnsenum, dnsrecon, fierce, sublist3r, theHarvester, wafw00f, whatweb and browsh."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["osint", "dns", "subdomains", "recon", "passive-recon"]
draft: false
---

A handful of single-purpose passive-recon tools that all follow the same pattern — point them at a domain, get a report back. Grouping them here because none of them needs more than a line or two, but together they cover most of a passive information-gathering pass.

```bash
# dnsenum — DNS records, zone transfer attempt, subdomain brute-force
dnsenum example.com
dnsenum --noreverse example.com              # skip WHOIS lookups, faster
dnsenum --enum -f wordlist.txt example.com   # brute-force subdomains

# dnsrecon — similar DNS enumeration, packaged with Kali
dnsrecon -d example.com

# fierce — locates non-contiguous IP space via DNS
fierce --domain example.com

# sublist3r — passive subdomain enumeration via search engines (Google/Yahoo/Bing) + OSINT sources
sublist3r -d example.com -e google,yahoo

# theHarvester — emails, subdomains, hosts from public/OSINT sources
theHarvester -d example.com -b all
theHarvester -d example.com -b dnsdumpster,duckduckgo,crtsh   # limit to specific sources

# wafw00f — identify what WAF (if any) sits in front of a target
wafw00f example.com

# whatweb — fingerprint the web stack (server, CMS, JS libraries)
whatweb example.com

# browsh — full terminal-based browser (renders JS/CSS/video, not just raw HTML)
browsh --startup-url http://<target_ip>
```

All of the DNS-family tools (dnsenum/dnsrecon/fierce) attempt zone transfers and subdomain brute-forcing but will silently come up short if the target's zone transfer is disabled — that's normal, not a sign you did something wrong. `theHarvester -b all` is the most complete OSINT sweep of the bunch but also the noisiest; scope it to specific sources once you know which ones are actually returning useful data for a given target. `wafw00f` and `whatweb` are usually run back-to-back at the start of any web-facing engagement, right alongside `whois <domain>` and `host <domain>` for the absolute basics.
