import { handleKeydown, initializeGame } from "./game.js";

// ======================================= //

// Buttons
const configButton = document.getElementById("config-button");
const startGameButton = document.getElementById("start-game");
const restartGameButton = document.getElementById("restart-game");
const restartGameVictoryButton = document.getElementById("restart-game-victory");
const closeConfig = document.querySelector(".close");

// Modals
export const configModal = document.getElementById("config-modal");
export const gameOverModal = document.getElementById("game-over-modal");
export const victoryModal = document.getElementById("victory-modal");

// ======================================= //

configButton.addEventListener("click", () => {
    configModal.style.display = "block";
});

closeConfig.addEventListener("click", () => {
    configModal.style.display = "none";
});

startGameButton.addEventListener("click", () => {
    configModal.style.display = "none";
    initializeGame();
});

restartGameButton.addEventListener("click", () => {
    gameOverModal.style.display = "none";
    initializeGame();
});

restartGameVictoryButton.addEventListener("click", () => {
    victoryModal.style.display = "none";
    initializeGame();
});

window.addEventListener("click", (event) => {
    if (event.target === configModal) {
        configModal.style.display = "none";
    }
    if (event.target === gameOverModal) {
        gameOverModal.style.display = "none";
    }
    if (event.target === victoryModal) {
        victoryModal.style.display = "none";
    }
});

document.addEventListener("keydown", handleKeydown);

// ================================================= //
// START GAME

initializeGame();