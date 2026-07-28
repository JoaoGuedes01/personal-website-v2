---
title: "ABI Interoperability System (Master's Thesis)"
summary: "Interoperability system that turns HL7 & FHIR healthcare data into ML-ready inputs for Adaptive Business Intelligence models."
type: "Academic"
category: "Backend & Systems Architecture"
stack: ["Node.js", "Javascript", "JWT", "Swagger OpenAPI", "MySQL", "PostgreSQL", "RabbitMQ", "Docker", "Docker Compose", "Mirth Connect", "Python", "Jupyter Notebooks", "Pandas", "React", "Ant Design", "Monaco Editor", "GitHub", "GitHub Actions", "GitHub Pages", "Apache JMeter", "Cypress", "Debian", "Portainer"]
featured: false
resume: false
order: 79
draft: false
org: "University of Minho"
orgUrl: "https://www.uminho.pt/"
repo: "https://github.com/orgs/ABI-Interoperability-Thesis/repositories"
demo: "https://abi-interoperability-thesis.github.io/interoperator-starter/"
year: 2023
gallery:
  - { src: ./img/abi-interoperability/login.png, alt: "Login Image", caption: "The Web App Login Page." }
  - { src: ./img/abi-interoperability/dash.png, alt: "Dashboard Image", caption: "The Admin dashboard." }
  - { src: ./img/abi-interoperability/req.png, alt: "Requests Image", caption: "The Client Requests listing." }
  - { src: ./img/abi-interoperability/channel.png, alt: "Channel Image", caption: "Mirth Connect HL7 Parser Channel details." }
  - { src: ./img/abi-interoperability/model.png, alt: "Model Image", caption: "Model details and admin settings with mappings, validators and processors." }
  - { src: ./img/abi-interoperability/client.png, alt: "Client Image", caption: "Client details." }
  - { src: ./img/abi-interoperability/validators.png, alt: "Validators Image", caption: "Listing of system's validators, this can and should be expanded as the system is used." }
  - { src: ./img/abi-interoperability/processors.png, alt: "Processors Image", caption: "Listing of system's processors, this can and should be expanded as the system is used." }
  - { src: ./img/abi-interoperability/about.png, alt: "About Image", caption: "Displays the system's microservices as well as their states." }
---

> ℹ️ **Not a Live Demo:** ABI Interoperability is a distributed system of microservices, which makes it impractical to host for free on the kind of traditional platforms these project demos usually rely on. Instead, the demo link leads to a starter web app, akin to Spring Initializr but for this system, that lets you configure the stack and bootstraps a ready-to-deploy Docker Compose setup from your choices.

## Overview

*ABI* stands for **Adaptive Business Intelligence**: systems that lean on specialized, predictive machine-learning models (not LLMs) to serve narrow, highly optimized goals, things like optimizing operating-room schedules or estimating a patient's likelihood of developing diabetes from factors such as age, sex, and nutrition habits. In a hospital, these models are only as useful as the data you can feed them, and that data is usually very specialized and hard to build. The thing is there's a huge untapped potential locked inside rigid healthcare-interoperability standards like **HL7** and **FHIR**, where it tends to sit purely for forensic and documentation purposes.

My master's thesis at **University of Minho**, carried out with a partner hospital, set out to unlock that data. I designed and built an entirely new interoperability system: a comprehensive pipeline for extracting, validating, and transforming standardized healthcare messages into clean, model-ready inputs, so that dormant HL7 and FHIR traffic could drive the hospital's ABI models.

## Rebuilding HL7 & FHIR

Before anything could consume these standards, the system needed a precise, machine-usable understanding of them, so I rebuilt them from the ground up.

I manually remodeled the **HL7** and **FHIR** specifications, versioned them correctly, and supported multiple versions of each deliberately setting a precedent for adding future versions later. Each supported version is captured as a generated static specification file describing the pattern in full, giving the rest of the system a single, authoritative source to validate and map messages against.

## The Configuration Pipeline

The heart of the system is a fully admin-configurable pipeline that turns a raw message into an ML input. Setting up a new model handler is a guided, design-time process:

*   **Extract:** the admin declares a model's inputs and maps each one to a specific field in an HL7 or FHIR message.
*   **Validate:** each field gets validation rules that it returns a string, or a date in `yyyy-mm-dd` format, and so on expressed with regex where needed.
*   **Transform:** a processor shapes and transforms each value into what the model expects, for instance deriving an age from a date of birth, converting a string to camelCase, or resolving a slug to an enumeration.

