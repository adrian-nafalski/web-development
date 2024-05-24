// Global Variables
let board;
let playerO = "O";
let playerX = "X";
let currPlayer = playerO;
let computerPlayer = playerX;
let gameOver = false;

window.onload = function () {
    initializeGame();
};

function initializeGame() {
    document.body.innerHTML = `
        <h1>Gra kółko i krzyżyk</h1>
        <hr>
        <br>
        <div id="board"></div>
        <div id="result"></div>
    `;
    setGame();
}

function setGame() {
    board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ];

    gameOver = false;
    currPlayer = playerO;
    document.getElementById("board").innerHTML = "";
    document.getElementById("result").innerText = "";

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }
            tile.innerText = "";
            tile.addEventListener("click", setTile);
            document.getElementById("board").appendChild(tile);
        }
    }
}

function setTile() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] != " ") {
        return;
    }

    board[r][c] = currPlayer;
    this.innerText = currPlayer;

    checkWinner();

    if (!gameOver) {
        currPlayer = currPlayer === playerO ? computerPlayer : playerO;
        if (currPlayer === computerPlayer) {
            setTimeout(computerMove, 500);
        }
    }
}

function checkWinner() {
    // Horizontally, check 3 rows
    for (let r = 0; r < 3; r++) {
        if (
            board[r][0] == board[r][1] &&
            board[r][1] == board[r][2] &&
            board[r][0] != " "
        ) {
            highlightWinner(r, 0, r, 1, r, 2);
            endGame(board[r][0]);
            return;
        }
    }

    // Vertically, check 3 columns
    for (let c = 0; c < 3; c++) {
        if (
            board[0][c] == board[1][c] &&
            board[1][c] == board[2][c] &&
            board[0][c] != " "
        ) {
            highlightWinner(0, c, 1, c, 2, c);
            endGame(board[0][c]);
            return;
        }
    }

    // Diagonally
    if (
        board[0][0] == board[1][1] &&
        board[1][1] == board[2][2] &&
        board[0][0] != " "
    ) {
        highlightWinner(0, 0, 1, 1, 2, 2);
        endGame(board[0][0]);
        return;
    }

    // Anti-diagonally
    if (
        board[0][2] == board[1][1] &&
        board[1][1] == board[2][0] &&
        board[0][2] != " "
    ) {
        highlightWinner(0, 2, 1, 1, 2, 0);
        endGame(board[0][2]);
        return;
    }

    // Check for draw
    if (board.flat().every((cell) => cell !== " ")) {
        endGame("draw");
        return;
    }
}

function highlightWinner(r1, c1, r2, c2, r3, c3) {
    document.getElementById(r1 + "-" + c1).classList.add("winner");
    document.getElementById(r2 + "-" + c2).classList.add("winner");
    document.getElementById(r3 + "-" + c3).classList.add("winner");
}

function computerMove() {
    let bestScore = -Infinity;
    let move;

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (board[r][c] == " ") {
                board[r][c] = computerPlayer;
                let score = minimax(board, 0, false);
                board[r][c] = " ";
                if (score > bestScore) {
                    bestScore = score;
                    move = { r, c };
                }
            }
        }
    }

    board[move.r][move.c] = computerPlayer;
    let tile = document.getElementById(move.r + "-" + move.c);
    tile.innerText = computerPlayer;

    checkWinner();
    currPlayer = playerO;
}

function minimax(board, depth, isMaximizing) {
    let scores = {
        X: 1,
        O: -1,
        draw: 0,
    };

    let result = checkWinnerMinimax();
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (board[r][c] == " ") {
                    board[r][c] = computerPlayer;
                    let score = minimax(board, depth + 1, false);
                    board[r][c] = " ";
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (board[r][c] == " ") {
                    board[r][c] = playerO;
                    let score = minimax(board, depth + 1, true);
                    board[r][c] = " ";
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}

function checkWinnerMinimax() {
    for (let r = 0; r < 3; r++) {
        if (
            board[r][0] == board[r][1] &&
            board[r][1] == board[r][2] &&
            board[r][0] != " "
        ) {
            return board[r][0];
        }
    }

    for (let c = 0; c < 3; c++) {
        if (
            board[0][c] == board[1][c] &&
            board[1][c] == board[2][c] &&
            board[0][c] != " "
        ) {
            return board[0][c];
        }
    }

    if (
        board[0][0] == board[1][1] &&
        board[1][1] == board[2][2] &&
        board[0][0] != " "
    ) {
        return board[0][0];
    }

    if (
        board[0][2] == board[1][1] &&
        board[1][1] == board[2][0] &&
        board[0][2] != " "
    ) {
        return board[0][2];
    }

    if (board.flat().every((cell) => cell != " ")) {
        return "draw";
    }

    return null;
}

function endGame(winner) {
    document.body.innerHTML = "";

    let newDiv = document.createElement("div");
    newDiv.id = "endGame";

    let winnerText = document.createElement("p");
    winnerText.innerText =
        winner === "draw" ? "Remis!" : "Zwycięzca to: " + winner;
    newDiv.appendChild(winnerText);

    let replayQuestion = document.createElement("p");
    replayQuestion.innerText = "Czy chcesz zagrać ponownie?";
    newDiv.appendChild(replayQuestion);

    let replayButton = document.createElement("button");
    replayButton.innerText = "Zagraj ponownie";
    replayButton.addEventListener("click", initializeGame);
    newDiv.appendChild(replayButton);

    document.body.appendChild(newDiv);
}
