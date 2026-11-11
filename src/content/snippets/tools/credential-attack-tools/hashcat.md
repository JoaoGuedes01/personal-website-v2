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

Hashcat needs to know the hash *type* before it can crack it. This is what the `-m` mode number is for.

## Windows NTLM hashes

From a [meterpreter hashdump](/snippets/cybersecurity/exploitation/post-exploitation-persistence/windows-hash-dump-pass-the-hash) or similar:

```bash
hashcat -a 3 -m 1000 hashes.txt /usr/share/wordlists/rockyou.txt
hashcat -a 3 -m 1000 --show hashes.txt /usr/share/wordlists/rockyou.txt   # show already-cracked results
```

## Linux shadow hashes

sha512crypt (`$6$` format), as dumped in [Linux password hash dumping](/snippets/cybersecurity/exploitation/post-exploitation-persistence/linux-hash-dumping):

```bash
hashcat --help | grep 1800          # confirm the mode number for your hash format
hashcat -a 3 -m 1800 linux_hashes.txt /usr/share/wordlists/rockyou.txt
```

- `-a 3` is straight brute-force/mask mode; for a wordlist-only attack use `-a 0` instead.
- `--show` re-displays cracked hashes from the potfile without re-running the attack — handy after a long job finishes and the terminal's scrolled away.
- If you're not sure what hash format you're holding, `hashcat --help | grep -i <algorithm_name>` gets you to the right mode number.

## Related

- [John the Ripper](/snippets/cybersecurity/tools/credential-attack-tools/john-the-ripper) — CPU-based alternative, faster for a quick check on a small hash file
- [Windows hash dumping and pass-the-hash](/snippets/cybersecurity/exploitation/post-exploitation-persistence/windows-hash-dump-pass-the-hash) — source of the NTLM hashes cracked here
- [Linux password hash dumping & cracking](/snippets/cybersecurity/exploitation/post-exploitation-persistence/linux-hash-dumping) — source of the shadow hashes cracked here
- [Mimikatz & Kiwi](/snippets/cybersecurity/tools/credential-attack-tools/mimikatz) — another route to dumped NTLM hashes worth feeding into Hashcat
