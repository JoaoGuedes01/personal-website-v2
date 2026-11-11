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

FTP usually runs on **port 21** and is old enough that its main risks haven't changed in years: misconfigured anonymous access, and weak credentials that fall to a straightforward brute-force. There isn't much wiggle room: either anonymous login works, weak credentials work under brute-force, or you're waiting on a version-specific exploit.

## Manual login

```bash
ftp <target_ip>
# Username: anonymous
# Password: (blank, or anything)
```

## Nmap

```bash
nmap -sV <target_ip>                                       # server + version
nmap --script ftp-anon -p21 <target_ip>                    # anonymous login check
nmap --script ftp-brute --script-args userdb=<userdb_file> -p21 <target_ip>
```

## Metasploit

```text
auxiliary/scanner/ftp/ftp_version
auxiliary/scanner/ftp/anonymous
auxiliary/scanner/ftp/ftp_login       # brute-force with a credential list
```

## Brute-forcing and exploit search

```bash
hydra -L users.txt -P passwords.txt <target_ip> ftp
```

```bash
searchsploit <ftp_server_and_version>     # once you have a specific version
```

:::warning[Go easy on the server]
Brute-forcing FTP can overload a fragile server. Don't hammer it with frequent requests; be lenient when setting attempt intervals.
:::

For a version-specific example, see the [vsftpd 2.3.4 backdoor](/snippets/cybersecurity/exploitation/remote-service-exploitation/linux-ftp-ssh-exploitation).

## Related

- [Nmap](/snippets/cybersecurity/tools/scanning-enumeration-tools/nmap): scan types and NSE scripts used above
- [Hydra](/snippets/cybersecurity/tools/credential-attack-tools/hydra): brute-forcing logins across protocols
- [searchsploit](/snippets/cybersecurity/tools/exploitation-frameworks/searchsploit): offline exploit-db search once you have a version
- [Metasploit Framework](/snippets/cybersecurity/tools/exploitation-frameworks/metasploit-framework): running the auxiliary modules
- [Linux FTP & SSH exploitation](/snippets/cybersecurity/exploitation/remote-service-exploitation/linux-ftp-ssh-exploitation): vsftpd backdoor and brute-force follow-up
