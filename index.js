const http = require("http");
const express = require("express");
const app = express();
const httpServer = http.createServer(app);

const game = require('./game');

const { Server } = require("socket.io");
const io = new Server(httpServer);

const Game = new game({io});

io.on("connection", (socket) => {

    //generate a new clientId
    const clientId = socket.id;
    clients[clientId] = {
        "connection":  clientId
    }
    const payLoad = {
        method: "connect",
        clientId: socket.id
    }
    //send back the client connect
    socket.emit("payload", JSON.stringify(payLoad))
    console.log(`User ${socket.id} connected`)

    socket.on("disconnect", () => {
        (`User ${socket.id} disconnected`)
    });

    socket.on("create", (Player)=> {
        Game.create(Player);
        console.log(Game)
    })
})
const games = {};
const clients = {};

// serve the client
app.get("/", (req,res) => {
    res.sendFile(__dirname + "/client/index.html")
});

//the actual server





httpServer.listen(8080, () => console.log("Listening on... 8080"));
