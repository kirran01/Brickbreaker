console.log("god is good");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 500;
let intervalId;

class Rectangle {
  constructor(xpos, ypos, width, height) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = width;
    this.height = height;
  }

  rectMoveLeft() {
    this.xpos -= 10;
  }

  rectMoveRight() {
    this.xpos += 10;
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
      console.log("collided with rect");
      return true;
    } else {
      return false;
    }
  }

  roofCollision() {
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

const Ball = new Circle(canvas.width / 2, canvas.height - 50, 20, 20, 5, -5);

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
let animationLoop = () => {
  // console.log(frameCount);
  frameCount++;
  clearCanvas();
  Paddle.drawRect();
  Ball.moveBall();
  Ball.drawCircle();

  if (Ball.rectangleCollision(Paddle)) {
    Ball.speedy *= -1;
  }

  if (Ball.bottomWallCollision(Ball)) {
    clearInterval(intervalId);
  }

  if (Ball.roofCollision(Ball)) {
    Ball.speedy *= -1;
  }

  if (Ball.leftWallCollision(Ball)) {
    Ball.speedx *= -1;
  }

  if (Ball.rightWallCollision(Ball)) {
    Ball.speedx *= -1;
  }
};

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function startGame() {
    intervalId = setInterval(animationLoop, 75);
  }
};
