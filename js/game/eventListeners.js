document.addEventListener("keydown", function (event) {
  if (event.code === "Enter" && gameStateIntro == true) {
    gameStateIntro = false;
  }
  updateKeyPressedState(event.code, true);
});

document.addEventListener("keyup", function (event) {
  updateKeyPressedState(event.code, false);
});

window.addEventListener("keydown", function(e) {
  if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.key) > -1) {
      e.preventDefault();
  }
}, false);

document.addEventListener("keydown", function(event) {
  if (event.key === "i") {
    showInstructions = !showInstructions; // Toggle the boolean
  }
});

window.addEventListener('keydown', function(event) {
  if (event.key === 'm' || event.key === 'M') {
    musicPlaying = !musicPlaying;  // Toggle the musicPlaying boolean
    
    if (musicPlaying) {
      backgroundMusic.play();  // Play the music
    } else {
      backgroundMusic.pause();  // Pause the music
      backgroundMusic.currentTime = 0;  // Reset the time
    }
  }
});

