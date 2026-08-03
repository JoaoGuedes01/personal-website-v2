---
title: "FTP enumeration"
description: "Gathering as much information as possible on an FTP server and attempt to gain access via a misconfiguration or weak credentials"
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["ftp", "enumeration", "nmap", "metasploit", "hydra", "searchsploit", "bruteforce"]
draft: false
---

FTP runs usually on **port 21** and is old enough that its main risks haven't changed in years: misconfigured anonymous access, and weak credentials that fall to a straightforward brute-force.

## Tools mentioned
- [nmap](../tools/scanning-enumeration-tools/nmap)
- [metasploit](../tools/exploitation-frameworks/metasploit-framework)
- [hydra](../tools/credential-attack-tools/hydra)
- [searchsploit](../tools/exploitation-frameworks/searchsploit)


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

There isn't much wiggle room with FTP: either anonymous login works, weak credentials work under brute-force, or you're waiting on a version-specific exploit ([vsftpd 2.3.4 CVE Exploitation Example](../exploitation/remote-service-exploitation/linux-ftp-ssh-exploitation)). Brute-forcing FTP can overload a fragile server so we should not hammer it with frequent requests and be more lenient when it comes to setting attempt intervals.
