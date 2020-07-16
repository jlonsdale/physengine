import Particle from "./particle.js";

export default class Engine {
  constructor(ctx, height, width) {
    this.engineViewState = null;
    this.pendingThrow = false;

    this.ctx = ctx;

    this.height = height;
    this.width = width;

    this.particle = new Particle(width / 2, 200, "red", height, width);

    this.electricFieldActive = false;
    this.particleCharge = 1;
    this.efield = {
      x1: 300,
      x2: 500,
      y1: 100,
      y2: 300,
    };
  }

  //////////////////////
  /// electric field ///
  //////////////////////

  toggleElectricField(bool) {
    this.electricFieldActive = bool;
  }

  updateCharge(charge) {
    this.particleCharge = charge;
  }

  canvasArrow = (ctx, x1, y1, x2, y2) => {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ff0000";
    ctx.beginPath();
    const tipLength = 10;
    const dx = x2 - x1;
    const dy = y2 - y1;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(
      x2 - tipLength * Math.cos(Math.atan2(dy, dx) - Math.PI / 6),
      y2 - tipLength * Math.sin(Math.atan2(dy, dx) - Math.PI / 6)
    );
    ctx.moveTo(x2, y2);
    ctx.lineTo(
      x2 - tipLength * Math.cos(Math.atan2(dy, dx) + Math.PI / 6),
      y2 - tipLength * Math.sin(Math.atan2(dy, dx) + Math.PI / 6)
    );
    ctx.stroke();
  };

  isWithinBounds(x, y) {
    const inBounds =
      Math.sqrt(
        (this.particle.xPos - x) * (this.particle.xPos - x) +
          (this.particle.yPos - y) * (this.particle.yPos - y)
      ) < this.particle.radius;
    return inBounds;
  }

  handleSelect() {
    this.togglePendingThrow(false);
    this.particle.select();
  }

  togglePendingThrow(bool) {
    this.pendingThrow = bool;
  }
  handleThrow(x1, x2, y1, y2) {
    this.particle.throw(x1, x2, y1, y2);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.height * 2, this.width * 2);
    if (this.engineViewState && this.engineViewState.spacePressed) {
      this.canvasArrow(
        this.ctx,
        this.engineViewState.x1,
        this.engineViewState.y1,
        this.engineViewState.mouseX,
        this.engineViewState.mouseY
      );
    }
    this.particle.calculateKinematics();
    this.drawBall(this.ctx, this.particle.xPos, this.particle.yPos);
    this.drawField(this.ctx);
  }

  //method to update env variables
  updateEnvConditions(type, val) {
    switch (type) {
      case "cof":
        this.particle.updateCof(val);
        break;
      case "cor":
        this.particle.updateCor(val);
        break;
      case "airRes":
        this.particle.updateAirRes(val);
        break;
      default:
    }
  }

  drawField(ctx) {
    ctx.lineWidth = 15;
    ctx.fillStyle = "yellow";
    if (this.electricFieldActive) {
      const { x1, x2, y1, y2 } = this.efield;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y1);
      ctx.moveTo(x1, y2);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      this.canvasArrow(ctx, x1, y1, x1, y2);
    }
  }

  drawParticleCharge(ctx, x, y) {
    if (this.electricFieldActive && !this.particle.selected) {
      ctx.strokeStyle = "yellow";
      ctx.font = "30px Arial";
      this.particleCharge === 1
        ? ctx.fillText(
            "-",
            x - 0.6 * this.particle.radius,
            y + 0.8 * this.particle.radius
          )
        : ctx.fillText(
            "+",
            x - 0.9 * this.particle.radius,
            y + 1 * this.particle.radius
          );
    }
  }

  drawBall(ctx, x, y) {
    ctx.lineWidth = 1;
    ctx.beginPath();
    const engineViewState = this.engineViewState;
    if (this.particle.selected) {
      engineViewState.spacePressed || this.pendingThrow
        ? ctx.arc(
            engineViewState.x1,
            engineViewState.y1,
            this.particle.radius,
            0,
            Math.PI * 2
          )
        : ctx.arc(
            engineViewState.mouseX,
            engineViewState.mouseY,
            this.particle.radius,
            0,
            Math.PI * 2
          );
    } else {
      ctx.arc(x, y, this.particle.radius, 0, Math.PI * 2);
    }
    ctx.fillStyle = this.particle.colour;
    ctx.fill();
    ctx.closePath();
    this.drawParticleCharge(ctx, x, y);
  }
}
