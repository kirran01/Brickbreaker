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
  constructor(xpos, ypos, width, height, speed) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }
  drawCircle() {
    //old circle logic:
    // ctx.beginPath()
    // ctx.arc(this.xpos, this.ypos, this.radius, this.startAngle, this.endAngle); // ctx.arc(150, 170, 75, 0, Math.PI * 2) example circle
    // ctx.lineWidth = 20;
    // ctx.stroke();
    // ctx.fill();
    // ctx.closePath()
    ctx.fillRect(this.xpos, this.ypos, this.width, this.height);
  }

  moveBall() {
    this.ypos += this.speed;
    // this.xpos += this.speed;
  }

  roofCollision() {
    if (this.ypos < 0) {
      return true;
    } else {
      return false;
    }
  }
}

const Paddle = new Rectangle(canvas.width / 2 - 40, canvas.height - 20, 80, 20);

const Ball = new Circle(canvas.width / 2, canvas.height - 34, 20, 20, -5);

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
  if (Ball.roofCollision(Ball)) {
    Ball.speed *= -1;
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
