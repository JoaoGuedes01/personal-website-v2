---
title: "SD Social App"
summary: "Twitter-like social app and distributed system based on java sockets focused on traffic rules and flow over the network."
type: "Academic"
category: "Backend & Systems Architecture"
stack: ["Java", "TCP Sockets", "Java RMI", "JavaFX", "Scene Builder"]
featured: false
resume: false
order: 89
draft: false
org: "University of Minho"
orgUrl: "https://www.uminho.pt/"
repo: "https://github.com/JoaoGuedes01/SDFinal"
year: 2021
gallery:
   - { src: ./img/sd-social-app/cover.png, alt: "Cover Image", caption: "SD Social App Cover Image Diagram." }
   - { src: ./img/sd-social-app/login.png, alt: "Login Image", caption: "Login and Register form." }
   - { src: ./img/sd-social-app/home.png, alt: "Home Image", caption: "Homepage and main message board." }
   - { src: ./img/sd-social-app/settings.png, alt: "Settings Image", caption: "User account and client settings." }
   - { src: ./img/sd-social-app/online.png, alt: "Online Image", caption: "Online receipts feature." }
   - { src: ./img/sd-social-app/friend.png, alt: "Friend Image", caption: "Friend request with notifications." }
   - { src: ./img/sd-social-app/direct.png, alt: "Direct Message Image", caption: "Direct message feature." }
---

## Overview

Developed for the *Distributed Systems* course, **SD Social App** is a Twitter-like desktop social platform built to demonstrate core computer networking models and communication protocols.

The project was designed around two distinct network architectures:
*   **Client/Server Architecture:** A centralized server manages persistent user accounts, authentication, online presence tracking, and queues messages for offline users.
*   **Peer-to-Peer (P2P) Architecture:** Nodes establish direct socket connections to bypass the central server whenever both users are online, enabling direct real-time messaging and friend request handling.

## Core Features & Network Logic

*   **Hybrid Routing & Persistence:** Built custom logic using Java Sockets for direct peer communication and Java RMI (Remote Method Invocation) for central server operations. File-based logging ensures account credentials and friend lists persist across server restarts.
*   **Offline Message Queueing:** If a recipient is offline, private messages and friend requests are automatically routed to the central server, flagged as "pending delivery," and pushed to the recipient upon their next login.
*   **Friends Boards & Group Feeds:** Implemented shared message boards accessible across mutual friend networks, functioning as shared feeds where board posts are propagated to authorized peers.
*   **Presence & Notification Management:** Real-time online/offline monitoring allows peers to query network state, with toggleable client notification modes (such as "Do Not Disturb").

## Challenges & Key Learnings

Building a distributed system from scratch without high-level framework abstractions provided deep insight into low-level socket management and async networking:

*   **Low-Level Socket Architecture:** Mastered multi-threaded socket handling, connection pooling, and payload serialization across disparate network nodes.
*   **JavaFX UI Integration:** Created a desktop UI using JavaFX and Scene Builder, synchronizing state updates between background network threads and the main application thread.
*   **Self-Reliant Implementation:** Built raw protocol logic without relying on third-party networking libraries, gaining a thorough understanding of network protocols, edge cases, and thread synchronization.