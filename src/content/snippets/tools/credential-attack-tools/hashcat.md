---
title: "Hashcat: GPU-accelerated hash cracking"
description: "Crack dumped NTLM or Linux shadow hashes against a wordlist."
pubDate: 2026-11-11
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["hashcat", "password-cracking"]
draft: false
---

Hashcat needs to know the hash *type* before it can crack it. This is what the `-m` mode number is for. The two most common in a Windows/Linux pentest are:

```bash
# Windows NTLM hashes (like from a meterpreter hashdump)
hashcat -a 3 -m 1000 hashes.txt /usr/share/wordlists/rockyou.txt
hashcat -a 3 -m 1000 --show hashes.txt /usr/share/wordlists/rockyou.txt   # show already-cracked results

# Linux shadow hashes (sha512crypt = $6$ format)
hashcat --help | grep 1800          # confirm the mode number for your hash format
hashcat -a 3 -m 1800 linux_hashes.txt /usr/share/wordlists/rockyou.txt
```

`-a 3` is straight brute-force/mask mode; for a wordlist-only attack you'd use `-a 0` instead. `--show` re-displays cracked hashes from the potfile without re-running the attack. This is handy after a long job finishes and the terminal's scrolled away. If you're not sure what hash format you're holding, `hashcat --help | grep -i <algorithm_name>` will get you to the right mode number.
