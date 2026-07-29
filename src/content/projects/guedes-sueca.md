---
title: "Guedes Sueca"
summary: "The popular card game Sueca faithfully recreated using WebSockets for server-client real time communication."
type: "Personal"
category: "Web"
stack: ["Node.js", "WebSockets", "React", "Ant Design", "JSX", "CSS", "Replit", "GitHub Pages"]
featured: false
resume: false
order: 82
draft: false
repo: "https://github.com/JoaoGuedes01/sueca_websocket_server"
demo: "https://joaoguedes01.github.io/sueca_websocket_client/"
year: 2023
gallery:
  - { src: ./img/guedes-sueca/menu.png, alt: "Main Menu Image", caption: "The main menu for Guedes Sueca." }
  - { src: ./img/guedes-sueca/join.png, alt: "Join Game Image", caption: "Joining a new Guedes Sueca game session." }
  - { src: ./img/guedes-sueca/teams.png, alt: "Teams Image", caption: "Setting up the teams before a game." }
  - { src: ./img/guedes-sueca/game.png, alt: "Gameplay Image", caption: "Some high stakes gameplay of Guedes Sueca." }
  - { src: ./img/guedes-sueca/waiting.png, alt: "Waiting Image", caption: "Here we are waiting for player4 to make a move." }
  - { src: ./img/guedes-sueca/round.png, alt: "Round Image", caption: "Player1 just won this round. Exhilarating!" }
  - { src: ./img/guedes-sueca/game-over.png, alt: "Game Over Image", caption: "The game is over and Team2 won. Congratulation!" }
  - { src: ./img/guedes-sueca/past.png, alt: "Past Games Image", caption: "Game history feature documenting past games held." }
---

:::warning[Server Offline]
Due to recent Replit pricing changes, I can no longer host the Guedes Sueca WebSocket server for free. The frontend still lives on GitHub Pages, but with no server to connect to it waits forever, leaving the game unplayable for now (Server status remains red). I'm actively searching for a better way to host projects like this one, but until then the demo remains unresponsive.
:::

## Overview

*Guedes Sueca* was born out of a single fascination: WebSockets. While learning about them I became convinced they were the missing piece in everything I had built before, as constant page refreshing had always been my biggest frustration when developing web applications. I knew I had to get my hands dirty with real-time communication, and I wanted to understand it from the ground up.

Coming in with some background in traditional Sockets from Java, I made a deliberate choice: learn raw WebSockets rather than reach for the popular **Socket.io**. It was the harder road. Socket.io ships with countless quality-of-life features like rooms, reconnection, and acknowledgements, that simply do not exist in the native protocol, and doing without them forced me to genuinely understand what was happening on the wire.

To give the learning a real purpose I decided to rebuild *Sueca*, the popular Portuguese card game, entirely from scratch. Its rules are well established and unambiguous, which made it the perfect vehicle: a clear specification to implement, and a genuine reason to finish it, so I could actually play online with my friends, specially in those places where they don't let us play cards.

## The Game & Real-Time Model

The design intentionally started small and opinionated, prioritizing a working game over a bulletproof one:

*   **Four-Player Sessions:** Each game is capped at four players, matching the rules of Sueca. New connections only join the active pool if a seat is free and their nickname isn't already taken.
*   **Nickname-Based Identity:** Players are identified purely by their chosen nickname. There are no accounts, no logins, and no persisted sessions for anyone who disconnects, a conscious shortcut that kept the scope tight (and, admittedly, caused me headaches later on).
*   **Server-Authoritative State:** All the game logic and rules of Sueca live on the server. Clients simply render whatever state the server hands them.
*   **Broadcast on Every Action:** Whenever a player interacts with the server, whether joining the game or making a move, the server recomputes the game state and pushes it out to every connected client. This meant every player always saw exactly the same, up-to-date board.

## Architecture & Technical Choices

The whole system revolves around a single source of truth living on the **Node.js** server, with lightweight **React** clients acting purely as views:

*   **Raw WebSocket Server:** Built without Socket.io, the server manages connections, the player pool, and the full ruleset of Sueca by hand parsing messages, validating moves, and enforcing turn order.
*   **State Synchronization:** Rather than sending granular per-event deltas, the server broadcasts the complete game state after every change. It was a simple model to reason about and eliminated an entire category of "out of sync" bugs between clients.
*   **React & Ant Design Client:** The interface was built with **React** and **Ant Design**, giving me polished, ready-made components so I could focus my energy on the networking and game logic rather than styling from zero.

## Engineering Trade-offs & Challenges

Being my first ever WebSocket server, the learning curve was steep, and a few problems stood out well above the rest:

*   **Learning the Protocol:** Understanding the WebSocket handshake, message framing, and connection lifecycle from first principles, without Socket.io's abstractions, was the foundational challenge the whole project was built to tackle.
*   **Implementing Sueca Server-Side:** Encoding the complete rules of Sueca (trump suit, following suit, trick-winning, and scoring) into authoritative server logic took real care to get right.
*   **"Seating" the Players:** This was, by far, the worst part. The server holds one canonical view of the table, but each client needs to see *themselves* in a consistent seat with their teammates and opponents positioned relative to them. Rotating that shared state into four different local perspectives was maddening to get right.
*   **The Deployment Nightmare:** The most popular hosting services are notoriously particular about the WebSocket protocol, and getting a persistent connection to survive in production turned deployment into a genuine ordeal.

## Retrospective

*Guedes Sueca* remains one of my favorite projects to look back on. It's a 10/10 for me, not because the code is perfect, but because it delivered exactly what I set out to learn and gave me something genuinely fun to play with friends at the end of it.

Working with raw WebSockets can be punishing, and the strictness of hosting providers made the final stretch rougher than it needed to be. But choosing the harder path paid off: I walked away with a real, mechanical understanding of how real-time communication works under the hood, and that mental model has informed everything I've built since. Not bad for a week's work.

