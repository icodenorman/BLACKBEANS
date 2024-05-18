const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const bird = {
    x: 50,
    y: canvas.height / 2,
    radius: 20,
    velocity: 0,
    gravity: 0.5,
    jumpForce: 8
};

let pipes = [];
const pipeWidth = 50;
const pipeGap = 150;
const pipeVelocity = 3;
let score = 0;

function drawBird() {
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

function drawPipe(x, gapY) {
    ctx.fillStyle = 'green';
    ctx.fillRect(x, 0, pipeWidth, gapY);
    ctx.fillRect(x, gapY + pipeGap, pipeWidth, canvas.height - gapY - pipeGap);
}

function generatePipe() {
    const gapY = Math.floor(Math.random() * (canvas.height - pipeGap));
    pipes.push({ x: canvas.width, gapY });
}

function movePipes() {
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].x -= pipeVelocity;
        if (pipes[i].x + pipeWidth < 0) {
            pipes.splice(i, 1);
            score++;
        }
    }
}

function checkCollision() {
    for (const pipe of pipes) {
        if (
            bird.x + bird.radius > pipe.x &&
            bird.x - bird.radius < pipe.x + pipeWidth &&
            (bird.y - bird.radius < pipe.gapY || bird.y + bird.radius > pipe.gapY + pipeGap)
        ) {
            return true;
        }
    }
    if (bird.y - bird.radius <= 0 || bird.y + bird.radius >= canvas.height) {
        return true;
    }
    return false;
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBird();
    for (const pipe of pipes) {
        drawPipe(pipe.x, pipe.gapY);
    }

    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (bird.y < 0) {
        bird.y = 0;
        bird.velocity = 0;
    }
    if (bird.y + bird.radius > canvas.height) {
        bird.y = canvas.height - bird.radius;
        bird.velocity = 0;
    }

    movePipes();
    if (checkCollision()) {
        alert('Game Over! Your score: ' + score);
        location.reload(); // Reload page to restart the game
    }

    requestAnimationFrame(update);
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        bird.velocity = -bird.jumpForce;
    }
});

setInterval(generatePipe, 2000); // Generate a new pipe every 2 seconds
update();