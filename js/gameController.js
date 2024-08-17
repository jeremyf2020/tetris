class GameController {
    constructor(lines = 0, score = 0) {
        this.lines = lines;
        this.score = score;
    }

    get level() {
        return this.calcLevel() > 0 ? this.calcLevel() : 1;
    }

    get speed() {
        const level = this.level;
        const time = Math.pow(0.8 - ((level - 1) * 0.007), (level - 1));
        return time;
    }

    calcLevel() {
        return Math.floor(this.lines / 10)
    }

    calcScore(rows) {
        let baseScore = 0;
        if (rows === 1) {
            baseScore = 40
        }
        else if (rows === 2) {
            baseScore = 100
        }
        else if (rows === 3) {
            baseScore = 300
        }
        else if (rows === 4) {
            baseScore = 1200
        }
        return baseScore * (this.level);
    }

    addRows(rows) {
        this.lines += rows;
        this.score += this.calcScore(rows);
        this.updateScoreBoard();
    }
    updateScoreBoard() {
        document.querySelector('#lines').innerHTML = this.lines;
        document.querySelector('#level').innerHTML = this.level;
        document.querySelector('#score').innerHTML = this.score;
    }

}

export const gameController = new GameController(0)

// export function updateScoreBoard(gameController) {
//     document.querySelector('#lines').innerHTML = gameController.lines;
//     document.querySelector('#level').innerHTML = gameController.level;
//     document.querySelector('#score').innerHTML = gameController.score;
// }