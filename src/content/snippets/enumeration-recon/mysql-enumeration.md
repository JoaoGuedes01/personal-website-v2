---
title: "MySQL enumeration"
description: "Version fingerprinting, schema dumping, and brute-forcing against MySQL (port 3306)."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "sql"
tags: ["mysql", "sql", "enumeration"]
draft: false
---

MySQL enumeration is mostly about one account: `root`. It's frequently the only user that exists, and it's frequently reachable with an empty password — check that before reaching for a full brute-force.

```bash
#################### MYSQL CLI ####################
mysql -h <target_ip> -u root          # try root with no/blank password first
```
```sql
show databases;
use <database_name>;
select count(*) from <table_name>;
```
```bash
#################### NMAP ####################
nmap --script=mysql-empty-password -p3306 <target_ip>            # check for empty root/anon password
nmap --script=mysql-info -p3306 <target_ip>
nmap --script=mysql-users --script-args="mysqluser='root',mysqlpass=''" -p3306 <target_ip>
nmap --script=mysql-databases --script-args="mysqluser='root',mysqlpass=''" -p3306 <target_ip>
nmap --script=mysql-dump-hashes --script-args="username='root',password=''" -p3306 <target_ip>
nmap --script=mysql-query --script-args="query='select count(*) from books.authors;',username='root',password=''" -p3306 <target_ip>

#################### METASPLOIT ####################
auxiliary/scanner/mysql/mysql_version
auxiliary/scanner/mysql/mysql_login          # brute-force
auxiliary/scanner/mysql/mysql_schemadump     # dump entire schema
auxiliary/scanner/mysql/mysql_hashdump       # list users + password hashes
auxiliary/scanner/mysql/mysql_writable_dirs
auxiliary/scanner/mysql/mysql_file_enum
admin/mysql/mysql_sql                        # run an arbitrary SQL query with valid creds

#################### HYDRA ####################
hydra -l root -P passwords.txt <target_ip> mysql
```

Default port is `3306`. Because `root` is so often the only account and so often has a blank password in test/lab environments, the empty-password check is worth running before a full wordlist brute-force — it's a one-line nmap script and saves real time when it hits.
