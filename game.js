// Get the canvas element
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gravity = 0.5;

// Load the background image
const backgroundImage = new Image();
backgroundImage.src = "path/to/your/background.png";


// Resize the canvas to the size of the screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Call the resizeCanvas function when the window is resized
window.addEventListener("resize", resizeCanvas);

// Call the resizeCanvas function once on page load
resizeCanvas();

var player = {
    x: 50, 
    y: 50, 
    width: 50,
    height: 50, 
    color: "blue", 
    velocityY: 0, 
    velocityX: 0, // Set initial horizontal velocity to 0
};




// Update game logic
function update() {

    // Update the player's vertical velocity by adding gravity
    player.velocityY += gravity;

    // Update the player's y position by adding the vertical velocity
    player.y += player.velocityY;

    // If the player hits the bottom of the canvas, stop them
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.velocityY = 0;
    }

    // If the player hits the top of the canvas, stop them
    if (player.y < 0) {
        player.y = 0;
        player.velocityY = 0;
    }

    // Update the player's x position by adding the horizontal velocity
    player.x += player.velocityX;

    // If the player hits the right of the canvas, stop them
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }

    // If the player hits the left of the canvas, stop them
    if (player.x < 0) {
        player.x = 0;
    }

    // Draw the player on the canvas
    draw();
}

// Function to draw the player
function draw() {
    // Draw the background image
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Draw the player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}


// Handle key presses
document.addEventListener("keydown", function (event) {

    if (event.code == "KeyA") {
        player.velocityX = -10; // Set negative horizontal velocity to move left
    }

    if (event.code == "KeyD") {
        player.velocityX = 10; // Set positive horizontal velocity to move right
    }

    //Jump with the space bar
    if (event.code == "Space") {
        // Only jump if the player is on the ground or has a slight tolerance
        if (player.y + player.height >= canvas.height - 1) {
            player.velocityY = -20; // Set the player's jump height to 10 pixels per frame
        }
    }
});

// Handle key releases
document.addEventListener("keyup", function (event) {
    if (event.code == "KeyA") {
        player.velocityX = 0; 
    }
    else if (event.code == "KeyD") {
        player.velocityX = 0; 
    }
});

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);