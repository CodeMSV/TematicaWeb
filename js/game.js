"use strict";

// Get canvas and rendering context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Adjust canvas to fill the window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Load images for background, player, and enemy
const bgImg = new Image();
const birdImg = new Image();
const enemyImg = new Image();

bgImg.src = "../img/backgroundtile.webp";
birdImg.src = "../img/ppg-flying.gif";
enemyImg.src = "../img/mojo-jojo-enemy.gif";

let imagesLoaded = 0;
const totalImages = 3;

// Enable start button once all assets are ready
function checkAllLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    document.getElementById("startButton").disabled = false;
    document.getElementById("startButton").innerText = "Start";
    document.getElementById(
      "menu"
    ).style.backgroundImage = `url('${bgImg.src}')`;
  }
}

// Track image loading
bgImg.onload = checkAllLoaded;
birdImg.onload = checkAllLoaded;
enemyImg.onload = checkAllLoaded;

// Physics constants for bird movement
const gravity = 0.3; 
const lift = -6; 
let gameOver = false;
let score = 0;
let startTime = null;
let frames = 0;
let enemies = [];

// Background scrolling offsets and speed
let bgX1 = 0;
let bgX2 = 0;
let bgScrollSpeed = 10;

// Initialize second background image position once loaded
bgImg.onload = () => {
  bgX2 = bgImg.width;
  checkAllLoaded();
};

// Draw two tiled background images for continuous scroll
function drawScrollingBackground() {
  bgX1 -= bgScrollSpeed;
  bgX2 -= bgScrollSpeed;

  if (bgX1 + bgImg.width <= 0) bgX1 = bgX2 + bgImg.width;
  if (bgX2 + bgImg.width <= 0) bgX2 = bgX1 + bgImg.width;

  ctx.drawImage(bgImg, bgX1, 0, bgImg.width, canvas.height);
  ctx.drawImage(bgImg, bgX2, 0, bgImg.width, canvas.height);
}

// Define bird (player) properties and behaviors
let bird = {
  x: 100,
  y: 200,
  width: 110,
  height: 110,
  velocity: 0,
  update() {
    this.velocity += gravity;
    this.y += this.velocity;
    // Check for collision with top/bottom bounds
    if (this.y + this.height > canvas.height || this.y < 0) {
      endGame();
    }
  },
  draw() {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(Math.PI / 2);
    ctx.drawImage(
      birdImg,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  },
  flap() {
    // Apply upward force
    this.velocity = lift;
  },
};

// Enemy class: spawns offscreen and oscillates vertically
class Enemy {
  constructor() {
    this.x = canvas.width + Math.random() * 400;
    this.baseY = Math.random() * (canvas.height - 200) + 100;
    this.y = this.baseY;
    this.w = 70;
    this.h = 70;
    this.speed = 3.5;
    this.angle = Math.random() * Math.PI * 2;
    this.amplitude = 30;
  }

  update() {
    this.x -= this.speed;
    this.angle += 0.05;
    // Oscillate around baseY
    this.y = this.baseY + Math.sin(this.angle) * this.amplitude;
  }

  draw() {
    ctx.drawImage(enemyImg, this.x, this.y, this.w, this.h);
  }

  hits(bird) {
    const bx = bird.x,
      by = bird.y,
      bw = bird.width,
      bh = bird.height;
    // Axis-aligned bounding box collision check
    return (
      bx < this.x + this.w &&
      bx + bw > this.x &&
      by < this.y + this.h &&
      by + bh > this.y
    );
  }
}

// Main game loop: update, draw, spawn enemies, check collisions
function updateGame() {
  if (gameOver) return;

  drawScrollingBackground();
  bird.update();
  bird.draw();

  // Spawn a new enemy every 160 frames
  if (frames % 160 === 0) {
    enemies.push(new Enemy());
  }

  // Update and render each enemy
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].update();
    enemies[i].draw();

    if (enemies[i].hits(bird)) {
      endGame();
    }

    // Remove offscreen enemies to free memory
    if (enemies[i].x + enemies[i].w < 0) {
      enemies.splice(i, 1);
    }
  }

  // Update score based on elapsed time
  score = (Date.now() - startTime) / 1000;
  ctx.font = "20px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("Tiempo: " + Math.floor(score) + "s", 20, 100);

  frames++;
  requestAnimationFrame(updateGame);
}

// Initialize game state and hide menus
function startGame() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("gameOver").style.display = "none";
  gameOver = false;
  score = 0;
  frames = 0;
  enemies = [];
  bird.y = canvas.height / 2;
  bird.velocity = 0;
  startTime = Date.now();
  updateGame();
}

// Display game over UI and final score
function endGame() {
  gameOver = true;
  document.getElementById("gameOver").style.display = "flex";
  document.getElementById("finalScore").innerText = `Tiempo: ${Math.floor(score)}s`;
  document.getElementById("finalScore").style.color = "#FF69B4";
  document.getElementById("finalScore").style.fontFamily = "'Powerpuff Girls', sans-serif";
  document.getElementById("finalScore").style.fontSize = "28px";
  document.getElementById("finalScore").style.textShadow = "2px 2px 4px black";
}

function restartGame() {
  startGame();
}

function exitGame() {
  window.location.href = "../index.html";
}

// User input: flap on space, click, or touch
window.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") bird.flap();
});

window.addEventListener("click", () => bird.flap());
window.addEventListener("touchstart", () => bird.flap());

document.getElementById("startButton").addEventListener("click", startGame);