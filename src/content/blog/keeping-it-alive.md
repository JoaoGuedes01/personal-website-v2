---
title: "Keeping It Alive"
description: "Part 5 of my homelab story, backups on PBS, what's worth backing up, disk health, monitoring and how I handle updates."
pubDate: 2026-11-13
tags: ["homelab", "proxmox", "backups", "monitoring", "self-hosting"]
draft: false
featured: true
series: "homelab"
part: 5
cover: ./img/keeping-it-alive/cover.webp
coverAlt: "The Proxmox Backup Server logo: an orange and black X mark next to the words Proxmox Backup Server."
gallery:
  - { src: ./img/keeping-it-alive/status-page.webp, alt: "The public status page showing Jellyfin, Navidrome, Seerr and Pi-hole DNS all at 100 percent.", caption: "The public status page." }
  - { src: ./img/keeping-it-alive/discord-digest.webp, alt: "A Discord channel with three cards from the Jarvis app: a monitoring installed confirmation, a Proxmox test notification and a daily digest of disks, ZFS, CPU, containers and memory.", caption: "Jarvis in Discord: the setup confirmation, a Proxmox test and the daily digest." }
  - { src: ./img/keeping-it-alive/discord-recovered.webp, alt: "A red critical card saying a container is not running, with a next step to start it, followed by a green card saying it recovered.", caption: "A critical alert and its recovery. I stopped a container on purpose to test it." }
  - { src: ./img/keeping-it-alive/apply.webp, alt: "Terminal output of the monitoring script's install and verification steps, all marked OK, ending with 62 OK and 0 failures.", caption: "The end of an --apply run: install, verification and test messages to Discord." }
  - { src: ./img/keeping-it-alive/smart-sata.webp, alt: "SMART values of a SATA drive with zero error counters.", caption: "SMART values for one of the data drives." }
  - { src: ./img/keeping-it-alive/smart-nvme.webp, alt: "SMART health information of the NVMe system drive.", caption: "The NVMe system drive, 1% worn." }
  - { src: ./img/keeping-it-alive/zfs-pool.webp, alt: "ZFS pool status with a healthy mirror and a clean scrub.", caption: "The ZFS pool after the last scrub." }
---

Everything so far was about building things. This last part is about the boring work that makes them last: backups, monitoring and updates.

None of it is exciting until the day it saves you. And that day always comes.

## The best second life for the Frankenlab

When I took the [Frankenlab](/blog/the-frankenlab) apart, I didn't throw the parts away. Instead it became my **Proxmox Backup Server** (PBS), and I think it's the best job it could have had. A backup server doesn't need to be fast, it just needs to be reliable and separate from what it protects. The components I had lying around were more than enough for the job.

It's a pretty small setup:

- **The system** runs on one of the old 500 GB drives, as it did in the Frankenlab.
- **The backups** go to a brand-new 1 TB disk, bought specifically for the backup job.

The first rule of backups is that they can't live on the thing they protect. A second physical machine means a dead disk, a bad update or a mistake in the main lab doesn't take the backups with it.

:::note[Why Proxmox Backup Server]
PBS is built specifically for Proxmox, so there's almost nothing to set up. It does **incremental** backups, which means only the parts that changed since the last run get copied, and it **deduplicates** them, so identical data is stored only once. After the first full backup, new ones are very small and fast.
:::

## What gets backed up

I back up the **whole lab at the Proxmox level**: every container, with its configuration and disk. If the main machine dies, I can restore the containers onto new hardware and be back up quickly, with every service just as I left it.

The data is different. I only back up what I can't get back because storage is the real constraint here:

- **Backed up:** the things that are mine alone, like my photos, home videos, my own files and application configuration, which is small and cheap to back up.
- **Not backed up:** movies, shows and most of the music. They're the bulk of my storage, and they can be downloaded or ripped again. It would take a long time, but I'd lose nothing that can't be replaced. Backing up the media I already have, over 3 TB, would also eat a lot of storage, and that's not what this lab is for. If I lost it, I'd rip it again from my own discs.

