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

Gobuster's directory mode is the one you'll use the most, but it's worth remembering it's a multi-purpose tool, it also does subdomain brute-forcing and vhost discovery.

```bash
gobuster dir -u http://<target_ip> -w /usr/share/wordlists/dirb/common.txt -b 403,404 -t 60
```

Key flags: `-w` wordlist, `-b` status codes to blacklist (hide expected noise like 403/404), `-t` thread count (default 10), `-x` extensions to append (`-x php,txt,bak`), `-r` follow redirects, `-o` write results to a file.

Modes beyond `dir`: `dns` (subdomain brute-force), `vhost` (virtual host enumeration), `fuzz` (generic `FUZZ` keyword replacement in URL/headers/body), `s3`/`gcs` (cloud bucket enumeration).
