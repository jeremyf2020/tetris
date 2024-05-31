const canvas = document.querySelector('#canvas');

const matrices = {
    "I": [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    "J": [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    "L": [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ],
    "O": [
        [1, 1],
        [1, 1],
    ],
    "S": [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    "Z": [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    "T": [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ]
};

let boardWidth = 10;
let boardHeight = 20;

initBoard(canvas, boardHeight, boardWidth)

let currentKey = Object.keys(matrices)[Math.floor(Object.keys(matrices).length * Math.random())];
let currentMatrix = matrices[currentKey];
let currentX = Math.floor((boardWidth - currentMatrix[0].length) / 2);
let currentY = 0;
let speed = 1000;

addTetriminos(currentKey, currentMatrix, currentX, currentY);

let drop = setInterval(moveDown, speed)
let lastExecutionTime = Date.now();

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            rotate();
            break;
        case "ArrowDown":
            moveDown();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
    }
});

function rotate() {
    let rotatedMatrix = Array(currentMatrix[0].length).fill(null).map(() => []);
    for (let i = 0; i < currentMatrix.length; i++) {
        for (let j = currentMatrix[0].length - 1; j >= 0; j--) {
            rotatedMatrix[i].push(currentMatrix[j][i]);
        }
    }
    if (checkBottomEdge(rotatedMatrix, currentY)) {

        clearInterval(drop)

        let currentTime = Date.now();
        let elapsedTime = currentTime - lastExecutionTime;
        let remainingTime = speed - elapsedTime % speed;

        removeTetriminos(currentKey, currentMatrix, currentX, currentY);
        currentMatrix = rotatedMatrix;
        addTetriminos(currentKey, currentMatrix, currentX, currentY);

        setTimeout(() => {
            drop = setInterval(moveDown, speed);
            lastExecutionTime = Date.now();
        }, remainingTime);

    }
}


function moveLeft() {
    if (checkLeftEdge(currentMatrix, currentX)) {
        removeTetriminos(currentKey, currentMatrix, currentX, currentY);
        currentX--;
        addTetriminos(currentKey, currentMatrix, currentX, currentY);
    }
}


function checkLeftEdge(matrix, positionX) {
    if (positionX > 0) {
        return true;
    }
    let matrixWidth = getMatrixWidth(matrix);
    if (matrix[0].length - matrixWidth + positionX < 0) {
        return false;
    }

}

function moveRight() {
    if (checkRightEdge(currentMatrix, currentX + 1)) {
        removeTetriminos(currentKey, currentMatrix, currentX, currentY);
        currentX++;
        addTetriminos(currentKey, currentMatrix, currentX, currentY);
    }
}

function checkRightEdge(matrix, positionX) {
    if (positionX + matrix[0].length <= boardWidth) {
        return true;
    }
    // [todo: logic check, nessary?]
    let matrixWidth = getMatrixWidth(matrix);
    if (matrixWidth + positionX >= boardWidth) {
        return false
    }
    return true
}

function getMatrixWidth(matrix) {
    let width = 0;

    for (let i = 0; i < matrix[0].length; i++) {
        for (let ii = 0; ii < matrix.length; ii++) {
            if (matrix[ii][i] == 1) {
                width++;
                break;
            }
        }
    }
    return width;
}

function getMatrixHeight(matrix) {
    let height = 0;

    for (let i = 0; i < matrix.length; i++) {
        for (let ii = 0; ii < matrix[i].length; ii++) {
            if (matrix[i][ii] === 1) {
                height++;
                break;
            }
        }
    }
    return height;
}


function moveDown() {

    if (checkBottomEdge(currentMatrix, currentY + 1)) {
        removeTetriminos(currentKey, currentMatrix, currentX, currentY);
        currentY++;
        addTetriminos(currentKey, currentMatrix, currentX, currentY);
    }
}

function checkBottomEdge(matrix, positionY) {
    let matrixHeight = getMatrixHeight(matrix);
    if (positionY + matrixHeight > boardHeight) {
        return false;
    }
    return true;
}



function initBoard(canvas, xLength, yLength) {
    for (let x = 0; x < xLength; x++) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');
        for (let y = 0; y < yLength; y++) {
            const cellElement = document.createElement('div');
            cellElement.classList.add("cell");
            rowElement.appendChild(cellElement);
        }
        canvas.appendChild(rowElement);
    }
}

function updateTetriminos(name, matrix, x, y, action) {
    // if (!checkBottomEdge(matrix, y + 1)) {
    //     return
    // }
    // if (!checkLeftEdge(matrix, x)) {
    //     return
    // }
    // if (!checkRightEdge(matrix, x)) {
    //     return
    // }


    for (let i = 0; i < matrix.length; i++) {
        for (let ii = 0; ii < matrix[i].length; ii++) {
            if (matrix[i][ii] == 1) { // Note: change "1" to 1 for consistency with the matrix data
                if (action === 'add') {
                    canvas.children[y + i].children[x + ii].classList.add(name);
                } else if (action === 'remove') {
                    canvas.children[y + i].children[x + ii].classList.remove(name);
                }
            }
        }
    }
}

// Add a Tetrimino
function addTetriminos(name, matrix, x, y) {
    updateTetriminos(name, matrix, x, y, 'add');
}

// Remove a Tetrimino
function removeTetriminos(name, matrix, x, y) {
    updateTetriminos(name, matrix, x, y, 'remove');
}

