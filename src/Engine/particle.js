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
    this.cor = 0.2;
    this.cof = 0.2;

    //interactivity information
    this.selected = false;
  }

  yForce() {
    const mass = this.mass;
    let normalForce = this.yPos + this.radius > this.height ? mass * this.g : 0;
    let friction = this.friction(this.yVel);
    let gravity = mass * this.g;
    return function (x, v, dt) {
      return (gravity - normalForce + friction * v * v) / mass;
    };
  }

  xForce() {
    return function (x, v, dt) {
      return 0;
    };
  }

  select() {
    this.selected ? (this.selected = false) : (this.selected = true);
  }

  throw(x1, x2, y1, y2, time) {
    this.select();
    this.xPos = x2;
    this.yPos = y2;
    this.xVel = (x2 - x1) / time;
    this.yVel = (y2 - y1) / time;
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
    var times = 5;
    for (var i = 0; i < times; i++) {
      let rk4y = rk4(this.yPos / 100, this.yVel / 100, this.yForce(), this.dt);
      this.yPos = rk4y[0] * 100;
      this.yVel = rk4y[1] * 100;
    }
    for (var j = 0; j < times; j++) {
      let rk4x = rk4(this.xPos / 100, this.xVel / 100, this.xForce(), this.dt);
      this.xPos = rk4x[0] * 100;
      this.xVel = rk4x[1] * 100;
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
