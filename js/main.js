import { handleKeydown, initializeGame } from "./game.js";

// ======================================= //

// Dialogues
export const settingsDialog = document.getElementById("settings-dialog");
export const gameOverDialog = document.getElementById("game-over-dialog");
export const victoryDialog = document.getElementById("victory-dialog");

// Buttons
const openSettingsButton = document.getElementById("open-settings-button");
const closeSettingsButton = document.getElementById("close-settings-button");

const startGameButton = document.getElementById("start-game-button");
const restartGameButton = document.getElementById("restart-game-button");
const restartGameVictoryButton = document.getElementById("restart-game-victory-button");

// ======================================= //
// Settings Dialog

openSettingsButton.addEventListener("click", () => {
    settingsDialog.showModal();
});

closeSettingsButton.addEventListener("click", () => {
    settingsDialog.close();
});

// ======================================= //
// Stats

startGameButton.addEventListener("click", () => {
    settingsDialog.close();
    initializeGame();
});

restartGameButton.addEventListener("click", () => {
    gameOverDialog.close();
    initializeGame();
});

restartGameVictoryButton.addEventListener("click", () => {
    victoryDialog.close();
    initializeGame();
});

// ================================================= //
// START GAME

document.addEventListener("keydown", handleKeydown);
initializeGame();