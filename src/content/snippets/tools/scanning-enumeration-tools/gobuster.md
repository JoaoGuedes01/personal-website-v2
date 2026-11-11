---
title: "Gobuster: directory, DNS & vhost brute-forcing"
description: "Fast Go-based brute-forcer with dir, dns, vhost, s3 and fuzz modes."
pubDate: 2026-11-10
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["gobuster", "web", "recon"]
draft: false
---

Gobuster's directory mode is the one you'll use the most, but it's a multi-purpose tool: it also does subdomain brute-forcing and vhost discovery.

## Directory scan

```bash
gobuster dir -u http://<target_ip> -w /usr/share/wordlists/dirb/common.txt -b 403,404 -t 60
```

| Flag | Meaning |
| --- | --- |
| `-w` | Wordlist |
| `-b` | Status codes to blacklist (hide expected noise like 403/404) |
| `-t` | Thread count (default 10) |
| `-x` | Extensions to append (`-x php,txt,bak`) |
| `-r` | Follow redirects |
| `-o` | Write results to a file |

## Modes

| Mode | Purpose |
| --- | --- |
| `dir` | Directory and file brute-force |
| `dns` | Subdomain brute-force |
| `vhost` | Virtual host enumeration |
| `fuzz` | Generic `FUZZ` keyword replacement in URL/headers/body |
| `s3` / `gcs` | Cloud bucket enumeration |

## Related

- [Web server & HTTP enumeration](/snippets/cybersecurity/enumeration-recon/web-http-enumeration): the workflow this plugs into
- [dirb](/snippets/cybersecurity/tools/scanning-enumeration-tools/dirb): slower, recursive-by-default alternative
- [FFuF](/snippets/cybersecurity/tools/scanning-enumeration-tools/ffuf): when you need to fuzz headers or POST bodies
- [dig](/snippets/cybersecurity/tools/scanning-enumeration-tools/dig): DNS lookups and zone transfers
