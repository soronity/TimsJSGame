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
