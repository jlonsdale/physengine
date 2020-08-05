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
    this.cof = 0.3;

    //interactivity information
    this.selected = false;

    //electric fields
    this.eFieldStrength = 10;
    this.efieldActive = false;
    this.particleCharge = null;
    this.efield = {
      tl: { x: null, y: null },
      tr: { x: null, y: null },
      bl: { x: null, y: null },
      br: { x: null, y: null },
    };
  }

  ////////////////////////////
  // electric field methods //
  ////////////////////////////

  setField(tl_x, tl_y, tr_x, tr_y, bl_x, bl_y, br_x, br_y, particleCharge) {
    this.efield = {
      tl: { x: tl_x, y: tl_y },
      tr: { x: tr_x, y: tr_y },
      bl: { x: bl_x, y: bl_y },
      br: { x: br_x, y: br_y },
    };
    this.particleCharge = particleCharge;
  }

  inEField() {
    const { tl, tr, bl } = this.efield;
    if (this.efieldActive) {
      if (
        this.xPos > tl.x &&
        this.xPos < tr.x &&
        this.yPos < bl.y &&
        this.yPos > tl.y
      ) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  }

  toggleElectricField(bool) {
    this.efieldActive = bool;
  }

  updateParticleCharge(value) {
    this.particleCharge = value;
  }

  updateEFieldStrength(value) {
    this.eFieldStrength = value;
  }

  ////////////////////////////
  ////////////////////////////

  updateCor(value) {
    this.cor = value;
  }

  updateCof(value) {
    this.cof = value;
  }

  updateAirRes(value) {
    this.airResistance = value;
  }

  updateMass(value) {
    this.mass = value;
  }

  yForce() {
    let eForce = this.inEField()
      ? this.eFieldStrength * this.particleCharge
      : null;
    const mass = this.mass;
    const normalForce =
      this.yPos + this.radius > this.height ? mass * this.g : 0;
    const friction = this.friction(this.yVel, this.airResistance);
    const gravity = mass * this.g;
    return function (x, v, dt) {
      return (gravity - normalForce + friction * v * v + eForce) / mass;
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
