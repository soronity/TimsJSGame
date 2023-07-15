class Player {

    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocityY = 0;
        this.velocityX = 0;
    }

    updatePosition() {
        this.velocityY += gravity;

        this.y += this.velocityY;

        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
            this.velocityY = 0;
        }

        if (this.y < 0) {
            this.y = 0;
            this.velocityY = 0;
        }

        this.x += this.velocityX;

        if (this.x + this.width > canvas.width) {
            this.x = canvas.width - this.width;
        }

        if (this.x < 0) {
            this.x = 0;
        }

        this.drawPlayer();
    }

    drawPlayer() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}