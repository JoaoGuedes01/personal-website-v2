---
title: "C-LAB"
summary: "Internal tool for comparison and management of different engines' results across multiple companies"
type: "Professional"
category: "Backend & Systems Architecture"
stack: ["Node.js", "Express.js", "Javascript", "MongoDB", "MySQL", "gRPC", "Rest API", "Redis", "RabbitMQ", "AWS S3", "AWS Route 53", "Docker", "Docker Compose", "GitHub", "GitHub Actions", "React", "Ant Design", "Monaco Editor", "Python", "Pandas", "PowerBI"]
featured: false
resume: false
order: 78
draft: false
org: "Checkmarx"
orgUrl: "https://checkmarx.com/"
experience: "cx-appsec"
year: 2025
gallery:
  - { src: ./img/c-lab/login.png, alt: "Login Image", caption: "The Login for C-LAB." }
  - { src: ./img/c-lab/projects.png, alt: "Projects Image", caption: "The existing projects listing." }
  - { src: ./img/c-lab/result.png, alt: "Result Image", caption: "Overview for a result of a scan with result selection on the bottom and result nodes on the right (AWS S3 is currently broken because of access tokens)." }
  - { src: ./img/c-lab/arch-flow.png, alt: "Arch Flow Image", caption: "The conceptual architecture and flow of data." }
  - { src: ./img/c-lab/arch.png, alt: "Arch Image", caption: "The real architecture and stack of C-LAB." }
---

## Overview

At the heart of any SAST (Static Application Security Testing) product is the *result*: a vulnerability described as a flow of nodes through the code, each backed by the exact source file so you can see precisely how the flaw travels from source to sink. Every company with a SAST offering has to present this, which makes results the natural common ground for comparison.

As a security engineer at **Checkmarx**, part of my job was exactly that comparison  tracking the accuracy and quality of our own engine's results, and forming a point of view on how competing engines stacked up, not only in SAST but across **IaC** (Infrastructure as Code) and **DAST** (Dynamic Application Security Testing) as well. In practice, that analysis was being done by hand in Excel sheets: slow, painful, and impossible to scale.

*C-LAB* (Comparison Lab) was my answer to this and my main project going forward. It began as a way to parse, view, and analyze security results regardless of their shape or where they came from, and grew into the security department's shared home for all other internal initiatives.

## The Parsing Engine

Since every engine and vendor emits results in their own format, the first thing I built was a parsing engine designed to be completely customizable and extendable purely in code. Supporting a new format is as simple as writing a new parser function in the backend and registering it so it shows up as a selectable parser, with no rigid schema to fight and no plugin ceremony.

The flow itself is straightforward for the user: upload a source-code zip archive, then upload one or more scan result files. The chosen parser walks each file and reshapes its contents into C-LAB's canonical result format. Every parsed result carries:

*   **Query name and severity**, lifted straight from the source file.
*   **Flow nodes**, each with the lines and columns (or a combination of both) the frontend needs to highlight a single node, plus the file path used to fetch the backing source from **S3**.
*   **Data pairs**, a deliberately open-ended feature that lets a result hold an unlimited number of custom fields, each just a field name and a string value, so no engine-specific detail ever has to be discarded for lack of a column.

## From Monolith to Microservices

C-LAB started life as a single monolithic REST API, which was the right call for getting something useful into my own hands quickly. But as the ambitions grew  bringing more people in and expanding it across the whole department  I re-architected it into microservices.

The plan was one dedicated service per engine type, since SAST, IaC, and DAST are radically different beasts that demand different handling and assessment. To keep that clean:

*   **A hand-built API gateway:** I wrote the gateway from scratch in **Node.js + Express.js**. It's the only thing a user ever talks to, forwarding traffic to the services as it sees fit.
*   **gRPC services:** the engine services speak **gRPC** behind the gateway, keeping inter-service communication fast and strongly typed.
*   **Centralized auth:** authentication and authorization live entirely in the gateway, which lets each service stay lean and focused purely on its own logic for maximum performance.
*   **Dedicated databases:** each service owns its own data store rather than sharing one, preserving a clean separation of concerns as the platform grows.

## Managing, Viewing & Reporting

Parsing was only ever the entry point; the real value of C-LAB is what happens to the results afterwards.

*   **A proper results viewer:** the **React** and **Ant Design** frontend renders each vulnerability's flow and, using a **Monaco** editor fed by the source code in S3, highlights the exact lines and columns of every node so a reviewer sees the flaw in its real context, no spreadsheet required.
*   **Analysis as a first-class citizen:** instead of scattered spreadsheets, past and current analyses are stored and managed inside C-LAB itself, giving the team a durable, single source of truth and turning what was solitary work into genuine collaboration.
*   **Automated reporting:** one of the platform's headline goals was automating the analysis reports we used to assemble by hand. With everything already structured inside C-LAB, that became straightforward, with **Python** and **Pandas** crunching the stored data and **PowerBI** surfacing it.

## Platform & Deployment

Over time C-LAB outgrew its original brief and became the home for the security department's internal tooling in general, so making it easy to extend and operate mattered as much as the features themselves:

*   **Reproducible stacks:** everything is containerized and orchestrated with **Docker Compose**, running across two machines that serve as staging and production. Adding a new service to the main stack, or spinning up an entirely separate stack for another initiative, is trivial.
*   **Automated CI/CD:** build, test, and deployment run through **GitHub Actions** with self-hosted runners, cutting the manual overhead down to almost nothing.
*   **Access and networking:** DNS is managed through **AWS Route 53**, with access locked down to the **Checkmarx VPN** only.
*   **Supporting infrastructure:** **Redis** and **RabbitMQ** back the platform with caching and asynchronous processing to keep it responsive under heavier workloads.

## Engineering Trade-offs & Challenges

Turning a personal Excel-killer into departmental infrastructure meant taking on real architectural weight:

*   **Upfront design cost:** the move to microservices, a bespoke gateway, and per-service databases demanded significant design effort before it paid off  a deliberate bet on future scale over short-term speed.
*   **Reliable gRPC plumbing:** getting fast, dependable communication between the gateway and the gRPC services right took care, as did keeping many independent databases coherent as a single system.
*   **A team learning curve:** microservice patterns and gRPC were new territory for my teammates, so part of the work was making the platform approachable enough that people would actually adopt and work on it.

## Retrospective

*C-LAB* became one of the most widely used tools inside the security department and, I like to think that it changed how the team worked, replacing brittle spreadsheet analysis with a real collaborative platform and a foundation others could keep building on.

I've since left the team and the company, but I made a point of leaving the project in the best possible shape: the SAST engine service fully built out, and clear plans laid down for the IaC and DAST services meant to follow. More than any single feature, I'm proud that C-LAB was designed to outlast me, and to keep growing into the home for security tooling I always hoped it would be.


