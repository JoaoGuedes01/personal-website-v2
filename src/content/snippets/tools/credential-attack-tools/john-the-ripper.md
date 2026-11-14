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

John's a CPU cracker rather than GPU-accelerated like [Hashcat](/snippets/cybersecurity/tools/credential-attack-tools/hashcat), but its format auto-detection and simpler syntax make it the faster choice for a quick check against a small hash file.

## Identify the format

```bash
john --list=formats                # see every hash format John recognizes
john --list=formats | grep NT      # grepping to NTLM-related formats
```

## Crack

```bash
john --format=NT hashes.txt --wordlist=/usr/share/wordlists/rockyou.txt          # Windows NTLM
john --format=sha512crypt linux.hashes.txt --wordlist=/usr/share/wordlists/rockyou.txt   # Linux shadow (sha512crypt)

gzip -d /usr/share/wordlists/rockyou.txt.gz   # rockyou often ships gzipped, decompress it first
```

Same underlying idea as Hashcat: you need the right `--format` for the hash type or it'll fail/produce nothing.

## John vs Hashcat

| | John the Ripper | Hashcat |
| --- | --- | --- |
| Cracking | CPU | GPU-accelerated |
| Best for | Quick check on a handful of hashes | Larger sets or slower algorithms |
| Syntax | Simpler, auto-detects more | Needs the exact `-m` mode number |

## Related

- [Hashcat](/snippets/cybersecurity/tools/credential-attack-tools/hashcat): switch to it once you're throwing GPU horsepower at a larger set
- [Windows hash dumping and pass-the-hash](/snippets/cybersecurity/exploitation/post-exploitation-persistence/windows-hash-dump-pass-the-hash): source of the NTLM hashes cracked here
- [Linux password hash dumping & cracking](/snippets/cybersecurity/exploitation/post-exploitation-persistence/linux-hash-dumping): source of the shadow hashes cracked here
