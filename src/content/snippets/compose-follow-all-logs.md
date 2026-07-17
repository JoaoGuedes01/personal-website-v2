---
title: "Follow logs across every Compose service at once"
description: "One command to tail all services in a docker compose project, with sane history and timestamps."
pubDate: 2026-05-30
category: "DevOps"
lang: "shell"
tags: ["docker", "logs"]
draft: false
---

When something breaks in a multi-service stack, you want *all* the logs, live, in one place:

```shell
# Follow every service, show the last 100 lines, prefix with timestamps
docker compose logs -f --tail=100 --timestamps
```

Narrow to a couple of services when the noise is too much:

```shell
docker compose logs -f api worker
```

And if you only care about what's happened since a point in time:

```shell
docker compose logs --since 15m
```

`-f` follows, `--tail` bounds the backlog so you don't scroll forever, and `--since` is perfect
for "what happened in the last quarter hour?".
