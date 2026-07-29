---
title: "SP Mobile"
summary: "Progressive Web Application (PWA) that automates and integrates 3 different platforms into one via ERPs/CRMs, Web Services and Web APIs"
type: "Academic"
category: "Backend & Systems Architecture"
stack: ["Node.js", "Express.js", "MongoDB", "Salesforce", "HubSpot", "Moloni", "Nodemailer", "Twilio", "PayPal", "Google Maps", "Facebook API", "Twitter API", "EasyInvoice"]
featured: false
resume: false
order: 92
draft: false
org: "University of Minho"
orgUrl: "https://www.uminho.pt/"
repo: "https://github.com/JoaoGuedes01/ISI-IntegratedApp"
video: "https://www.youtube.com/watch?v=f_Q1Jtap5WI"
year: 2021
gallery:
  - { src: ./img/sp-mobile/cover.png, alt: "Cover Image", caption: "SP Mobile Cover Image." }
  - { src: ./img/sp-mobile/track-creation.png, alt: "Track Creation Image", caption: "Interface for creating new tracks." }
  - { src: ./img/sp-mobile/track-creation.png, alt: "Track Creation Image", caption: "Interface for creating new tracks." }
  - { src: ./img/sp-mobile/admin.png, alt: "Admin Image", caption: "The admin panel with track listings." }
  - { src: ./img/sp-mobile/race.png, alt: "Race Image", caption: "Creating a new race." }
  - { src: ./img/sp-mobile/race-approval.png, alt: "Race Approval Image", caption: "Approving a newly created race on the Federation side." }
  - { src: ./img/sp-mobile/promotings.png, alt: "Promotings Image", caption: "Listing of event promotions by Webcelos." }
  - { src: ./img/sp-mobile/championships.png, alt: "Championships Image", caption: "Listing of championships." }
  - { src: ./img/sp-mobile/sp-championships.png, alt: "SP Championships Image", caption: "Listing of championships on SP Mobile platform." }
  - { src: ./img/sp-mobile/social-media-automation.png, alt: "Social Media Automation Image", caption: "Promoting a race automatically on social media." }
  - { src: ./img/sp-mobile/account-registration.png, alt: "Account Registration Image", caption: "Account creation confirmation e-mail." }
---

## Overview

Developed for the *Implementation of Information Systems* course, **SP Mobile** was built to solve a real-world operational bottleneck for SP Modelismo, a specialized remote-controlled (RC) racing company based in Barcelos, Portugal.

The company's core operations are licensing new pilots and hosting official racing events. These were severely hindered by slow, email-driven communication with the Portuguese Federation for RC Events. To eliminate these administrative delays, this project introduced a centralized orchestration middleware that synchronized data in real time across three separate business entities, each operating on its own enterprise platform:

*   **SP Modelismo:** Managed via **Salesforce CRM**.
*   **RC Event Federation:** Managed via **HubSpot CRM**.
*   **WebCelos (Marketing & Logistics):** Managed via **Moloni ERP**.

## Architecture & Integration Middleware

Rather than building an isolated, single-database web app, the project acted as an integration hub that enabled automated cross-system communication between enterprise CRMs, external APIs, and a mobile Progressive Web App (PWA).

### Multi-System API Orchestration

*   **Automated Event Licensing:** Created a synchronized pipeline where event requests initiated in Salesforce automatically populated as deals/tickets inside HubSpot for Federation approval, updating status flags across systems without manual email exchanges.
*   **Role-Based Auth & Scoped Routes:** Implemented granular authentication layers (`UserAuth`, `AdminAuth`, `FedAuth`, and `WebAuth`) to isolate endpoints based on entity permissions.
*   **Bi-Directional Workflows:** Allowed administrators and Federation officials to approve licenses, manage tracks, and query system states directly through unified endpoints (`/federation/requests`, `/admin/licenses`, `/user/requestLicense`).

## Value-Added Third-Party Services

To provide a complete digital ecosystem for pilots and event organizers, the Node.js backend integrated a suite of cloud services:

*   **Payments & Invoicing:** Integrated **PayPal API** for pilot licensing and entry fee transactions (with refund capabilities), paired with **EasyInvoice** for automated PDF receipt generation.
*   **Communications & Telemetry:** Configured **Twilio SMS** and **Nodemailer** to send real-time SMS notifications, starting grid positions, and classification proofs directly to pilots.
*   **Social & Location Integration:** Used **Google Maps API** for venue visualization and automated event broadcasts across **Facebook and Twitter APIs**.
*   **Leaderboards:** Utilized **MongoDB** to handle high-speed reads for global pilot rankings and event standings.

## Key Learnings & Retrospective

*SP Mobile* represented a major shift from traditional software development to enterprise system architecture. 

Designing an integration engine that communicated across multiple distinct platforms (Salesforce, HubSpot, Moloni) required navigating disparate API specs, rate limits, and asynchronous data sync issues. Despite the complexity of coordinating multiple enterprise platforms on a single backend, the project successfully digitalized the licensing workflow and earned us yet another perfect score (20/20).