That decision is why a single 1 TB disk is enough. Backing up a library you can rebuild would cost me a lot of disk for very little protection.

:::tip[Ask yourself what data is truly important]
Go through your storage and ask of each folder: *if this vanished tomorrow, could I get it back?* Anything you can doesn't need a real backup. Spend your valuable backup space on what's left. Photos are the classic example, which is why [Immich](/blog/the-infrastructure) only goes live once my backups are sorted.
:::

## Backups and the 3-2-1 rule

A mirror, which I covered in [part 2](/blog/the-rebuild), protects me from a dead drive. A backup protects me from everything else: a deleted file, a bad update, a corrupted database.

The usual rule of thumb is **3-2-1**: three copies of your data, on two different kinds of storage, with one of them off-site. Right now I have the live data and a backup on a second machine. A copy off-site is the next step. It doesn't need to be big, since only the irreplaceable data has to go.

### Schedule

As of now I run backups weekly, which means that in the worst case I lose up to a week of changes. Since PBS is incremental, running them every night costs very little extra, so a nightly schedule would be a better fit and I'm thinking of moving to it.

:::warning[Check your backups]
The next worst thing to a missing backup is one that doesn't work when you need it. PBS can **verify** its backups on a schedule, re-reading them to check nothing has rotted, and I recommend turning this feature on. Every so often, restore a container somewhere to check that the whole path still works if you need it.
:::

## Watching the disks

Disks fail, and they usually start displaying some warnings first. Every drive keeps a health report about itself called **SMART**: reallocated sectors, pending sectors, temperature, error counts and so on. The trick is to read it on a schedule, without having to remember.

On my main host, a small service called `smartd` does it. A **quick test** runs every Sunday early in the morning and a **long surface scan** runs once a month. The long scans are staggered, so the drives never scan at the same time.

![The SMART values of a SATA drive in Proxmox: raw read error rate, reallocated sectors, power-on hours, temperature and pending sectors, with zero for every error counter.](./img/keeping-it-alive/smart-sata.webp)

*One of the data drives. The lines I watch are reallocated sectors, pending sectors, offline uncorrectable and the CRC error count, which should all be zero.*

NVMe drives report a different set of numbers. The ones that matter are the temperature, **Percentage Used**, which is how much of the drive's rated write life is gone, and **Available Spare**.

![The SMART health information of an NVMe drive: critical warning 0x00, 33 Celsius, available spare 100 percent and percentage used 1 percent.](./img/keeping-it-alive/smart-nvme.webp)

*The system NVMe: 1% worn after several months, with its spare capacity untouched.*

The Proxmox interface shows these numbers for the moment you open it. It doesn't keep a history, so I let a daily message from my monitoring tell me when something starts to drift. More on that below.

On the media pool, ZFS keeps its own watch. A monthly **scrub** reads every block and repairs anything corrupted from the other half of the mirror.

![The status of the ZFS pool: online, last scrub repaired 0 bytes with 0 errors, and both mirror disks online with zero read, write and checksum errors.](./img/keeping-it-alive/zfs-pool.webp)

*The pool's status: both halves of the mirror online and the last scrub clean.*

Two habits are worth having:

- **Run a short test often and a long one less often.** The quick test catches sudden problems and the long surface scan catches the slow ones. Weekly and monthly is a good rhythm, and a daily quick test is cheap if you want to tighten it.
- **Get told when something's wrong.** A health check you don't read is useless, so make sure a warning reaches your phone. Mine arrive on Discord.

## Monitoring

I don't run a heavy monitoring stack, and I don't think a lab like mine needs one, at least for now. I have three monitoring layers that report back to me in a Discord channel, through a webhook I named **Jarvis**.

