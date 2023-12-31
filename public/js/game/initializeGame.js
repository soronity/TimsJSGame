// Get the canvas elements
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scale = 3;

// Set the size of the visible canvas
canvas.width = 480 * scale;
canvas.height = 300 * scale;

canvas.style.display = 'block';
canvas.style.marginLeft = 'auto';
canvas.style.marginRight = 'auto';

const gravity = 800;
const animationSpeed = 120;

let showInstructions = false; // Variable to toggle showing instructions
let musicPlaying = false; // Variable to toggle music on and off


// Initialize game state to INTRO
let gameStateIntro = true;
let gameOver = false;

const backgroundImage = new Background({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "img/background_desert.png",
  scale: scale,
});

let pinkMonster;
let owlet;

Promise.all([
  preloadImages(pinkMonsterAnimations),
  preloadImages(owletAnimations),
])
  .then(([preloadedPinkMonsterSprites, preloadedOwletSprites]) => {
    console.log("Promise resolved!"); // Add this

    pinkMonster = new Player({
      x: 100,
      y: 200,
      width: 20,
      height: 20,
      scale: scale,
      sprites: preloadedPinkMonsterSprites,
      spriteWidth: 32,
      spriteHeight: 32,
      id: "Pink wins <3",
      direction: "left",
    });

    owlet = new Player({
      x: 600,
      y: 200,
      width: 20,
      height: 20,
      scale: scale,
      sprites: preloadedOwletSprites,
      spriteWidth: 32,
      spriteHeight: 32,
      id: "Owlet wins <3",
      direction: "right",
    });

    // Start the continuous game loop
    requestAnimationFrame(gameLoop);
  })
  .catch((error) => {
    console.error("Failed to preload some images", error);
  });

// Add a new property to keep track of the current frame index
let currentFrame = 0;

// Add a new property to keep track of the animation frame counter
let frameCounter = 0;

