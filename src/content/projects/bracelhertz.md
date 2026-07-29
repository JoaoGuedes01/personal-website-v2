---
title: "BracelHertZ"
summary: "BracelHertZ is an management Progressive Web Application designed to help lower prison suicide rates letting them monitor the inmates' heart rate."
type: "Academic"
category: "Web"
stack: ["Java", "Spring Boot", "Arduino", "ESP32", "C++", "Heroku", "HTML", "CSS", "Javascript"]
featured: false
resume: false
order: 96
draft: false
org: "University of Minho"
orgUrl: "https://www.uminho.pt/"
repo: "https://github.com/JoaoGuedes01/BracelHertz"
demo: "https://bracelhertz.herokuapp.com/"
video: "https://www.youtube.com/watch?v=-Cp5I06yuSc"
year: 2020
gallery:
  - { src: ./img/bracelhertz/cover.png, alt: "Cover Image", caption: "The BracelHertZ Cover Image." }
  - { src: ./img/bracelhertz/login.png, alt: "Login Image", caption: "The Login Page." }
  - { src: ./img/bracelhertz/facial-recognition.png, alt: "Facial Recognition Image", caption: "Our facial recognition feature" }
  - { src: ./img/bracelhertz/dashboard.png, alt: "Dashboard Image", caption: "The application dashboard" }
  - { src: ./img/bracelhertz/new-colab.png, alt: "New employee Image", caption: "Interface for adding a new employee" }
  - { src: ./img/bracelhertz/annotations.png, alt: "Annotations Image", caption: "The annotations feature" }
  - { src: ./img/bracelhertz/employee-page.png, alt: "Employee page Image", caption: "The employee user data page" }
  - { src: ./img/bracelhertz/inmate.png, alt: "Inmate page Image", caption: "The inmate information page" }
---

> ⚠️ **Demo Offline:** Due to recent Heroku pricing changes, the BracelHertZ demo link is currently inactive. We plan to redeploy the demo to a new hosting platform soon.

## Overview

Developed in collaboration with a partner representative from the Portuguese Prison System through a university initiative, *BracelHertz* was designed to address a critical challenge in correctional facilities: inmate suicide prevention. 

Scientific literature links specific anomalous heart rate patterns and sudden biometric spikes to acute emotional distress and suicidal attempts. To leverage these findings, our team developed a complete telemetry solution consisting of custom wearable hardware paired with a centralized management dashboard to detect and flag high-risk biometric patterns in real time.

## Hardware & Wearable Prototyping

This project served as my introduction to hardware engineering, microcontroller programming, and physical enclosure design.

*   **Biometric Sensors & Microcontrollers:** Programmed an Arduino board from scratch in C++ to continuously capture pulse sensor data and transmit telemetry payload over network interfaces to our central backend.
*   **Enclosure Modeling:** Designed and 3D-modeled a wearable wristband enclosure tailored for the physical constraints and safety requirements of a prison environment.

## Backend Architecture & Security

The software platform was powered by **Java** and **Spring Boot**, acting as the central hub for processing real-time telemetry and supporting facility workflows.

*   **Hierarchical Role-Based Access Control (RBAC):** To reflect the operational hierarchy of correctional facilities, the system implemented fine-grained permissions across three user tiers: Operational Staff, Supervisors, and Prison Directors.
*   **Failsafes & Security Redundancies:** Integrated fail-safe protocols and credential safeguards to prevent accidental system overrides or data mishandling during high-stress alerts.
*   **Automated Risk Engine:** Designed a rule-based alerting service that continuously evaluated incoming telemetry against research-backed threshold parameters, immediately raising priority flags on the dashboard when abnormal heart rate spikes were detected.

## Challenges & Retrospective

*BracelHertz* was an ambitious undertaking as one of my first web development projects. We were tasked with self-teaching Spring Boot and microcontroller programming simultaneously, with minimal external guidance.

Bridging bare-metal Arduino hardware with an enterprise Java backend required learning object-oriented backend patterns and asynchronous data flow on the fly. Despite the steep learning curve, seeing real-time biometric telemetry transmit from a custom wristband to a live, web-based dashboard was immensely rewarding. 

The project earned us yet another perfect score (**20/20**) and demonstrated the power of combining IoT hardware with full-stack software to solve real-world human problems.