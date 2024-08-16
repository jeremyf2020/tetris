import { gameBoard, boardWidth, boardHeight } from "./main.js";

export function isInLeftEdge(tetrominoe, x) {
    const { matrix } = tetrominoe;
    for (let rowId = 0; rowId < matrix.length; rowId++) {
        for (let cellId = 0; cellId < matrix[rowId].length; cellId++) {
            if (matrix[rowId][cellId] !== 0) {
                const newX = x + cellId;
                if (newX < 0) {
                    return false;
                }
            }
        }
    }
    return true;
}

export function isInRightEdge(tetrominoe, x) {
    const { matrix } = tetrominoe;
    for (let rowId = 0; rowId < matrix.length; rowId++) {
        for (let cellId = 0; cellId < matrix[rowId].length; cellId++) {
            if (matrix[rowId][cellId] !== 0) {
                const newX = x + cellId;
                if (newX >= boardWidth) {
                    return false;
                }
            }
        }
    }
    return true;
}

export function isInBottomEdge(tetrominoe, y) {
    const { matrix } = tetrominoe;
    for (let rowId = 0; rowId < matrix.length; rowId++) {
        for (let cellId = 0; cellId < matrix[rowId].length; cellId++) {
            if (matrix[rowId][cellId] !== 0) {
                const newY = y + rowId;
                if (newY >= boardHeight) {
                    return false;
                }
            }
        }
    }
    return true;
}

export function isOccupied(tetrominoe, x, y) {
    const { matrix } = tetrominoe;
    for (let rowId = 0; rowId < matrix.length; rowId++) {
        for (let cellId = 0; cellId < matrix[rowId].length; cellId++) {
            if (matrix[rowId][cellId] !== 0) {
                const newX = x + cellId;
                const newY = y + rowId;
                if (gameBoard.children[newY].children[newX].classList.contains('occupied')
                    && !gameBoard.children[newY].children[newX].classList.contains('current')) {
                    return true;
                }
            }
        }
    }
    return false;
}

