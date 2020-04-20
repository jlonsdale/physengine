export default class Particle {
  constructor(xPos, yPos, colour, height, width) {
    //ball information
    this.radius = 5;
    this.mass = 0.5;
    this.colour = "white";

    //canvas information
    this.height = height;
    this.width = width;

    //kinematic information
    this.xPos = xPos;
    this.yPos = yPos;
    this.yVel = 0;
    this.xVel = 0;
    this.goingDown = true;

    //collision information
    this.cor = 0.6;

    //universe information
    this.g = 9.81;
    this.dt = 0.1;
  }

  velocity() {
    this.yVel += this.g * this.dt;
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
      this.xDirection = "left";
      this.xPos = this.width - this.radius;
      this.xVel = -this.xVel * this.cor;
    }
    if (this.xPos - this.radius < 0) {
      this.xDirection = "right";
      this.xPos = this.radius;
      this.xVel = -this.xVel * this.cor;
    }
  }
}
