---
title: "Gobuster: directory, DNS & vhost brute-forcing"
description: "Fast Go-based brute-forcer with dir, dns, vhost, s3 and fuzz modes in one binary."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["gobuster", "web", "recon"]
draft: false
---

Gobuster's directory mode is the one you'll use most, but it's worth remembering it's a multi-purpose tool — the same binary also does subdomain brute-forcing and vhost discovery.

```bash
gobuster dir -u http://<target_ip> -w /usr/share/wordlists/dirb/common.txt -b 403,404 -t 60
```

Key flags: `-w` wordlist, `-b` status codes to blacklist (hide expected noise like 403/404), `-t` thread count (default 10 — bump it for a lab target, dial it back against something fragile), `-x` extensions to append (`-x php,txt,bak`), `-r` follow redirects, `-o` write results to a file.

Modes beyond `dir`: `dns` (subdomain brute-force), `vhost` (virtual host enumeration — use the target's IP as the URL), `fuzz` (generic `FUZZ` keyword replacement in URL/headers/body), `s3`/`gcs` (cloud bucket enumeration). Run `gobuster help <mode>` for mode-specific flags rather than assuming `dir`'s flags carry over.
