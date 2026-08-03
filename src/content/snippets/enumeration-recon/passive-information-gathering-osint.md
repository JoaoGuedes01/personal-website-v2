---
title: "Passive information gathering & OSINT"
description: "What to collect about a target before probing it directly"
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["osint", "passive-recon", "dns", "footprinting", "subdomain", "email", "credentials", "whois", "dig", "sublist3r", "whatweb", "theHarvester", "wafw00f"]
draft: false
---

Passive information gathering means learning as much as possible about a target *without* sending it any traffic. Everything comes from public records and third-party services, which is what keeps the risk of detection near zero. It's always done before active recon (port scans, direct requests) for that reason.

Techniques:
- **WhoIS lookup**: registration date, owner, registrar, contact email for a domain (`whois example.org`, or via [DomainTools](https://whois.domaintools.com)).
- **DNS reconnaissance** : A/AAAA/MX/NS/TXT/CNAME records tied to a domain; see the [dig](../tools/scanning-enumeration-tools/dig) tool snippet and the [OSINT toolbelt](../tools/scanning-enumeration-tools/osint-recon-toolbelt) for the actual commands. A successful zone transfer is very rare but high-value if it happens.
- **Subdomain enumeration** : passive discovery via `sublist3r` or OSINT aggregators, no direct interaction with the target's own DNS server needed beyond a normal public query.
- **Website reconnaissance & footprinting** : what to actually look for such as IPs, hidden directories, names/emails tied to the domain, phone numbers, physical addresses, the technology stack. `robots.txt` and `sitemap.xml` are free hints most sites leave exposed; `whatweb` and services like [Wappalyzer](https://www.wappalyzer.com/) or [Netcraft](https://www.netcraft.com/) fingerprint the stack without you requesting anything unusual.
- **Email harvesting** : via `theHarvester`; found addresses feed directly into phishing campaigns or username lists for later brute-forcing.
- **Leaked password databases** : check [haveibeenpwned](https://haveibeenpwned.com/) for known breaches tied to the target's domain; any passwords that surface are candidates for a credential-spray against other services the same organization runs.
- **WAF recon** : `wafw00f` identifies whether a WAF sits in front of a web target, which shapes how aggressive later active scanning can safely be.

```bash
# quick manual checks worth doing even before reaching for dedicated tools
whois example.org
host example.org
```

**A short code of conduct worth keeping in mind for the active phase that follows.** Know your scope and don't exceed it, get signed authorization before interacting with anything sensitive, verify your target list in writing, take careful notes as you go, and communicate findings to your team/client rather than sitting on them. Passive gathering carries essentially no risk of detection since you're never touching the target directly. This changes the moment you move into active information gathering (port scans, banner grabs, direct HTTP requests), where the target becomes aware that you're looking.
