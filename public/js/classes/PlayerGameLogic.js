class PlayerGameLogic {
  constructor(player) {
    this.player = player;
  }

  updatePosition() {
    this.player.physics.addGravity();

    this.player.physics.checkFloorCollision();
    this.player.physics.checkPlatformCollision();

    this.x += this.velocityX;
    this.y += this.velocityY;

    if (this.x + this.width > canvas.width || this.x < 0) {
      this.x = Math.min(Math.max(this.x, 0), canvas.width - this.width);
    }
  }

  attack(opponent) {
    if (gameOver) {
      return;
    }
    if (this.player.physics.hitboxCollidesWith(opponent)) {
      opponent.takeDamage(10);
      this.this.player.checkForGameOver();
    }
  }

  takeDamage(damage) {
    this.health -= damage;
    this.health = Math.max(this.health, 0); // Ensure health doesn't go below 0
  }

  checkForGameOver() {
    if (pinkMonster.health <= 0 || owlet.health <= 0) {
      // Determine winner based on health
      let winner =
        pinkMonster.health > owlet.health ? pinkMonster.id : owlet.id;

      // Delay the winner message by a short period (e.g., 1 second)
      setTimeout(() => {
        drawMessage(winner);
        gameOver = true;
      }, 1000);
    }

  }

  jump() {
    if (!this.isMidAir && (this.player.physics.isOnFloor() || this.player.physics.isOnPlatform())) {
      this.velocityY = -7;
      this.isMidAir = true;
    }
  }
}
