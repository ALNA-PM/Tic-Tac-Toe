
const board = document.getElementById("board");
const message = document.getElementById("message");
let currentPlayer = "X";
let cells = Array(9).fill("");

function checkWin() {
    const wins = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    return wins.some(comb => {
        const [a, b, c] = comb;
        return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });
}

function isDraw() {
    return cells.every(cell => cell);
}

function handleClick(e) {
    const idx = Array.from(board.children).indexOf(e.target);
    if (cells[idx]) return;

    cells[idx] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        message.textContent = currentPlayer + " wins!";
        board.removeEventListener("click", handleClick, true);
    } else if (isDraw()) {
        message.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function setupBoard() {
    board.innerHTML = "";
    cells = Array(9).fill("");
    message.textContent = "";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        board.appendChild(cell);
    }
    board.addEventListener("click", handleClick, true);
}

setupBoard();
