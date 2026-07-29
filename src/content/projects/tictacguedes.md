---
title: "TicTacGuedes"
summary: "Web version of the fun game TicTacBoom that can be played anywhere with only a smartphone or computer."
type: "Personal"
category: "Web"
stack: ["React", "Javascript", "Vite", "Chakra UI", "Web Audio API", "GitHub Pages"]
featured: true
resume: false
order: 95
draft: false
repo: "https://github.com/JoaoGuedes01/tictacboom"
demo: "https://joaoguedes01.github.io/tictacboom/"
year: 2025
gallery:
  - { src: ./img/tictacguedes/cover.png, alt: "Cover Image", caption: "TicTacGuedes Cover Image." }
  - { src: ./img/tictacguedes/main-menu.png, alt: "Main Menu Image", caption: "TicTacGuedes Main Menu." }
  - { src: ./img/tictacguedes/gameplay.png, alt: "Gameplay Image", caption: "TicTacGuedes exciting gameplay." }
  - { src: ./img/tictacguedes/exploded.png, alt: "Exploded Image", caption: "Oh no, the bomb has exploded." }
  - { src: ./img/tictacguedes/settings.png, alt: "Settings Image", caption: "Completely customizable, although I recommend leaving Guedes sounds turned on." }
  - { src: ./img/tictacguedes/instructions.png, alt: "Instructions Image", caption: "The rules for the game." }
---

## Overview

**TicTacGuedes** is a web-based adaptation of a popular party game designed for casual social gatherings. Born out of frustration with hauling physical board games to group hangouts, this project digitizes the entire experience into an accessible web app requiring nothing more than a smartphone or browser.

The concept is fast-paced and social: players race against a ticking bomb while reciting words that fit randomized letter constraints. By taking a simple physical loop and translating it to the web in a single day, the app provides a zero-friction, pass-around game for unlimited players.

## Gameplay & Customization

The game focuses on high-tension, rapid-fire turns with clear visual and auditory feedback:

*   **Rule Engine (TIC / TAC / GUEDES):** A virtual die roll sets the round's constraint: **TIC** (words starting with the letter), **TAC** (words ending with it), or **GUEDES** (words containing it anywhere).
*   **Dynamic Deck:** Draw cards from a pool of 60+ options featuring individual letters (A–Z) and multi-letter syllables common in Portuguese and English (e.g., *ch*, *qu*, *br*).
*   **Pressure-Driven Bomb Timer:** A randomized countdown (40–180 seconds) triggers custom ticking audio and screen flashes that intensify as time runs low. The player holding the bomb when it explodes loses.
*   **Customization Settings:** Players can tweak countdown ranges, toggle custom audio effects ("Guedes Sounds"), or edit the letter pool on the fly to adjust difficulty.

## Architecture & Technical Choices

Because the app was built in a single day, the priority was clean code organization, zero unnecessary dependencies, and solid state hygiene:

*   **Frontend Stack:** Built with **React** and **Vite** for instant hot-reloading and lightweight builds, paired with **Chakra UI** for out-of-the-box dark mode and accessible mobile-first layouts.
*   **Lifecycle & Timer Hygiene:** The bomb countdown relies on `setInterval` wrapped in `useEffect` hooks with strict cleanup functions to eliminate orphaned intervals when passing turns or resetting states.
*   **Web Audio API:** Ticking sounds and explosion alerts are handled dynamically without triggering unnecessary component re-renders or audio delay.
*   **Config-Driven Design:** Game pools and default settings are isolated in standalone modules (`dic.js`, `defaultSettings.js`), making the content trivial to extend without altering core render logic.

## Retrospective

*TicTacGuedes* was an exercise in pragmatism. Built in 24 hours using tools I already knew inside and out, it proved that software doesn't need to solve complex distributed systems problems to be genuinely useful and engaging. 

Choosing familiar tooling (React, Chakra UI, Web Audio) meant zero time wasted debugging framework oddities, allowing full focus on polish, audio feedback, and responsiveness. It remains one of my favorite portfolio additions simply because it solved a real-world annoyance for me and my friend group and continues to get used.