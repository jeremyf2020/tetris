export const matrices = {
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

export function createTetromino() {
    const key = Object.keys(matrices)[Math.floor(Math.random() * Object.keys(matrices).length)];
    return {
        key: key,
        matrix: matrices[key],
    };
}

export function getMatrixActualSize(matrix) {
    let height = 0;
    let width = 0;

    for (let row = 0; row < matrix.length; row++) {
        if (matrix[row].some(value => value !== 0)) {
            height++;
        }
    }

    for (let col = 0; col < matrix[0].length; col++) {
        if (matrix.some(row => row[col] !== 0)) {
            width++;
        }
    }

    return { height, width };
}

export function updateTetriminos(action, status, tetrominoe, board, x, y) {
    const { key, matrix } = tetrominoe;
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
