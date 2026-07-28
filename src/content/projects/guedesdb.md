---
title: "GuedesDB"
summary: "guedesDB is a lightweight, to the point, local file-based database for node.js projects."
type: "Personal"
category: "Backend & Systems Architecture"
stack: ["Node.js", "Javascript", "npm"]
featured: false
resume: false
order: 94
draft: false
repo: "https://github.com/JoaoGuedes01/guedesDB"
demo: "https://www.npmjs.com/package/guedesdb"
year: 2021
gallery:
  - { src: ./img/guedesdb/cover.png, alt: "Cover Image", caption: "GuedesDB Cover Image." }
  - { src: ./img/guedesdb/package.png, alt: "Package Image", caption: "GuedesDB NPM package README." }
  - { src: ./img/guedesdb/methods.png, alt: "Methods Image", caption: "GuedesDB NPM package API methods." }
  - { src: ./img/guedesdb/filetype.png, alt: "Filetype Image", caption: "GuedesDB custom .gds filetype." }
---

## Overview

**guedesDB** was created to address a common pain point in small-scale utility scripts and prototypes: standard database engines (like MySQL or MongoDB) are often complete overkill, introducing unnecessary connection boilerplate, configuration overhead, and background daemons. 

Built in a single week as a pure Node.js package, **guedesDB** replicates core database functionality by abstracting the host file system into an intuitive CRUD API. It allows developers to store, query, and manipulate custom data entities locally without installing heavy database dependencies. It's a fun DIY project akin to sqlite but with a Guedes twist.

## Core Features & Capabilities

*   **Dual Storage Scopes (Local vs. Global):** Configurable storage behavior via a simple JSON config. Databases can live isolated inside the target project directory (`"local"`) or globally on the system host (`"global"`), allowing multiple Node applications to read and write to a shared data pool.
*   **Custom Storage Format (`.gds` Files):** Data structures are serialized and stored under custom `.gds` extensions within automatically provisioned entity subdirectories.
*   **Dynamic ID Management:** Built-in auto-incrementing logic tracks active and deleted keys, guaranteeing ID uniqueness across record creation cycles.
*   **Intuitive Query Interface:** Provides clean wrapper functions to query records by exact ID, search collections by specific key-value attributes, or retrieve whole entity collections.

## Architecture & Technical Choices

The primary goal of the project was to create a functional database abstraction layer without relying on external third-party libraries:

*   **Zero-Dependency Design:** Written strictly using core native Node.js modules (such as `fs` and `path`), ensuring an extremely lightweight footprint with zero supply-chain overhead.
*   **Directory-as-Collection Paradigm:** Calling `SetupFolders()` automatically parses system paths and provisions organized folder structures for incoming record types (`users`, `logs`, etc.).
*   **NPM Ecosystem Distribution:** Packaged, documented, and published directly to the **npm** registry (`npm i guedesdb`), making it instantly installable across any Node environment.

## Retrospective

Building *guedesDB* was a rewarding exercise in demystifying database primitives. Writing low-level filesystem logic in Node.js brought a much deeper appreciation for how full-scale database engines handle atomic file I/O, state synchronization, and index mapping. 

While `.gds` files are effectively serialized JSON under the hood, stripping away heavy database drivers for small scripts proved that building lightweight, custom-tailored tools is often the most satisfying way to learn.