---
title: "dig: DNS record lookups from the command line"
description: "Query A/MX/NS/TXT records, do reverse lookups, trace resolution paths, and attempt zone transfers."
pubDate: 2026-11-10
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["dig", "dns"]
draft: false
---

dig is the general purpose DNS querying tool. It's useful for legitimate troubleshooting and equally useful for recon, since misconfigured DNS servers leak far more than they should.

```bash
dig example.com                    # basic A record lookup
dig example.com MX                 # specific record type
dig @8.8.8.8 example.com           # query a specific nameserver instead of your default resolver
dig +short example.com             # answer only, no header noise
dig -x 8.8.8.8                     # reverse lookup (PTR record)
dig +trace example.com             # show every hop from root servers down
dig axfr @<nameserver> <domain>    # attempt a zone transfer
```

A successful `axfr` zone transfer is the big find in DNS recon. A misconfigured authoritative server that allows unauthenticated zone transfers will hand you every DNS record for the domain in one query (subdomains included), which is normally something you'd have to enumerate by brute-force. It's rare in practice, but always worth the check.
