class PlayerInput {
  constructor(player) {
    this.player = player;
  }

  handleKeyPress(options) {
    if (
      (options.a && options.a.pressed) ||
      (options.arrowLeft && options.arrowLeft.pressed)
    ) {
      this.velocityX = -2;
      this.direction = "left";
    } else if (
      (options.d && options.d.pressed) ||
      (options.arrowRight && options.arrowRight.pressed)
    ) {
      this.velocityX = 2;
      this.direction = "right";
    } else {
      this.velocityX = 0;
    }

    if (options.w && options.w.pressed) {
      this.player.gameLogic.jump();
    } else if (options.arrowUp && options.arrowUp.pressed) {
      this.player.gameLogic.jump();
    }
  }
}
