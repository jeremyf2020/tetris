export function initBoard(canvas, xLength, yLength) {
    canvas.innerHTML = '';
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

export function calculateAndResize() {
    const boardHeight = document.documentElement.clientHeight;
    const boardWidth = document.documentElement.clientWidth;

    // Calculate potential block sizes
    const sizeBasedOnHeight = boardHeight / 20 * 0.8; // 20 rows, 20% buffer
    const sizeBasedOnWidth = (boardWidth * 0.6) / 10 * 0.8; // 10 columns, 60% of the width, 20% buffer

    // Choose the smaller size to ensure the blocks stay within the viewport
    const blockSize = Math.min(sizeBasedOnHeight, sizeBasedOnWidth);

    // Set the CSS variable
    document.documentElement.style.setProperty('--block-size', `${blockSize}px`);
    document.documentElement.style.setProperty('--next-board-size', `${blockSize * 6}px`);
}

export function adjustNextDisplay(nextBoard) {
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

}

export function checkFilledRows(board) {
    let removeRows = 0;
    for (let rowId = 0; rowId < board.children.length; rowId++) {
        let rowChecker = 0;
        for (let cellId = 0; cellId < board.children[rowId].children.length; cellId++) {
            if (board.children[rowId].children[cellId].classList.contains('occupied')) {
                rowChecker++
            }
        }
        if (rowChecker == board.children[rowId].children.length) {
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
    board.insertBefore(newRows, board.firstChild);
    return removeRows;
}

