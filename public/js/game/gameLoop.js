let lastTime = null; // Store the last time gameLoop was called

const collisionBlockID = 243;

const floorCollisionBlocks = initializeCollisionBlocks(
  floorCollisions,
  collisionBlockID,
  scale
);
const platformCollisionBlocks = initializeCollisionBlocks(
  platformCollisions,
  collisionBlockID,
  scale
);

function gameLoop(currentTime) {
  // If lastTime is null (i.e., game just restarted), set it to currentTime
  if (lastTime === null) {
    lastTime = currentTime;
  }

  const deltaTime = currentTime - lastTime; // Calculate time difference
  lastTime = currentTime; // Update lastTime for next frame

  if (!gameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  if (gameOver) {
    drawRestartMessage();
    if (musicPlaying) {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
      gameOverMusic.play();
      return;
    }
  }
  else if (gameStateIntro) {
    draw();
    drawIntroScreen();
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  }
  else {
    gameOverMusic.pause();
    gameOverMusic.currentTime = 0;
    updateGameState(deltaTime);
    draw();
  }

  requestAnimationFrame(gameLoop);
}

function updateGameState(deltaTime) { // Take deltaTime as parameter
  pinkMonster.handleKeyPress(keys.pinkMonster);
  pinkMonster.updatePosition(deltaTime); // Use deltaTime in update functions
  pinkMonster.updateAnimation(deltaTime); // Use deltaTime in update functions

  owlet.handleKeyPress(keys.owlet);
  owlet.updatePosition(deltaTime); // Use deltaTime in update functions
  owlet.updateAnimation(deltaTime); // Use deltaTime in update functions
}
  
function restartGame() {
  pinkMonster.health = 100;
  owlet.health = 100;
  pinkMonster.x = 100;
  pinkMonster.y = 200;
  owlet.x = 600;
  owlet.y = 200;
  pinkMonster.isDead = false;
  owlet.isDead = false;
  gameOver = false;
  gameOverMusic.pause();
  gameOverMusic.currentTime = 0;
  backgroundMusic.play();
  lastTime = null; // Reset lastTime when restarting the game
  requestAnimationFrame(gameLoop);
}
