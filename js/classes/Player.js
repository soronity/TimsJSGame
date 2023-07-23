class Player {

    constructor({
        x,
        y,
        width,
        height,
        spriteSrc,
        spriteWidth,
        spriteHeight,
        totalFrames,
        animationSpeed,
    }) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocityY = 0;
        this.velocityX = 0;
        this.isMidAir = false;
        this.sprite = new Image();
        this.sprite.src = spriteSrc;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.totalFrames = totalFrames;
        this.animationSpeed = animationSpeed;
        this.currentFrame = 0;
        this.frameCounter = 0;
    }

    handleKeyPress(keys) {
        if (keys.a.pressed) {
            this.velocityX = -3;
        } else if (keys.d.pressed) {
            this.velocityX = 3;
        } else {
            this.velocityX = 0;
        }
    
        if (keys.space.pressed) {
            this.jump();
        }
    }
    
    
    updatePosition() {
        this.drawPlayer();
        this.addGravity();
    
        if (keys.space.pressed) {
            this.jump();
        }
    
        this.checkDownwardCollision();
    
        this.x += this.velocityX;
        this.y += this.velocityY;
    
        if (this.x + this.width > canvas.width || this.x < 0) {
            this.x = Math.min(Math.max(this.x, 0), canvas.width - this.width);
        }
    }
    

    jump() {
        if (!this.isMidAir && (this.isOnFloor() || this.isOnPlatform())) {
            console.log("jumping");
            this.velocityY = -7;
            this.isMidAir = true;
        }
    }
    
    
    isOnPlatform() {
        const playerBottom = this.y + this.height;
        for (const block of platformCollisionBlocks) {
            if (this.collidesWith(block) && playerBottom <= block.position.y + 1) {
                this.velocityY = 0;
                this.isMidAir = false; 
                return true;
            }
        }
        return false;
    }
    
    isOnFloor() {
        const playerBottom = this.y + this.height;
        for (const block of floorCollisionBlocks) {
            if (this.collidesWith(block) && playerBottom <= block.position.y + 1) {
                return true;
            }
        }
        return false;
    }

    collidesWith(otherObject) {
        const left = this.x;
        const right = this.x + this.width;
        const top = this.y;
        const bottom = this.y + this.height;
        const otherLeft = otherObject.position.x;
        const otherRight = otherObject.position.x + otherObject.width;
        const otherTop = otherObject.position.y;
        const otherBottom = otherObject.position.y + otherObject.height;
    
        return (
            left < otherRight &&
            right > otherLeft &&
            top < otherBottom &&
            bottom > otherTop
        );
    }

    checkDownwardCollision() {
        for (let i = 0; i < floorCollisionBlocks.length; i++) {
            const collisionBlock = floorCollisionBlocks[i];
    
            // Check if player is coming down from a jump and collides with the floor block
            if (this.velocityY >= 0 && collision({ player: this, collisionBlock })) {
                this.velocityY = 0;
                this.y = collisionBlock.position.y - this.height;
                this.isMidAir = false;
                return; // We found a collision, no need to check further for now.
            }
        }
    
        for (let i = 0; i < platformCollisionBlocks.length; i++) {
            const collisionBlock = platformCollisionBlocks[i];
            if (this.velocityY > 0 && collision({ player: this, collisionBlock })) {
                this.velocityY = 0;
                this.y = collisionBlock.position.y - this.height - 1;
                this.isMidAir = false;
                return; // We found a collision, no need to check further for now.
            }
        }
    }
    
    
    addGravity() {  
        // Add gravity to the vertical velocity
        this.velocityY += gravity;
    }

    drawPlayer() {
        const currentFrameX = this.currentFrame * this.spriteWidth;

        ctx.drawImage(
            this.sprite,
            currentFrameX,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    updateAnimation() {
        this.frameCounter++;

        if (this.frameCounter >= this.animationSpeed) {
            this.frameCounter = 0;
            this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
        }
    }
}