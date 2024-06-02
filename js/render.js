import {
    gameFinished,
    itemPos,
    mapSize,
    movePlayer,
    obstaclePos,
    playerPos,
    zombiePos,
} from "./game.js";

const gameBoard = document.querySelector("#game-board");
const gameBoardCells = [];

export function createBoard() {
    gameBoard.replaceChildren();
    gameBoard.style.gridTemplateColumns = `repeat(${mapSize}, 50px)`;
    gameBoard.style.gridTemplateRows = `repeat(${mapSize}, 50px)`;

    for (let y = 0; y < mapSize; y++) {
        for (let x = 0; x < mapSize; x++) {
            const cell = document.createElement("div");

            addMovementEvent(cell, x, y);
            gameBoard.appendChild(cell);
            gameBoardCells.push({ element: cell, posX: x, posY: y });
        }
    }
}

export function updateBoard() {
    gameBoardCells.forEach((cell) => {
        if (cell.element.hasAttribute("class")) {
            cell.element.removeAttribute("class");
        }

        // PLAYER
        if (cell.posX === playerPos.x && cell.posY === playerPos.y) {
            cell.element.textContent = "🙂";
            cell.element.classList.add("player");
        }
        // ZOMBIE
        else if (zombiePos.some((pos) => pos.x === cell.posX && pos.y === cell.posY)) {
            cell.element.textContent = "🧟";
            cell.element.classList.add("zombie");
        }
        // OBSTACLE
        else if (obstaclePos.some((pos) => pos.x === cell.posX && pos.y === cell.posY)) {
            cell.element.textContent = "⛔";
            cell.element.classList.add("obstacle");
        }
        // ITEM
        else if (itemPos.some((pos) => pos.x === cell.posX && pos.y === cell.posY)) {
            cell.element.textContent = "🧪";
            cell.element.classList.add("item");
        }
        // EMPTY
        else {
            cell.element.textContent = "";
        }
    });
}

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
