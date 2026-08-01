---
title: "FFuF: fast web fuzzing"
description: "Fuzz paths, headers, POST bodies, or replayed Burp requests — filtering by response size, code, or regex."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["ffuf", "fuzzing", "web"]
draft: false
---

FFuF's edge over a plain directory brute-forcer is that `FUZZ` can go anywhere in the request — path, header, POST body — and matching/filtering is based on the actual response (size, code, regex), which is what makes it useful for things like username/login enumeration and not just "find hidden directories."

```bash
# Fuzz file paths, filter out a known "not found" response size
ffuf -w wordlist.txt -u https://example.org/FUZZ -mc all -fs 42 -c -v

# Fuzz the Host header (virtual host discovery)
ffuf -w hosts.txt -u https://example.org/ -H "Host: FUZZ" -mc 200

# Fuzz a JSON POST body, filter out responses containing "error"
ffuf -w entries.txt -u https://example.org/ -X POST -H "Content-Type: application/json" \
  -d '{"name": "FUZZ", "anotherkey": "anothervalue"}' -fr "error"

# Multiple wordlists at once (clusterbomb by default: every combination)
ffuf -w params.txt:PARAM -w values.txt:VAL -u "https://example.org/?PARAM=VAL" -mr "VAL" -c

# Replay a raw request captured from Burp Suite, fuzzing one field in it
ffuf -request captured_request.txt -request-proto http -w b64_userpass.txt:FUZZAUTH -fs 455 -v
```

The `-request` flag is the one worth remembering: capture a login attempt in Burp, save the raw request to a file, then let FFuF fuzz a placeholder inside it — this is how you brute-force things like a Basic Auth header or a multi-field login form without hand-building the request syntax yourself. Filter flags (`-fc`, `-fs`, `-fl`, `-fw`, `-fr` — status code / size / lines / words / regex) are usually more useful than match flags once you know what a "wrong answer" response looks like, since you're filtering that out rather than guessing every possible "right answer" shape in advance.
