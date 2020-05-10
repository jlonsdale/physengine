import rk4 from "./rk4approx.js";

export default class Particle {
  constructor(xPos, yPos, colour, height, width) {
    //ball information
    this.radius = 10;
    this.mass = 5;
    this.colour = "red";

    //universe information
    this.g = 981;
    this.dt = 0.001;

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
    const rk4x = rk4(
      this.xPos,
      this.xVel,
      function (x, v, dt) {
        var stiffness = 400,
          damping = 0.25;
        return -stiffness * x - damping * v;
      },
      this.dt
    );
    const rk4y = rk4(
      this.yPos,
      this.yVel,
      function (x, v, dt) {
        var stiffness = 400,
          damping = 0.25;
        return -stiffness * (x/100) - damping * (v/100);
      },
      this.dt
    );
    console.log(this.yVel)
    this.yVel = rk4y[1];
  }

  acceleration() {}

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
    this.yPos += this.yVel * this.dt*100;
  }

  detectCollision() {
  }
}
