/**
 * Background Class
 *
 * Description:
 * The Background class is responsible for drawing the game's background. It manages
 * the background's position, image source, and scaling for rendering purposes.
 *
 * Attributes:
 * - position: Coordinates where the background image should start drawing on the canvas.
 * - imageSrc: Source path of the background image.
 * - scale: A multiplier that adjusts the size of the background image. Defaults to 1 if not provided.
 * - image: An instance of the Image class containing the actual background graphic.
 *
 * Methods:
 * - drawBackground(): Renders the background image on the canvas with the appropriate scaling.
 *
 * Usage:
 * To create a new background, provide an options object with the necessary attributes.
 * Example:
 * const myBackground = new Background({
 *     position: {x: 0, y: 0},
 *     imageSrc: "path_to_background_image.png",
 *     scale: 1
 * });
 *
 * Dependencies:
 * This class relies on the Canvas API for rendering purposes.
 */

class Background {
  constructor(options) {
    this.position = options.position;
    this.imageSrc = options.imageSrc;
    this.scale = options.scale; // Add a scale property, defaulting to 1 if not provided

    this.image = new Image();
    this.image.src = this.imageSrc;
  }

  drawBackground() {
    if (!this.image) return; // If the image is not loaded, don't try to draw it

    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.image.width * this.scale, // Apply the scale to the width
      this.image.height * this.scale // Apply the scale to the height
    );
  }
}
