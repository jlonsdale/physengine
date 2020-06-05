import Particle from "./particle.js";

export default class Engine {
  constructor(ctx, height, width) {
    this.engineViewState = null;
    this.ctx = ctx;
    this.height = height;
    this.width = width;
    this.particle = new Particle(width / 2, 200, "red", height, width);
    this.arrow = false;
  }

  canvasArrow = (ctx, x1, y1, x2, y2) => {
    ctx.beginPath();
    ctx.strokeStyle = "#ff0000";

    var headlen = 10;
    var dx = x2 - x1;
    var dy = y2 - y1;
    var angle = Math.atan2(dy, dx);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(
      x2 - headlen * Math.cos(angle - Math.PI / 6),
      y2 - headlen * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(x2, y2);
    ctx.lineTo(
      x2 - headlen * Math.cos(angle + Math.PI / 6),
      y2 - headlen * Math.sin(angle + Math.PI / 6)
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
    this.particle.select();
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
  }

  drawBall(ctx, x, y) {
    ctx.beginPath();
    const engineViewState = this.engineViewState;
    if (this.particle.selected) {
      !engineViewState.spacePressed
        ? ctx.arc(
            engineViewState.xMouse,
            engineViewState.yMouse,
            this.particle.radius,
            0,
            Math.PI * 2
          )
        : ctx.arc(
            engineViewState.x1,
            engineViewState.y1,
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
  }
}
