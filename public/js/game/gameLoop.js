const collisionBlockID = 243;

const floorCollisionBlocks = initializeCollisionBlocks(
  floorCollisions,
  collisionBlockID
);
const platformCollisionBlocks = initializeCollisionBlocks(
  platformCollisions,
  collisionBlockID
);

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