Every one of these steps ships with strong, database-seeded defaults (like the age-from-birthdate transformer) that admins can pick off the shelf, and the defaults library itself is extensible. When the defaults aren't enough, admins can write their **own transformers and validators in JavaScript**, directly in an embedded **Monaco Editor** in the frontend.

Letting users run arbitrary code is a security minefield, so custom logic executes through a sandboxed `eval` constrained by a whitelist of permitted tokens keeping the flexibility while fencing off anything dangerous.

Finally, the admin decides which message types the handler accepts (HL7, FHIR, or both, depending on the support configured) and which clients may call it, whether a specific subset or everyone.

## Architecture & Message Flow

At runtime the system is a set of microservices coordinated around an asynchronous, queue-based core:

*   **REST-first client calls:** a client with access calls the REST API for a model, supplying one or more messages. That triggers the admin-defined pipeline, which extracts, validates, and transforms the data into a model input and drops a new request onto a **RabbitMQ** requests queue.
*   **Decoupled ML execution:** an ML-runner listener picks the request up, runs the requested model against the input, and pushes the outcome, success or error alike, onto a responses queue. A listener on my side consumes it and moves the request's state from `pending` to `completed` or `error`.
*   **Mirth Connect for HL7:** HL7 parsing is delegated to **Mirth Connect** over HTTP. Rather than expecting one to already exist, the system provisions Mirth automatically, or connects to an existing instance, and sets up the channel it needs without any manual intervention.
*   **Split persistence:** the system keeps all of its own state, model handlers, pipeline definitions, seeded defaults, and every request, in **MySQL**, while a separate **PostgreSQL** instance exists purely to back Mirth Connect, which depends on it.
*   **RBAC throughout:** every capability is gated by role. Admins configure the entire system, every microservice and setting, through the UI (with only a few knobs tied to Docker Compose environment variables, though every service is env-configurable). Clients only ever see and call the models they've been granted.

Because the intended audience is developers integrating models programmatically rather than clicking through a UI, the client experience is built around that reality. Clients can browse their past requests and the documentation for every model they can access, re-run or tweak a previous request (but never delete it, preserving an audit trail), and  generate a ready-made HTTP call for any model in their programming language of choice. Deployment leans on Docker Compose, with Portainer giving operators a clean view over the running microservices.

## Validation & Evaluation

Being a thesis, the system had to be provably sound, not merely functional, so testing and measurement were first-class concerns:

*   **End-to-end testing:** user-facing flows were covered with **Cypress**, exercising the frontend and API together the way a real operator or client would.
*   **Non-functional validation:** the architecture and its staging deployment were put under load with **Apache JMeter** to measure the qualities a dissertation has to defend, speed, throughput, and resilience under stress, not just correctness.
*   **Continuous integration:** **GitHub Actions** kept the microservices building and checked on every change across the year of development with `Semantic Versioning` and a complete `CHANGELOG` based on `Conventional Commits`.
*   **Results & the written thesis:** on the academic side, I leaned on **Python** (Jupyter and Pandas) to explore the collected results and the citation data behind the dissertation, and to generate every plot and graph in the final document.

## Engineering Trade-offs & Challenges

As a year-long solo thesis this was as much an exercise in scoping an open-ended problem as it was in engineering and system design:

*   **Taming the standards by hand:** HL7 and FHIR are sprawling and unforgiving; modeling and versioning them into clean, usable specifications was painstaking but foundational work.
*   **Safely running admin-authored code:** exposing a JavaScript editor for custom transformers is powerful but genuinely dangerous, and getting the sandboxed `eval`-plus-token-whitelist approach to be both safe and useful took real care.
*   **Wrestling with Mirth Connect:** Mirth is notoriously fiddly, and automating its provisioning and channel setup so users never have to touch it was a fight in its own right.
*   **Breadth under a deadline:** the problem was broad and open-ended, and holding the whole distributed design together, mostly alone and against a thesis clock, was a constant balancing act.

## Retrospective

This thesis is the most ambitious and complete system I've built, and it was awarded perfect marks. More rewarding than the grade, though, was the reception at the partner hospital, where the design was praised for its cleverness and for how easily it slotted into their environment.

Its real impact was turning dormant data into a live asset: HL7 messages that had only ever served as forensic and documentation records could suddenly feed any ML model the team wanted, opening the door to adaptive, data-driven tooling they simply couldn't build before. Along the way it gave me a deep education in healthcare IT, distributed architecture, and a stack I'd never touched and it remains the clearest proof of what I can design and deliver end to end.
