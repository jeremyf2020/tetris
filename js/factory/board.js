

export function initBoard(canvas, xLength, yLength) {
    for (let x = 0; x < xLength; x++) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');
        for (let y = 0; y < yLength; y++) {
            const cellElement = document.createElement('div');
            cellElement.className = "cell empty";
            rowElement.appendChild(cellElement);
        }
        canvas.appendChild(rowElement);
    }
}

export function calculateBlockSize() {
    const boardHeight = document.documentElement.clientHeight;
    const boardWidth = document.documentElement.clientWidth;

    // Calculate potential block sizes
    const sizeBasedOnHeight = boardHeight / 20 * 0.8; // 20 rows, 20% buffer
    const sizeBasedOnWidth = (boardWidth * 0.6) / 10 * 0.8; // 10 columns, 60% of the width, 20% buffer

    // Choose the smaller size to ensure the blocks stay within the viewport
    const blockSize = Math.min(sizeBasedOnHeight, sizeBasedOnWidth);

    // Set the CSS variable
    document.documentElement.style.setProperty('--block-size', `${blockSize}px`);
    document.documentElement.style.setProperty('--size-board-width', `${blockSize * 6}px`);
}

