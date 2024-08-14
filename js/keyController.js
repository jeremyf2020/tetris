import { updateCurrentTetrominoe, currentTetrominoe, gameBoard, currentX, currentY } from "./main.js";
import { applyTetrominoUpdate } from "./factory/tetrominoe.js";

export function keyController(e) {
    switch (e.key) {
        case "ArrowUp":
            rotate();
            break;
        // case "ArrowDown":
        //     moveDown(1);
        //     break;
        // case "ArrowLeft":
        //     moveHorizontal(-1);
        //     break;
        // case "ArrowRight":
        //     moveHorizontal(1);
        //     break;
    }
}

function rotate() {
    const rotatedTetrominoe = {
        ...currentTetrominoe,
        matrix: rotateMatrix(currentTetrominoe.matrix)
    };
    // check valid



    applyTetrominoUpdate(rotatedTetrominoe, currentTetrominoe, gameBoard, currentX, currentY);
    updateCurrentTetrominoe(rotatedTetrominoe);
}

function rotateMatrix(matrix) {
    let rotatedMatrix = Array(matrix[0].length).fill(null).map(() => []);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = matrix[0].length - 1; j >= 0; j--) {
            rotatedMatrix[i].push(matrix[j][i]);
        }
    }
    return rotatedMatrix;
}
