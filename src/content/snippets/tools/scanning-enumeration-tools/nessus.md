---
title: "Nessus: vulnerability scanning"
description: "Proprietary vulnerability scanner."
pubDate: 2026-11-10
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["nessus", "vulnerability-scanning"]
draft: false
---

[Nessus](https://www.tenable.com/products/nessus) doesn't ship with Kali and needs a manual installation, but it's worth having around for engagements where a broader, CVE-tagged vulnerability report matters more than Metasploit's more exploit-focused auxiliary scanners.

- [Official installation guide](https://docs.tenable.com/nessus/Content/InstallNessus.htm)
- [Guide on using it with Metasploit](https://medium.com/@faslan2002rizni/vulnerability-scanning-metasploitable-with-tenable-nessus-on-kali-linux-f8c228651a2a)

## Install and start

```bash
zypper install -y hostname       # dependency on some minimal images

# download the Debian/amd64 .deb from tenable.com/downloads, then:
sudo dpkg -i <nessus_package>.deb
/bin/systemctl start nessusd.service
```

## CLI and web UI

```bash
# CLI lives here
/opt/nessus/sbin/nessuscli <args>
nessuscli update --plugins-only    # or --all

# Web UI
# https://127.0.0.1:8834
```

## Export to Metasploit

```bash
# Feed results into Metasploit once exported
db_import <path_to_exported_results>
```

## Tips

:::info[Free license limit]
The free/Essentials license caps scans at 16 IPs, which is completely fine for a single lab and/or CTF.
:::

- Authenticated scans need credentials under the Credentials tab; scan scope/ports live under Discovery, and vulnerability categories under Assessment.
- Results include CVE identifiers directly, which makes cross-referencing against [searchsploit](/snippets/cybersecurity/tools/exploitation-frameworks/searchsploit) or an MSF module straightforward afterward.

## Related

- [From service version to working exploit](/snippets/cybersecurity/enumeration-recon/vulnerability-scanning-exploit-search): where scan results turn into exploits
- [Metasploit Framework](/snippets/cybersecurity/tools/exploitation-frameworks/metasploit-framework): database and `db_import` basics
- [searchsploit](/snippets/cybersecurity/tools/exploitation-frameworks/searchsploit): look up the CVEs Nessus reports
- [WMAP](/snippets/cybersecurity/tools/scanning-enumeration-tools/wmap): Metasploit's built-in web scanner
