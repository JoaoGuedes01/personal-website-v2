---
title: "Smart Food"
summary: "Knowledge Based System that recommends dishes based on the user's preferences and finds the optimal routes for delivery."
type: "Academic"
category: "Data Science & ML"
stack: ["Java", "Spring Boot", "Perl", "Prolog", "Node.js", "Javascript", "HTML", "CSS"]
featured: false
resume: false
order: 88
draft: false
org: "University of Minho"
orgUrl: "https://www.uminho.pt/"
repo: "https://github.com/JoaoGuedes01/sbcBackend"
year: 2021
gallery:
   - { src: ./img/smart-food/cover.png, alt: "Cover Image", caption: "Project Cover Image." }
   - { src: ./img/smart-food/architecture.png, alt: "Architecture Image", caption: "Project Architecture Diagram." }
   - { src: ./img/smart-food/recommendation.png, alt: "Recommendation Image", caption: "Meal recommendation interface." }
   - { src: ./img/smart-food/optimization-selection.png, alt: "Optimization Selection Image", caption: "Route Optimization calculation technique selection." }
   - { src: ./img/smart-food/route.png, alt: "Route Image", caption: "Route calculation result." }
   - { src: ./img/smart-food/final-result.png, alt: "Final Result Image", caption: "Final result of optimal route for delivery with calculation data." }
---

## Overview

Developed for the *Knowledge-Based Systems* course, **SmartFood / FoodExpress** is a two-part AI and optimization project designed to handle dish recommendations and delivery route optimization.

The project was split into two core components:
*   **Part A (SmartFood):** A knowledge-based recommendation engine built with Prolog and Perl that analyzes user tastes through a quiz interface to suggest tailored food options.
*   **Part B (FoodExpress):** A route optimization engine that calculates the most efficient delivery paths for drivers to maximize profit, minimize transit time, or optimize custom delivery metrics.

## Technical Innovation & Architecture

While traditional implementations for this course relied on basic shell runtimes and desktop UIs (Java Swing), this project introduced a modern full-stack web architecture by embedding the Prolog inference engine inside a web server.

*   **SWI-Prolog & Java Bridge:** Integrated the **SWI-Prolog API** into a **Java Spring Boot** backend, wrapping rule-based logic inside RESTful endpoints.
*   **Decoupled Web Frontend:** Built a responsive web frontend using Node.js, HTML, CSS, and JavaScript, replacing legacy desktop UI frameworks with a web interface.
*   **Route Optimization Algorithms:** Implemented pathfinding and decision-making logic inside Prolog to solve complex routing constraints for delivery fleets.

## Challenges & Key Learnings

Single-handedly executing this project provided direct exposure to logic programming, system integration, and early machine learning concepts:

*   **Logic Programming Foundations:** Mastered declarative programming paradigms in Prolog and text-processing/scripting in Perl.
*   **Cross-Language Integration:** Successfully bridged SWI-Prolog's native library runtime with Java, handling memory and state management between Java objects and Prolog predicates.
*   **Full-Stack Adaptability:** Transformed a traditional desktop assignment into a modern REST-driven web app, earning a perfect score (20/20).