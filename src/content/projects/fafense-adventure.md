---
title: "Fafense Adventure"
summary: "A practical joke turned fully-fledged web platformer, built from scratch to explore the fundamentals of 2D game mechanics, level design, and WebGL deployment"
type: "Personal"
category: "Game Development"
stack: ["Unity", "C#", "Photoshop"]
featured: false
resume: false
order: 99
draft: false
repo: "https://github.com/JoaoGuedes01/FafenseAdventure"
demo: "https://joaoguedes01.github.io/FafenseAdventure/"
year: 2020
gallery:
  - { src: ./img/fafense-adventure/cover.png, alt: "Main Menu Image", caption: "The game's main menu." }
  - { src: ./img/fafense-adventure/level-selector.png, alt: "Level Selector Image", caption: "The level selector." }
  - { src: ./img/fafense-adventure/level-1.png, alt: "Level 1 Image", caption: "Chilling at the first level." }
  - { src: ./img/fafense-adventure/double-jump.png, alt: "Double Jump Image", caption: "Jumping over some spikes with double jumps." }
  - { src: ./img/fafense-adventure/gorgeous-tree.png, alt: "Gorgeous Tree Image", caption: "What a gorgeous looking tree." }
  - { src: ./img/fafense-adventure/fafe.png, alt: "Fafe Image", caption: "The great city of Fafe." }
  - { src: ./img/fafense-adventure/level-3.png, alt: "Level 3 Image", caption: "Made it to the obligatory underground third level." }
  - { src: ./img/fafense-adventure/final-level.png, alt: "Final Level Image", caption: "This is it, final level." }
---

## Overview

Sometimes the most complex projects start for the simplest reasons. *Fafense Adventure* began as a practical joke aimed at a friend, but quickly escalated into a serious opportunity and excuse to explore the end-to-end game development pipeline. I wanted to see what it actually took to transition from a consumer of games to a creator, building real mechanics, art, and level design entirely from scratch.

## Mechanics & Level Design

As a beginner to Unity, a 2D platformer provided a structured foundation to learn the engine's physics and scripting. I built a custom player controller that moved away from basic presets, focusing instead on tight, responsive gameplay.

The core gameplay loop features:
*   **Custom Physics:** Granular control over running momentum, variable jump heights (short taps vs. long holds), and a fluid wall-jumping mechanic.
*   **Thematic Progression:** A structured 5-level campaign where each stage introduces distinct art directions and new environmental interactions.

## Technical Implementation

Developing this solo over a single month meant I had to balance programming with entirely unfamiliar disciplines. 

*   **Engineering vs. Art:** While writing the C# scripts for state machines and movement logic felt natural, animating sprites frame-by-frame in Adobe Photoshop was a massive, time-consuming challenge. 
*   **WebGL Deployment:** The target platform was strictly the browser. Compiling the Unity build to WebGL and successfully bridging it with a production HTML environment was a major technical hurdle that almost derailed the final release.

## A Nod to Retro Game Design

Because the game was designed exclusively for web browsers, relying on traditional local save files was unreliable. Drawing inspiration from classic console eras, I implemented an old-school **Password Save System**. 

When a player finishes a level, they are given a unique code. If they close the browser, they can simply input that code later to load directly into their current stage. It solved a modern browser constraint using a nostalgic, retro mechanic.

## Retrospective

Building *Fafense Adventure* was a crash course in project scoping. I started without a clear functional or artistic vision, relying heavily on trial and error to find the game's identity. 

While that lack of planning made the process overwhelming at times, it was incredibly rewarding. I learned that designing a *good* level is an entirely different skill from programming one. Ultimately, this project left me with a playable web game and a profound respect for the multi-disciplinary engineering required to build the games we play.