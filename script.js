console.log("god is good");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 500;
let intervalId;

// ctx.strokeStyle = 'green'; // !

class Rectangle {
  constructor(xpos, ypos, width, height) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = width;
    this.height = height;
  }

  rectMoveLeft() {
    this.xpos -= 5;
  }

  rectMoveRight() {
    this.xpos += 5;
  }

  drawRect() {
    ctx.fillRect(this.xpos, this.ypos, this.width, this.height);
  }
}

class Circle {
  constructor(xpos, ypos, radius, startAngle, endAngle) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
  }
  drawCircle() {
    ctx.arc(this.xpos, this.ypos, this.radius, this.startAngle, this.endAngle); // ctx.arc(150, 170, 75, 0, Math.PI * 2) example circle
    ctx.lineWidth = 20;
    ctx.stroke();
    ctx.fill();
  }
}

const Paddle = new Rectangle(canvas.width / 2 - 40, canvas.height - 20, 80, 20);
Paddle.drawRect();

const Ball = new Circle(
  canvas.width / 2,
  canvas.height - 34,
  4,
  0,
  Math.PI * 2
);
Ball.drawCircle();

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
  frameCount++;
  ctx.context.clearRect(0, 0, canvas.width, height);
  
};

setInterval(animationLoop, 16);
