---
title: "SSH enumeration"
description: "Version/algorithm fingerprinting, user enumeration, and brute-forcing on SSH servers."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["ssh", "enumeration", "nmap", "metasploit", "hydra"]
draft: false
---

SSH is deliberately narrow from an attacker's side: there's no anonymous mode, so it comes down to either finding a vulnerable version or brute-forcing valid credentials. Default port is `22`.

## Banner and login

```bash
nc <target_ip> 22                    # grab the banner
ssh <user>@<target_ip>               # basic login attempt
```

## Nmap

```bash
nmap -sV <target_ip>                                                          # identify version
nmap --script ssh2-enum-algos <target_ip>                                     # supported algorithms
nmap --script ssh-hostkey --script-args ssh_hostkey=full <target_ip>          # full host key
nmap --script ssh-auth-methods --script-args="ssh.user=<user>" <target_ip>    # supported auth methods
nmap -p22 --script=ssh-brute --script-args userdb=<userdb_file> <target_ip>
nmap --script=ssh-run --script-args="ssh-run.cmd=<cmd>,ssh-run.username=<u>,ssh-run.password=<p>" <target_ip>
```

:::tip[Check for none_auth]
If `ssh-auth-methods` shows `none_auth` for a user, no authentication at all is required for that account. Check this explicitly rather than assuming every account needs a password.
:::

## Metasploit

```text
auxiliary/scanner/ssh/ssh_version
auxiliary/scanner/ssh/ssh_enumusers
auxiliary/scanner/ssh/ssh_login       # brute-force with username/password
```

## Brute-force

```bash
hydra -L users.txt -P passwords.txt <target_ip> ssh
```

Once valid credentials or a key are found, we have access to the system and need no further exploitation. Go straight to privilege escalation or post-exploitation.

## Related

- [Linux FTP & SSH exploitation](/snippets/cybersecurity/exploitation/remote-service-exploitation/linux-ftp-ssh-exploitation): brute-force and libssh auth bypass
- [Hydra](/snippets/cybersecurity/tools/credential-attack-tools/hydra): brute-forcing logins across protocols
- [Linux post-exploitation and persistence](/snippets/cybersecurity/exploitation/post-exploitation-persistence/linux-post-exploitation-persistence): after you land a session
- [Automated privesc enumeration](/snippets/cybersecurity/tools/exploitation-frameworks/automated-privesc-enum-scripts): LinPEAS and friends
- [Nmap](/snippets/cybersecurity/tools/scanning-enumeration-tools/nmap): NSE scripts
