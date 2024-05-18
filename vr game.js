document.addEventListener('DOMContentLoaded', function () {
    const player = document.getElementById('player');
    const obstacle = document.getElementById('obstacle');
  
    document.addEventListener('keydown', function (event) {
      if (event.code === 'ArrowUp') {
        player.object3D.position.z += 0.1; // Move player forward
      } else if (event.code === 'ArrowDown') {
        player.object3D.position.z -= 0.1; // Move player backward
      }
  
      // Check for collision
      const playerPosition = player.object3D.position;
      const obstaclePosition = obstacle.object3D.position;
      if (Math.abs(playerPosition.z - obstaclePosition.z) < 1 &&
          Math.abs(playerPosition.y - obstaclePosition.y) < 1 &&
          Math.abs(playerPosition.x - obstaclePosition.x) < 1) {
        alert('Game Over!');
      }
    });
  });