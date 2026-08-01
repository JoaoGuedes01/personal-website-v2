---
title: "WMAP: web app scanning inside Metasploit"
description: "Metasploit's built-in web vulnerability scanner plugin — enumerate a site and run modules against it without leaving msfconsole."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "msfconsole"
tags: ["wmap", "metasploit", "web", "vulnerability-scanning"]
draft: false
---

WMAP is a Metasploit plugin, so scan results land directly in the same database as everything else you've enumerated — useful when you want web findings sitting alongside host/service data rather than in a separate report.

```bash
load wmap                              # load the plugin

wmap_sites -a <target_ip>              # register a new site
wmap_targets -t http://<target_ip>     # set the specific target URL
wmap_sites -l                          # confirm the site was added
wmap_targets -l                        # confirm the target was added

wmap_run -t                            # dry run: show which modules WILL run against this target
wmap_run -e                            # execute: run all enabled/applicable modules

wmap_vulns -l                          # list everything WMAP found
```

`wmap_run -t` before `-e` is worth doing out of habit — it tells you what's actually going to fire before you commit to running every applicable scanner module against the target.
