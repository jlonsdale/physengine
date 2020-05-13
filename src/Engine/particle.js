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
    const mass = this.mass;
    // let friction = this.yVel>0 ? -0.1 : 0.1
    let friction = 0;
    let normalForce = 0;
    let gravity = mass * this.g;
    if (this.yPos + this.radius > this.height) {
      console.log('bloop')
      this.yPos = this.height - this.radius;
      this.yVel = -this.yVel * this.cor;
    }
    return function (x, v, dt) {
      return (gravity - normalForce + friction * v * v) / mass;
    };
  }

  calculateKinematics() {
    let acc = this.force();
    let rk4y = rk4(this.yPos / 100, this.yVel / 100, acc, this.dt);
    this.yPos = rk4y[0] * 100;
    this.yVel = rk4y[1] * 100;
    rk4y = rk4(this.yPos / 100, this.yVel / 100, acc, this.dt);
    this.yPos = rk4y[0] * 100;
    this.yVel = rk4y[1] * 100;
    rk4y = rk4(this.yPos / 100, this.yVel / 100, acc, this.dt);
    this.yPos = rk4y[0] * 100;
    this.yVel = rk4y[1] * 100;
  }

  detectCollision() {}
}
