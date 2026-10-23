# 👾 Vanilla JS Tetris

> A classic Tetris clone built from scratch to practice Object-Oriented design, Factory patterns, and Test-Driven Development (TDD).

![Language](https://img.shields.io/badge/Language-JavaScript-blue) ![Testing](https://img.shields.io/badge/Testing-Jest-c21325) ![Category](https://img.shields.io/badge/Project-Playground-purple)

## ⚙️ Technical Highlights

This project was built without a game engine to focus on vanilla JavaScript architecture:
*   **Design Patterns:** Uses the Factory pattern (`factory/tetrominoe.js`, `factory/board.js`) for piece and state generation.
*   **Separation of Concerns:** Decouples user input (`keyController.js`) from the core game loop (`gameController.js`).
*   **TDD:** Includes a Jest testing suite to mathematically validate matrix rotations and boundary collisions before DOM rendering.

