import { calculateAndResize, initBoard, adjustNextDisplay } from "./factory/board.js";
import { createTetromino, getMatrixActualSize, updateTetriminos } from "./factory/tetrominoe.js";
import { keyController } from "./keyController.js";

// Initiaize the gaming and side board
export const gameBoard = document.querySelector('#game-board');
const nextBoard = document.querySelector('#next-tetrominoe');
export let xLength = 10, ylength = 20, currentX = 0, currentY = 0;
initBoard(gameBoard, ylength, xLength);
initBoard(nextBoard, 4, 4)
calculateAndResize(); //init size
window.addEventListener('resize', calculateAndResize);

// create tetrominoe
export let currentTetrominoe = createTetromino(); // initialize first tetrominoes
let nextTetrminoe = currentTetrominoe;
let currentSize = getMatrixActualSize(currentTetrominoe.matrix);
currentX = Math.floor((xLength - currentSize.width) / 2);

// place tetriminos on game board and next board
updateTetriminos('add', 'current', currentTetrominoe, gameBoard, currentX, currentY);
updateTetriminos('add', 'current', currentTetrominoe, nextBoard, 0, 0);
adjustNextDisplay(nextBoard)

document.addEventListener("keydown", (e) => { keyController(e) });

export function updateCurrentTetrominoe(newTetrominoe) {
    currentTetrominoe = newTetrominoe;
}
