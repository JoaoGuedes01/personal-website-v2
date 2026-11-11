---
title: "xfreerdp: RDP client from Linux"
description: "Connect to a Windows host over RDP from the command line."
pubDate: 2026-11-11
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["xfreerdp", "rdp", "windows"]
draft: false
---

The straightforward way to use RDP credentials once you have them, without needing a Windows box of your own to run `mstsc.exe` from. It creates an entire GUI session on the target machine.

## Connect

```bash
xfreerdp /u:<username> /p:<password> /v:<target_ip>:<port>
```

## Gotchas

- RDP requires a legitimate account and its cleartext password on the target. There's no equivalent to SMB's pass-the-hash here.
- If a target isn't listening on the default `3389`, admins commonly move it to a non-standard port to cut down on drive-by brute-force noise, so a full port sweep is worth doing before assuming RDP isn't running at all.

## Related

- [RDP enumeration](/snippets/cybersecurity/enumeration-recon/rdp-enumeration): confirm RDP is up and find valid accounts
- [RDP exploitation](/snippets/cybersecurity/exploitation/remote-service-exploitation/rdp-exploitation): brute-force, BlueKeep, enabling RDP post-exploitation
- [Nmap](/snippets/cybersecurity/tools/scanning-enumeration-tools/nmap): find RDP on non-standard ports
- [Hydra](/snippets/cybersecurity/tools/credential-attack-tools/hydra): brute-forcing RDP credentials
