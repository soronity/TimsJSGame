class PlayerAnimation {
  constructor(player) {
    this.player = player;
  }

  drawPlayer() {
    //TODO make a separate function chooseSprite
    let spriteToUse = this.player.sprites.idle;

    if (this.velocityX !== 0) {
      spriteToUse = this.player.sprites.run;
      //TODO if attacking and running, use that sprite, etc
    }

    let currentFrameX = this.player.currentFrame * this.player.spriteWidth;

    ctx.save(); // Save the current state of the canvas

    // If player is facing left, flip the image horizontally
    if (this.player.direction === "left") {
      ctx.translate(this.player.x + this.player.width, this.player.y); // Move the origin to the right side of the player
      ctx.scale(-1, 1); // Flip horizontally
      if (spriteToUse.complete) {
        // Check if the image has been loaded
        ctx.drawImage(
          spriteToUse,
          currentFrameX,
          0,
          this.player.spriteWidth,
          this.player.spriteHeight,
          0, // Adjust the x position
          0, // Adjust the y position
          this.player.width,
          this.player.height
        );
      } else {
        // Fallback: Draw a red rectangle as an error indicator
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, this.player.width, this.player.height);
      }
    } else {
      // Draw the player facing right
      if (spriteToUse.complete) {
        // Check if the image has been loaded
        ctx.drawImage(
          spriteToUse,
          currentFrameX,
          0,
          this.player.spriteWidth,
          this.player.spriteHeight,
          this.player.x,
          this.player.y,
          this.player.width,
          this.player.height
        );
      } else {
        // Fallback: Draw a red rectangle as an error indicator
        ctx.fillStyle = "red";
        ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
      }
    }

    ctx.restore(); // Restore the canvas to its previous state
  }

  updateAnimation() {
    let maxFrames = this.player.velocityX !== 0 ? 6 : 4;
    // if (this.player.velocityY !== 0) {
    //     maxFrames = 8;
    // }
    //else if (gameOvver) {
    //  maxFrames = 8;
    //}

    this.player.frameCounter++;
    if (this.player.frameCounter >= animationSpeed) {
      this.player.frameCounter = 0;
      // Update the current frame
      this.player.currentFrame = (this.currentFrame + 1) % maxFrames;
    }
  }
}
