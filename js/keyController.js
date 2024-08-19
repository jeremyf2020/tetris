import { currentTetrominoe, gameBoard, currentX, currentY, boardWidth, boardHeight, swapToNextTetromino, gravity } from "./main.js";
import { applyTetrominoUpdate, getMatrixActualSize } from "./factory/tetrominoe.js";
import { isInBottomEdge, isInLeftEdge, isOccupied, isInRightEdge } from "./validation.js";
import { gameController } from "./gameController.js";
import { checkFilledRows } from "./factory/board.js";

export function keyController(e, callback) {
    let newTetrominoe = currentTetrominoe;
    let newX = currentX;
    let newY = currentY;

    switch (e.key) {
        case "ArrowUp":
            [newTetrominoe, newX, newY] = rotate();
            break;
        case "ArrowDown":
            [newTetrominoe, newX, newY] = moveDown(1);
            break;
        case "ArrowLeft":
            newX = moveHorizontal(-1);
            break;
        case "ArrowRight":
            newX = moveHorizontal(1);
            break;
    }
    callback(newTetrominoe, newX, newY);
}


function rotate() {
    let newX = currentX;
    let newY = currentY;
    const rotatedTetrominoe = {
        ...currentTetrominoe,
        matrix: rotateMatrix(currentTetrominoe.matrix)
    };
    const { width, height } = getMatrixActualSize(rotatedTetrominoe.matrix);

    // check valid
    if (!isInLeftEdge(rotatedTetrominoe, newX)) {
        newX = 0
    }
    if (!isInRightEdge(rotatedTetrominoe, newX)) {
        newX = boardWidth - width;
    }
    if (!isInBottomEdge(rotatedTetrominoe, newY)) {
        newY = boardHeight - height;
    }
    if (isOccupied(rotatedTetrominoe, newX, newY)) {
        return [currentTetrominoe, currentX, currentY]
    }

    applyTetrominoUpdate(rotatedTetrominoe, currentTetrominoe, gameBoard, currentX, currentY, newX, newY);
    return [rotatedTetrominoe, newX, newY];
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
    if (!isInLeftEdge(currentTetrominoe, newX) || !isInRightEdge(currentTetrominoe, newX) || isOccupied(currentTetrominoe, newX, currentY)) {
        return currentX
    }

    applyTetrominoUpdate(currentTetrominoe, currentTetrominoe, gameBoard, currentX, currentY, newX, currentY);
    return newX
}

export function moveDown(deltaY) {
    const newY = currentY + deltaY;

    if (newY === 1 && isOccupied(currentTetrominoe, currentX, newY)) {
        document.querySelector(".modal").style.display = 'flex';
        clearInterval(gravity);
    }

    if (!isInBottomEdge(currentTetrominoe, newY) || isOccupied(currentTetrominoe, currentX, newY)) {
        // lock the playing tetrominoe
        document.querySelectorAll('.current').forEach((collidedCell) => {
            collidedCell.classList.replace('current', 'occupied');
        });

        // clear filled rows
        const removedRows = checkFilledRows(gameBoard);
        gameController.addRows(removedRows)

        const [newTetrominoe, newX, newY] = swapToNextTetromino();
        return [newTetrominoe, newX, newY];
    }

    applyTetrominoUpdate(currentTetrominoe, currentTetrominoe, gameBoard, currentX, currentY, currentX, newY)

    return [currentTetrominoe, currentX, newY]
}
