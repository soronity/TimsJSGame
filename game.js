// Get the canvas element
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gravity = 0.3;

canvas.width = 480;
canvas.height = 300;

const backgroundImage = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "img/test.png",
    scale: 1,
});

const playerSprite = new Image();
playerSprite.src = "img/characters/pinkMonster/Pink_Monster_Idle_4.png";

const playerSpriteWidth = 32; // Width of each individual stance in the sprite sheet
const playerSpriteHeight = 32; // Height of each individual stance in the sprite sheet
const totalFrames = 4; // Total number of frames (stances) in the sprite sheet
const animationSpeed = 10; // Lower value makes the animation faster

// Add a new property to keep track of the current frame index
let currentFrame = 0;

// Add a new property to keep track of the animation frame counter
let frameCounter = 0;

var playerVelocityX = 0;
var playerVelocityY = 0;
var playerWidth = 20;
var playerHeight = 20;

const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
};

const collisionBlockNumber = 243;
const floorCollisionBlocks = initializeCollisionBlocks(floorCollisions, collisionBlockNumber);
const platformCollisionBlocks = initializeCollisionBlocks(platformCollisions, collisionBlockNumber);
const player = new Player(playerVelocityX, playerVelocityY, playerWidth, playerHeight, 
floorCollisionBlocks, platformCollisionBlocks);

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


function gameLoop() {
    animate();
    draw();   
    // Call the gameLoop function on the next frame
    requestAnimationFrame(gameLoop);
}

function animate() {

    // Handle key presses
    if (keys.a.pressed) {
        player.velocityX = -3; // Set negative horizontal velocity to move left
    } else if (keys.d.pressed) {
        player.velocityX = 3; // Set positive horizontal velocity to move right
    } else {
        player.velocityX = 0;
    }

    player.updateAnimation();
}


function draw() {
    // Clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the background image
    backgroundImage.drawSprite();
    player.updatePosition();

    floorCollisionBlocks.forEach(collisionBlock => {
        // Scale the collision block proportionally based on the background image scale
        const collisionBlockScale = backgroundImage.scale;
        collisionBlock.drawCollisionBlock(collisionBlockScale);
    });
    platformCollisionBlocks.forEach(collisionBlock => {
        // Scale the collision block proportionally based on the background image scale
        const collisionBlockScale = backgroundImage.scale;
        collisionBlock.drawCollisionBlock(collisionBlockScale);
    });
}


// Start the continuous game loop
requestAnimationFrame(gameLoop);


// Eventlistener for key presses
document.addEventListener("keydown", function (event) {
    if (event.code === "KeyA") {
        keys.a.pressed = true;
    } else if (event.code === "KeyD") {
        keys.d.pressed = true;
    }
    // Jump with the space bar
    if (event.code === "Space") {
        if (player.isOnGround && !player.isMidAir) {
            player.velocityY = -5; // Set the player's jump height
            player.isMidAir = true; // Set the player to be mid-air
        }
    }
});

// Eventlistener for key releases
document.addEventListener("keyup", function (event) {
    if (event.code === "KeyA") {
        keys.a.pressed = false;
    } else if (event.code === "KeyD") {
        keys.d.pressed = false;
    }
});
