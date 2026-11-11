---
title: "Useful links"
description: "Curated references, tools, wordlists, labs and write-ups worth bookmarking."
pubDate: 2026-11-11
category: "Cybersecurity"
source: "INE Certification"
lang: "text"
tags: ["links", "reference"]
draft: false
---

Everything I kept coming back to while studying for the eJPT. The notes themselves started from [syselement's INE eJPT notes](https://blog.syselement.com/ine), which are worth reading in full.

## Quick references

- [GTFOBins](https://gtfobins.github.io/): Unix binaries that can be abused for shells and privilege escalation.
- [LOLBAS](https://lolbas-project.github.io/): the Windows equivalent, built-in binaries and scripts with abusable behaviour.
- [HackTricks](https://book.hacktricks.wiki/en/index.html): sprawling methodology book, good for "what else can I try".
- [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings): payloads and methodology by topic, including a [reverse shell cheatsheet](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Reverse%20Shell%20Cheatsheet.md).
- [Revshells](https://www.revshells.com/): reverse shell one-liner generator.
- [CyberChef](https://gchq.github.io/CyberChef/): encode, decode and transform data.
- [Pentest Everything](https://viperone.gitbook.io/pentest-everything): notes and checklists, including the [Linux privilege escalation checklist](https://viperone.gitbook.io/pentest-everything/everything/everything-linux/privilege-escalation-checklist#metasploit-modules).
- [Awesome pentest checklist](https://github.com/iAnonymous3000/awesome-pentest-checklist)
- [Full TTY shells handbook](https://0xffsec.com/handbook/shells/full-tty/): upgrading a dumb shell to a proper TTY.
- [ipcalc](https://jodies.de/ipcalc): subnet and CIDR calculator.
- [Cronhub crontab editor](https://crontab.cronhub.io/): check what a cron expression means.

## Nmap and recon automation

- [Nmap NSE usage](https://nmap.org/book/nse-usage.html): official guide to running scripts.
- [Nmap cheat sheet (StationX)](https://www.stationx.net/nmap-cheat-sheet/)
- [Nmap command examples (cyberciti)](https://www.cyberciti.biz/networking/nmap-command-examples-tutorials/)
- [dig examples (cyberciti)](https://www.cyberciti.biz/faq/linux-unix-dig-command-examples-usage-syntax/)
- [masscan](https://github.com/robertdavidgraham/masscan) and [RustScan](https://github.com/RustScan/RustScan): fast port scanners.
- [AutoRecon](https://github.com/Tib3rius/AutoRecon) and [nmapAutomator](https://github.com/21y4d/nmapAutomator): automated enumeration wrappers.

## OSINT and passive recon

- [DNSdumpster](https://dnsdumpster.com/): DNS records and subdomains.
- [Netcraft site report](https://sitereport.netcraft.com/): hosting and technology info for a site.
- [DomainTools Whois](https://whois.domaintools.com/), [who.is](https://who.is/) and [DNSlytics](https://search.dnslytics.com/): whois and DNS lookups.
- [Wappalyzer](https://www.wappalyzer.com/): website technology fingerprinting.
- [Wayback Machine](http://web.archive.org/): old versions of a site.
- [Have I Been Pwned](https://haveibeenpwned.com/): breached accounts.
- [Google Hacking Database](https://www.exploit-db.com/google-hacking-database): ready-made dorks.

## Exploit and vulnerability databases

- [Exploit-DB](https://www.exploit-db.com/) and [searchsploit](https://www.exploit-db.com/searchsploit)
- [Rapid7 vulnerability and exploit database](https://www.rapid7.com/db/)
- [NVD](https://nvd.nist.gov/): CVE details, plus the [CVSS scoring reference](https://nvd.nist.gov/vuln-metrics/cvss).
- [Windows kernel exploits collection](https://github.com/SecWiki/windows-kernel-exploits) and [exploitdb-bin-sploits](https://github.com/offensive-security/exploitdb-bin-sploits): precompiled public exploit code.

### CVEs I worked with

- [CVE-2021-44228 (Log4Shell)](https://nvd.nist.gov/vuln/detail/CVE-2021-44228)
- [CVE-2019-0708 (BlueKeep)](https://nvd.nist.gov/vuln/detail/CVE-2019-0708)
- [CVE-2017-0143 (MS17-010)](https://nvd.nist.gov/vuln/detail/CVE-2017-0143)
- [CVE-2014-0160 (Heartbleed)](https://nvd.nist.gov/vuln/detail/CVE-2014-0160)
- [CVE-2014-6271 (Shellshock)](https://cve.mitre.org/cgi-bin/cvename.cgi?name=cve-2014-6271)
- [Sudo Baron Samedit (CVE-2021-3156) advisory](https://www.qualys.com/2021/01/26/cve-2021-3156/baron-samedit-heap-based-overflow-sudo.txt)
- [CVE-2021-22555 writeup (Google Security Research)](https://google.github.io/security-research/pocs/linux/cve-2021-22555/writeup.html)

## Privilege escalation tooling

- [PEASS-ng (LinPEAS / WinPEAS)](https://github.com/peass-ng/PEASS-ng) and [parsePEASS](https://github.com/mnemonic-re/parsePEASS) for processing its output.
- [JAWS](https://github.com/411Hall/JAWS), [LinEnum](https://github.com/rebootuser/LinEnum/blob/master/LinEnum.sh) and [PrivescCheck](https://github.com/itm4n/PrivescCheck)
- [pspy](https://github.com/DominicBreuker/pspy): watch processes and cron jobs without root.
- [WES-NG](https://github.com/bitsadmin/wesng) and [Windows-Exploit-Suggester](https://github.com/AonCyberLabs/Windows-Exploit-Suggester): match patch level to known exploits.
- [UACME](https://github.com/hfiref0x/UACME): UAC bypass methods.

## Exploitation and post-exploitation

- [AutoBlue-MS17-010](https://github.com/3ndG4me/AutoBlue-MS17-010): manual EternalBlue exploitation.
- [metasploit-autopwn](https://github.com/hahwul/metasploit-autopwn): the `db_autopwn` plugin.
- [Invoke-Obfuscation](https://github.com/danielbohannon/Invoke-Obfuscation): PowerShell obfuscation.
- [Pivoting in Metasploit (official docs)](https://docs.metasploit.com/docs/using-metasploit/intermediate/pivoting-in-metasploit.html) and [an intro with lab setup](https://0xtesla.medium.com/introduction-to-pivoting-using-metasploit-framework-with-lab-setup-c4de8878b15).
- [GoPhish](https://getgophish.com/) and [PhishingPretexts](https://github.com/L4bF0x/PhishingPretexts/tree/master): phishing framework and example pretexts.

## Wordlists

- [SecLists](https://github.com/danielmiessler/SecLists)
- [Weakpass](https://weakpass.com/)

## Practice targets

- [Metasploitable 3](https://github.com/rapid7/metasploitable3) and the [Metasploitable 2 docs](https://docs.rapid7.com/metasploit/metasploitable-2/)
- [VulnHub](https://www.vulnhub.com/) and [OverTheWire wargames](https://overthewire.org/wargames/)
- TryHackMe rooms I did: [Further Nmap](https://tryhackme.com/room/furthernmap), [Vulnversity](https://tryhackme.com/room/vulnversity), [Ice](https://tryhackme.com/room/ice), [Startup](https://tryhackme.com/room/startup), [Pickle Rick](https://tryhackme.com/room/picklerick), [Easy Peasy](https://tryhackme.com/room/easypeasyctf), [Anonymous](https://tryhackme.com/room/anonymous), [Blog](https://tryhackme.com/room/blog), [Poster](https://tryhackme.com/room/poster), [Ignite](https://tryhackme.com/room/ignite), [RootMe](https://tryhackme.com/room/rrootme), [Source](https://tryhackme.com/room/source), [Brooklyn Nine Nine](https://tryhackme.com/room/brooklynninenine), [Basic Pentesting](https://tryhackme.com/room/basicpentestingjt), [Easy CTF](https://tryhackme.com/room/easyctf), [CTF](https://tryhackme.com/room/ctf), [Joker CTF](https://tryhackme.com/room/jokerctf)

## Write-ups and eJPT reviews

- [eJPT v2 review (nmmorette)](https://nmmorette.github.io/posts/2023/12/review-ejptv2-junior-penetration-tester/#labs)
- [prinugupta's eJPT CTF series](https://prinugupta.medium.com/): write-ups for the INE host and network penetration testing CTFs (exploitation, system attacks, post-exploitation, Metasploit, network attacks).
- Room write-ups: [Poster](https://tonyrahmos.medium.com/poster-tryhackme-writeup-37d320e40c2e), [Startup](https://shishirsubedi.com.np/thm/startup/), [Simple CTF](https://sckull.github.io/posts/simplectfthm/), [Easy Peasy](https://kartibok.github.io/Capture-the-Flag/tryhackme/easy_peasy.html), [Anonymous](https://anilcelik.medium.com/en-tryhackme-anonymous-write-up-3459918eec96), [Fowsniff](https://blog.razrsec.uk/fowsniff-walkthrough/), [Wreath](https://simardeep-singh.medium.com/wreath-walk-through-4e3c51905ebb)
- [Using ffuf with Burp Suite](https://medium.com/@neothe0ne/use-ffuf-with-burpsuite-5321d8aa3c3e)

## Frameworks and standards

- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework) and [SP 800-53 controls](https://csrc.nist.gov/Projects/risk-management/sp800-53-controls/release-search)
- [ISO/IEC 27001](https://www.iso.org/isoiec-27001-information-security.html), [COBIT](https://www.isaca.org/resources/cobit), [CIS](https://www.cisecurity.org/), [CMMC](https://dodcio.defense.gov/CMMC/)
- [OWASP Top Ten](https://owasp.org/www-project-top-ten/)

## Related

- [Cybersecurity command cheat sheet](/snippets/cybersecurity/extras/cheat-sheet): the commands side of this reference
- [Passive information gathering & OSINT](/snippets/cybersecurity/enumeration-recon/passive-information-gathering-osint): how the OSINT sites above fit in a workflow
- [searchsploit](/snippets/cybersecurity/tools/exploitation-frameworks/searchsploit): offline Exploit-DB search
