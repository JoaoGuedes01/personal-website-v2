---
title: "John the Ripper: CPU-based hash cracking"
description: "Format-aware password cracking for NTLM and Linux shadow hashes."
pubDate: 2026-11-11
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["john-the-ripper", "password-cracking"]
draft: false
---

John's a CPU cracker rather than GPU-accelerated like Hashcat, but its format auto-detection and simpler syntax make it the faster choice for a quick check against a small hash file.

```bash
john --list=formats                # see every hash format John recognizes
john --list=formats | grep NT      # grepping to NTLM-related formats

john --format=NT hashes.txt --wordlist=/usr/share/wordlists/rockyou.txt          # Windows NTLM
john --format=sha512crypt linux.hashes.txt --wordlist=/usr/share/wordlists/rockyou.txt   # Linux shadow (sha512crypt)

gzip -d /usr/share/wordlists/rockyou.txt.gz   # rockyou often ships gzipped we need to decompress it first
```

Same underlying idea as Hashcat: you need the right `--format` for the hash type or it'll fail/produce nothing. Between the two, John tends to be the quicker sanity check on a handful of hashes; Hashcat is worth switching to once you're throwing GPU horsepower at a larger set or a slower algorithm.