---
company: "Uphold"
role: "Backend Software Engineer"
start: "2026" 
end: "Present"
location: "Braga, Portugal"
tags: ["Backend Development", "Microservices", "Event-Driven", "Kubernetes", "gRPC", "GraphQL", "Node.js", "PostgreSQL", "Application Security", "Developer Tooling", "Crypto", "Fintech"]
summary: "I'm a backend engineer on the team behind Manager Tool, the internal platform Uphold's account agents use to monitor and manage client accounts. I own the GraphQL API behind it, act as my team's security point of contact and build the internal tooling that keeps us fast."
highlights:
  - "Own the backend API behind Manager Tool and ship new account features end to end"
  - "Put role-based access control and audit logging behind every sensitive agent action"
  - "Extend shared backend services over gRPC when the data a feature needs isn't exposed yet"
  - "Work with event-driven services (NSQ, Temporal) and PostgreSQL across a microservices stack on Kubernetes"
  - "Triage the security team's reports on our applications, fix the gaps and harden agent permissions"
  - "Retire deprecated API surface once the frontend has moved on"
  - "Built an internal toolbox: a port-forward manager, a repo environment synchronizer and a code generator"
  - "Learned how to efficiently and correctly leverage AI tools in the software development activity"
cv:
  type: "Full Time"
  bullets:
    - "Own the GraphQL API behind Manager Tool, the internal platform account agents use to monitor and manage client accounts, and ship its new account features."
    - "Design role-based access control and audit logging for sensitive agent actions, and extend shared backend services over gRPC when the data is not exposed."
    - "Work across a microservices stack of JavaScript, GraphQL and gRPC with PostgreSQL, NSQ and Temporal, running on Kubernetes."
    - "Act as the team's security point of contact: triage security reports on our applications, fix code gaps and harden agent permissions."
    - "Built internal developer tooling: a port-forward manager that keeps 10+ Kubernetes forwards alive, an environment synchronizer and a code generator for repetitive code."

order: 5
draft: false
# gallery:
#   - { src: ./shot-1.png, alt: "…" }
---

Uphold is where I'm growing the most as a software engineer and as a solutions designer. I work on the backend of Manager Tool, the internal platform account agents use to monitor and manage client accounts. It's a demanding place to work as every feature touches several of Uphold's services and processes, which also makes it a great window into how the whole company runs.

## What I work on

My day to day is the GraphQL API behind Manager Tool. Each new account feature means designing what agents can see and do, wiring up the backend services that hold the data, and putting every sensitive action behind roles and audit trailing. When a service doesn't expose what I need I either collaborate with the team behind it or I do it myself by pushing those changes myself. This is very demanding but rewarding because it requires a lot of context switching and adaptability in order to understand, run and perform changes in projects I'm not familiar with.

The stack is mostly JavaScript services built on Koa with Apollo GraphQL, talking to each other over gRPC, while newer services are written in Go. The databases vary by project but are mostly PostgreSQL, accessed through query builders and ORMs depending on the repository. Messaging runs on NSQ, Temporal handles distributed workflows, and everything runs on Kubernetes with GitOps deployments.

## Security

As the security champion I'm my team's security point of contact. The security team sends reports on our projects and applications, and I am the one to review them due to my background. Most of what I find is code oversights, many of them older than my time here, and I help fix those gaps. Other findings are about processes, like what an agent's permissions allow and how far a compromised account could reach. Those are the interesting ones, because the fix is usually a better design and not just a patch.

## The toolbox

I got really tired and frustrated of port-forwards that drop without notice. When a task needs ten or more forwards through k9s, you end up hunting through terminal tabs for the one that died, if you even notice before you start debugging code that isn't the problem. So I built a port-forward manager that reads a config file listing every forward you need, opens them all, watches them, and reopens any that drop straight away.

Alongside it I made a repo environment synchronizer and a code generator for the predictable blocks of code Manager Tool. All of it exists to take the repetitive parts out of the day, for me and for my teammates.

## How I use AI

I use AI tools as an assistant, never as an author. I don't push code I haven't read, understood and am confident in. Most of the time I rewrite what I get, either because I have a better solution for the problem or because I prefer my way of writing it. Ownership of every loc is the point.

## What's next

Next year I'll join a bigger team that owns the Enterprise Portal, Manager Tool and the API foundations for the whole backend. I'd never worked in fintech before Uphold, and I'm still learning something new every week. So far it's been a blast.
