import Particle from "./particle.js";

export default class Engine {
  constructor(ctx, height, width) {
    this.ctx = ctx;
    this.height = height;
    this.width = width;
    this.particle = new Particle(width / 2, 200, "red", height, width);
    this.xMouse = null;
    this.yMouse = null;
  }

  updateMouse(x, y) {
    this.xMouse = x;
    this.yMouse = y;
  }

  isWithinBounds(x, y) {
    const inBounds =
      Math.sqrt(
        (this.particle.xPos - x) * (this.particle.xPos - x) +
          (this.particle.yPos - y) * (this.particle.yPos - y)
      ) < this.particle.radius;
    if (inBounds) this.particle.select();
    return inBounds;
  }

  handleThrow(x1, x2, y1, y2, time) {
    console.log("here");
    this.particle.throw(x1, x2, y1, y2, time);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.height * 2, this.width * 2);
    this.particle.calculateKinematics();
    this.drawBall(this.ctx, this.particle.xPos, this.particle.yPos);
  }

  drawBall(ctx, x, y) {
    ctx.beginPath();
    this.particle.selected
      ? ctx.arc(this.xMouse, this.yMouse, this.particle.radius, 0, Math.PI * 2)
      : ctx.arc(x, y, this.particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.particle.colour;
    ctx.fill();
    ctx.closePath();
  }

  data() {
    return (
      "| |   " +
      this.particle.yVel / 100 +
      "   | |   " +
      "   | |   " +
      this.particle.acc +
      "   | |"
    );
  }
}
