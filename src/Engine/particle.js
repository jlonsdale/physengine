import rk4 from "./rk4approx.js";

export default class Particle {
  constructor(xPos, yPos, colour, height, width) {
    //ball information
    this.radius = 10;
    this.mass = 0.5;
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

    //interactivity information
    this.selected = false;
    this.stopped = false;
  }

  force() {
    this.detectCollision();
    const mass = this.mass;
    let friction = this.yVel > 0 ? -0.1 : 0.1;
    let normalForce = 0;
    let gravity = mass * this.g;
    return function (x, v, dt) {
      return (gravity - normalForce + friction * v * v) / mass;
    };
  }

  calculateKinematics() {
    if (this.stopped) {
      this.yVel = 0
    }
    else {
    let acc = this.force();
    var times = 4;
    for (var i = 0; i < times; i++) {
      let rk4y = rk4(this.yPos / 100, this.yVel / 100, acc, this.dt);
      this.yPos = rk4y[0] * 100;
      this.yVel = rk4y[1] * 100;
    }
  }
  } 

  detectCollision() {
    if (this.yPos + this.radius > this.height) {
      this.yPos = this.height - this.radius;
      Math.abs(this.yVel/100)>0.5 ? this.yVel = -this.yVel * this.cor : this.stopped = true;
    }
    else if (this.yPos + this.radius > this.height) {
      this.yPos = this.radius;
      this.yVel = -this.yVel * this.cor;
    }
    else {
    }
  }
}
