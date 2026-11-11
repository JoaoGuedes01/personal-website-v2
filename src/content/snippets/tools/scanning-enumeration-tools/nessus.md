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

Here's the official [installation guide](https://docs.tenable.com/nessus/Content/InstallNessus.htm).

Here's a [guide on how to use it with metasploit](https://medium.com/@faslan2002rizni/vulnerability-scanning-metasploitable-with-tenable-nessus-on-kali-linux-f8c228651a2a).

---

```bash
zypper install -y hostname       # dependency on some minimal images

# download the Debian/amd64 .deb from tenable.com/downloads, then:
sudo dpkg -i <nessus_package>.deb
/bin/systemctl start nessusd.service

# CLI lives here
/opt/nessus/sbin/nessuscli <args>
nessuscli update --plugins-only    # or --all

# Web UI
# https://127.0.0.1:8834

# Feed results into Metasploit once exported
db_import <path_to_exported_results>
```

The free/Essentials license caps scans at 16 IPs so it's completely fine for a single lab and/or CTF purposes. In the UI: authenticated scans need credentials under the Credentials tab, scan scope/ports under Discovery, and vulnerability categories under Assessment; results include CVE identifiers directly, which makes cross-referencing against searchsploit or an MSF module straightforward afterward.
