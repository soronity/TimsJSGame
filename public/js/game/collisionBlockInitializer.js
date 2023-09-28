function initializeCollisionBlocks(collisionsData, collisionBlockNumber) {
  const collisions2DArray = [];
  for (let i = 0; i < collisionsData.length; i += 30) {
    collisions2DArray.push(collisionsData.slice(i, i + 30));
  }

  const collisionBlocks = [];

  for (let i = 0; i < collisions2DArray.length; i++) {
    for (let j = 0; j < collisions2DArray[i].length; j++) {
      if (collisions2DArray[i][j] === collisionBlockNumber) {
        collisionBlocks.push(
          new CollisionBlock({
            position: {
              x: j * 16,
              y: i * 16,
            },
            scale: 1,
          })
        );
      }
    }
  }

  return collisionBlocks;
}

//TODO flytta ut till en annan fil
function collision({ player, collisionBlock }) {
  return (
    player.y + player.height > collisionBlock.position.y &&
    player.y < collisionBlock.position.y + collisionBlock.height &&
    player.x < collisionBlock.position.x + collisionBlock.width &&
    player.x + player.width > collisionBlock.position.x
  );
}
