class Sprite {
    constructor(options) {
        this.position = options.position;
        this.imageSrc = options.imageSrc;
        this.scale = 1; // Add a scale property, defaulting to 1 if not provided

        this.image = new Image();
        this.image.src = this.imageSrc;
    }

    drawSprite() {
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.image.width * this.scale, // Apply the scale to the width
            this.image.height * this.scale // Apply the scale to the height
        );
    }
}
