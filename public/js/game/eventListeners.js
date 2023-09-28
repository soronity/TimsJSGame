document.addEventListener("keydown", function (event) {
  if (event.code === "Enter" && gameStateIntro == true) {
    gameStateIntro = false;
  }
  updateKeyPressedState(event.code, true);
});


document.addEventListener("keyup", function (event) {
  updateKeyPressedState(event.code, false);
});