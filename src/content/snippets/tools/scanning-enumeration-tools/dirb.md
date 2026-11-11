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

dirb is the older, simpler cousin of [gobuster](/snippets/cybersecurity/tools/scanning-enumeration-tools/gobuster) and [ffuf](/snippets/cybersecurity/tools/scanning-enumeration-tools/ffuf). It's slower, but it ships everywhere and its recursive-by-default behavior means it'll dig into subdirectories it finds without being told to.

## Usage

```bash
dirb http://example.com                              # default wordlist
dirb http://example.com /path/to/wordlist.txt         # custom wordlist
dirb http://example.com -X .php,.html,.bak            # only these extensions
dirb http://example.com -r                            # non-recursive (root level only)
dirb http://example.com -c "session=12345"            # authenticated scan via cookie
dirb http://example.com -o output.txt
dirb http://example.com -z 100                        # add delay (ms) between requests
```

| Flag | Meaning |
| --- | --- |
| `-X` | Only try these extensions |
| `-r` | Non-recursive (root level only) |
| `-c` | Send a cookie (authenticated scan) |
| `-o` | Write output to a file |
| `-z` | Delay in ms between requests |

A solid default wordlist: `/usr/share/wordlists/dirbuster/directory-list-lowercase-2.3-medium.txt`.

## Gotchas

:::warning[Noisy]
dirb shows up in logs and WAF alerts quickly. Use `-z` to add a delay if you need to be less aggressive.
:::

- For anything time-sensitive, gobuster or ffuf get through the same wordlist faster.
- dirb's main advantage is that it's dependable and preinstalled, which matters on a minimal toolset.
- Its GUI sibling `dirbuster` does the same job through a point-and-click interface if you'd rather pick a wordlist visually.

## Related

- [Web server & HTTP enumeration](/snippets/cybersecurity/enumeration-recon/web-http-enumeration): the workflow this tool plugs into
- [Gobuster](/snippets/cybersecurity/tools/scanning-enumeration-tools/gobuster): faster alternative with dns/vhost modes
- [FFuF](/snippets/cybersecurity/tools/scanning-enumeration-tools/ffuf): fuzz anywhere in the request, not just paths
