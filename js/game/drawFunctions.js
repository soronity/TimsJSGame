// Draw the intro screen
function drawIntroScreen() {
  ctx.save();
  ctx.font = "25px Comic Sans MS";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("Press ENTER to start the game", canvas.width / 2, canvas.height / 2.5);
  ctx.restore();
}

function draw() {
  // Draw background directly on ctx
  backgroundImage.drawBackground(ctx);

  floorCollisionBlocks.forEach((collisionBlock) => {
    collisionBlock.drawCollisionBlock(ctx, backgroundImage.scale);
  });

  platformCollisionBlocks.forEach((collisionBlock) => {
    collisionBlock.drawCollisionBlock(ctx, backgroundImage.scale);
  });

  pinkMonster.drawPlayer(ctx);
  owlet.drawPlayer(ctx);

  // Draw health bars
  drawHealthBar(pinkMonster, 10, 10, 100, 10, ctx);
  drawHealthBar(owlet, canvas.width - 315, 10, 100, 10, ctx);

  ctx.save();
  ctx.font = "20px Comic Sans MS";
  ctx.fillStyle = "black"; // Choose a color that's visible on your game background
  ctx.textAlign = "center";
  ctx.fillText("Press 'i' to toggle gameplay instructions", canvas.width / 2, 20); 
  // The '30' pushes the text 30 pixels down from the top, adjust this as needed
  ctx.restore();

  ctx.save();
  ctx.font = "20px Comic Sans MS";
  ctx.fillStyle = "black"; // Choose a color that's visible on your game background
  ctx.textAlign = "center";
  ctx.fillText("Press 'm' to toggle music on and off", canvas.width / 2, 50); 
  // The '30' pushes the text 30 pixels down from the top, adjust this as needed
  ctx.restore();

  if (showInstructions) {
    drawInstructions();
  }
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
  ctx.font = "40px 'Comic Sans MS'"; // Change font to Comic Sans MS
  ctx.fillStyle = "black"; // Text color
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(message, canvas.width / 2, canvas.height / 2 - 90); // Move x pixels below center
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
    canvas.height / 2 + 90
    );
    ctx.restore();
  }

  function drawInstructions() {
    ctx.save();
    ctx.font = "20px Comic Sans MS";
    ctx.fillStyle = "black"; // or any color that contrasts your game's background
  
    // Instructions for Player 1
    const instructionsPlayer1 = [
      "Player 1 (Pink Monster):",
      "A: move left",
      "D: move right",
      "W: jump",
      "S: attack",
      // ... any other instructions for Player 1
    ];
  
    // Instructions for Player 2
    const instructionsPlayer2 = [
      "Player 2 (White Owlet):",
      "← move left",
      "→ move right",
      "↑ jump",
      "↓ attack",
      // ... any other instructions for Player 2
    ];
  
    // Draw Player 1 instructions (top-left)
    let y1 = 70; // Starting vertical position for Player 1
    for (let line of instructionsPlayer1) {
      ctx.fillText(line, 10, y1);
      y1 += 20; // Move down for the next line
    }
  
    // Draw Player 2 instructions (top-right)
    let y2 = 70; // Starting vertical position for Player 2
    ctx.textAlign = "right"; // Align text to the right
    for (let line of instructionsPlayer2) {
      ctx.fillText(line, canvas.width - 10, y2);
      y2 += 20; // Move down for the next line
    }
  
    ctx.restore();
  }
  