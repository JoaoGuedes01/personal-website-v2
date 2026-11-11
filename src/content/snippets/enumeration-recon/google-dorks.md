---
title: "Google dorking cheat sheet"
description: "Search operators for surfacing exposed files, directories, and forgotten dev portals via Google."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "text"
tags: ["google-dorks", "osint", "passive-recon", "google", "enumeration"]
draft: false
---

Google dorking is passive OSINT by definition: you only ever query Google, never the target directly. That makes it a zero-risk first step for surfacing things a site owner probably didn't mean to expose.

## Operators

```text
site:example.com                  limit results to a specific domain
site:*.example.com                show subdomains for that domain
inurl:admin                       results with a specific word in the URL
intitle:index of                  finds sites with directory listing enabled (a common misconfig)
filetype:pdf site:example.com     limit results to a file type on a specific domain
cache:example.com                 show Google's cached version of a page
```

## Combined examples

```text
inurl:auth_user_file.txt
inurl:passwd.txt
inurl:wp-config.bak
```

`intitle:index of` is the single highest-signal dork here. It surfaces web servers with directory listing left enabled, which routinely exposes files nobody intended to publish. The [Google Hacking Database](https://www.exploit-db.com/google-hacking-database) is a very useful, much larger collection of pre-made dorks and is worth bookmarking.

:::note[Rate limiting]
Keep automation light when dorking. Google will rate-limit or temporarily block an IP that fires off queries too quickly.
:::

## Related

- [Passive information gathering & OSINT](/snippets/cybersecurity/enumeration-recon/passive-information-gathering-osint): the wider passive recon checklist
- [OSINT and DNS recon toolbelt](/snippets/cybersecurity/tools/scanning-enumeration-tools/osint-recon-toolbelt): tools to go with the dorks
- [Web server & HTTP enumeration](/snippets/cybersecurity/enumeration-recon/web-http-enumeration): next step once you move to active probing
