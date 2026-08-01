---
title: "Google dorking cheat sheet"
description: "Search operators for surfacing exposed files, directories, and forgotten dev portals via Google."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "text"
tags: ["google-dorks", "osint", "passive-recon"]
draft: false
---

Google dorking is passive OSINT by definition — you're only ever querying Google, never touching the target directly, which makes it a zero-risk first step for surfacing things a site owner probably didn't mean to expose.

```
site:example.com                  limit results to a specific domain
site:*.example.com                show subdomains for that domain
inurl:admin                       results with a specific word in the URL
intitle:index of                  finds sites with directory listing enabled (a common misconfig)
filetype:pdf site:example.com     limit results to a file type on a specific domain
cache:example.com                 show Google's cached version of a page

# combined examples worth remembering
inurl:auth_user_file.txt
inurl:passwd.txt
inurl:wp-config.bak
```

`intitle:index of` is the single highest-signal dork here — it surfaces web servers with directory listing left enabled, which routinely exposes files nobody intended to publish. The full Google Hacking Database (exploit-db.com/google-hacking-database) is worth bookmarking for a much larger compiled list. Keep automation light when dorking — Google will rate-limit or temporarily block an IP that fires off queries too quickly.
