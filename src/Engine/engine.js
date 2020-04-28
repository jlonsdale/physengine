import Particle from "./particle.js";

export default class Engine {
  constructor(ctx, height, width) {
    this.test = null;
    this.ctx = ctx;
    this.height = height;
    this.width = width;
    this.particle = new Particle(width / 2, 0, "red", height, width);
    this.xMouse = null;
    this.yMouse = null;
  }

  updateMouse(x, y) {
    this.xMouse = x;
    this.yMouse = y;
  }

  handleClick(x, y) {
    this.particle.click(x, y);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.height * 2, this.width * 2);
    this.particle.position();
    this.drawBall(this.ctx, this.particle.xPos, this.particle.yPos);
    this.ctx.beginPath();
    this.ctx.arc(this.width / 2, this.height / 2, 5, 0, Math.PI * 2);
    this.ctx.fillStyle = "yellow";
    this.ctx.fill();
    this.ctx.closePath();
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
    return "x=" + this.particle.xPos + "y=" + this.particle.yPos;
  }
}
