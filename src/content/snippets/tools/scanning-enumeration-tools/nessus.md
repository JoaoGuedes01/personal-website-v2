---
title: "Nessus: vulnerability scanning"
description: "Proprietary vulnerability scanner — install steps, service start, and feeding results into Metasploit."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["nessus", "vulnerability-scanning"]
draft: false
---

Nessus doesn't ship with Kali and needs a manual install, but it's worth having around for engagements where a broader, CVE-tagged vulnerability report matters more than Metasploit's more exploit-focused auxiliary scanners.

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

The free/Essentials license caps scans at 16 IPs — fine for a single lab host or small engagement segment, not for a full subnet. In the UI: authenticated scans need credentials under the Credentials tab, scan scope/ports under Discovery, and vulnerability categories under Assessment; results include CVE identifiers directly, which makes cross-referencing against searchsploit or an MSF module straightforward afterward.
