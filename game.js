// Get the canvas element
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gravity = 0.5;

// Load the background image
const backgroundImage = new Image();
backgroundImage.src = "img/5.png";

// Resize the canvas to the size of the screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Call the resizeCanvas function when the window is resized
window.addEventListener("resize", resizeCanvas);

// Call the resizeCanvas function once on page load
resizeCanvas();

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

        this.draw();
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const player = new Player(50, 50, 50, 50, "blue");

const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
};

function animate() {
    player.updatePosition();

    // Handle key presses
    if (keys.a.pressed) {
        player.velocityX = -5; // Set negative horizontal velocity to move left
    } else if (keys.d.pressed) {
        player.velocityX = 5; // Set positive horizontal velocity to move right
    } else {
        player.velocityX = 0;
    }
}

function draw() {
    // Clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background image
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Draw the player
    player.draw();
}

// Eventlistener for key presses
document.addEventListener("keydown", function (event) {
    if (event.code === "KeyA") {
        keys.a.pressed = true;
    } else if (event.code === "KeyD") {
        keys.d.pressed = true;
    }

    // Jump with the space bar
    if (event.code === "Space") {
        // Only jump if the player is on the ground or has a slight tolerance
        if (player.y + player.height >= canvas.height - 1) {
            player.velocityY = -20; // Set the player's jump height
        }
    }
});

// Eventlistener for key releases
document.addEventListener("keyup", function (event) {
    if (event.code === "KeyA") {
        keys.a.pressed = false;
    } else if (event.code === "KeyD") {
        keys.d.pressed = false;
    }
});

function gameLoop() {
    animate();
    draw();
    // Call the gameLoop function on the next frame
    requestAnimationFrame(gameLoop);
}

// Start the continuous game loop
requestAnimationFrame(gameLoop);
