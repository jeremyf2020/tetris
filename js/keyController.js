import { currentTetrominoe, gameBoard, currentX, currentY, boardWidth } from "./main.js";
import { applyTetrominoUpdate, getMatrixActualSize } from "./factory/tetrominoe.js";
import { checkLeft, checkOccupied, checkRight } from "./validation.js";

export function keyController(e, callback) {
    let newTetrominoe = currentTetrominoe;
    let newX = currentX;
    let newY = currentY;

    switch (e.key) {
        case "ArrowUp":
            [newTetrominoe, newX] = rotate();
            break;
        // case "ArrowDown":
        //     moveDown(1);
        //     break;
        case "ArrowLeft":
            newX = moveHorizontal(-1);
            break;
        case "ArrowRight":
            newX = moveHorizontal(1);
            break;
    }
    callback(newTetrominoe, newX, newY);
    console.log(newTetrominoe)
}

function rotate() {
    let newX = currentX;
    const rotatedTetrominoe = {
        ...currentTetrominoe,
        matrix: rotateMatrix(currentTetrominoe.matrix)
    };

    // check valid
    if (!checkLeft(rotatedTetrominoe, newX)) {
        newX = 0
    }
    if (!checkRight(rotatedTetrominoe, newX)) {
        const { width } = getMatrixActualSize(rotatedTetrominoe.matrix);
        newX = boardWidth - width;
    }
    if (!checkOccupied(rotatedTetrominoe, newX, currentY)) {
        return [currentTetrominoe, currentX]
    }

    applyTetrominoUpdate(rotatedTetrominoe, currentTetrominoe, gameBoard, currentX, currentY, newX, currentY);
    return [rotatedTetrominoe, newX];
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

function moveHorizontal(deltaX) {
    const newX = currentX + deltaX;
    if (!checkLeft(currentTetrominoe, newX) || !checkRight(currentTetrominoe, newX)) {
        return currentX
    }

    applyTetrominoUpdate(currentTetrominoe, currentTetrominoe, gameBoard, currentX, currentY, newX, currentY);
    return newX
}

