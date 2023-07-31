/**
 * CollisionBlock Class
 *
 * Description:
 * The CollisionBlock class represents an individual collision block within the game.
 * It is responsible for drawing itself and handling collision detection.
 *
 * Attributes:
 * - position: Coordinates of the top-left corner of the collision block on the canvas.
 * - width, height: Fixed dimensions of the block (currently set to 16x16).
 *
 * Methods:
 * - drawCollisionBlock(scale): Renders the collision block on the canvas with the specified scaling.
 *
 * Usage:
 * To instantiate a new collision block, provide a configuration object with the block's position.
 * Example:
 * const block = new CollisionBlock({ position: {x: 10, y: 20} });
 *
 * Dependencies:
 * This class relies on the Canvas API for rendering and collision detection purposes.
 *
 * Notes:
 * The current implementation draws the collision block as transparent, making it invisible
 * in the gameplay but still functional for collisions.
 */

class CollisionBlock {
  constructor({ position }) {
    this.position = position;
    this.width = 16;
    this.height = 16;
  }

  drawCollisionBlock(scale) {
    ctx.fillStyle = "rgba(255, 0, 0, 0)";

    // Calculate scaled position based on the provided scale
    const scaledX = this.position.x * scale;
    const scaledY = this.position.y * scale;

    ctx.fillRect(scaledX, scaledY, this.width, this.height);
  }
}
