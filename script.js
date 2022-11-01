console.log("god is good");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 500;
let intervalId;
let scoreElement = document.getElementById("score");
let scoreValue = 0;

class Rectangle {
  constructor(xpos, ypos, width, height) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = width;
    this.height = height;
  }

  rectMoveLeft() {
    if (this.xpos > 0) {
      this.xpos -= 15;
    }
  }

  rectMoveRight() {
    if (this.xpos + this.width < canvas.width) {
      this.xpos += 15;
    }
  }

  drawRect() {
    ctx.fillRect(this.xpos, this.ypos, this.width, this.height);
  }
}

class Circle {
  constructor(xpos, ypos, width, height, speedx, speedy) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = width;
    this.height = height;
    this.speedy = speedy;
    this.speedx = speedx;
  }
  drawCircle() {
    ctx.fillRect(this.xpos, this.ypos, this.width, this.height);
  }

  moveBall() {
    this.ypos += this.speedy;
    this.xpos += this.speedx;
  }

  rectangleCollision(Rectangle) {
    if (
      this.xpos < Rectangle.xpos + Rectangle.width &&
      this.xpos + this.width > Rectangle.xpos &&
      this.ypos < Rectangle.ypos + Rectangle.height &&
      this.ypos + this.height > Rectangle.ypos
    ) {
      return true;
    } else {
      return false;
    }
  }

  topWallCollision() {
    if (this.ypos < 0) {
      return true;
    } else {
      return false;
    }
  }

  rightWallCollision() {
    if (this.xpos + this.width > canvas.width) {
      return true;
    } else {
      return false;
    }
  }

  leftWallCollision() {
    if (this.xpos < 0) {
      return true;
    } else {
      return false;
    }
  }

  bottomWallCollision() {
    if (this.ypos + this.width > canvas.height) {
      return true;
    } else {
      return false;
    }
  }
}

const Paddle = new Rectangle(canvas.width / 2 - 40, canvas.height - 20, 80, 20);

const Ball = new Circle(canvas.width / 2, canvas.height - 50, 20, 20, 2, -2);

let clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowLeft":
      Paddle.rectMoveLeft();
      break;

    case "ArrowRight":
      Paddle.rectMoveRight();
      break;
  }
});

let frameCount = 0;
let brickStorage = [];
let row1BrickStorage = [];
let row2BrickStorage = [];
let row3BrickStorage = [];

for (let i = 0; i <= 12; i++) {
  //create grid
  const BrickRow1 = new Rectangle(50 * i + 30, 10, 40, 40);
  const BrickRow2 = new Rectangle(50 * i + 30, 60, 40, 40);
  const BrickRow3 = new Rectangle(50 * i + 30, 110, 40, 40);
  row1BrickStorage.push(BrickRow1);
  row2BrickStorage.push(BrickRow2);
  row3BrickStorage.push(BrickRow3);
}

brickStorage.push(row1BrickStorage);
brickStorage.push(row2BrickStorage);
brickStorage.push(row3BrickStorage);

let animationLoop = () => {
  clearCanvas();
  Paddle.drawRect();
  Ball.moveBall();
  Ball.drawCircle();

  for (let i = 0; i < brickStorage.length; i++) {
    for (let j = 0; j < brickStorage[i].length; j++) {
      brickStorage[i][j].drawRect();
      if (Ball.rectangleCollision(brickStorage[i][j])) {
        Ball.speedy *= -1;
        brickStorage[i].splice([j], 1);
        scoreValue++;
        console.log(brickStorage[i][j]);
        scoreElement.innerHTML = scoreValue;
      }
    }
  }

  if (Ball.rectangleCollision(Paddle)) {
    Ball.speedy *= -1;
  }
  if (Ball.topWallCollision(Ball)) {
    Ball.speedy *= -1;
  }

  if (Ball.leftWallCollision(Ball)) {
    Ball.speedx *= -1;
  }

  if (Ball.rightWallCollision(Ball)) {
    Ball.speedx *= -1;
  }

  if (Ball.bottomWallCollision(Ball)) {
    clearInterval(intervalId);
  }
};

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function startGame() {
    intervalId = setInterval(animationLoop, 16);
  }
};
