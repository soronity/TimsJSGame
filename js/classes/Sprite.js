class Sprite {
    constructor({position, imageSrc, scale}) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale
    }

    drawSprite() {
        ctx.drawImage(
            this.image, 
            this.position.x, 
            this.position.y,
            this.image.width * this.scale,
            this.image.height * this.scale
        );
    }
}
