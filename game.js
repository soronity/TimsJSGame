// Get the canvas element
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gravity = 0.3;

canvas.width = 480;
canvas.height = 300;

const backgroundImage = new Background({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "img/test.png",
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

const player1 = new Player({
    x: 100,
    y: 200,
    width: 20,
    height: 20,
    spriteSrc: "img/characters/pink/Pink_Monster_Idle_4.png",
    spriteWidth: 32,
    spriteHeight: 32,
    totalFrames: 4,
    animationSpeed: 10,
    id: "Pink wins <333",
    direction: "left"
});

const player2 = new Player({
    x: 600,
    y: 200,
    width: 20,
    height: 20,
    spriteSrc: "img/characters/owlet/Owlet_Monster_Idle_4.png",
    spriteWidth: 32,
    spriteHeight: 32,
    totalFrames: 4,
    animationSpeed: 10,
    id: "Owlet wins XD",
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
    draw();
    // Even if game is over, we'll keep drawing until the winner message is displayed.
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    backgroundImage.drawBackground();
    player1.drawPlayer();
    player2.drawPlayer();
    
    floorCollisionBlocks.forEach(collisionBlock => {
        const collisionBlockScale = backgroundImage.scale;
        collisionBlock.drawCollisionBlock(collisionBlockScale);
    });
    platformCollisionBlocks.forEach(collisionBlock => {
        const collisionBlockScale = backgroundImage.scale;
        collisionBlock.drawCollisionBlock(collisionBlockScale);
    });

    //Adjust the x, y, width, and height values to change the health bar size and position
    drawHealthBar(player1, 10, 10, 100, 10); 
    drawHealthBar(player2, canvas.width - 100, 10, 100, 10)
}

function drawHealthBar(player, x, y, width, height) {
    ctx.save();
    ctx.fillStyle = '#FF0000'; // color for the background of the health bar
    ctx.fillRect(x, y, width, height);

    const healthPercentage = player.health / player.maxHealth;
    ctx.fillStyle = player.health > 0 ? '#00FF00' : '#FF0000'; // color for the actual health
    ctx.fillRect(x, y, width * healthPercentage, height);

    // Add the black outline
    ctx.strokeStyle = 'black'; // color for the outline
    ctx.lineWidth = 2; // thickness of the outline
    ctx.strokeRect(x, y, width, height);

    ctx.restore();
}


function drawMessage(message) {
    ctx.save();
    ctx.font = "30px 'Comic Sans MS'";  // Change font to Comic Sans MS
    ctx.fillStyle = "black";  // Text color
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(message, canvas.width / 2, canvas.height / 2 - 35);  // Move 15 pixels below center
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
    ctx.fillText("Press SPACE to restart", canvas.width / 2, canvas.height / 2 + 35);
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


