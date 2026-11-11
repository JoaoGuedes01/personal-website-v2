---
title: "dirb: dictionary-based web content scanner"
description: "Brute-force hidden directories and files on a web server with wordlists."
pubDate: 2026-11-10
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["dirb", "web", "recon", "dirbuster"]
draft: false
---

dirb is the older, simpler cousin of gobuster/ffuf. It's slower, but it ships everywhere and its recursive-by-default behavior means it'll dig into subdirectories it finds without being told to.

```bash
dirb http://example.com                              # default wordlist
dirb http://example.com /path/to/wordlist.txt         # custom wordlist
dirb http://example.com -X .php,.html,.bak            # only these extensions
dirb http://example.com -r                            # non-recursive (root level only)
dirb http://example.com -c "session=12345"            # authenticated scan via cookie
dirb http://example.com -o output.txt
dirb http://example.com -z 100                        # add delay (ms) between requests
```

dirb is noisy and will show up in logs/WAF alerts quickly, the `-z` flag adds a delay if you need to be less aggressive. For anything time-sensitive, gobuster or ffuf will get through the same wordlist faster; dirb's main advantage is that it's dependable and preinstalled, which matters when you're working from a minimal toolset. Its own GUI-adjacent sibling `dirbuster` does the same job through a point-and-click interface if you'd rather pick a wordlist visually. `/usr/share/wordlists/dirbuster/directory-list-lowercase-2.3-medium.txt` is a solid default wordlist.
