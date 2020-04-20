import Particle from "./particle.js";

export default class Engine {
  constructor(ctx, height, width) {
    this.ctx = ctx;
    this.height = height;
    this.width = width;
    this.particle = new Particle(50, 50, "blue", height, width);
  }

  draw() {
    console.log(this.particle);
    this.ctx.clearRect(0, 0, this.height, this.width);
    this.particle.position();
    this.drawBall(this.ctx, this.particle.xPos, this.particle.yPos);
  }

  drawBall(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, this.particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.particle.colour;
    ctx.fill();
    ctx.closePath();
  }

  data() {
    return "x=" + this.particle.xPos + "y=" + this.particle.yPos;
  }
}
