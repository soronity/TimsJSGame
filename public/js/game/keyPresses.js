const keys = {
  pinkMonster: {
    a: { pressed: false },
    d: { pressed: false },
    w: { pressed: false },
    s: { pressed: false }, // Attack key for Player 1
  },
  owlet: {
    arrowLeft: { pressed: false },
    arrowRight: { pressed: false },
    arrowUp: { pressed: false },
    arrowDown: { pressed: false }, // Attack key for Player 2
  },
};

function updateKeyPressedState(code, isPressed) {
  // Player 1 controls
  if (code === "KeyA") {
    keys.pinkMonster.a.pressed = isPressed;
  } else if (code === "KeyD") {
    keys.pinkMonster.d.pressed = isPressed;
  } else if (code === "KeyW") {
    keys.pinkMonster.w.pressed = isPressed;
  }

  // Player 2 controls
  if (code === "ArrowLeft") {
    keys.owlet.arrowLeft.pressed = isPressed;
  } else if (code === "ArrowRight") {
    keys.owlet.arrowRight.pressed = isPressed;
  } else if (code === "ArrowUp") {
    keys.owlet.arrowUp.pressed = isPressed;
  }

  // Player 1 attack
  if (code === "KeyS") {
    keys.pinkMonster.s.pressed = isPressed;
    if (isPressed) pinkMonster.gameLogic.attack(owlet); // If the attack key is pressed, call attack
  }

  // Player 2 attack
  if (code === "ArrowDown") {
    keys.owlet.arrowDown.pressed = isPressed;
    if (isPressed) owlet.gameLogic.attack(pinkMonster); // If the attack key is pressed, call attack
  }

  if ((code === "Space") && isPressed && (gameOver == true)) {
    restartGame();
  }
}