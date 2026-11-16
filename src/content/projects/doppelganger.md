---
title: "Doppelganger"
summary: "Platform to compare code bases, calculate similarity, and minimize redundancy."
type: "Professional"
category: "Backend & Systems Architecture"
stack: ["Node.js", "Express.js", "axios", "Javascript", "MongoDB", "ElasticSearch", "DynamoDB", "AWS S3", "AWS Lambda", "GitHub API", "React", "Ant Design", "Jenkins", "Python", "Jupyter Notebooks", "PowerBI"]
featured: true
resume: true
order: 80
draft: false
org: "Checkmarx"
orgUrl: "https://checkmarx.com/"
experience: "cx-qa-dev"
year: 2023
gallery:
  - { src: ./img/doppelganger/dash.png, alt: "Dashboard Image", caption: "The dashboard." }
  - { src: ./img/doppelganger/config.png, alt: "Config Image", caption: "Configuring the engine." }
  - { src: ./img/doppelganger/config-project.png, alt: "Config per project Image", caption: "The engine can also be configured per projects instead of globally." }
  - { src: ./img/doppelganger/project.png, alt: "Project Image", caption: "The project overview with all project scan information." }
  - { src: ./img/doppelganger/results.png, alt: "Results Image", caption: "The project scan results." }
  - { src: ./img/doppelganger/history.png, alt: "History Image", caption: "The project scan history." }
---

## Overview

A doppelganger is a look-alike, a double, and finding doubles is exactly what this project was built to do. *Doppelganger* was my first real enterprise project, developed internally at **Checkmarx**, and it tackled a problem hiding in plain sight inside the company's own testing infrastructure.

Checkmarx is a SAST (Static Application Security Testing) company: its flagship product scans codebases and reports the vulnerabilities it finds as *results*. To test that scanner, the QA organization maintains its own pool of deliberately vulnerable codebases that get scanned over and over. Over the years that pool had grown past 300 projects, and a full CI run had crept up to a punishing 8–12 hours, slow and expensive to run and maintain.

The concept for the project was very simple: among hundreds of test projects, a lot of them ought to be redundant, re-testing vulnerabilities the scanner has already seen many times over. *Doppelganger* set out to measure how much genuinely new a codebase brings to the table, so the company could stop paying, in time and resources, to re-test the same things (daily) and make room for richer, more interesting code.

## The Comparison Engine

A Checkmarx SAST result isn't a simple yes or no. Each vulnerability is described as a full flow, the input (or source), the sanitizers along the way, the sink where it lands, and every node in between. Doppelganger takes those flows and compares a new project's results against the existing corpus to isolate the results that aren't already accounted for.

The similarity itself came from a comprehensive set of scoring rules I designed. Roughly, overlapping traits earned points: the same input down to the file name added a few, the same number of vulnerability nodes added a few more, matching sinks and outputs more still, and so on across the flow. Once a project's score was tallied against a set of thresholds, it landed in one of three verdicts:

*   **Add it whole:** the project brought enough genuinely new results to earn a permanent place in the CI pool.
*   **Break it into automations:** only parts of it were novel, so those parts were distilled into *automations*, small self-contained samples of vulnerable code paired with metadata describing exactly which vulnerabilities SAST is expected to catch in them. That metadata turns each one into a precise regression test: you always know whether the engine still detects that specific vulnerability.
*   **Discard it:** the project was fully redundant and added nothing the corpus didn't already have.

The effect was that Doppelganger didn't just prune bloat, it distilled sprawling codebases down into verifiable, purpose-built test cases.

## Data & Architecture

The system leaned on several data stores, each with a deliberate role so no single one had to do everything:

*   **MongoDB: the source of truth:** stores the scan data across every project, but deduplicated down to only the *unique* SAST results. This is effectively the canonical results database for Checkmarx SAST and the collection every new project is compared against, tuned for high-speed indexing over a very large body of results.
*   **DynamoDB: the project view layer:** holds the high-level, per-project information, freeing Mongo to concern itself purely with result indexing. It backed the views that surface how many new results a project brings and whether it should be added as a project, broken into automations, or dropped.
*   **ElasticSearch: the integration swiss-army knife:** the read and integration surface for other tooling, doubling as a cache holding a lot of precomputed data about the codebases.
*   **AWS S3: the codebase store:** holds the actual source code of every project running through Doppelganger.
*   **React + Ant Design frontend:** a dashboard and project views that let users configure the engine globally or per project and drill from a project into its scan results and full history.

## Discovery & Automation Pipeline

Doppelganger slotted into the Jenkins-based automation the Checkmarx QA department already ran on.

*   **Automated discovery (Lambda + GitHub API):** an AWS Lambda uses the GitHub API to find new open-source repositories to pull in, as a configurable trickle (around 10 a day) so the corpus keeps growing with fresh, varied code instead of the same stale set. Manual uploads were also supported for targeted scans.
*   **Scan → compare → populate:** each discovered project triggers a Checkmarx SAST scan, whose results then trigger a Doppelganger comparison, with the outcome fanning out across the data stores.
*   **Consumption:** that data was read both by the web frontend and by an ETL pipeline feeding **PowerBI** for higher-level reporting.
*   **Doppelganger CLI:** a Node.js + axios client wrapping specific endpoints of the Doppelganger REST API, so pipelines and automations could drive it directly without ever touching the UI.

## Engineering Trade-offs & Challenges

As my first real enterprise project, the hardest part early on was simply holding the whole scope in my head and not drifting off course:

*   **No "correct" similarity metric:** there's no proven, canonical way to quantify how similar two sets of vulnerability results really are. The scoring rules were heuristics I designed and tuned myself, which meant I was often second-guessing whether a computed value genuinely reflected reality.
*   **A firehose of new technology:** much of the stack like DynamoDB, ElasticSearch, Lambda, S3, Jenkins was new to me, and I had to become productive with each of them quickly.
*   **Owning a broad, mostly solo project:** this was primarily mine to carry, spanning research, the engine, database design and administration, the CLI, and the frontend. Keeping all those moving parts coherent, while juggling other initiatives alongside it, was a constant balancing act.

## Retrospective

*Doppelganger* was my introduction to what building software inside a large engineering organization actually looks like, and it remains one of the projects I'm proudest of. It was adopted internally and quickly began proving its worth, surfacing genuinely interesting overlaps and letting the team start cleaning up that sprawling 300+ project collection whose full CI run had ballooned to those insane 8–12 hours.

Beyond the results, it taught me an enormous amount about how Checkmarx's scanning and QA processes fit together, and it forced rapid growth across a stack I'd never touched. I've since moved on from that team and the company, but I still hear that Doppelganger is alive and well, maintained, iterated on, and grown with features I never got to build. There's something quietly satisfying about leaving behind a project that outlived your time on it and is still, by all accounts, a loved one.
