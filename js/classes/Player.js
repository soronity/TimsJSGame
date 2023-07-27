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
        id,
        direction,
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
        this.direction = direction; // left or right
        const player = this;
        this.hitBox = {
            width: 5,
            height: 20,
            get x() {
                if (player.direction === "right") {
                    return player.x + player.width;
                } else {
                    return player.x - this.width;
                }
            },
            get y() {
                return player.y + player.height / 2 - this.height / 2;
            }
        };
        
        this.health = 100;
        this.maxHealth = 100;
        this.id = id;
    }

    handleKeyPress(options) {
        if ((options.a && options.a.pressed) || (options.arrowLeft && options.arrowLeft.pressed)) {
            this.velocityX = -3;
            this.direction = 'left';
        } else if ((options.d && options.d.pressed) || (options.arrowRight && options.arrowRight.pressed)) {
            this.velocityX = 3;
            this.direction = 'right';
        } else {
            this.velocityX = 0;
        }
        
    
        if (options.w && options.w.pressed) { 
            this.jump();
        } else if (options.arrowUp && options.arrowUp.pressed) { 
            this.jump();
        }
    }
    
    updatePosition(options) {
        this.addGravity();
    
        if (options.w && options.w.pressed) { 
            this.jump();
        } else if (options.arrowUp && options.arrowUp.pressed) { 
            this.jump();
        }
    
        this.checkFloorCollision();
        this.checkPlatformCollision();
    
        this.x += this.velocityX;
        this.y += this.velocityY;
    
        if (this.x + this.width > canvas.width || this.x < 0) {
            this.x = Math.min(Math.max(this.x, 0), canvas.width - this.width);
        }
    }

    jump() {
        if (!this.isMidAir && (this.isOnFloor() || this.isOnPlatform())) {
            this.velocityY = -7;
            this.isMidAir = true;
        }
    }
    
    isOnPlatform() {
        const playerBottom = this.y + this.height;
        for (const block of platformCollisionBlocks) {
            if (this.collidesWith(block) && playerBottom <= block.position.y + 1 && this.velocityY >= 0) {
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
                this.y = block.position.y - this.height; // Set y position
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

    hitboxCollidesWith(otherPlayer) {
        const left = this.hitBox.x;
        const right = this.hitBox.x + this.hitBox.width;
        const top = this.hitBox.y;
        const bottom = this.hitBox.y + this.hitBox.height;
        const otherLeft = otherPlayer.x;
        const otherRight = otherPlayer.x + otherPlayer.width;
        const otherTop = otherPlayer.y;
        const otherBottom = otherPlayer.y + otherPlayer.height;
    
        return (
            left < otherRight &&
            right > otherLeft &&
            top < otherBottom &&
            bottom > otherTop
        );
    }
    
    attack(opponent) {
        if (gameOver) {
            return;
        }
        if (this.hitboxCollidesWith(opponent)) {
            opponent.takeDamage(10);
            this.checkForGameOver();
        }
    }
    
    takeDamage(damage) {
        this.health -= damage;
        this.health = Math.max(this.health, 0); // Ensure health doesn't go below 0
    }

    checkForGameOver() {
        if (player1.health <= 0 || player2.health <= 0) {
            // Determine winner based on health
            let winner = player1.health > player2.health ? player1.id : player2.id;
            gameOver = true;
    
            // Delay the winner message by a short period (e.g., 1 second)
            setTimeout(() => {
                alert(winner);
                drawMessage(winner);
                drawRestartMessage();
            }, 1000);
        }
    }
    
    checkFloorCollision() {
        for (let i = 0; i < floorCollisionBlocks.length; i++) {
            const collisionBlock = floorCollisionBlocks[i];
            
            if (this.velocityY >= 0 && this.collidesWith(collisionBlock)) {
                this.velocityY = 0;
                this.y = collisionBlock.position.y - this.height;
                this.isMidAir = false;
                return true;  // Return true to indicate a collision was found.
            }
        }
        return false; // Return false if no collision was found.
    }
    
    checkPlatformCollision() {
        for (let i = 0; i < platformCollisionBlocks.length; i++) {
            const collisionBlock = platformCollisionBlocks[i];
            
            if (this.velocityY > 0 && this.collidesWith(collisionBlock)) {
                const previousPlayerBottom = this.y + this.height - this.velocityY;
                // Check if the player was previously above the platform block before the last movement
                if (previousPlayerBottom <= collisionBlock.position.y) {
                    this.velocityY = 0;
                    this.y = collisionBlock.position.y - this.height;
                    this.isMidAir = false;
                    return true; // Return true to indicate a collision was found.
                }
            }
        }
        return false; // Return false if no collision was found.
    }
    
    addGravity() {  
        if (!this.isOnPlatform() && !this.isOnFloor()) {
            this.velocityY += gravity;
        }
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