I use Discord because I like it a lot as a developer and because a webhook doesn't need a bot to maintain. It also supports rich messages, which is what makes the alerts below easy to read. I used a Telegram bot before, and moving over is part of why the scripts are written the way they are, more on that at the end.

| Layer | Purpose |
| --- | --- |
| Uptime Kuma | Are the **services** up? |
| Host health script | Is my **machine** healthy? |
| Heartbeats | Is the **monitoring itself** still running? |

Proxmox's own graphs are still the first place I look when something feels slow, and ProxMenux helps with routine host maintenance. I let `smartd` own the SMART schedule, so two tools never run the same tests.

### Uptime Kuma

Uptime Kuma checks every service once a minute and retries twice before it concludes that something is down. It uses the check that fits each service: a ping for a machine, a health endpoint for a web app, an open-port test for something with no web page, and a real DNS lookup through Pi-hole to prove that name resolution works, not just that the container is up. If any of these checks fail, a message lands in that same Discord channel.

Kuma can also publish **status pages**, and I use two. The **public** one shows only the handful of services other people use, in three groups: Streaming, Requests and Network. The **internal** one shows everything and is reachable only from inside the house. Each page lists its monitors by name, so nothing appears publicly by accident.

![My public status page, titled Guedes Services, showing All Systems Operational with Jellyfin, Navidrome, Seerr and Pi-hole DNS all at 100 percent.](./img/keeping-it-alive/status-page.webp)

*The public status page. If something here goes red, someone else is probably about to tell me.*

### The host health script

Uptime Kuma can tell me a service is down but it can't tell me a disk is slowly dying, a pool is getting full or a scrub has been skipped. For that I have one script, run on the Proxmox host, that sets everything up in one go:

- **`smartd`** is configured from the live list of disks, with the quick and long tests described above, and its alerts go to Discord.
- **A ZFS event hook** forwards the events that matter, like scrubs starting and finishing, state changes and I/O failures.
- **A health check every 10 minutes** looks at the things in the table below.
- **A daily digest at 08:00** sends one summary message, so I see the lab's vitals every day.
- **A Proxmox notification target** sends Proxmox's own notifications, such as a failed backup job, to the same channel through a webhook target.

| Area | What it watches |
| --- | --- |
| ZFS | Pool health, capacity above 85%, and a scrub that's too old or never ran |
| SATA disks | SMART health, reallocated, pending and uncorrectable sectors, cable errors, temperature |
| NVMe | Critical warnings, wear, spare capacity, temperature |
| Host | CPU temperature, full thin pool or root filesystem, swap, low memory |
| Services | Containers that aren't running, failed system services, `smartd` or the ZFS event service not running |

Every alert is a Discord card with a coloured bar for its severity: red for critical, orange for warning, green for ok and blue for information. The top line gives the severity and the area (such as `CRITICAL · HOST HEALTH`) then comes a title, a short subtitle, a few fields (any percentage gets a small bar) and, when there is any action to be taken, a **Next step** line with the command to run.

![A red critical card saying a container is not running, with a next step to start it, followed by a green card saying it recovered.](./img/keeping-it-alive/discord-recovered.webp)

*A critical alert and its recovery. I stopped Jellyfin on purpose to test it.*

The health check is built not to nag. It tells me **once** when a problem appears, reminds me **every 24 hours** while it's still broken, as "Still broken", and sends a green card when it **recovers**, with how long it was down. The 0 minutes above is because I started the container again straight away.

![A Discord channel with three cards from the Jarvis app, a monitoring installed confirmation, a Proxmox test notification and a daily digest of disks, ZFS, CPU, containers and memory.](./img/keeping-it-alive/discord-digest.webp)

*Jarvis in Discord: the setup confirmation, a Proxmox test and the daily digest. Everything I'd want to know on a good day.*

### Who watches the watchmen?

A monitor is great for watching over the lab, but if the monitor itself stopped, how would I know? So three of the Kuma monitors work the other way round, as **heartbeats**. The health check pings Kuma every 10 minutes, the digest pings it daily and a clean ZFS scrub pings it monthly. If a ping doesn't arrive on time, Kuma alerts me.

