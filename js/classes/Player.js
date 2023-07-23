class Player {

    constructor(x, y, width, height, floorCollisionBlocks, platformCollisionBlocks) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;        this.velocityY = 0;
        this.velocityX = 0;
        this.floorCollisionBlocks = floorCollisionBlocks;
        this.platformCollisionBlocks = platformCollisionBlocks;
        this.isMidAir = false;
    }
    
    updatePosition() {
        this.drawPlayer();
        this.addGravity();
        this.checkDownwardCollision();
        
        // Update the player's position based on velocity
        this.x += this.velocityX;
        this.y += this.velocityY;
        
        // Check if the player is out of bounds on the x-axis
        if (this.x + this.width > canvas.width || this.x < 0) {
            // Move the player back inside the canvas
            this.x = Math.min(Math.max(this.x, 0), canvas.width - this.width);
        }
    }

    addGravity() {
        this.velocityY += gravity;
        this.y += this.velocityY;
    }

checkDownwardCollision() {
    for (let i = 0; i < this.floorCollisionBlocks.length; i++) {
        const collisionBlock = this.floorCollisionBlocks[i];

        // Check for collision with the top side of the collision block
        if (collision({ player: this, collisionBlock })) {
            // Collided from above, stop vertical velocity and move player to the top of the collision block
            this.velocityY = 0;
            this.y = collisionBlock.position.y - this.height;
            this.isMidAir = false;
        }
    }

    for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
        const collisionBlock = this.platformCollisionBlocks[i];

        // Check for collision with the top side of the collision block
        if (this.velocityY > 0 && collision({ player: this, collisionBlock })) {
            // Collided from above, stop vertical velocity and adjust player's position slightly before the collision block
            this.velocityY = 0;
            this.y = collisionBlock.position.y - this.height - 1; // Adjust the player's position slightly above the platform
            this.isMidAir = false;
        }
    }
}


    isOnGround() {
        // Check collision with the ground
        for (const block of floorCollisionBlocks) {
            if (this.collidesWith(block)) {
                // Reset vertical velocity when touching the ground
                this.velocityY = 0;
                return true;
            }
        }
        return false;
    }

    drawPlayer() {
        
        // Calculate the x position of the current frame in the sprite sheet
        const currentFrameX = currentFrame * playerSpriteWidth;

        // Use the player sprite image to draw the current frame
        ctx.drawImage(
            playerSprite,
            currentFrameX,
            0, // Y position is 0 as all stances are on the same row
            playerSpriteWidth,
            playerSpriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    updateAnimation() {
        // Increment the frame counter
        frameCounter++;

        // Check if enough frames have passed to update the animation
        if (frameCounter >= animationSpeed) {
            // Reset the frame counter
            frameCounter = 0;

            // Increment the current frame index
            currentFrame = (currentFrame + 1) % totalFrames;
        }    
    }
}