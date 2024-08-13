import { calculateAndResize, initBoard } from "./factory/board.js";

// Initiaize the gaming and side board
const canvas = document.querySelector('#game-board');
const nextBoard = document.querySelector('#next-tetrominoe');
let xLength = 10, ylength = 20;
initBoard(canvas, ylength, xLength);
initBoard(nextBoard, 6, 6)
calculateAndResize(); //init size
window.addEventListener('resize', calculateAndResize);

// create tetrominoe


