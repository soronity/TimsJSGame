// Get the canvas elements
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//Create hidden canvas for double buffering
const hiddenCanvas = document.createElement("canvas");
const hiddenCtx = hiddenCanvas.getContext("2d");

// Set the size of the visible canvas
canvas.width = 480;
canvas.height = 300;

// Set the size of the hidden canvas to match the visible canvas
hiddenCanvas.width = canvas.width;
hiddenCanvas.height = canvas.height;

const gravity = 0.3;
const animationSpeed = 12;

// Initialize game state to INTRO
let gameStateIntro = true;
let gameOver = false;

const backgroundImage = new Background({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "img/background_desert.png",
  scale: 1,
});

const collisionBlockNumber = 243;

//TODO flytta ut till en annan fil
function initializeCollisionBlocks(collisionsData, collisionBlockNumber) {
  const collisions2DArray = [];
  for (let i = 0; i < collisionsData.length; i += 30) {
    collisions2DArray.push(collisionsData.slice(i, i + 30));
  }

  const collisionBlocks = [];

  for (let i = 0; i < collisions2DArray.length; i++) {
    for (let j = 0; j < collisions2DArray[i].length; j++) {
      if (collisions2DArray[i][j] === collisionBlockNumber) {
        collisionBlocks.push(
          new CollisionBlock({
            position: {
              x: j * 16,
              y: i * 16,
            },
            scale: 1,
          })
        );
      }
    }
  }

  return collisionBlocks;
}

const floorCollisionBlocks = initializeCollisionBlocks(
  floorCollisions,
  collisionBlockNumber
);
const platformCollisionBlocks = initializeCollisionBlocks(
  platformCollisions,
  collisionBlockNumber
);

//TODO flytta ut till en annan fil
function collision({ player, collisionBlock }) {
  return (
    player.y + player.height > collisionBlock.position.y &&
    player.y < collisionBlock.position.y + collisionBlock.height &&
    player.x < collisionBlock.position.x + collisionBlock.width &&
    player.x + player.width > collisionBlock.position.x
  );
}

let pinkMonster;
let owlet;

Promise.all([
  preloadImages(pinkMonsterAnimations),
  preloadImages(owletAnimations),
])
  .then(([preloadedPinkMonsterSprites, preloadedOwletSprites]) => {
    console.log("Promise resolved!"); // Add this

    pinkMonster = new Player({
      x: 100,
      y: 200,
      width: 20,
      height: 20,
      sprites: preloadedPinkMonsterSprites,
      spriteWidth: 32,
      spriteHeight: 32,
      id: "Pink wins <3",
      direction: "left",
    });

    owlet = new Player({
      x: 600,
      y: 200,
      width: 20,
      height: 20,
      sprites: preloadedOwletSprites,
      spriteWidth: 32,
      spriteHeight: 32,
      id: "Owlet wins <3",
      direction: "right",
    });

    // Start the continuous game loop
    requestAnimationFrame(gameLoop);
  })
  .catch((error) => {
    console.error("Failed to preload some images", error);
  });

// Add a new property to keep track of the current frame index
let currentFrame = 0;

// Add a new property to keep track of the animation frame counter
let frameCounter = 0;

const keys = {
  pinkMonster: {
    a: { pressed: false },
    d: { pressed: false },
    w: { pressed: false },
    s: { pressed: false }, // Attack key for Player 1
  },
  owlet: {
    arrowLeft: { pressed: false },
    arrowRight: { pressed: false },
    arrowUp: { pressed: false },
    arrowDown: { pressed: false }, // Attack key for Player 2
  },
};


