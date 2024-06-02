import { gameOverDialog, victoryDialog } from "./main.js";
import { createBoard, updateBoard } from "./render.js";

// ============================================= //
// Inputs
const mapSizeInput = document.getElementById("map-size");
const zombieCountInput = document.getElementById("zombie-count");
const obstacleCountInput = document.getElementById("obstacle-count");
const itemCountInput = document.getElementById("item-count");

// Labels
const collectedItemsLabel = document.getElementById("collected-items");
const roundLabel = document.getElementById("round");
const totalItemsLabel = document.getElementById("total-items");

// Stats
let round = 0;
let itemsCollected = 0;
export let gameFinished = false;

// Positions & Entities
export let playerPos = { x: 0, y: 0 };
export let zombiePos = [];
export let obstaclePos = [];
export let itemPos = [];

// Settings
export let mapSize = 0;
export let zombieCount = 0;
export let obstacleCount = 0;
export let itemCount = 0;

// ============================================= //
// GAME STARTUP PROCESS

export function initializeGame() {
    updateConfigurationValues();
    createBoard();
    spawnEntities(zombiePos, zombieCount, [playerPos], mapSize);
    spawnEntities(
        obstaclePos,
        obstacleCount,
        [playerPos, ...zombiePos],
        mapSize
    );
    spawnEntities(
        itemPos,
        itemCount,
        [playerPos, ...zombiePos, ...obstaclePos],
        mapSize
    );
    updateUI(itemCount);
    updateBoard();
}

function updateConfigurationValues() {
    // Input
    mapSize = parseInt(mapSizeInput.value);
    zombieCount = parseInt(zombieCountInput.value);
    obstacleCount = parseInt(obstacleCountInput.value);
    itemCount = parseInt(itemCountInput.value);

    // Default
    itemsCollected = 0;
    round = 1;
    playerPos = { x: Math.floor(mapSize / 2), y: Math.floor(mapSize / 2) };
    zombiePos = [];
    obstaclePos = [];
    itemPos = [];
    gameFinished = false;
}

function spawnEntities(entityArray, entityCount, blockedPositions, mapSize) {
    for (let i = 0; i < entityCount; i++) {
        let position = generateValidPosition(blockedPositions, mapSize);
        entityArray.push(position);
        blockedPositions.push(position);
    }
}

function generateValidPosition(blockedPositions, mapSize) {
    let x, y;
    do {
        x = Math.floor(Math.random() * mapSize);
        y = Math.floor(Math.random() * mapSize);
    } while (blockedPositions.some((pos) => pos.x === x && pos.y === y));
    return { x, y };
}

function updateUI(itemCount) {
    totalItemsLabel.textContent = itemCount;
    collectedItemsLabel.textContent = itemsCollected;
    roundLabel.textContent = round;
}

// ============================================= //
// GAME EVENTS

export function handleKeydown(event) {
    const moveMap = {
        ArrowUp: { dx: 0, dy: -1 },
        ArrowDown: { dx: 0, dy: 1 },
        ArrowLeft: { dx: -1, dy: 0 },
        ArrowRight: { dx: 1, dy: 0 },
    };

    if (moveMap[event.key] && !gameFinished) {
        movePlayer(moveMap[event.key].dx, moveMap[event.key].dy);
    }
}

export function movePlayer(dx, dy) {
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    if (isValidMove(newX, newY)) {
        playerPos = { x: newX, y: newY };
        gameRoutine();
    }
}

function isValidMove(x, y) {
    return (
        x >= 0 &&
        x < mapSize &&
        y >= 0 &&
        y < mapSize &&
        !obstaclePos.some((pos) => pos.x === x && pos.y === y)
    );
}

function gameRoutine() {
    collectItem();
    moveZombies();
    updateBoard();
    if (checkVictory() || checkGameOver()) {
        gameFinished = true;
        return;
    }
    nextRound();
}

// ====================================== //
// GAME LOGIC

function moveZombies() {
    const newZombiePositions = JSON.parse(JSON.stringify(zombiePos));

    newZombiePositions.forEach((zombie, index) => {
        const { dx, dy } = getZombieDirection(zombie);
        const newX = zombie.x + dx;
        const newY = zombie.y + dy;

        if (isPositionFree(newX, newY, index)) {
            zombiePos[index].x = newX;
            zombiePos[index].y = newY;
        }
    });
}

function getZombieDirection(zombie) {
    const dx = playerPos.x - zombie.x;
    const dy = playerPos.y - zombie.y;
    return Math.abs(dx) > Math.abs(dy)
        ? { dx: Math.sign(dx), dy: 0 }
        : { dx: 0, dy: Math.sign(dy) };
}

function isPositionFree(x, y, currentZombieIndex) {
    return (
        !obstaclePos.some((pos) => pos.x === x && pos.y === y) &&
        !zombiePos.some(
            (pos, index) =>
                pos.x === x && pos.y === y && index !== currentZombieIndex
        )
    );
}

function collectItem() {
    itemPos = itemPos.filter((item) => {
        if (item.x === playerPos.x && item.y === playerPos.y) {
            itemsCollected++;
            collectedItemsLabel.textContent = itemsCollected;
            return false;
        }
        return true;
    });
}

function nextRound() {
    round++;
    roundLabel.textContent = round;
}

// ====================================== //
// CHECKS

function checkGameOver() {
    if (
        zombiePos.some(
            (zombie) => zombie.x === playerPos.x && zombie.y === playerPos.y
        )
    ) {
        gameOverDialog.showModal();
        return true;
    }
    return false;
}

function checkVictory() {
    if (itemsCollected === itemCount) {
        victoryDialog.showModal();
        return true;
    }
    return false;
}
