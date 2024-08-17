class SpeedController {
    constructor(clearedRows) {
        this.clearedRows = clearedRows;
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
        return Math.floor(this.clearedRows / 10)
    }

    addRows(rows) {
        this.clearedRows += rows
    }

}

export const speedController = new SpeedController(0)

// export function updateScoreBoard(speedController) {

// }