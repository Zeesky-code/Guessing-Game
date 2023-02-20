const http = require("http");
const express = require("express");
const app = express();
const httpServer = http.createServer(app);

//const websocketServer = require("websocket").server;

const { Server } = require("socket.io");
const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("connected")

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
})
const games = {};
const clients = {};

// serve the client
app.get("/", (req,res) => {
    res.sendFile(__dirname + "/client/index.html")
});

//the actual server



// const wsServer =  new websocketServer({
//   "httpServer": httpServer
//})

/**  wsServer.on("request", request => {
    const connection = request.accept(null, request.origin);
    connection.on("open", () => console.log("Connection Opened!"));
    connection.on("close", () => console.log("Connection Closed!"));
    connection.on("message", message => {
        const result = JSON.parse(message.utf8Data)
        if (result.method === "create"){
            const clientId = result.clientId;
            const word = result.word;
            const gameId = guid();
            games[gameId] = {
                "id": gameId,
                "word": word,
                "clients": []
            }
            const payload ={
                "method": "create",
                "game": games[gameId]
            }

            const con = clients[clientId].connection;
            con.send(JSON.stringify(payload));
        }
    })

    //generate a new clientId
    const clientId = guid();
    clients[clientId] = {
        "connection":  connection
    }

    const payLoad = {
        "method": "connect",
        "clientId": clientId
    }
    //send back the client connect
    connection.send(JSON.stringify(payLoad))
})
*/ 

httpServer.listen(8080, () => console.log("Listening on... 8080"));