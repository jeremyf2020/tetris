import { calculateAndResize, initBoard, adjustNextDisplay } from "./factory/board.js";
import { createTetromino, getMatrixActualSize, updateTetriminos } from "./factory/tetrominoe.js";
import { keyController } from "./keyController.js";

// Initiaize the gaming and side board
export const gameBoard = document.querySelector('#game-board');
const nextBoard = document.querySelector('#next-tetrominoe');
export let boardWidth = 10, boardHeight = 20, currentX = 0, currentY = 0;
initBoard(gameBoard, boardHeight, boardWidth);
initBoard(nextBoard, 4, 4)
calculateAndResize(); //init size
window.addEventListener('resize', calculateAndResize);

// create tetrominoe
export let currentTetrominoe = createTetromino(); // initialize first tetrominoes
let nextTetrminoe = createTetromino();
let currentSize = getMatrixActualSize(currentTetrominoe.matrix);
currentX = Math.floor((boardWidth - currentSize.width) / 2);

// place tetriminos on game board and next board
updateTetriminos('add', 'current', currentTetrominoe, gameBoard, currentX, currentY);
updateTetriminos('add', 'current', nextTetrminoe, nextBoard, 0, 0);
adjustNextDisplay(nextBoard)

document.addEventListener("keydown", (e) => {
    keyController(e, (newTetrominoe, newX, newY) => {
        // Update the state in main.js with the new values
        currentTetrominoe = newTetrominoe
        currentX = newX;
        currentY = newY;
    });
});

export function swapToNextTetromino() {
    currentTetrominoe = nextTetrminoe;
    nextTetrminoe = createTetromino();
    initBoard(nextBoard, 4, 4)
    updateTetriminos('add', 'current', nextTetrminoe, nextBoard, 0, 0);
    adjustNextDisplay(nextBoard);

    let currentSize = getMatrixActualSize(currentTetrominoe.matrix);
    currentX = Math.floor((boardWidth - currentSize.width) / 2);
    currentY = 0;
    updateTetriminos('add', 'current', currentTetrominoe, gameBoard, currentX, currentY);

    return [currentTetrominoe, currentX, currentY]

}