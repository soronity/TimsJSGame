/**
 * Multiplayer 2D Platformer Game
 *
 * Description:
 * This game features a simple 2D platformer environment where two players can move, jump, and attack 
 * each other. The game utilizes double buffering to achieve smooth rendering. The objective of the 
 * game is for one player to reduce the other's health to zero.
 * 
 * Features:
 * - Two playable characters with distinct sprites for movement and idling.
 * - Physics system with gravity.
 * - Health system with visible health bars for each player.
 * - Collision detection with floor and platforms.
 * - Keyboard controls for movement and attack.
 * - Restart capability upon game over.
 * 
 * Classes and Major Components:
 * - Player: Handles player attributes like health, position, and sprite animation.
 * - Background: Manages the rendering of the game's background.
 * - CollisionBlock: Represents sections of the level where player collision should occur.
 * 
 * Game Flow:
 * 1. Initialize canvas, assets, and game entities.
 * 2. Preload all necessary sprites and images.
 * 3. Initiate the main game loop, where the game state is updated and rendered.
 * 4. Listen for keyboard events to handle player input.
 * 5. Upon game over, display the option to restart the game.
 * 
 * Dependencies:
 * This game is built using vanilla JavaScript and the Canvas API.
 *  * 
 * Credits:
 * Game developed by Tim White (www.github.com/timewhite)
 * Special thanks to ChatGPT for assistance in troubleshooting and optimization.
 *
 * Last Updated: [28/7-23]
 */

// Get the canvas elements
const canvas = document.getElementById("gameCanvas");
const hiddenCanvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
//Create hidden canvas for double buffering
const hiddenCtx = hiddenCanvas.getContext("2d");

// Set the size of the visible canvas
canvas.width = 480;
canvas.height = 300;

// Set the size of the hidden canvas to match the visible canvas
hiddenCanvas.width = canvas.width;
hiddenCanvas.height = canvas.height;

const gravity = 0.3;


const backgroundImage = new Background({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "img/background_desert.png",
    scale: 1,
});

const collisionBlockNumber = 243;

function initializeCollisionBlocks(collisionsData, collisionBlockNumber) {
    const collisions2DArray = [];
    for (let i = 0; i < collisionsData.length; i += 30) {
        collisions2DArray.push(collisionsData.slice(i, i + 30));
    }

    const collisionBlocks = [];

    for (let i = 0; i < collisions2DArray.length; i++) {
        for (let j = 0; j < collisions2DArray[i].length; j++) {
            if (collisions2DArray[i][j] === collisionBlockNumber) {
                collisionBlocks.push(new CollisionBlock({
                    position: {
                        x: j * 16,
                        y: i * 16,
                    },
                    scale: 1,
                }));
            }
        }
    }

    return collisionBlocks;
}

const floorCollisionBlocks = initializeCollisionBlocks(floorCollisions, collisionBlockNumber);
const platformCollisionBlocks = initializeCollisionBlocks(platformCollisions, collisionBlockNumber);

function collision({ player, collisionBlock }) {
    return (
        player.y + player.height > collisionBlock.position.y &&
        player.y < collisionBlock.position.y + collisionBlock.height &&
        player.x < collisionBlock.position.x + collisionBlock.width &&
        player.x + player.width > collisionBlock.position.x
    );
}

const player1 = new Player({
    x: 100,
    y: 200,
    width: 20,
    height: 20,
    idleSpriteSrc: "img/characters/pink/Pink_Monster_Idle_4.png",
    runSpriteSrc: "img/characters/pink/Pink_Monster_Run_6.png",
    spriteWidth: 32,
    spriteHeight: 32,
    totalFrames: 4,
    animationSpeed: 10,
    id: "Pink wins <3",
    direction: "left"
});

const player2 = new Player({
    x: 600,
    y: 200,
    width: 20,
    height: 20,
    idleSpriteSrc: "img/characters/owlet/Owlet_Monster_Idle_4.png",
    runSpriteSrc: "img/characters/owlet/Owlet_Monster_Run_6.png",
    spriteWidth: 32,
    spriteHeight: 32,
    totalFrames: 4,
    animationSpeed: 10,
    id: "Owlet wins <3",
    direction: "right",
});

// Add a new property to keep track of the current frame index
let currentFrame = 0;

// Add a new property to keep track of the animation frame counter
let frameCounter = 0;

const keys = {
    player1: {
        a: { pressed: false },
        d: { pressed: false },
        w: { pressed: false },
        s: { pressed: false } // Attack key for Player 1
    },
    player2: {
        arrowLeft: { pressed: false },
        arrowRight: { pressed: false },
        arrowUp: { pressed: false },
        arrowDown: { pressed: false } // Attack key for Player 2
    },
};

