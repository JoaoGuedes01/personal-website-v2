---
title: "SMTP enumeration"
description: "Version fingerprinting and user enumeration against SMTP (port 25/465/587)."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["smtp", "enumeration"]
draft: false
---

SMTP's biggest enumeration win is usually username enumeration — the protocol's own `VRFY`/`EXPN` commands (or timing/response differences around them) leak whether an account exists, which is exactly what `smtp-user-enum` and Metasploit's `smtp_enum` module automate.

```bash
#################### NMAP ####################
nmap -sV --script banner <target_ip>       # grab the banner

#################### METASPLOIT ####################
auxiliary/scanner/smtp/smtp_version
auxiliary/scanner/smtp/smtp_enum           # user enumeration

#################### smtp-user-enum ####################
smtp-user-enum -U /usr/share/commix/src/txt/usernames.txt -t <target_ip>

#################### TELNET ####################
telnet <target_ip> 25              # manual banner/interaction check

#################### SENDEMAIL ####################
sendemail -f admin@attacker.xyz -t root@target.xyz -s <target_ip> -u "Fakemail" -m "test" -o tls=no
```

Default port is `25`, with `465`/`587` as common alternatives (usually for authenticated/encrypted submission rather than open relay). Any usernames enumerated here feed directly into brute-forcing other services on the same host — SMTP is rarely interesting on its own, but it's a reliable source of valid usernames for everything else.
