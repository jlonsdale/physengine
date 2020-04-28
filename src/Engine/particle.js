export default class Particle {
  constructor(xPos, yPos, colour, height, width) {
    //ball information
    this.radius = 10;
    this.mass = 0.5;
    this.colour = "red";

    //universe information
    this.g = 981;
    this.dt = 0.005;

    //canvas information
    this.height = height;
    this.width = width;

    //kinematic information
    this.xPos = xPos;
    this.yPos = yPos;
    this.yVel = 0;
    this.xVel = 0;
    this.xForce = 0;
    this.yForce = this.g * this.mass;

    //collision information
    this.cor = 0.4;

    //interactivity information
    this.selected = false;
  }

  velocity() {
    this.yVel += (this.yForce / this.mass) * this.dt;
    this.xVel += (this.xForce / this.mass) * this.dt;
  }

  friction() {
    this.xVel = this.xVel * 0.95;
  }

  force() {
    //  this is BS calculate force then split components sin/cos lololoo

    const forcePoint = [this.width / 2, this.height / 2];
    let xDistance = forcePoint[0] - this.xPos;
    const yDistance = forcePoint[1] - this.yPos;

    this.yForce = yDistance
      ? this.g * this.mass - (1 / Math.abs(yDistance)) * 10000
      : this.g * this.mass;

    if (xDistance === 0) {
    } else {
      xDistance < 0
        ? (this.xForce = (-1 / Math.abs(xDistance)) * 1000)
        : (this.xForce = (1 / Math.abs(xDistance)) * 1000);
    }

    if (Math.round(yDistance === 0)) {
    } else {
      yDistance < 0
        ? (this.yForce = this.g * this.mass + (1 / Math.abs(yDistance)) * 10000)
        : (this.yForce =
            this.g * this.mass - (1 / Math.abs(yDistance)) * 10000);
    }
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
      this.yForce = 0;
      this.xForce = 0;
      this.colour = "red";
      this.selected = false;
    }
  }

  position() {
    this.detectCollision();
    this.force();
    this.velocity();
    this.yPos += this.yVel * this.dt;
    this.xPos += this.xVel * this.dt;
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
