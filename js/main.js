import { handleKeydown, initializeGame } from "./game.js";

// ======================================= //

// Dialogues
export const settingsDialog = document.querySelector("#settings-dialog");
export const gameOverDialog = document.querySelector("#game-over-dialog");
export const victoryDialog = document.querySelector("#victory-dialog");

// Buttons
const openSettingsButton = document.querySelector("#open-settings-button");
const closeSettingsButton = document.querySelector("#close-settings-button");
const restartGameButtons = document.querySelectorAll("#restart-game-button");

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

restartGameButtons.forEach((element) => {
    element.addEventListener("click", () => {
        gameOverDialog.close();
        victoryDialog.close();
        settingsDialog.close();

        initializeGame();
    });
});

// ================================================= //
// START GAME

document.addEventListener("keydown", handleKeydown);
initializeGame();
