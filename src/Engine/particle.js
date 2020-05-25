import rk4 from "./rk4approx.js";

export default class Particle {
  constructor(xPos, yPos, colour, height, width) {
    //ball information
    this.radius = 10;
    this.mass = 1;
    this.colour = "red";

    //universe information
    this.g = 9.81;
    this.dt = 0.001;

    //canvas information
    this.height = height;
    this.width = width;

    //kinematic information
    this.xPos = xPos;
    this.yPos = yPos;
    this.yVel = 0;
    this.xVel = 0;

    //collision information
    this.cor = 0.8;
    this.cof = 0.2;

    //interactivity information
    this.selected = false;
  }

  click(x, y) {
    this.stopped = false;
    this.selected ? (this.selected = false) : (this.selected = true);
    this.colour = this.selected ? "white" : "red";
    this.stopped = false;
    this.xPos = x;
    this.yPos = y;
    this.yVel = 0;
    this.xVel = 0;
  }

  force() {
    const mass = this.mass;
    let normalForce = this.yPos + this.radius > this.height ? mass * this.g : 0;
    let friction = this.friction(this.yVel);
    let gravity = mass * this.g;
    return function (x, v, dt) {
      return (gravity - normalForce + friction * v * v) / mass;
    };
  }

  friction(v) {
    switch (v) {
      case v === 0:
        return 0;
      case v > 0:
        return this.cof;
      default:
        return -this.cof;
    }
  }

  calculateKinematics() {
    this.detectCollision();

    let acc = this.force();
    var times = 5;
    for (var i = 0; i < times; i++) {
      let rk4y = rk4(this.yPos / 100, this.yVel / 100, acc, this.dt);
      this.yPos = rk4y[0] * 100;
      this.yVel = rk4y[1] * 100;
    }
  }

  detectCollision() {
    if (this.yPos + this.radius > this.height) {
      Math.abs(this.yVel / 100) > 0.5
        ? (this.yVel = -this.yVel * this.cor)
        : (this.yVel = 0);
      this.yPos = this.height - this.radius;
    } else if (this.yPos + this.radius > this.height) {
      this.yPos = this.radius;
      this.yVel = -this.yVel * this.cor;
    } else {
    }
  }
}
