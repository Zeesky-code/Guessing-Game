class Player {
    constructor({ name, id }) {
        this.id = id;
        this.name = name;
        this.score = 0;
    }
    guessAnswer(question, guess) {
        return question.isAnswer(guess);
    }

    setGameMaster(bool) {
        this.isGameMaster = bool;
    }
}

module.exports = Player;
