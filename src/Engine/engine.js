export default class Engine {
  constructor(ctx, canvas) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = 1;
    this.y = 1;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.x += 1;
    this.y += 1;
    this.drawBall(this.ctx, this.x, this.y);
  }

  drawBall(ctx, x, y) {
    console.log(this.ctx);
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  }
}
