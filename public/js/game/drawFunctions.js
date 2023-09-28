// Draw the intro screen
function drawIntroScreen() {
  ctx.save();
  ctx.font = "15px Comic Sans MS";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("Ready to rumble?!", canvas.width / 2, canvas.height / 6);
  ctx.fillText("Unfortunately, the animation speed might be very slow or fast depending on your compter :( I'm working on it!", canvas.width / 2, canvas.height / 4.5);
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
  drawHealthBar(owlet, canvas.width - 315, 10, 100, 10, ctx);
 
}

function drawHealthBar(player, x, y, width, height, ctx) {
  if (!player) return; // if player object is null or undefined, just return
  ctx.save();
  ctx.fillStyle = "#FF0000"; // color for the background of the health bar
  ctx.fillRect(x, y, width * scale, height * scale);

  const healthPercentage = player.health / player.maxHealth;
  ctx.fillStyle = player.health > 0 ? "#00FF00" : "#FF0000"; // color for the actual health
  ctx.fillRect(x, y, (width * healthPercentage) * scale, height * scale);

  // Add the black outline
  ctx.strokeStyle = "black"; // color for the outline
  ctx.lineWidth = 2; // thickness of the outline
  ctx.strokeRect(x, y, width * scale, height * scale);

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
  ctx.font = "40px 'Comic Sans MS'";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(
    "Press SPACE to play again!!",
    canvas.width / 2,
    canvas.height / 2 + 55
    );
    ctx.restore();
  }