import { calculateBlockSize, initBoard } from "./factory/board.js";

const canvas = document.querySelector('#canvas');
const nextBoard = document.querySelector('#next-tetrominoe')

let xLength = 10;
let ylength = 20;

initBoard(canvas, ylength, xLength)

// Initial calculation of tetrominoe size
calculateBlockSize();

// Recalculate the block size when the window is resized
window.addEventListener('resize', calculateBlockSize);

