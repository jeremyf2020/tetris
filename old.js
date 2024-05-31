
let board = Array(20).fill(0).map(() => Array(10).fill("0"));

const matrices = {
    'I': [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    'J': [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    'L': [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ],
    'O': [
        [1, 1],
        [1, 1],
    ],
    'S': [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    'Z': [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    'T': [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ]
};

document.addEventListener("keydown", matrices["L"]);

// rotateCurrent(name, matrix, x, y){

// }


addTetriminos("L", matrices["L"], 3, 0);
// removeTetriminos("L", matrices["L"], 3, 0);
// addTetriminos("L", matrices["L"], 3, 1);

drawBoard(canvas, board)


function removeTetriminos(name, matrix, x, y) {
    for (let i = 0; i < matrix.length; i++) {
        for (let ii = 0; ii < matrix[i].length; ii++) {
            if (matrix[i][ii] == "1") {
                board[i + y][ii + x] = "0";
            }
        }
    }
}


function rotate(matrix) {
    let result = Array(matrix[0].length).fill(null).map(() => []);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = matrix[0].length - 1; j >= 0; j--) {
            result[i].push(matrix[j][i]);
        }
    }
    return result;
}

function addTetriminos(name, matrix, x, y) {
    for (let i = 0; i < matrix.length; i++) {
        for (let ii = 0; ii < matrix[i].length; ii++) {
            if (matrix[i][ii] == "1") {
                board[i + y][ii + x].classList.add(name);
            }
        }
    }
}

// if (cell !== 0) {
//     cellElement.classList.add(cell);
// }

function drawBoard(canvas, board) {
    for (let i = 0; i < board.length; i++) {
        const row = board[i];
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');
        for (let ii = 0; ii < row.length; ii++) {
            const cell = row[ii];
            const cellElement = document.createElement('div');
            cellElement.classList.add("cell");
            rowElement.appendChild(cellElement);
        }
        canvas.appendChild(rowElement);
    }

}