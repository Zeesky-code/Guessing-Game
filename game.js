const Player = require("./player");
const Question = require('./question');

//enums for game state
const GAME_STATES = {
    IN_PROGRESS:"in_progress",
    IDLE: "idle"
}

class GameEvent {
    constructor({ data, eventName, message } ) {
        this.data = data;
        this.eventName = eventName;
        this.message = message;
    }
}

class Game{
    constructor({io}){
        this.players = [];
        this.question = null;
        this.state = GAME_STATES.IDLE;
        this.socket = io;
        this.gameMaster = null;
    }
    create(player){
        this.players.push(player);
        this.gameMaster = player;
    }
}

module.exports = Game;