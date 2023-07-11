// Get the canvas element
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Player object literal
var player = {
  x: 50, // Player's x position
  y: 50, // Player's y position
  width: 50, // Player's width
  height: 50, // Player's height
  color: "blue", // Player's color

  // Function to update player's position or any other logic
  update: function () {
    // Update player position or any other game logic here
  },

  // Function to draw the player
  draw: function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

// Sprite object literal
var sprite = {
  x: 200, // Sprite's x position
  y: 200, // Sprite's y position
  width: 100, // Sprite's width
  height: 100, // Sprite's height
  color: "red", // Sprite's color

  // Function to update sprite's position or any other logic
  update: function () {
    // Update sprite position or any other game logic here
  },

  // Function to draw the sprite
  draw: function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

// Game loop
function gameLoop() {
  update();
  draw();
}

// Update game logic
function update() {
  player.update();
  sprite.update();
}

// Draw game objects
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player
  player.draw();

  // Draw the sprite
  sprite.draw();
}

// Handle key presses
document.addEventListener("keydown", function (event) {
  // Handle key presses here (e.g., move the player)
});

// Start the game loop
setInterval(gameLoop, 16); // 60 frames per second (approx.)
