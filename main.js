import { initBoard, matrices, getMatrixActualSize, rotateMatrix } from "./scripts.js";

const canvas = document.querySelector('#canvas');

let boardWidth = 10;
let boardHeight = 20;

initBoard(canvas, boardHeight, boardWidth)

// initialize first tetrominoes
let currentTetrominoe = createTetromino(matrices, boardWidth);

let speedControl = {
    level: 1,
    clearedRows: 0,
    timer: 0,
    speed: 1000,
    lastTime: 0
}

updateTetriminos('add', 'current', currentTetrominoe);

setInterval(moveDown(1), 1000);


document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            rotate();
            break;
        case "ArrowDown":
            moveDown(1);
            break;
        case "ArrowLeft":
            moveHorizontal(-1);
            break;
        case "ArrowRight":
            moveHorizontal(1);
            break;
    }
});

function moveHorizontal(deltaX) {

    const newTetrominoe = {
        ...currentTetrominoe,
        x: currentTetrominoe.x + deltaX
    }

    applyTetrominoUpdate(newTetrominoe)

}

function moveDown(deltaY) {

    const newTetrominoe = {
        ...currentTetrominoe,
        y: currentTetrominoe.y + deltaY
    }
    // console.log(newTetrominoe)

    applyTetrominoUpdate(newTetrominoe)
    const collised = checkCollision(currentTetrominoe);
    console.log(collised)
    if (collised) {
        document.querySelectorAll('.current').forEach((collidedCell) => {
            collidedCell.classList.replace('current', 'occupied');
        });
        currentTetrominoe = createTetromino(matrices, boardWidth);
        const removedRows = checkFilledRows();
        const score = calculateScore(removedRows, speedControl.level)
        speedControl.clearedRows += removedRows;
        speedControl.level = Math.floor(speedControl.clearedRows / 10);
        speedControl.speed = speedControl.level < 10 ? 1000 - speedControl.level(100) : 100 - speedControl.level;

        document.querySelector('#score').innerHTML = Number(document.querySelector('#score').innerHTML) + score;
        updateTetriminos('add', 'current', currentTetrominoe);
    }
}

function calculateScore(rows, level) {
    let baseScore;

    if (rows === 1) {
        baseScore == 40
    }
    else if (rows === 2) {
        baseScore == 100
    }
    else if (rows === 3) {
        baseScore == 300
    }
    else if (rows === 2) {
        baseScore == 1200
    }

    let result = baseScore * level;
    return result;

}


function rotate() {

    const newTetrominoe = {
        ...currentTetrominoe,
        matrix: rotateMatrix(currentTetrominoe.matrix)
    };

    applyTetrominoUpdate(newTetrominoe)
}

function applyTetrominoUpdate(newTetrominoe) {
    if (!isValidMove(newTetrominoe)) {
        return;
    }
    updateTetriminos('remove', 'current', currentTetrominoe);
    currentTetrominoe = newTetrominoe;
    updateTetriminos('add', 'current', currentTetrominoe);
}

function checkCollision(tetrominoe) {
    const board = document.querySelector('#canvas')
    const { matrix, x, y } = tetrominoe;

    for (let rowId = 0; rowId < matrix.length; rowId++) {
        for (let cellId = 0; cellId < matrix[rowId].length; cellId++) {
            if (matrix[rowId][cellId] !== 0) {
                const newX = x + cellId;
                const newY = y + rowId;

                if (newY > board.children.length) {
                    return true;
                }
                if (newX > board.children[0].children.length) {
                    return true;
                }
                if ((newY === board.children.length - 1
                    && board.children[newY].children[newX].classList.contains('current'))
                ) {
                    return true;
                }
                if ((newY < board.children.length
                    && board.children[newY].children[newX].classList.contains('current')
                    && board.children[newY + 1].children[newX].classList.contains('occupied'))
                ) {
                    if (newY <= 0) {
                        gameOver();
                        return;
                    }
                    return true;
                }
            }
        }
    }
    return false;
}

function checkFilledRows() {
    const board = document.querySelector('#canvas')
    console.log('enter checkFilledRows funcC')
    let removeRows = 0;
    for (let rowId = 0; rowId < board.children.length; rowId++) {
        let rowChecker = 0;
        for (let cellId = 0; cellId < board.children[rowId].children.length; cellId++) {
            if (board.children[rowId].children[cellId].classList.contains('occupied')) {
                rowChecker++
            }
        }
        if (rowChecker == board.children[rowId].children.length) {
            console.log(rowId + ' is remove')
            board.children[rowId].remove();
            removeRows++;
            rowId--;
        }
    }
    let newRows = document.createDocumentFragment();
    for (let r = 0; r < removeRows; r++) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');
        for (let c = 0; c < board.children[0].children.length; c++) {
            const cellElement = document.createElement('div');
            cellElement.className = "cell empty";
            rowElement.appendChild(cellElement);
        }
        newRows.appendChild(rowElement);
    }
    // console.log(newRows)
    board.insertBefore(newRows, board.firstChild);
    return removeRows;
}




function updateTetriminos(action, status, tetrominoe) {
    const { key, matrix, x, y } = tetrominoe;
    const board = document.querySelector('#canvas')

    matrix.forEach((row, rowId) => {
        row.forEach((cell, cellId) => {
            if (cell !== 0) {
                if (board.children[y + rowId].children[x + cellId].classList.contains('empty')) {
                    board.children[y + rowId].children[x + cellId].classList.remove('empty');
                }
                board.children[y + rowId].children[x + cellId].classList[action](key);
                board.children[y + rowId].children[x + cellId].classList[action](status);
                if (action == 'remove') {
                    board.children[y + rowId].children[x + cellId].classList.add('empty');
                }
            }
        })
    })
}

function isValidMove(tetrominoe) {
    const { matrix, x, y } = tetrominoe;
    const board = document.querySelector('#canvas')

    for (let rowId = 0; rowId < matrix.length; rowId++) {
        for (let cellId = 0; cellId < matrix[rowId].length; cellId++) {
            if (matrix[rowId][cellId] !== 0) {
                const newX = x + cellId;
                const newY = y + rowId;
                if (newY >= boardHeight
                    || newX < 0
                    || newX >= boardWidth
                    || (board.children[newY].children[newX].classList.contains('occupied')
                        && !board.children[newY].children[newX].classList.contains('current'))
                ) {
                    // console.log("Invalid move at:", newX, newY);
                    // console.log(board.children[newY].children[newX].className.match(/empty|current/))
                    return false;
                }
            }
        }
    }
    return true;
}



function createTetromino(matrices, boardWidth) {
    const key = Object.keys(matrices)[Math.floor(Math.random() * Object.keys(matrices).length)];
    return {
        key: key,
        matrix: matrices[key],
        x: Math.floor((boardWidth - matrices[key][0].length) / 2),
        y: 0
    };
}

