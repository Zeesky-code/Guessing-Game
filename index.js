const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const GameSession = require('./game');


const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

const gameSession = new GameSession({ io });

io.on("connection", (socket) => {


  socket.on('join', (event) => {
      gameSession.join({event, socket});
  })

  socket.on("disconnect", () => {
    gameSession.exit({ socket });
    console.log('User exited')
  });

  socket.on("create_question", (event) => {
    gameSession.createQuestion({ socket, event });
    console.log('Question created')
  });

  socket.on('guess_answer', (event) => {
    gameSession.guessAnswer({ socket, event });
    console.log('Answer guessed')
  })

  console.log("a user connected", socket.id);
  socket.broadcast.emit("user_connected", "A user connected");
});

server.listen(8080, () => {
  console.log("listening on *:8080");
});
