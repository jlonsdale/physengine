export default class Particle {
  constructor(xPos, yPos, colour, height, width) {
    //ball information
    this.radius = 10;
    this.mass = 0.5;
    this.colour = "red";

    //canvas information
    this.height = height;
    this.width = width;

    //kinematic information
    this.xPos = xPos;
    this.yPos = yPos;
    this.yVel = 0;
    this.xVel = 0;

    //collision information
    this.cor = 0.6;

    //universe information
    this.g = 9.81;
    this.dt = 0.05;

    //interactivity information
    this.selected = false;
  }

  velocity() {
    this.yVel += this.g * this.dt;
  }

  click(x, y) {
    if (Math.sqrt((x - this.xPos) ** 2 + (y - this.yPos) ** 2) <= this.radius) {
      this.colour = "white";
      this.selected = true;
    } else if (this.selected === true) {
      this.xPos = x;
      this.yPos = y;
      this.yVel = 0;
      this.xVel = 0;
      this.colour = "red";
      this.selected = false;
    }
  }

  position() {
    this.detectCollision();
    this.velocity();
    this.yPos += this.yVel * this.dt;
  }

  detectCollision() {
    if (this.yPos + this.radius > this.height) {
      this.yPos = this.height - this.radius;
      this.yVel = -this.yVel * this.cor;
    }
    if (this.yPos - this.radius < 0) {
      this.yPos = this.radius;
      this.yVel = -this.yVel * this.cor;
    }
    if (this.xPos + this.radius > this.width) {
      this.xPos = this.width - this.radius;
      this.xVel = -this.xVel * this.cor;
    }
    if (this.xPos - this.radius < 0) {
      this.xPos = this.radius;
      this.xVel = -this.xVel * this.cor;
    }
  }
}
