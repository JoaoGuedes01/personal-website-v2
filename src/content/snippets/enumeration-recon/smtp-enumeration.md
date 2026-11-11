---
title: "SMTP enumeration"
description: "Version fingerprinting and user enumeration on SMTP servers."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["smtp", "enumeration", "nmap", "metasploit", "telnet"]
draft: false
---

SMTP's biggest enumeration win is usually username enumeration. The protocol's own `VRFY`/`EXPN` commands (or timing/response differences around them) leak whether an account exists, which is exactly what `smtp-user-enum` and Metasploit's `smtp_enum` module automate.

| Port | Use |
| --- | --- |
| 25 | Default SMTP |
| 465 / 587 | Common alternatives, usually authenticated/encrypted submission rather than open relay |

## Banner and version

```bash
nmap -sV --script banner <target_ip>       # grab the banner
telnet <target_ip> 25                      # manual banner/interaction check
```

```text
auxiliary/scanner/smtp/smtp_version
```

## User enumeration

```text
auxiliary/scanner/smtp/smtp_enum           # user enumeration
```

```bash
smtp-user-enum -U /usr/share/commix/src/txt/usernames.txt -t <target_ip>
```

## Sending mail

```bash
sendemail -f admin@attacker.xyz -t root@target.xyz -s <target_ip> -u "Fakemail" -m "test" -o tls=no
```

SMTP is rarely interesting on its own, but it's a reliable source of valid usernames. Anything enumerated here feeds directly into brute-forcing other services on the same host.

## Related

- [Hydra](/snippets/cybersecurity/tools/credential-attack-tools/hydra): brute-force other services with the usernames found
- [Samba & SMTP Haraka exploitation](/snippets/cybersecurity/exploitation/remote-service-exploitation/linux-samba-smtp-exploitation): Haraka command injection
- [Nmap](/snippets/cybersecurity/tools/scanning-enumeration-tools/nmap): NSE scripts
- [Netcat](/snippets/cybersecurity/tools/remote-access-networking-utilities/netcat): manual banner grabbing
- [Metasploit Framework](/snippets/cybersecurity/tools/exploitation-frameworks/metasploit-framework): running the auxiliary modules