That covers the script dying, but it has the same limit as everything else here because Kuma runs inside the lab. It watches my **apps** and the health of the machine, not whether the whole lab is up. Watching the lab from the outside needs a monitor that lives *outside* it. If the monitoring runs on the machine it monitors, a full crash takes it down as well and nobody gets an alert. Moving it out is a step I want to take once the more important things are done.

### Setting it up, and setting it up again

The scripts are what let me rebuild all of this without remembering how. The Discord webhook URL is a secret, because anyone who has it can post in my channel. It lives in a file only root can read, and the scripts never put it on a command line. The host script reads it from that file and the Kuma script takes it from the environment. There are five scripts, and every one of them **does nothing unless told to**:

- **The host script** runs a **dry run** by default. It checks the system, the Discord webhook (with a read-only request) and its generated files, shows the plan and says READY or NOT READY. Adding `--apply` backs up the old setup, installs the new one, verifies it and **rolls back** if anything fails. Re-running it at any time recreates the same setup, `--verify` checks an existing install and `--uninstall` removes everything it added.
- **The host cleanup script** exists because I moved from Telegram to Discord. It finds everything the earlier versions installed, backs it up, removes it and moves the webhook into the new settings file, so the setup script always starts from a clean host. On a host that is already clean it says so and does nothing.
- **The Kuma script** also dry-runs first, then creates the Discord notification, the monitors and the heartbeat monitors, and prints the heartbeat addresses to put in the host script's settings. A small companion script removes the old Telegram notification from Kuma.
- **The status page script** creates the two pages from lists of monitor names.

![Terminal output of the end of an apply run: the install steps and the verification checks all marked OK, ending with 62 OK, 0 warnings and 0 failures.](./img/keeping-it-alive/apply.webp)

*The end of an `--apply` run: install, verification and the test messages to Discord, 62 OK and 0 failures.*

:::tip[Write down what your scripts do]
If you automate something, put the *why* next to it. A year from now, "what does this script do and what happens if I run it twice?" should have an answer you wrote down. I wrote it here, in the post, for exactly that reason.
:::

## Updates

I update everything **by hand**, and I read what a new version changes first. It's slower than automatic updates, but I know what's running and I've never been surprised by an overnight change.

It does have a cost: I have to remember to do it. The risk of falling behind is very real, since an old version of a public service is an easy way of letting a vulnerability slip by.

So I see this as the thing I most want to improve. I'd still vet every update myself, but I'd automate everything around that:

- **Notifications of new versions**, so I'm told rather than needing to remember to look.
- **A snapshot or fresh backup before every update**, which makes rolling back a few clicks. Proxmox makes this easy.
- **Updating the most exposed services first**, which are the few that are reachable from the internet.

:::tip[Never update without a way back]
Before touching anything important, take a snapshot. If the update goes wrong, rolling back takes a minute.
:::

## Main takeaways

- **Give your old hardware a second life as a backup server.**
- **Decide what's irreplaceable** and back up only that.
- **Back up often.** If your backups are incremental, daily costs almost nothing.
- **Verify and restore.** If you never tried restoring you're just hoping that it works when you need it.
- **Have an off-site copy** of the data you can't live without.
- **Get told when something breaks.** Monitoring that you don't see is useless.
- **Update your software often but responsibly.**
- **Snapshot before every update.**

## The end of the beginning

It started with a cost-free machine built from leftovers and me getting my feet wet in this beast of a hobby. It ends with a quiet, capable and efficient box in my study, in a case that blends in and isn't an eyesore. It runs the whole house's media, names, logins and passwords, and it's backed up to the hardware that started it all.

The best part is how many people use it now. A lab is never really finished, though, and there's a list of apps I want to try next. I'll write about them when they're running. For now this is everything. Happy labbing!