/**
 * @jest-environment jsdom
 */
import { rotate, matrices, initBoard, getMatrixActualSize } from './scripts.js';

function testRotation(shape, expectedMatrix) {
    test(`the ${shape} tetromino should be correctly rotated`, () => {
        const matrix = matrices[shape];
        const rotatedMatrix = rotate(matrix);
        expect(rotatedMatrix).toEqual(expectedMatrix);
    });
}

describe('Rotations', () => {

    testRotation("I", [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]
    ]);

    testRotation("J", [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0]
    ]);

    testRotation("L", [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ]);

    testRotation("O", [
        [1, 1],
        [1, 1]
    ]);

    testRotation("S", [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1]
    ]);

    testRotation("Z", [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0]
    ]);


    test('rotate T 4 times', () => {
        const matrix = matrices["T"]
        const firstRotation = rotate(matrix);
        expect(firstRotation).toEqual([
            [0, 1, 0],
            [0, 1, 1],
            [0, 1, 0],
        ]);
        console.log('firstRotation:');
        console.table(firstRotation);
        const secondRotation = rotate(firstRotation);
        expect(secondRotation).toEqual([
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ]);
        console.log('secondRotation:');
        console.table(secondRotation);

        const thirdRotation = rotate(secondRotation);
        expect(thirdRotation).toEqual([
            [0, 1, 0],
            [1, 1, 0],
            [0, 1, 0],
        ]);
        console.log('thirdRotation:');
        console.table(thirdRotation);

        const fourthRotation = rotate(thirdRotation);
        expect(fourthRotation).toEqual([
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0],
        ]);
        console.log('fourthRotation:');
        console.table(fourthRotation);

    });

});

describe('initBoard function', () => {
    let canvas;

    beforeEach(() => {
        document.body.innerHTML = '<div id="canvas"></div>';
        canvas = document.querySelector('#canvas');
    });

    test('should create the correct number of rows and cells', () => {
        const xLength = 5;
        const yLength = 3;

        initBoard(canvas, xLength, yLength);

        // Check if the number of rows is correct
        const rows = canvas.getElementsByClassName('row');
        expect(rows.length).toBe(xLength);

        // Check if the number of cells in each row is correct
        for (const row of rows) {
            const cells = row.getElementsByClassName('cell');
            expect(cells.length).toBe(yLength);
        }
    });
});

describe('matrix valid size', () => {

    test('actual size of I', () => {
        const size = getMatrixActualSize(matrices["I"]);
        expect(size).toEqual({ height: 1, width: 4 })
    })

    test('actual size of I', () => {
        const size = getMatrixActualSize(matrices["J"]);
        expect(size).toEqual({ height: 2, width: 3 })
    })

    test('actual size of O', () => {
        const size = getMatrixActualSize(matrices["O"]);
        expect(size).toEqual({ height: 2, width: 2 })
    })
    test('actual size of Z', () => {
        const size = getMatrixActualSize(matrices["Z"]);
        expect(size).toEqual({ height: 2, width: 3 })
    })

    test('actual size of rotated I', () => {
        const matrix = matrices["I"];
        const rotatedMatrix = rotate(matrix);
        const size = getMatrixActualSize(rotatedMatrix);
        expect(size).toEqual({ height: 4, width: 1 })
    })


});
