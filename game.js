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
});

// Add a new property to keep track of the current frame index
let currentFrame = 0;

// Add a new property to keep track of the animation frame counter
let frameCounter = 0;

const keysPlayer1 = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
};

const keysPlayer2 = {
    arrowLeft: {
        pressed: false,
    },
    arrowRight: {
        pressed: false,
    },
    arrowUp: {
        pressed: false,
    },
};

function gameLoop() {
    updateGameState();
    draw();                        
    requestAnimationFrame(gameLoop);
}

function updateGameState() {
    player1.handleKeyPressPlayer1(keysPlayer1);
    player1.updatePosition();
    player1.updateAnimation();
    player2.handleKeyPressPlayer2(keysPlayer2);
    player2.updatePosition();
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
}

// Start the continuous game loop
requestAnimationFrame(gameLoop);

document.addEventListener("keydown", function (event) {
    if (event.code === "KeyA") {
        keysPlayer1.a.pressed = true;
    } else if (event.code === "KeyD") {
        keysPlayer1.d.pressed = true;
    }
    if (event.code === "KeyW") {
        keysPlayer1.w.pressed = true;
    }
});

document.addEventListener("keyup", function (event) {
    if (event.code === "KeyA") {
        keysPlayer1.a.pressed = false;
    } else if (event.code === "KeyD") {
        keysPlayer1.d.pressed = false;
    }
    if (event.code === "KeyW") {
        keysPlayer1.w.pressed = false;
    }
});

document.addEventListener("keydown", function (event) {
    if (event.code === "ArrowLeft") {
        keysPlayer2.arrowLeft.pressed = true;
    } else if (event.code === "ArrowRight") {
        keysPlayer2.arrowRight.pressed = true;
    }
    if (event.code === "ArrowUp") {
        keysPlayer2.arrowUp.pressed = true;
    }
});

document.addEventListener("keyup", function (event) {
    if (event.code === "ArrowLeft") {
        keysPlayer2.arrowLeft.pressed = false;
    } else if (event.code === "ArrowRight") {
        keysPlayer2.arrowRight.pressed = false;
    }
    if (event.code === "ArrowUp") {
        keysPlayer2.arrowUp.pressed = false;
    }
});

