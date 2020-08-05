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
    this.particleCharge = -1;
    this.eFieldStrength = this.particle ? this.particle.eFieldStrength : null;
    this.efield = {
      tl: { x: 300, y: 200 },
      tr: { x: 500, y: 200 },
      bl: { x: 300, y: 400 },
      br: { x: 500, y: 400 },
    };
  }

  //////////////////////
  /// electric field ///
  //////////////////////

  toggleElectricField(bool) {
    this.electricFieldActive = bool;
    this.particle.toggleElectricField(bool);
  }

  updateCharge(charge) {
    this.particleCharge = charge;
    this.particle.updateParticleCharge(charge);
  }

  updateEFieldStrength(value) {
    this.eFieldStrength = value;
    this.particle.updateEFieldStrength(value);
  }

  drawField(ctx) {
    ctx.lineWidth = 15;
    ctx.strokeStyle = "yellow";
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    if (this.electricFieldActive) {
      const { tl, tr, bl, br } = this.efield;
      this.particle.setField(
        tl.x,
        tl.y,
        tr.x,
        tr.y,
        bl.x,
        bl.y,
        br.x,
        br.y,
        this.particleCharge
      );

      ctx.beginPath();
      ctx.moveTo(tl.x, tl.y);
      ctx.lineTo(tr.x, tr.y);
      ctx.moveTo(bl.x, bl.y);
      ctx.lineTo(br.x, br.y);
      ctx.stroke();
      ctx.closePath();
      ctx.fillText("+ + + + + + + +", tl.x, tl.y + 11);
      ctx.fillText("- - - - - - - - - - - - ", tl.x + 3, bl.y + 8);
    }
  }

  drawParticleCharge(ctx, x, y) {
    ctx.fillStyle = "yellow";
    ctx.font = "30px Arial";
    if (this.electricFieldActive && !this.particle.selected) {
      this.particleCharge === -1
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

  ///////////////////////////////////////////////////////////////

  canvasArrow = (ctx, x1, y1, x2, y2) => {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";
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
    ctx.closePath();
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
    this.particle.calculateKinematics();
    this.drawBall(this.ctx, this.particle.xPos, this.particle.yPos);
    this.drawField(this.ctx);
    if (this.engineViewState && this.engineViewState.spacePressed) {
      this.canvasArrow(
        this.ctx,
        this.engineViewState.x1,
        this.engineViewState.y1,
        this.engineViewState.mouseX,
        this.engineViewState.mouseY
      );
    }
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
      case "mass":
        this.particle.updateMass(val);
        break;
      default:
    }
  }

  drawBall(ctx, x, y) {
    ctx.lineWidth = 1;
    ctx.fillStyle = this.particle.colour;
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
    ctx.fill();
    ctx.closePath();
    this.drawParticleCharge(ctx, x, y);
  }
}
