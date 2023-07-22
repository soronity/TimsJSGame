class CollisionBlock {
    constructor({position}) {
      this.position = position;
      this.width = 32;
      this.height = 32;
    }

    
  
    drawCollisionBlock(scale) {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';

      // Calculate scaled position based on the provided scale
      const scaledX = this.position.x * scale;
      const scaledY = this.position.y * scale;

      ctx.fillRect(scaledX, scaledY, this.width, this.height);
    }
}