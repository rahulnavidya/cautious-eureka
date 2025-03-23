let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let currentGame = null;

function loadGame(game) {
    if (currentGame) {
        clearInterval(currentGame);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (game === 'pong') {
        currentGame = setInterval(pongGame, 10);
    } else if (game === 'snake') {
        currentGame = setInterval(snakeGame, 100);
    } else if (game === 'space-invaders') {
        alert("Space Invaders is not implemented yet!");
    }
}

// Pong Game
let paddleHeight = 75;
let paddleWidth = 10;
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2;
let dy = -2;
let paddleY = (canvas.height - paddleHeight) / 2;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(0, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function pongGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
        dy = -dy;
    }

    if (x + dx < ballRadius + paddleWidth && y > paddleY && y < paddleY + paddleHeight) {
        dx = -dx;
    } else if (x + dx > canvas.width - ballRadius) {
        alert("Game Over");
        clearInterval(currentGame);
    }

    x += dx;
    y += dy;
}

// Snake Game
let snake = [{ x: 10, y: 10 }];
let snakeLength = 5;
let direction = 'RIGHT';
let food = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 };

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen';
        ctx.fillRect(snake[i].x, snake[i].y, 20, 20);
        ctx.strokeStyle = 'darkgreen';
        ctx.stroke