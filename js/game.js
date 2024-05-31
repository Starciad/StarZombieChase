import { gameOverModal, victoryModal } from "./main.js";
import { updateBoard } from "./render.js";

// Inputs
const mapSizeInput = document.getElementById("map-size");
const zombieCountInput = document.getElementById("zombie-count");
const obstacleCountInput = document.getElementById("obstacle-count");
const itemCountInput = document.getElementById("item-count");

// Labels
const collectedItemsLabel = document.getElementById("collected-items");
const roundLabel = document.getElementById("round");

// Positions & Entities
export let playerPos = { x: 1, y: 1 };
export let zombiePos = [];
export let obstaclePos = [];
export let itemPos = [];

// Stats
let round = 1;
let itemsCollected = 0;

// Settings
export let mapSize = 5;
export let zombieCount = 1;
export let obstacleCount = 1;
export let itemCount = 1;

// ============================================= //

export function initializeGame() {
    updateConfigurationValues();

    // Spawn Zombies
    for (let i = 0; i < zombieCount; i++) {
        let x, y;
        do {
            x = Math.floor(Math.random() * mapSize);
            y = Math.floor(Math.random() * mapSize);
        } while ((x === playerPos.x && y === playerPos.y) || zombiePos.some(pos => pos.x === x && pos.y === y));
        zombiePos.push({ x, y });
    }

    // Spawn Obstacles
    for (let i = 0; i < obstacleCount; i++) {
        let x, y;
        do {
            x = Math.floor(Math.random() * mapSize);
            y = Math.floor(Math.random() * mapSize);
        } while ((x === playerPos.x && y === playerPos.y) || obstaclePos.some(pos => pos.x === x && pos.y === y) || zombiePos.some(pos => pos.x === x && pos.y === y));
        obstaclePos.push({ x, y });
    }

    // Spawn Items
    for (let i = 0; i < itemCount; i++) {
        let x, y;
        do {
            x = Math.floor(Math.random() * mapSize);
            y = Math.floor(Math.random() * mapSize);
        } while ((x === playerPos.x && y === playerPos.y) || obstaclePos.some(pos => pos.x === x && pos.y === y) || zombiePos.some(pos => pos.x === x && pos.y === y) || itemPos.some(pos => pos.x === x && pos.y === y));
        itemPos.push({ x, y });
    }

    document.getElementById('total-items').textContent = itemCount;
    updateBoard();
};

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

    // Labels
    collectedItemsLabel.textContent = itemsCollected;
    roundLabel.textContent = round;
}

// ============================================= //

export function handleKeydown(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (playerPos.y > 0) movePlayer(playerPos.x, playerPos.y - 1);
            break;
        case 'ArrowDown':
            if (playerPos.y < mapSize - 1) movePlayer(playerPos.x, playerPos.y + 1);
            break;
        case 'ArrowLeft':
            if (playerPos.x > 0) movePlayer(playerPos.x - 1, playerPos.y);
            break;
        case 'ArrowRight':
            if (playerPos.x < mapSize - 1) movePlayer(playerPos.x + 1, playerPos.y);
            break;
        default:
            break;
    }
}

export function movePlayer(x, y) {
    if (Math.abs(x - playerPos.x) <= 1 && Math.abs(y - playerPos.y) <= 1 && !obstaclePos.some(pos => pos.x === x && pos.y === y)) {
        playerPos = { x, y };

        // GAME ROUTINE
        collectItem();
        moveZombies();
        updateBoard();
        checkGameOver();
        checkVictory();
        nextRound();
    }
}

function moveZombies() {
    zombiePos.forEach(zombie => {
        const dx = playerPos.x - zombie.x;
        const dy = playerPos.y - zombie.y;
        if (Math.abs(dx) > Math.abs(dy)) {
            const newX = zombie.x + Math.sign(dx);
            if (!obstaclePos.some(pos => pos.x === newX && pos.y === zombie.y)) {
                zombie.x = newX;
            }
        } else {
            const newY = zombie.y + Math.sign(dy);
            if (!obstaclePos.some(pos => pos.x === zombie.x && pos.y === newY)) {
                zombie.y = newY;
            }
        }
    });
}

function collectItem() {
    itemPos = itemPos.filter(item => {
        if (item.x === playerPos.x && item.y === playerPos.y) {
            itemsCollected++;
            return false;
        }
        return true;
    });

    collectedItemsLabel.textContent = itemsCollected;
}

function nextRound() {
    round++;
    roundLabel.textContent = round;
}

// ====================================== //
// Checks

function checkGameOver() {
    if (zombiePos.some(zombie => zombie.x === playerPos.x && zombie.y === playerPos.y)) {
        gameOverModal.style.display = 'block';
    }
};

function checkVictory() {
    if (itemsCollected === itemCount) {
        victoryModal.style.display = 'block';
    }
};