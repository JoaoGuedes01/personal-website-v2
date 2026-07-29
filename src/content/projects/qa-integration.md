---
title: "QA Integration"
summary: "Integration Platform between Jira and Microsoft Devops(TFS) systems for item migration, QA evaluation and work management."
type: "Professional"
category: "Backend & Systems Architecture"
stack: ["React", "JSX", "CSS", "Node.js", "Javascript", "MongoDB", "Jira", "Azure Devops"]
featured: true
resume: true
order: 84
draft: false
org: "Checkmarx"
orgUrl: "https://checkmarx.com/"
experience: "cx-qa-dev"
year: 2023
gallery:
  - { src: ./img/qa-integration/login.png, alt: "Login Image", caption: "The sessions configuration page where a use rmust provide the API tokens for the integrations." }
  - { src: ./img/qa-integration/dash.png, alt: "Dash Image", caption: "The dashboard where users can migrate items from Azure to Jira by query lookup." }
  - { src: ./img/qa-integration/query.png, alt: "Query Image", caption: "The result of query lookup and already imported work items validation." }
  - { src: ./img/qa-integration/saved-queries.png, alt: "Saved Queries", caption: "The queries are id based so there's a feature for saving them." }
  - { src: ./img/qa-integration/work-item-listing.png, alt: "Work Item Listing Queries", caption: "The listing of work items so QA engineers can work on them." }
  - { src: ./img/qa-integration/work-item-details.png, alt: "Work Item Details Queries", caption: "The details of a work item for QA analysis." }
  - { src: ./img/qa-integration/qa-checklist.png, alt: "QA Checklist Queries", caption: "The work item details also have a checklist for the QA engineer go through while performing the quality analysis." }
  - { src: ./img/qa-integration/qa-notes.png, alt: "QA Notes Queries", caption: "QA Notes textarea fields for free writing on work items." }
  - { src: ./img/qa-integration/knowledge.png, alt: "Knowledge Queries", caption: "Knowledge Sharing snippts for sharing with the team on interesting findings or work items." }
  - { src: ./img/qa-integration/learning.png, alt: "Learning Queries", caption: "QA Learning shift rotation cycle." }
---

## Project Overview

While working on the Quality Assurance team at Checkmarx, I identified a major operational bottleneck: different engineering teams were using separate platforms (Jira and Azure DevOps) to track work items. This fragmented setup forced the QA team to manually copy and paste work item details between systems before starting any testing cycle.

Additionally, the QA review process required manually inserting structured comments containing test matrices, statuses, and observations directly into Azure DevOps work items. To eliminate this repetitive manual overhead and streamline recurring team rotations, I designed and built a unified, centralized QA integration platform.

---

## Technical Architecture & Core Features

The system was engineered using a clean, decoupled Client-Server architecture to enforce separation of concerns and maintainable data orchestration:

### 1. Client-Server Architecture
* **Frontend (Client):** Built a responsive, intuitive interface in React to manage work item tracking, view automated sync status, and execute standardized QA review forms.
* **Backend (Server):** Implemented a Node.js API service to handle all authentication, business logic, rate limiting, and database interactions.
* **Database:** Utilized MongoDB to store local metadata, audit logs, and team rotation schedules.

### 2. Dual-API Integration Engine
* Integrated both **Jira REST API** and **Azure DevOps REST API** into a unified backend broker.
* Automated item synchronization, enabling seamless data flow across platforms without manual intervention.

### 3. Workflow Standardization & Team Management
* Developed standardized QA review templates that format test cases, statuses, and notes into Azure DevOps comments automatically upon submission.
* Integrated dynamic team rotation scheduling to simplify task delegation across recurring QA activities.

---

## Technical Challenges & Optimization

* **API Limitations & Request Overhead:** Both Jira and Azure DevOps APIs required significant numbers of HTTP requests to execute complex granular actions. I implemented request batching and aggressive payload caching on the backend to reduce latency and avoid API rate limits.
* **Cross-Platform Data Normalization:** Mapping fields between two fundamentally different issue-tracking schemas required establishing robust data translation layers in Node.js.
* **Production Enterprise Deployment:** Designed, tested, and deployed the full system directly into a live professional workflow within a tight one-month timeframe.

---

## Key Impact & Results

* **Eliminated Manual Overhead:** Removed repetitive copy-paste workflows between tracking platforms, saving significant time per QA cycle.
* **Standardized Review Quality:** Ensured all QA feedback in Azure DevOps adhered to uniform structural standards.
* **Improved Operational Efficiency:** Automated team rotation tracking and simplified daily task management across the entire QA department.
