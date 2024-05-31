/**
 * @jest-environment jsdom
 */
const { rotate, matrices } = require('./scripts'); // Adjust the import according to your file structure

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

