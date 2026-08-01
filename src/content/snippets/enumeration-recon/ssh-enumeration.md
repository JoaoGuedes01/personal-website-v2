---
title: "SSH enumeration"
description: "Version/algorithm fingerprinting, user enumeration, and brute-forcing against SSH (port 22)."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["ssh", "enumeration"]
draft: false
---

SSH is deliberately narrow from an attacker's side — there's no anonymous mode, so it comes down to finding a vulnerable version or brute-forcing valid credentials.

```bash
#################### NETCAT / SSH CLI ####################
nc <target_ip> 22                    # grab the banner
ssh <user>@<target_ip>               # basic login attempt

#################### NMAP ####################
nmap -sV <target_ip>                                                          # identify version
nmap --script ssh2-enum-algos <target_ip>                                     # supported algorithms
nmap --script ssh-hostkey --script-args ssh_hostkey=full <target_ip>          # full host key
nmap --script ssh-auth-methods --script-args="ssh.user=<user>" <target_ip>    # supported auth methods
nmap -p22 --script=ssh-brute --script-args userdb=<userdb_file> <target_ip>
nmap --script=ssh-run --script-args="ssh-run.cmd=<cmd>,ssh-run.username=<u>,ssh-run.password=<p>" <target_ip>

#################### METASPLOIT ####################
auxiliary/scanner/ssh/ssh_version
auxiliary/scanner/ssh/ssh_enumusers
auxiliary/scanner/ssh/ssh_login       # brute-force with username/password

#################### HYDRA ####################
hydra -L users.txt -P passwords.txt <target_ip> ssh
```

If `ssh-auth-methods` comes back showing `none_auth` for a user, that means no authentication at all is required for that account — worth checking explicitly rather than assuming every account needs a password. Once valid credentials or a key are found, it's a full interactive shell straightaway — no further exploitation step needed, unlike most other services on this list.
