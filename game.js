// Get the canvas element
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gravity = 0.5;

canvas.width = 1024;
canvas.height = 576;

const collisionBlocks = initializeCollisionBlocks();

const backgroundImage = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "img/test.png",
    scale: 2,
});

const player = new Player(50, 50, 50, 50, "blue");

const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
};

function gameLoop() {
    animate();
    draw();
    // Call the gameLoop function on the next frame
    requestAnimationFrame(gameLoop);
}

function animate() {
    player.updatePosition();

    // Handle key presses
    if (keys.a.pressed) {
        player.velocityX = -5; // Set negative horizontal velocity to move left
    } else if (keys.d.pressed) {
        player.velocityX = 5; // Set positive horizontal velocity to move right
    } else {
        player.velocityX = 0;
    }
}

function draw() {
    // Clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  
    backgroundImage.drawSprite();
    player.drawPlayer();
    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.drawCollisionBlock();
    });
  }

// Start the continuous game loop
requestAnimationFrame(gameLoop);

function initializeCollisionBlocks() {
    const floorCollisions2DArray = [];
    for (let i = 0; i < floorCollisions.length; i += 30) {
        floorCollisions2DArray.push(floorCollisions.slice(i, i + 30));
    }

    const collisionBlocks = [];

    for (let i = 0; i < floorCollisions2DArray.length; i++) {
        for (let j = 0; j < floorCollisions2DArray[i].length; j++) {
            if (floorCollisions2DArray[i][j] === 243) {
                collisionBlocks.push(new CollisionBlock({
                    position: {
                        x: j * 16,
                        y: i * 16,
                    }
                }));
            }
        }
    }

    return collisionBlocks;
}

// Eventlistener for key presses
document.addEventListener("keydown", function (event) {
    if (event.code === "KeyA") {
        keys.a.pressed = true;
    } else if (event.code === "KeyD") {
        keys.d.pressed = true;
    }

    // Jump with the space bar
    if (event.code === "Space") {
        // Only jump if the player is on the ground or has a slight tolerance
        if (player.y + player.height >= canvas.height - 1) {
            player.velocityY = -20; // Set the player's jump height
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
