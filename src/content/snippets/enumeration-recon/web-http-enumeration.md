---
title: "Web server & HTTP enumeration"
description: "Directory brute-forcing, header/version fingerprinting, and HTTP-verb testing against a web target."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["http", "web", "enumeration", "directory-discovery"]
draft: false
---

A useful order of operations: identify the server and its version, pull its headers, check `robots.txt`, then brute-force directories/files, and only then start probing individual endpoints or user accounts.

```bash
#################### NMAP ####################
nmap -sS -sV -p80,443 <target_ip>                  # confirm the server + version
nmap --script http-enum -sV -p80 <target_ip>       # enumerate common paths
nmap --script http-headers -sV -p80 <target_ip>
nmap --script http-methods -p80 <target_ip>        # which HTTP verbs are allowed
nmap --script http-webdav-scan --script-args http-methods.url-path=/webdav/ -p80 <target_ip>

#################### DIRECTORY / FILE BRUTE-FORCE ####################
dirb http://<target_ip>
gobuster dir -u http://<target_ip> -w /usr/share/wordlists/dirb/common.txt -b 403,404 -t 60

#################### CURL ####################
curl <target_ip>                    # basic GET
curl -I <target_ip>                 # headers only
curl --digest -u alice:password1 http://<target_ip>/protected/    # authenticated request, digest auth
curl -X OPTIONS <target_ip> -v      # check which methods a specific path allows
curl -X PUT <target_ip>             # test if uploads are accepted (misconfigured WebDAV/servers)

#################### WHATWEB / HTTPIE / BROWSH ####################
whatweb <target_ip>                     # fingerprint the stack (server, CMS, JS libs)
http <target_ip>                        # httpie — curl-like syntax, nicer output
browsh --startup-url http://<target_ip>   # full terminal browser when you need rendered JS

#################### METASPLOIT ####################
auxiliary/scanner/http/http_version        # identify server version
auxiliary/scanner/http/http_header         # pull headers
auxiliary/scanner/http/robots_txt          # check robots.txt content
auxiliary/scanner/http/dir_scanner         # HTTP directory scanner
auxiliary/scanner/http/files_dir           # HTTP file scanner
auxiliary/scanner/http/http_login          # brute-force a login form
auxiliary/scanner/http/apache_userdir_enum # Apache user directory enumeration
auxiliary/scanner/http/http_put            # test upload/delete via HTTP PUT/DELETE
auxiliary/scanner/http/http_git            # check for an exposed .git directory
```

HTTP uses port 80 by default and 443 when TLS is configured — treat HTTP and HTTPS as the same protocol wearing different clothes, not two separate things to enumerate independently. Response headers often leak the exact server/framework/language stack even when `whatweb` doesn't catch it. Status codes worth knowing at a glance: `200` success, `301`/`302` redirect (worth following, it often reveals the "real" internal hostname), `401` auth required, `403` forbidden (the resource exists — don't skip it just because it's blocked), `404` not found, `500` server error (sometimes with a stack trace worth reading). For anything beyond simple brute-forcing — crawling a full app, spidering discovered links, intercepting and replaying requests — Burp Suite's crawler or OWASP ZAP's spider are the standard next step up from directory wordlists alone.
