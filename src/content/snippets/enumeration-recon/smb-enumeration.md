---
title: "SMB & NetBIOS enumeration"
description: "Full command reference for enumerating SMB shares, users, sessions and OS info."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["smb", "netbios", "enumeration", "windows", "nmap", "smbmap", "smbclient", "enum4linux", "metasploit", "hydra"]
draft: false
---

SMB (port 445, or 139 if running on NetBIOS) is the file-sharing protocol behind almost every Windows-network engagement, and it's rarely locked down as tightly as it should be. Anonymous/Guest login and weak credentials are the two misconfigurations to check for first. NetBIOS itself (ports 137 Name Service, 138 Datagram, 139 Session) is the older API SMB originally rode on top of. On a modern network you'll mostly encounter it as SMB's legacy port rather than something to enumerate separately.

```bash
#################### NMAP ####################
nmap -p445,139 -sV -sC -O <target_ip>                 # general script scan
nmap -p445 --script smb-protocols <target_ip>         # supported SMB dialects
nmap -p445 --script smb-security-mode <target_ip>     # SMB security level
nmap -p445 --script smb-enum-sessions <target_ip>     # logged-in users
nmap -p445 --script smb-enum-shares <target_ip>       # shares (as guest)
nmap -p445 --script smb-enum-users <target_ip>        # works reliably on SMBv1
nmap -p445 --script smb-enum-domains --script-args smbusername=<u>,smbpassword=<p> <target_ip>
nmap -p445 --script smb-enum-groups --script-args smbusername=<u>,smbpassword=<p> <target_ip>
nmap -p445 --script smb-enum-shares,smb-ls --script-args smbusername=<u>,smbpassword=<p> <target_ip>  # list files on found shares

#################### SMBMAP ####################
smbmap -H <target_ip>                                    # anonymous login
smbmap -u guest -p "" -d . -H <target_ip>                # explicit guest enumeration
smbmap -u <user> -p <pass> -H <target_ip> -x 'ipconfig'  # run a command
smbmap -u <user> -p <pass> -H <target_ip> -r 'C$'        # list a share's contents

#################### SMBCLIENT / NMBLOOKUP / RPCCLIENT ####################
smbclient -L <target_ip> -N            # anonymous share listing
nmblookup -A <target_ip>               # NetBIOS name lookup
rpcclient -U "" -N <target_ip>         # anonymous RPC session

#################### ENUM4LINUX ####################
enum4linux -a <target_ip>              # everything at once
enum4linux -U <target_ip>              # users
enum4linux -S <target_ip>              # shares

#################### METASPLOIT ####################
auxiliary/scanner/smb/smb_version       # version
auxiliary/scanner/smb/smb_enumusers     # users
auxiliary/scanner/smb/smb_enumshares    # shares
auxiliary/scanner/smb/smb_login         # brute-force

#################### HYDRA ####################
hydra -l admin -P /usr/share/wordlists/rockyou.txt <target_ip> smb
```

A few patterns worth checking for are that SMB commonly creates a directory named after the logged-in user, so a share containing a directory matching a known username is worth investigating first. If SMBv1 is enabled, anonymous login is often possible even when later versions would block it. That alone is worth flagging as a finding. RCE is achievable through SMB in more than one way (EternalBlue on unpatched SMBv1, or legitimate credentials via PsExec)
