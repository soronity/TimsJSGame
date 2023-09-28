class PlayerPhysics {
  constructor(player) {
    this.player = player;
  }
  
  addGravity() {
    if (!this.isOnPlatform() && !this.isOnFloor()) {
      this.player.elocityY += gravity;
    }
  }
  
  isOnPlatform() {
    for (const block of platformCollisionBlocks) {
      if (this.player.velocityY > 0 && this.collidesWith(block)) {
        const previousPlayerBottom = this.player.y + this.player.height - this.player.velocityY;
        // Check if the player was previously above the platform block before the last movement
        if (previousPlayerBottom <= block.position.y) {
          this.player.velocityY = 0;
          this.player.y = block.position.y - this.player.height;
          this.player.isMidAir = false;
          return true;
        }
      }
    }
    return false; // Return false if no collision was found.
  }

  isOnFloor() {
    const playerBottom = this.player.y + this.player.height;
    for (const block of floorCollisionBlocks) {
      if (this.collidesWith(block) && playerBottom <= block.position.y + 1) {
        this.player.y = block.position.y - this.player.height;
        this.isMidAir = false;
        return true;
      }
    }
    return false;
  }

  checkFloorCollision() {
    for (let i = 0; i < floorCollisionBlocks.length; i++) {
      const collisionBlock = floorCollisionBlocks[i];

      if (this.player.velocityY >= 0 && this.collidesWith(collisionBlock)) {
        this.player.velocityY = 0;
        this.player.y = collisionBlock.position.y - this.player.height;
        this.player.isMidAir = false;
        return true; // Return true to indicate a collision was found.
      }
    }
    return false; // Return false if no collision was found.
  }

  checkPlatformCollision() {
    for (let i = 0; i < platformCollisionBlocks.length; i++) {
      const collisionBlock = platformCollisionBlocks[i];

      if (this.player.velocityY > 0 && this.collidesWith(collisionBlock)) {
        const previousPlayerBottom = this.player.y + this.player.height - this.player.velocityY;
        // Check if the player was previously above the platform block before the last movement
        if (previousPlayerBottom <= collisionBlock.position.y) {
          this.player.velocityY = 0;
          this.player.y = collisionBlock.position.y - this.player.height;
          this.player.isMidAir = false;
          return true; // Return true to indicate a collision was found.
        }
      }
    }
    return false; // Return false if no collision was found.
  }

  collidesWith(otherObject) {
    const left = this.player.x;
    const right = this.player.x + this.player.width;
    const top = this.player.y;
    const bottom = this.player.y + this.player.height;
    const otherLeft = otherObject.position.x;
    const otherRight = otherObject.position.x + otherObject.width;
    const otherTop = otherObject.position.y;
    const otherBottom = otherObject.position.y + otherObject.height;

    return (
      left < otherRight &&
      right > otherLeft &&
      top < otherBottom &&
      bottom > otherTop
    );
  }

  hitboxCollidesWith(otherPlayer) {
    const left = this.player.hitBox.x;
    const right = this.player.hitBox.x + this.player.hitBox.width;
    const top = this.player.hitBox.y;
    const bottom = this.player.hitBox.y + this.player.hitBox.height;
    const otherLeft = otherPlayer.x;
    const otherRight = otherPlayer.x + otherPlayer.width;
    const otherTop = otherPlayer.y;
    const otherBottom = otherPlayer.y + otherPlayer.height;

    return (
      left < otherRight &&
      right > otherLeft &&
      top < otherBottom &&
      bottom > otherTop
    );
  }

}
