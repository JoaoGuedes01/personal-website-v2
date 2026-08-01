---
title: "FTP enumeration"
description: "Check anonymous access, brute-force credentials, and identify server version on FTP (port 21)."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["ftp", "enumeration"]
draft: false
---

FTP (default port 21) is old enough that its main risks haven't changed in years: misconfigured anonymous access, and weak credentials that fall to a straightforward brute-force.

```bash
#################### FTP CLI ####################
ftp <target_ip>
# Username: anonymous
# Password: (blank, or anything)

#################### NMAP ####################
nmap -sV <target_ip>                                       # server + version
nmap --script ftp-anon -p21 <target_ip>                    # anonymous login check
nmap --script ftp-brute --script-args userdb=<userdb_file> -p21 <target_ip>

#################### METASPLOIT ####################
auxiliary/scanner/ftp/ftp_version
auxiliary/scanner/ftp/anonymous
auxiliary/scanner/ftp/ftp_login       # brute-force with a credential list

#################### HYDRA ####################
hydra -L users.txt -P passwords.txt <target_ip> ftp

#################### SEARCHSPLOIT ####################
searchsploit <ftp_server_and_version>     # once you have a specific version
```

There isn't much middle ground with FTP: either anonymous login works, valid credentials fall to brute-force, or you're waiting on a version-specific exploit (see the FTP Exploitation snippet — vsftpd 2.3.4's backdoor is the classic example). Brute-forcing FTP can overload a fragile server, so treat it as a mild denial-of-service risk on anything not built to handle high connection volume.