function gameLoop() {
  if (!gameOver) {
    // Clear the visible canvas only if game isn't over
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  if (gameOver) {
    drawRestartMessage();
    return;
  }
  else if (gameStateIntro) {
    drawIntroScreen();
  }
  else {
    updateGameState();
    draw();
  }

  requestAnimationFrame(gameLoop);
}


function updateGameState() {
  pinkMonster.handleKeyPress(keys.pinkMonster);
  pinkMonster.updatePosition();
  pinkMonster.updateAnimation();

  owlet.handleKeyPress(keys.owlet);
  owlet.updatePosition();
  owlet.updateAnimation();
}

// Draw the intro screen
function drawIntroScreen() {
  ctx.save();
  ctx.font = "15px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("Ready to rumble?!", canvas.width / 2, canvas.height / 6);
  ctx.fillText("Move the players with a, d and arrow keys", canvas.width / 2, canvas.height / 3.5);
  ctx.fillText("Jump with w and the up arrow", canvas.width / 2, canvas.height / 2.7);
  ctx.fillText("Attack each other with s and the down arrow", canvas.width / 2, canvas.height / 2.2);
  ctx.fillText("Press ENTER to start the game", canvas.width / 2, canvas.height / 1.7);

  ctx.restore();
}

function draw() {
  // Clear the hidden canvas
  hiddenCtx.clearRect(0, 0, hiddenCanvas.width, hiddenCanvas.height);

  backgroundImage.drawBackground(hiddenCtx);

  // Draw collision blocks first
  floorCollisionBlocks.forEach((collisionBlock) => {
    const collisionBlockScale = backgroundImage.scale;
    collisionBlock.drawCollisionBlock(hiddenCtx, collisionBlockScale);
  });

  platformCollisionBlocks.forEach((collisionBlock) => {
    const collisionBlockScale = backgroundImage.scale;
    collisionBlock.drawCollisionBlock(hiddenCtx, collisionBlockScale);
  });

  pinkMonster.drawPlayer(hiddenCtx);
  owlet.drawPlayer(hiddenCtx);

  // Draw health bars on top of the players
  drawHealthBar(pinkMonster, 10, 10, 100, 10, ctx);
  drawHealthBar(owlet, canvas.width - 100, 10, 100, 10, ctx);
}

function drawHealthBar(player, x, y, width, height, ctx) {
  if (!player) return; // if player object is null or undefined, just return
  ctx.save();
  ctx.fillStyle = "#FF0000"; // color for the background of the health bar
  ctx.fillRect(x, y, width, height);

  const healthPercentage = player.health / player.maxHealth;
  ctx.fillStyle = player.health > 0 ? "#00FF00" : "#FF0000"; // color for the actual health
  ctx.fillRect(x, y, width * healthPercentage, height);

  // Add the black outline
  ctx.strokeStyle = "black"; // color for the outline
  ctx.lineWidth = 2; // thickness of the outline
  ctx.strokeRect(x, y, width, height);

  ctx.restore();
}

function drawMessage(message) {
  ctx.save();
  ctx.font = "30px 'Comic Sans MS'"; // Change font to Comic Sans MS
  ctx.fillStyle = "black"; // Text color
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(message, canvas.width / 2, canvas.height / 2 - 30); // Move 15 pixels below center
  ctx.restore();
}

function drawRestartMessage() {
  ctx.save();
  ctx.font = "20px 'Comic Sans MS'";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(
    "Press SPACE to play again!!",
    canvas.width / 2,
    canvas.height / 2 + 35
    );
    ctx.restore();
  }
  
  function restartGame() {
    pinkMonster.health = 100;
    owlet.health = 100;
    pinkMonster.x = 100;
    pinkMonster.y = 200;
    owlet.x = 600;
    owlet.y = 200;
    gameOver = false;
    requestAnimationFrame(gameLoop);
  }

function updateKeyPressedState(code, isPressed) {
  // Player 1 controls
  if (code === "KeyA") {
    keys.pinkMonster.a.pressed = isPressed;
  } else if (code === "KeyD") {
    keys.pinkMonster.d.pressed = isPressed;
  } else if (code === "KeyW") {
    keys.pinkMonster.w.pressed = isPressed;
  }

  // Player 2 controls
  if (code === "ArrowLeft") {
    keys.owlet.arrowLeft.pressed = isPressed;
  } else if (code === "ArrowRight") {
    keys.owlet.arrowRight.pressed = isPressed;
  } else if (code === "ArrowUp") {
    keys.owlet.arrowUp.pressed = isPressed;
  }

  // Player 1 attack
  if (code === "KeyS") {
    keys.pinkMonster.s.pressed = isPressed;
    if (isPressed) pinkMonster.attack(owlet); // If the attack key is pressed, call attack
  }

  // Player 2 attack
  if (code === "ArrowDown") {
    keys.owlet.arrowDown.pressed = isPressed;
    if (isPressed) owlet.attack(pinkMonster); // If the attack key is pressed, call attack
  }

  if ((code === "Space") && isPressed && (gameOver == true)) {
    restartGame();
  }
}

//TODO separate file for eventlisteners and updatekeys
document.addEventListener("keydown", function (event) {
  if (event.code === "Enter" && gameStateIntro == true) {
    gameStateIntro = false;
  }
  updateKeyPressedState(event.code, true);
});


document.addEventListener("keyup", function (event) {
  updateKeyPressedState(event.code, false);
});
