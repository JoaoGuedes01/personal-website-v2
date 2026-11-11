---
title: "WMAP: web app scanning inside Metasploit"
description: "Metasploit's built-in web vulnerability scanner plugin."
pubDate: 2026-11-10
category: "Cybersecurity"
source: "INE Certification"
lang: "msfconsole"
tags: ["wmap", "metasploit", "web", "vulnerability-scanning"]
draft: false
---

WMAP is a [Metasploit](/snippets/cybersecurity/tools/exploitation-frameworks/metasploit-framework) plugin, so scan results land directly in the same database as everything else you've enumerated. It's useful when you want web findings sitting alongside host/service data rather than in a separate report.

## Setup

```bash
load wmap                              # load the plugin

wmap_sites -a <target_ip>              # register a new site
wmap_targets -t http://<target_ip>     # set the specific target URL
wmap_sites -l                          # confirm the site was added
wmap_targets -l                        # confirm the target was added
```

## Run and review

```bash
wmap_run -t                            # dry run: show which modules WILL run against this target
wmap_run -e                            # execute: run all enabled/applicable modules

wmap_vulns -l                          # list everything WMAP found
```

:::tip[Dry run first]
`wmap_run -t` before `-e` tells you what's actually going to fire before you commit to running every applicable scanner module against the target.
:::

## Related

- [Web server & HTTP enumeration](/snippets/cybersecurity/enumeration-recon/web-http-enumeration): manual enumeration to pair with the scan
- [From service version to working exploit](/snippets/cybersecurity/enumeration-recon/vulnerability-scanning-exploit-search): WMAP in the exploit-search workflow
- [Metasploit Framework](/snippets/cybersecurity/tools/exploitation-frameworks/metasploit-framework): database and workspace basics
- [Nessus](/snippets/cybersecurity/tools/scanning-enumeration-tools/nessus): broader CVE-tagged scanner
