import { calculateAndResize, initBoard } from "./factory/board.js";
import { createTetromino, getMatrixActualSize, updateTetriminos } from "./factory/tetrominoe.js";

// Initiaize the gaming and side board
const gameBoard = document.querySelector('#game-board');
const nextBoard = document.querySelector('#next-tetrominoe');
let xLength = 10, ylength = 20, currentX = 0, currentY = 0;
initBoard(gameBoard, ylength, xLength);
initBoard(nextBoard, 4, 4)
calculateAndResize(); //init size
window.addEventListener('resize', calculateAndResize);

// create tetrominoe
let currentTetrominoe = createTetromino(); // initialize first tetrominoes
let nextTetrminoe = currentTetrominoe;
let currentSize = getMatrixActualSize(currentTetrominoe.matrix);
let nextSize = currentSize;
currentX = Math.floor((xLength - currentSize.width) / 2);

// place tetriminos on game board and next board
updateTetriminos('add', 'current', currentTetrominoe, gameBoard, currentX, currentY);
updateTetriminos('add', 'current', currentTetrominoe, nextBoard, 0, 0);


// const nextBoard = document.querySelector('#next-tetrominoe');

let rows = Array.from(nextBoard.getElementsByClassName('row')); // Create a static array of rows

// Check each row
for (let y = rows.length - 1; y >= 0; y--) { // Loop backwards through rows
    let cells = Array.from(rows[y].getElementsByClassName('cell')); // Get cells of the row
    let isRowEmpty = cells.every(cell => cell.classList.contains('empty')); // Check if all cells are empty

    if (isRowEmpty) {
        rows[y].remove(); // Remove the entire row if all cells are empty
    }
}

// Assuming the grid is square, determine the number of columns based on the first row
let numberOfColumns = rows.length > 0 ? rows[0].getElementsByClassName('cell').length : 0;

// Check each column
for (let x = numberOfColumns - 1; x >= 0; x--) { // Loop backwards through columns
    let isColumnEmpty = true;

    for (let y = 0; y < rows.length; y++) {
        let cell = rows[y].getElementsByClassName('cell')[x]; // Get the cell at position (y, x)
        if (!cell.classList.contains('empty')) {
            isColumnEmpty = false; // If any cell in the column is not empty, mark the column as not empty
            break;
        }
    }

    if (isColumnEmpty) {
        for (let y = 0; y < rows.length; y++) {
            rows[y].getElementsByClassName('cell')[x].remove(); // Remove the cell in each row of this column
        }
    }
}




// placeTetrominoeOnBoard(currentTetrominoe, gameBoard)