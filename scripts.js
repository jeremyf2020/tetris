
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

    return { height: height, width: width };
}

export function rotate(matrix) {
    let rotatedMatrix = Array(matrix[0].length).fill(null).map(() => []);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = matrix[0].length - 1; j >= 0; j--) {
            rotatedMatrix[i].push(matrix[j][i]);
        }
    }
    return rotatedMatrix;
}

export function initBoard(canvas, xLength, yLength) {
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

// module.exports = {
//     matrices,
//     rotate,
//     initBoard,
//     getMatrixActualSize
// }

