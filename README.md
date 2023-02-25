# Guessing-Game

Guessing Game is a multiplayer web application built with Node.js, Express.js, and Socket.io. It is designed to allow players to join a game session and compete with each other by guessing the correct answer to a given question.

## Requirements
- Game session interface should be like a chat interface
- User should be able to start a game session (game master)
- Other users can join the game session (players) before the game session starts
- Users should be able to see the number of players connected to a game session
- Game master should be able to create a question and an answer for other players in this game session
- Game session can only be started by the game master and there must be more than two players before the game session starts
- When the game master starts the game sessions:
- A question is displayed for each player, and each player has 3 attempts to guess the right answer.
- Other users (players) cannot join this session while the game is in progress.
- The game session ends on the following conditions:
- A player gets the right answer.
- Other players cannot guess the answer.
- The winner and answer are displayed to other players, and the winning player receives 10 points.
- The time for the game session expires (default to 60 seconds).
- Other players cannot guess the answer.
- No winner is displayed to other players, and no points are assigned to any player.
- Answer is displayed to the other players.
- Players can see each other's scores.
- When the game session ends, another player becomes the game master and can create a question with an answer for other players to guess.
- Game session is deleted when all the players in the session have left the session.

## Installation and Usage
- Clone the repository: git clone https://github.com/Zeesky-code/Guessing-Game.git
- Install the dependencies: npm install
- Start the server: npm start
- Navigate to http://localhost:8080 in your browser.

## Technologies Used
- Node.js
- Express.js
- Socket.io

## Contributors
[Zeesky-code](https://github.com/Zeesky-code)
