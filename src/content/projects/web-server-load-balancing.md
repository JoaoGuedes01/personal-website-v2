---
title: "Web Server Load Balancing"
summary: "Containerized automatic system that balances webserver load between a scalable cluster's instances of a service and keeps comunication private inside dedicated networks."
type: "Academic"
category: "Backend & Systems Architecture"
stack: ["Docker", "Docker Compose", "Traefik", "Powershell", "Node.js", "Express.js", "Javascript", "MongoDB"]
featured: false
resume: false
order: 87
draft: false
org: "University of Minho"
orgUrl: "https://www.uminho.pt/"
repo: "https://github.com/JoaoGuedes01/iti-docker-cluster"
year: 2022
gallery:
    - { src: ./img/web-server-load-balancing/cover.png, alt: "Cover Image", caption: "The project cover image." }
    - { src: ./img/web-server-load-balancing/app.png, alt: "App Image", caption: "Sample App for the web server to serve." }
    - { src: ./img/web-server-load-balancing/traefik.png, alt: "Traefik Image", caption: "Traefik dashboard with load balancing rules." }
    - { src: ./img/web-server-load-balancing/compose.png, alt: "Compose Image", caption: "Spinning up traefik, database and webserver replicas." }
    - { src: ./img/web-server-load-balancing/docker-desktop.png, alt: "Docker Desktop Image", caption: "Docker Desktop stack container overview." }
---

## Overview

Developed for the *Infrastructures of Information Technology* course, **Web Server Load Balancing** is a high-availability infrastructure project demonstrating containerized service orchestration, network segregation, and dynamic traffic distribution.

## Architecture & Infrastructure Design

The platform uses **Docker** and **Docker Compose** to manage isolated network zones and service replicas, ensuring scalable and resilient web application delivery:

*   **Network Segregation:** Divided into two isolated networks: `Frontend` (exposing Traefik reverse proxy and web server containers) and `Backend` (isolating MongoDB and web server instances from direct external access).
*   **Load Balancing with Traefik:** Configured **Traefik** as a reverse proxy/load balancer that dynamically routes inbound HTTP traffic across 5 replicated Node.js web server instances using container labels/tags.
*   **Containerized Data Layer:** Integrated a dedicated **MongoDB** instance connected exclusively on the internal backend network for database persistence.
*   **Automation & Management Abstraction:** Built a custom **PowerShell** script (`.ps1`) to wrap complex Docker Compose CLI operations, simplifying deployment, scaling, and teardown for administrators.
*   **Private Connectivity:** Configured a secure **ZeroTier VPN** overlay network for administrative access to distributed infrastructure services.

## Key Learnings & Outcomes

*   **DevOps & Containerization:** Mastered Docker container lifecycle management, network isolation, service discovery, and Docker Compose orchestration.
*   **Reverse Proxies & Routing:** Gained practical expertise configuring Traefik for dynamic load balancing and traffic management across scaled microservices.
*   **Automation:** Developed shell/PowerShell automation scripts to streamline environment provisioning and management.
*   **Academic & Professional Recognition:** Awarded a 20/20 final grade and received an internship offer from the course professor based on the quality and completeness of the architecture.