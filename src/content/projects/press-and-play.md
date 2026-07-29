---
title: "Press&Play"
summary: "Progressive Web Application that allows people to schedule and reserve football games in fields all across Portugal."
type: "Academic"
category: "Web"
stack: ["Node.js", "Express.js", "Javascript", "HTML", "CSS", "MySQL", "Sequelize", "Google API", "Heroku"]
featured: false
resume: false
order: 97
draft: false
org: "University of Minho"
orgUrl: "https://www.uminho.pt/"
repo: "https://github.com/ruigomes99/press-and-play"
demo: "https://press-and-play.herokuapp.com/"
year: 2019
gallery:
   - { src: ./img/press-and-play/cover.png, alt: "Cover Image", caption: "Press&Play Dashboard." }
   - { src: ./img/press-and-play/login.png, alt: "Login Image", caption: "The login screen." }
   - { src: ./img/press-and-play/field-listing.png, alt: "Field Listing Image", caption: "The fields listing screen." }
   - { src: ./img/press-and-play/rules.png, alt: "Rules Image", caption: "The rules screen." }
   - { src: ./img/press-and-play/profile.png, alt: "Profile Image", caption: "The user profile screen." }
   - { src: ./img/press-and-play/reservations.png, alt: "Reservations Image", caption: "The user reservations screen." }
   - { src: ./img/press-and-play/field-search.png, alt: "Field Search Image", caption: "The field search screen." }
   - { src: ./img/press-and-play/field-details.png, alt: "Field Details Image", caption: "The field details screen." }
   - { src: ./img/press-and-play/payments.png, alt: "Payments Image", caption: "Checking out an event or field reservation." }
---
:::warning[Demo Offline]
Due to recent Heroku pricing changes, the Press&Play demo link is currently inactive. We plan to redeploy the demo to a new hosting platform soon.
:::

## Overview

*Press&Play* was the defining project that sparked my passion for web development. This project was built during my first formal web architecture course and overall first web development experience, my team was selected to tackle one of the most ambitious assignments in the curriculum: creating a Progressive Web Application (PWA) to streamline scheduling and booking football fields across Portugal. The class was divided into sections that each would tackle a different part of the platform and our team was assigned the most important element, the user facing PWA.

For the backend we were instructed on using Node.js + Express.js and that gave us a very good foundation for web development. The other part of the team got started on a Front-End without any framework whatsoever being forced to use vanilla `JS`, `CSS` and `HTML`. This gave our team a deep and true understanding on web development and what goes with it.

## Core Features & Capabilities

The application was designed as an all-in-one platform for casual people to organize matches and find available pitches and fields as football is a demanding activity that, often, requires specialized equipment and conditions.

*   **PWA Functionality:** Built with a mobile-first mindset, allowing users to install the app directly to their home screens, with only the browser, for a native-like feel.
*   **Pitch Reservation Engine:** Real-time search and scheduling that allowed users to inspect availability across specific time slots and reserve fields instantly.
*   **Social Network:** Features for sending friend requests, managing user profiles, and receiving system notifications.
*   **Dual Authentication:** A complete security setup featuring traditional email/password registration with automated verification emails, as well as third-party authentication via **Google OAuth**.

## Architecture & Integration

The project went beyond a simple isolated web application, requiring cross-system communication and clean ORM design:

*   **Backend & Database:** Powered by a **Node.js** and **Express.js** REST API. Database persistence was handled via **MySQL**, utilizing **Sequelize ORM** to manage schemas, relationships, and queries programmatically.
*   **Cross-System API Integration:** In an effort to mimic microservice architecture, our server communicated directly with external endpoints hosted by other student development teams (who were building admin-side field management software) to dynamically fetch venue specifications and availability.
*   **Deployment:** Successfully containerized and deployed to **Heroku** for public staging.

## Engineering Trade-offs & Challenges

Building a full-stack system with zero prior experience meant facing a steep learning curve, particularly around OAuth integrations and cloud deployment. 

It also provided a great lesson in **pragmatic scope management**. We originally planned to build a custom real-time chat service using Socket.io. However, when inter-team API coordination and authentication hurdles began threatening our timeline, we made the conscious engineering decision to cut the chat feature. Decoupling non-essential features allowed us to polish the core booking engine and deliver a rock-solid product.

## Retrospective

*Press&Play* ended up earning a perfect score (**20/20**) and laid the concept foundation for most of what I know build today regarding web technologies. Understanding raw HTTP requests,P manual DOM manipulation, and relational schema mapping before adopting frameworks like React or Astro gave me a much stronger mental model of how the web operates under the hood.