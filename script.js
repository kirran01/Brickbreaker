console.log("god is good");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 500;
let intervalId;
let scoreElement = document.getElementById("score");
let scoreValue = 0;
let winOrLoseElement = document.getElementById("win-or-lose");
let winOrLose = "";
let hitMarkerElement = document.getElementById("hitmarker");

class Rectangle {
  // class for bricks and paddle
  constructor(xpos, ypos, width, height) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = width;
    this.height = height;
  }

  rectMoveLeft() {
    if (this.xpos > 0) {
      this.xpos -= 20;
    }
  }

  rectMoveRight() {
    if (this.xpos + this.width < canvas.width) {
      this.xpos += 20;
    }
  }

  drawRect() {
    ctx.fillRect(this.xpos, this.ypos, this.width, this.height);
  }
}

class Circle {
  //class for the ball
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

  // bottomBrickCollision(Rectangle) {
  //   if (
  //     this.xpos < Rectangle.xpos + Rectangle.width &&
  //     this.xpos + this.width > Rectangle.xpos &&
  //     this.ypos == Rectangle.ypos + Rectangle.height &&
  //     this.ypos + this.height > Rectangle.ypos
  //   ) {
  //     console.log("bottom brick hit");
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

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

let ballSpeedY = 3;
let ballSpeedX = Math.floor(Math.random() * (3 - -3) + -3);
if (ballSpeedX === 0) {
  ballSpeedX += 1;
}
const Paddle = new Rectangle(canvas.width / 2 - 40, canvas.height - 20, 80, 20);
const Ball = new Circle(
  canvas.width / 2,
  canvas.height - 50,
  20,
  20,
  ballSpeedX,
  -ballSpeedY
);

let clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

window.addEventListener("keydown", (e) => {
  //controls for paddle
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
  //create grid of bricks
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
  console.log(Ball.speedy);
  console.log(Ball.speedx, "x");
  clearCanvas();
  Paddle.drawRect();
  Ball.moveBall();
  Ball.drawCircle();

  for (let i = 0; i < brickStorage.length; i++) {
    // brick collision
    for (let j = 0; j < brickStorage[i].length; j++) {
      brickStorage[i][j].drawRect();
      if (Ball.rectangleCollision(brickStorage[i][j])) {
        if (Ball.speedy == -3) {
          Ball.speedy *= -1;
        } else {
          Ball.speedx *= -1;
        }
        hitMarkerElement.play();
        brickStorage[i].splice([j], 1);
        scoreValue++;
        scoreElement.innerHTML = scoreValue;
      }
    }
  }
  if (scoreValue == 39) {
    //win condition
    winOrLose = "You Win";
    winOrLoseElement.innerHTML = winOrLose;
    clearInterval(intervalId);
  }
  if (Ball.rectangleCollision(Paddle)) {
    if (
      Ball.speedx > 0 &&
      Ball.xpos + Ball.width < Paddle.xpos + Paddle.width / 2 - 10
    ) {
      Ball.speedx *= -1;
    } else if (
      Ball.speedx < 0 &&
      Ball.xpos > Paddle.xpos + Paddle.width / 2 + 10
    ) {
      Ball.speedx *= -1;
    } else {
      Ball.speedy *= -1;
    }
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
    //lose condition
    winOrLose = "Game Over";
    winOrLoseElement.innerHTML = winOrLose;
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
