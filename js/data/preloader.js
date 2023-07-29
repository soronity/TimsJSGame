function preloadImages(animationData) {
    let loadedImages = {};
    
    for (let state in animationData) {
        let sprite = new Image();
        sprite.src = animationData[state].spriteSrc;
        loadedImages[state] = sprite;
        sprite.onerror = function() {
            console.error('Error loading image:', animationData[state].spriteSrc);
        }
        
    }
    
    return loadedImages;
}