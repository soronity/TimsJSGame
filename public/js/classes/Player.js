class Player {
  constructor({
    x,
    y,
    width,
    height,
    sprites,
    spriteWidth,
    spriteHeight,
    id,
    direction,
  }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocityY = 0;
    this.velocityX = 0;
    this.isMidAir = false;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.sprites = sprites;
    this.currentFrame = 0;
    this.frameCounter = 0;
    this.direction = direction; // left or right
    const player = this;
    this.hitBox = {
      width: 5,
      height: 20,
      get x() {
        if (player.direction === "right") {
          return player.x + player.width;
        } else {
          return player.x - this.width;
        }
      },
      get y() {
        return player.y + player.height / 2 - this.height / 2;
      },
    };
    this.health = 100;
    this.maxHealth = 100;
    this.id = id;
    this.input = new PlayerInput(this);
    this.physics = new PlayerPhysics(this);
    this.animation = new PlayerAnimation(this);
    this.gameLogic = new PlayerGameLogic(this);
  }
}
