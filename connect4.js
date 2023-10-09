/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

class Game {
    constructor(width = 7, height = 6, ...players) {
        // Set width and height of board (defaults to 7, 6)
        this.width = width;
        this.height = height;
        this.board = [];
        this.gameOver = false;
        this.players = players;

        this.currPlayer = this.players[0]; // Set the current player (1 or 2)

        this.makeBoard();
        this.makeHtmlBoard();
    }

    makeBoard() {
        // Build the board array
        for (let y = 0; y < this.height; y++) { // create a row for each value of y
            this.board.push(Array.from({length: this.width})) // create a cell for each value of x
        }
    }

    makeHtmlBoard() {
        const htmlBoard = document.getElementById('board'); // select the board element
        htmlBoard.style.display = 'inline-block';
        // Make the clickable top row
        const top = document.createElement('tr');
        top.id = 'column-top';
        top.addEventListener('click', this.handleClick.bind(this)); // We have to bind this

        // create a column for each value of width
        for (let x = 0; x < this.width; x++) {
            const headCell = document.createElement('th');
            headCell.id = x.toString();
            top.append(headCell);
        }

        // Add the top to the board
        htmlBoard.append(top)

        // make main part of board
        for (let y = 0; y < this.height; y++) {
            const row = document.createElement('tr');

            for (let x = 0; x < this.width; x++) {
                const cell = document.createElement('td');
                cell.id = `${y}-${x}`;
                row.append(cell);
            }

            htmlBoard.append(row);
        }

    }

    findSpotForCol(column) {
        for (let row = this.height - 1; row >= 0; row--) {
            console.log('Selected cell', row, column)
            console.log('Selected cell', this.board[row][column])
            if (!this.board[row][column]) { // try to access the cell, if it's undefined it's empty
                return row;
            }
        }
        return null;
    }

    placeInTable(column, row) {
        // Create a game piece and style it to the player
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.style.backgroundColor = this.currPlayer.color;
        // piece.style.top = -50 * (row + 2);

        // place it in the table
        const spot = document.getElementById(`${row}-${column}`);
        spot.append(piece);
    }

    checkForWin() {
        function _win(cells) { // define a helper function within the function
            // Check four cells to see if they're all color of current player
            //  - cells: list of four (y, x) cells
            //  - returns true if all are legal coordinates & all match currPlayer
            return cells.every(
                ([y, x]) =>
                    y >= 0 &&
                    y < this.height &&
                    x >= 0 &&
                    x < this.width &&
                    this.board[y][x] === this.currPlayer
            );
        }

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                // get "check list" of 4 cells (starting here) for each of the different
                // ways to win
                const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
                const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
                const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
                const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

                // find winner (only checking each win-possibility as needed)
                if (_win.call(this, horiz) || _win.call(this, vert) || _win.call(this, diagDR) || _win.call(this, diagDL)) {
                    return true;
                }
            }
        }
    }

    endGame(msg) {
        this.gameOver = true;
        setTimeout(() => {
            alert(msg);
        },0); // setting a fake timeout so the last piece paints before the alert pops

    }

    handleClick(e) {
        if (this.gameOver) return;
        // get clicked column from ID of clicked cell
        const column = e.target.id;
        console.log('Column is', column)

        // get row (cell)
        const row = this.findSpotForCol(column);
        if (row === null) {
            // There are no empty spots on this column. Exit.
            return;
        }
        console.log('Row is', row)

        // place piece in board and add to HTML table
        this.board[row][column] = this.currPlayer;
        this.placeInTable(column, row);

        // check for a winner
        if (this.checkForWin.call(this)) {
            return this.endGame(`${this.currPlayer.betterName()} player  won!`);
        }

        // check for tie
        if (this.board.every(row => row.every(cell => cell))) {
            return this.endGame('Tie!');
        }
        // switch players
        this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
    }


}

class Player {
    constructor(color) {
        this.color = color
    }
    betterName() {
        return [...this.color].reduce((newName, currentValue, currentIndex) => {
            console.log('New name', newName);
            console.log('Current value', currentValue);
            console.log('Current index', currentIndex);
            if (currentIndex === 0) {
                return currentValue.toUpperCase();
            } else {
                return newName + currentValue;
            }
        }, 0)
    }
}

const newGame = document.querySelector('button');
const htmlBoard = document.getElementById('board');
const player1Input = document.querySelector('#player1')
const player2Input = document.querySelector('#player2')

player1Input.value = 'Red';
player2Input.value = 'Yellow';
htmlBoard.style.display = 'none';
newGame.addEventListener('click', ()=> {
    const htmlBoard = document.getElementById('board');
    htmlBoard.innerHTML = '';
    new Game(7, 6, new Player(player1Input.value.toLowerCase()), new Player(player2Input.value.toLowerCase()))
})
