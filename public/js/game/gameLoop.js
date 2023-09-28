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

function gameLoop() {
  if (!gameOver) {
    // Clear the visible canvas only if game isn't over
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  if (gameOver) {
    drawRestartMessage();
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    gameOverMusic.play();
    return;
  }
  else if (gameStateIntro) {
    drawIntroScreen();
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    introMusic.play();
  }
  else {
    introMusic.pause();
    introMusic.currentTime = 0;
    gameOverMusic.pause();
    gameOverMusic.currentTime = 0;
    backgroundMusic.play();
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
  
  function restartGame() {
    pinkMonster.health = 100;
    owlet.health = 100;
    pinkMonster.x = 100;
    pinkMonster.y = 200;
    owlet.x = 600;
    owlet.y = 200;
    gameOver = false;
    gameOverMusic.pause();
    gameOverMusic.currentTime = 0;
    backgroundMusic.play();
    requestAnimationFrame(gameLoop);
  }