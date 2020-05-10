import rk4 from "./rk4approx.js";

export default class Particle {
  constructor(xPos, yPos, colour, height, width) {
    //ball information
    this.radius = 10;
    this.mass = 5;
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
    this.acc = [0, 0];

    this.xForce = 0;
    this.yForce = (this.mass * this.g) / 100;
    this.dXForce = 0;
    this.dYForce = 0;

    //collision information
    this.cor = 0.4;
    this.floorContact = false;
    this.wallContact = false;

    //interactivity information
    this.selected = false;
  }

  velocity() {
    this.acceleration();
    this.yVel += this.acc[1] * this.dt;
  }

  acceleration() {
    this.acc[0] = this.xForce / this.mass;
    this.acc[1] = this.yForce / this.mass;
  }

  forceDifference() {
    const currentYforce = this.yForce;
    if (currentYforce !== this.yForce) {
      this.dYForce = this.yForce - currentYforce;
    } else {
      this.dYForce = 0;
    }
  }

  position() {
    this.detectCollision();
    this.velocity();
    this.yPos += this.yVel * this.dt * 100;
  }

  detectCollision() {
    if (this.yPos + this.radius > this.height) {
      console.log('here')
      this.yPos = this.height - this.radius;
      this.yVel=this.yVel*(-1)
      this.yForce -= (this.mass * this.g) / 100;
    }
    if (this.yPos - this.radius < 0) {
      this.yPos = this.radius;
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
