const http = require("http");
const express = require("express");
const path = require("path");
const app = require("express")();
const bodyParser = require('body-parser');
const websocketServer = require("websocket").server;

const games = {};
const clients = {};

// serve the client
app.use(bodyParser.urlencoded({extended: false}));
 app.use(express.static(path.join(__dirname, 'client')));
 
app.get("/", (req,res) => res.sendFile(__dirname + "/client/index.html"));

//the actual server
const httpServer = http.createServer(app);
httpServer.listen(8080, () => console.log("Listening on... 8080"));

const wsServer =  new websocketServer({
    "httpServer": httpServer
})

wsServer.on("request", request => {
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

function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
 
// then to call it, plus stitch in '4' in the third group
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();