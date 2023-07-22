class Player {

    constructor(x, y, width, height, color, floorCollisionBlocks, platformCollisionBlocks) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocityY = 0;
        this.velocityX = 0;
        this.floorCollisionBlocks = floorCollisionBlocks;
        this.platformCollisionBlocks = platformCollisionBlocks;
    }

    updatePosition() {
        this.addGravity();
    
        // Save the current position in case we need to revert
        const prevX = this.x;
        const prevY = this.y;
    
        // Update the player's position based on velocity
        this.x += this.velocityX;
        this.y += this.velocityY;
    
        // Check for collisions with floor collision blocks
        this.checkVerticalCollision();
    
        // Check if the player is out of bounds on the x-axis
        if (this.x + this.width > canvas.width || this.x < 0) {
            this.x = prevX; // Revert to previous position to prevent going out of bounds
        }
    
        // Draw the player
        this.drawPlayer();
    }

    addGravity() {
        this.velocityY += gravity;
        this.y += this.velocityY;
    }

    checkVerticalCollision() {
        for (let i = 0; i < this.floorCollisionBlocks.length; i++) {
            const collisionBlock = this.floorCollisionBlocks[i];
    
            // Check for collision with the top side of the collision block
            if (collision({ player: this, collisionBlock })) {
                if (this.velocityY > 0) {
                    // Collided from above, stop vertical velocity and move player to the top of the collision block
                    this.velocityY = 0;
                    this.y = collisionBlock.position.y - this.height;
                }
            }
        }
    }

    drawPlayer() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}