let gameOver = false;

function gameLoop() {
    updateGameState();
    
    // Clear the visible canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the game elements on the hidden canvas
    draw();
    
    // Copy the hidden canvas to the visible canvas
    ctx.drawImage(hiddenCanvas, 0, 0);
    
    // Even if the game is over, we'll keep drawing until the winner message is displayed.
    if (!gameOver || (player1.health > 0 && player2.health > 0)) {
        requestAnimationFrame(gameLoop);
    }
}



function updateGameState() {
    player1.handleKeyPress(keys.player1);
    player1.updatePosition(keys.player1);
    player1.updateAnimation();

    player2.handleKeyPress(keys.player2);
    player2.updatePosition(keys.player2);
    player2.updateAnimation();
}



function draw() {
    // Clear the hidden canvas
    hiddenCtx.clearRect(0, 0, hiddenCanvas.width, hiddenCanvas.height);

    backgroundImage.drawBackground(hiddenCtx);

    // Draw collision blocks first
    floorCollisionBlocks.forEach(collisionBlock => {
        const collisionBlockScale = backgroundImage.scale;
        collisionBlock.drawCollisionBlock(hiddenCtx, collisionBlockScale);
    });

    platformCollisionBlocks.forEach(collisionBlock => {
        const collisionBlockScale = backgroundImage.scale;
        collisionBlock.drawCollisionBlock(hiddenCtx, collisionBlockScale);
    });

    // Draw the players
    player1.drawPlayer(hiddenCtx);
    player2.drawPlayer(hiddenCtx);

    // Draw health bars on top of the players
    drawHealthBar(player1, 10, 10, 100, 10, hiddenCtx);
    drawHealthBar(player2, canvas.width - 100, 10, 100, 10, hiddenCtx);
}



function drawHealthBar(player, x, y, width, height) {
    hiddenCtx.save();
    hiddenCtx.fillStyle = '#FF0000'; // color for the background of the health bar
    hiddenCtx.fillRect(x, y, width, height);

    const healthPercentage = player.health / player.maxHealth;
    hiddenCtx.fillStyle = player.health > 0 ? '#00FF00' : '#FF0000'; // color for the actual health
    hiddenCtx.fillRect(x, y, width * healthPercentage, height);

    // Add the black outline
    hiddenCtx.strokeStyle = 'black'; // color for the outline
    hiddenCtx.lineWidth = 2; // thickness of the outline
    hiddenCtx.strokeRect(x, y, width, height);

    hiddenCtx.restore();
}


function drawMessage(message) {
    ctx.save();
    ctx.font = "30px 'Comic Sans MS'";  // Change font to Comic Sans MS
    ctx.fillStyle = "black";  // Text color
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(message, canvas.width / 2, canvas.height / 2 - 30);  // Move 15 pixels below center
    ctx.restore();
}

function restartGame() {
    player1.health = 100;
    player2.health = 100;
    player1.x = 100;
    player1.y = 200;
    player2.x = 600;
    player2.y = 200;
    gameOver = false;
    requestAnimationFrame(gameLoop);
}

function drawRestartMessage() {
    ctx.save();
    ctx.font = "20px 'Comic Sans MS'";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Press SPACE to play again!!", canvas.width / 2, canvas.height / 2 + 35);
    ctx.restore();
}

// Start the continuous game loop
requestAnimationFrame(gameLoop);

document.addEventListener("keydown", function (event) {
    updateKeyPressedState(event.code, true);
});

document.addEventListener("keyup", function (event) {
    updateKeyPressedState(event.code, false);
});


function updateKeyPressedState(code, isPressed) {
    // Player 1 controls
    if (code === "KeyA") {
        keys.player1.a.pressed = isPressed;
    } else if (code === "KeyD") {
        keys.player1.d.pressed = isPressed;
    } else if (code === "KeyW") {
        keys.player1.w.pressed = isPressed;
    }

    // Player 2 controls
    if (code === "ArrowLeft") {
        keys.player2.arrowLeft.pressed = isPressed;
    } else if (code === "ArrowRight") {
        keys.player2.arrowRight.pressed = isPressed;
    } else if (code === "ArrowUp") {
        keys.player2.arrowUp.pressed = isPressed;
    }

    // Player 1 attack
    if (code === "KeyS") {
        keys.player1.s.pressed = isPressed;
        if (isPressed) player1.attack(player2); // If the attack key is pressed, call attack
    }

    // Player 2 attack
    if (code === "ArrowDown") {
        keys.player2.arrowDown.pressed = isPressed;
        if (isPressed) player2.attack(player1); // If the attack key is pressed, call attack
    }

    if (code === "Space" && isPressed && gameOver) {
        restartGame();
    }

}


