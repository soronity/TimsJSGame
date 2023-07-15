// Get the canvas element
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gravity = 0.5;


// const floorCollisions2DArray = [];
// for (let i = 0; i < floorCollisions.length; i += 30) {
//     floorCollisions2DArray.push(floorCollisions.slice(i, i + 30));
// }

// for (let i = 0; i < floorCollisions2DArray.length; i++) {
//     for (let j = 0; j < floorCollisions2DArray[i].length; j++) {
//       // If the element has a value of 202, create a new Block object
//       if (floorCollisions2DArray[i][j] === 202) {};

// Load the background image
const backgroundImage = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "img/5.png",
});


// Resize the canvas to the size of the screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Call the resizeCanvas function when the window is resized
window.addEventListener("resize", resizeCanvas);

// Call the resizeCanvas function once on page load
resizeCanvas();

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
    backgroundImage.updateSprite();
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

// Draw everything on the canvas
function draw() {
    // Clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(backgroundImage.image, 0, 0, canvas.width, canvas.height);

    player.drawPlayer();
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
