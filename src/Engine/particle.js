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
    this.xTotalForce = 0;

    //collision information
    this.cor = 0.3;
    this.airResistance = 0.1;
    this.cof = 0.1;

    //interactivity information
    this.selected = false;

    //electric fields
    this.electricField = false;
    this.eStrength = 0;
    this.ePositiveBar = { x1: 0, y1: 0, x2: 0, y2: 0 };
    this.eNegativeBar = { x1: 0, y1: 0, x2: 0, y2: 0 };
  }

  updateCor(value) {
    this.cor = value;
  }

  updateCof(value) {
    this.cof = value;
  }

  updateAirRes(value) {
    this.airResistance = value;
  }

  yForce() {
    const mass = this.mass;
    const normalForce =
      this.yPos + this.radius > this.height ? mass * this.g : 0;
    const friction = this.friction(this.yVel, this.airResistance);
    const gravity = mass * this.g;
    return function (x, v, dt) {
      return (gravity - normalForce + friction * v * v) / mass;
    };
  }

  xForce() {
    const mass = this.mass;
    const force = this.friction(this.xVel, this.cof);
    return function (x, v, dt) {
      return force / mass;
    };
  }

  select() {
    this.selected ? (this.selected = false) : (this.selected = true);
    this.selected ? (this.colour = "white") : (this.colour = "red");
  }

  throw(x1, x2, y1, y2) {
    this.select();
    this.xPos = x2;
    this.yPos = y2;
    this.xVel = x1 - x2;
    this.yVel = y1 - y2;
  }

  drop(x1, y1) {
    this.select();
    this.xPos = x1;
    this.yPos = y1;
    this.xVel = 0;
    this.yVel = 0;
  }

  friction(v, frictionalConstant) {
    if (v === 0) {
      return 0;
    } else if (v < 0) {
      return frictionalConstant;
    } else {
      return -frictionalConstant;
    }
  }

  calculateKinematics() {
    this.detectCollision();
    var times = 3;
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
    }
    if (this.xPos + this.radius > this.width) {
      Math.abs(this.xVel / 100) > 0.5
        ? (this.xVel = -this.xVel * this.cor)
        : (this.xVel = 0);
      this.xPos = this.width - this.radius;
    }
    if (this.xPos < this.radius) {
      Math.abs(this.xVel / 100) > 0.5
        ? (this.xVel = -this.xVel * this.cor)
        : (this.xVel = 0);
      this.xPos = this.radius;
    }
  }
}
