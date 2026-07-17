---
title: "Prune Docker without nuking your volumes"
description: "Reclaim disk from dangling images, stopped containers and unused networks — while leaving your data volumes alone."
pubDate: 2026-06-21
category: "DevOps"
lang: "shell"
tags: ["docker", "ops"]
draft: false
---

`docker system prune` is great until the day it takes a volume you needed. The safe default
leaves volumes untouched:

```shell
# Removes stopped containers, dangling images, unused networks & build cache.
# Volumes are NOT touched.
docker system prune

# Also drop *all* unused images (not just dangling), still keeping volumes:
docker system prune -a
```

When you *do* want to reclaim volumes, be explicit and look first:

```shell
# List volumes not attached to any container
docker volume ls -f dangling=true

# Remove only those, after you've read the list
docker volume prune
```

Rule of thumb: never pass `--volumes` to `system prune` on a box that holds data you care about.
Prune images and containers freely; treat volumes like the state they are.
