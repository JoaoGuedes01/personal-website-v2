---
title: "OSINT and DNS recon toolbelt"
description: " A collection of OSINT and DNS reconnaissance tools."
pubDate: 2026-11-10
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["osint", "dns", "subdomains", "recon", "passive-recon", "dnsenum", "dnsrecon", "fierce", "sublist3r", "theHarvester", "wafw00f", "whatweb", "browsh"]
draft: false
---

A handful of single-purpose passive-recon tools that all follow the same pattern: point them at a domain and get a report back. Grouping them here because none needs more than a line or two, but together they cover most of a passive information-gathering pass.

## DNS enumeration

```bash
# dnsenum: DNS records, zone transfer attempt, subdomain brute-force
dnsenum example.com
dnsenum --noreverse example.com              # skip WHOIS lookups, faster
dnsenum --enum -f wordlist.txt example.com   # brute-force subdomains

# dnsrecon: similar DNS enumeration, packaged with Kali
dnsrecon -d example.com

# fierce: locates non-contiguous IP space via DNS
fierce --domain example.com
```

:::note[Zone transfers usually fail]
All three attempt zone transfers and subdomain brute-forcing, but will come up short if the target's zone transfer is disabled, which is the most likely scenario.
:::

## Subdomains and emails

```bash
# sublist3r: passive subdomain enumeration via search engines (Google/Yahoo/Bing) + OSINT sources
sublist3r -d example.com -e google,yahoo

# theHarvester: emails, subdomains, hosts from public/OSINT sources
theHarvester -d example.com -b all
theHarvester -d example.com -b dnsdumpster,duckduckgo,crtsh   # limit to specific sources
```

:::warning[theHarvester -b all is noisy]
It's the most complete OSINT sweep of the bunch but also the noisiest. Scope it to specific sources once you know which return useful data for a given target.
:::

## Web fingerprinting

```bash
# wafw00f: identify what WAF sits in front of a target
wafw00f example.com

# whatweb: fingerprint the web stack (server, CMS, libraries, etc)
whatweb example.com

# browsh full terminal-based browser
browsh --startup-url http://<target_ip>
```

`wafw00f` and `whatweb` are usually run back-to-back at the start of any web-facing engagement, right alongside `whois <domain>` and `host <domain>` for the absolute basics.

## Related

- [Passive information gathering & OSINT](/snippets/cybersecurity/enumeration-recon/passive-information-gathering-osint): the workflow these tools plug into
- [dig](/snippets/cybersecurity/tools/scanning-enumeration-tools/dig): manual DNS queries and zone transfers
- [Google dorking cheat sheet](/snippets/cybersecurity/enumeration-recon/google-dorks): passive discovery through search operators
- [Web server & HTTP enumeration](/snippets/cybersecurity/enumeration-recon/web-http-enumeration): the active step after fingerprinting
