function preloadImages(animationData) {
  let loadedImages = {};
  let imagesToLoad = Object.keys(animationData).length;
  let loadedCounter = 0;

  return new Promise((resolve, reject) => {
    for (let state in animationData) {
      let sprite = new Image();
      sprite.src = animationData[state].spriteSrc;

      sprite.onload = function () {
        loadedCounter++;
        if (loadedCounter === imagesToLoad) {
          resolve(loadedImages);
        }
      };

      sprite.onerror = function () {
        console.error("Error loading image:", animationData[state].spriteSrc);
        reject(
          new Error(`Failed to load image: ${animationData[state].spriteSrc}`)
        );
      };

      loadedImages[state] = sprite;
    }
  });
}
