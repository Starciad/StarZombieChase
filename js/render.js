import { itemPos, mapSize, movePlayer, obstaclePos, playerPos, zombiePos } from "./game.js";

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

            cell.addEventListener("click", () => movePlayer(x, y));
            gameBoard.appendChild(cell);
        }
    }
};
