import { gameFinished, itemPos, mapSize, movePlayer, obstaclePos, playerPos, zombiePos } from "./game.js";

export function updateBoard() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";
    gameBoard.style.gridTemplateColumns = `repeat(${mapSize}, 50px)`;
    gameBoard.style.gridTemplateRows = `repeat(${mapSize}, 50px)`;

    for (let y = 0; y < mapSize; y++) {
        for (let x = 0; x < mapSize; x++) {
            const cell = document.createElement("div");

            // PLAYER
            if (x === playerPos.x && y === playerPos.y) {
                cell.textContent = "🙂";
                cell.classList.add("player");
            }
            // ZOMBIE
            else if (zombiePos.some((pos) => pos.x === x && pos.y === y)) {
                cell.textContent = "🧟";
                cell.classList.add("zombie");
            }
            // OBSTACLE
            else if (obstaclePos.some((pos) => pos.x === x && pos.y === y)) {
                cell.textContent = "⛔";
                cell.classList.add("obstacle");
            }
            // ITEM
            else if (itemPos.some((pos) => pos.x === x && pos.y === y)) {
                cell.textContent = "🧪";
                cell.classList.add("item");
            }

            addMovementEvent(cell, x, y);
            gameBoard.appendChild(cell);
        }
    }
};

// Adds click event to move player on board.
function addMovementEvent(cell, x, y) {
    cell.addEventListener("click", () => {
        if (gameFinished) {
            return;
        }

        const dx = x - playerPos.x;
        const dy = y - playerPos.y;

        // Check if the move is within the 3x3 area around the player and not to the same position.
        if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1 && (dx !== 0 || dy !== 0)) {
            movePlayer(dx, dy);
        }
    });
}
