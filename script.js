const board = document.getElementById('game-board');
const statusDiv = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill("");

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diags
];

function renderBoard() {
    board.innerHTML = '';
    gameState.forEach((cell, idx) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.dataset.index = idx;
        cellDiv.textContent = cell;
        cellDiv.addEventListener('click', handleCellClick);
        board.appendChild(cellDiv);
    });
}

function handleCellClick(e) {
    const idx = e.target.dataset.index;
    if (!gameActive || gameState[idx]) return;
    gameState[idx] = currentPlayer;
    renderBoard();
    if (checkWinner()) {
        statusDiv.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (!gameState.includes("")) {
        statusDiv.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDiv.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return (
            gameState[a] &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        );
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = Array(9).fill("");
    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
    renderBoard();
}

resetBtn.addEventListener('click', resetGame);

// Initial render
resetGame();
