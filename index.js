document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const playerXInput = document.getElementById("playerX");
    const playerOInput = document.getElementById("playerO");
    const startButton = document.getElementById("start-button");
    const winnerMessage = document.getElementById("winner-message");
    const performanceBox = document.getElementById("performance-box");
    const restartButton = document.getElementById("restart-button");
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    let currentPlayer = "X";
    let isGameOver = false;
    let playerXName = "";
    let playerOName = "";
    let playerXWins = 0;
    let playerOWins = 0;

    function checkWin() {
        for (const combination of WINNING_COMBINATIONS) {
            const [a, b, c] = combination;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                isGameOver = true;
                return combination;
            }
        }
        return null;
    }

    function checkDraw() {
        for (const cell of cells) {
            if (!cell.textContent) {
                return false;
            }
        }
        isGameOver = true;
        return true;
    }

    function handleWin(winner, combination) {
        if (winner === "X") {
            playerXWins++;
        } else if (winner === "O") {
            playerOWins++;
        }
        isGameOver = true;
        winnerMessage.textContent = `${winner === "X" ? playerXName : playerOName} is the Winner!`;
        performanceBox.textContent = `Player X Wins: ${playerXWins} | Player O Wins: ${playerOWins}`;
        performanceBox.classList.remove("hidden");
        restartButton.classList.remove("hidden");
        for (const index of combination) {
            cells[index].classList.add("winner");
        }
    }

    function restartGame() {
        cells.forEach((cell) => {
            cell.textContent = "";
            cell.classList.remove("winner");
        });
        currentPlayer = "X";
        isGameOver = false;
        winnerMessage.textContent = "";
        performanceBox.classList.add("hidden");
        restartButton.classList.add("hidden");
        board.style.display = "none";
        playerXInput.value = "";
        playerOInput.value = "";
        document.getElementById("player-names").style.display = "flex";
        winnerMessage.classList.add("hidden");
        startButton.classList.remove("hidden");
    }

    function handleClick(event) {
        const cell = event.target;
        if (!cell.textContent && !isGameOver) {
            cell.textContent = currentPlayer;
            const winningCombination = checkWin();
            if (winningCombination) {
                handleWin(currentPlayer, winningCombination);
            } else if (checkDraw()) {
                winnerMessage.textContent = "It's a draw!";
                winnerMessage.classList.remove("hidden");
                restartButton.classList.remove("hidden");
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    function handleCellHover(event) {
        const cell = event.target;
        if (!cell.textContent && !isGameOver) {
            cell.style.backgroundColor = "#eee";
        }
    }

    function handleCellLeave(event) {
        const cell = event.target;
        if (!cell.textContent && !isGameOver) {
            cell.style.backgroundColor = "#f0f0f0";
        }
    }

    function handleStartButtonClick() {
        playerXName = playerXInput.value || "Player X";
        playerOName = playerOInput.value || "Player O";
        if (playerXName === playerOName) {
            playerXName += " (X)";
            playerOName += " (O)";
        } else {
            playerXName += " (X)";
            playerOName += " (O)";
        }
        document.getElementById("player-names").style.display = "none";
        board.style.display = "grid";
    }

    cells.forEach((cell) => {
        cell.addEventListener("click", handleClick);
        cell.addEventListener("mouseenter", handleCellHover);
        cell.addEventListener("mouseleave", handleCellLeave);
    });

    startButton.addEventListener("click", handleStartButtonClick);
    restartButton.addEventListener("click", restartGame);
});
