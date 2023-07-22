function collision({ player, collisionBlock }) {
    return (
        player.y + player.height > collisionBlock.position.y &&
        player.y < collisionBlock.position.y + collisionBlock.height &&
        player.x < collisionBlock.position.x + collisionBlock.width &&
        player.x + player.width > collisionBlock.position.x
    );
}
