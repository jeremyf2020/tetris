import { calculateAndResize, initBoard, adjustNextDisplay } from "./factory/board.js";
import { createTetromino, getMatrixActualSize, updateTetriminos } from "./factory/tetrominoe.js";
import { keyController, moveDown } from "./keyController.js";
import { gameController } from "./gameController.js";


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

let gravity;

export function startGravity() {
    gravity = setInterval(() => {
        const [newTetrominoe, newX, newY] = moveDown(1);
        // Update the global state with the new Tetromino position
        currentTetrominoe = newTetrominoe;
        currentX = newX;
        currentY = newY;

        // After moving down, check if the speed should be updated
        updateGravity();
    }, gameController.speed * 1000);
}

function updateGravity() {
    // Clear the existing interval
    clearInterval(gravity);
    // Restart the gravity interval with the updated speed
    startGravity();
}

// Start the initial gravity
startGravity();

document.querySelector('#stop-btn').addEventListener('click', (e) => {
    if (e.target.innerHTML === "STOP") {
        clearInterval(gravity);
        e.target.innerHTML = "PLAY"
    } else {
        startGravity();
        e.target.innerHTML = "STOP"
    }
})
