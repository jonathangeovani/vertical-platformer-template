class CollisionBlock {
  constructor({ position, height = 16 }) {
    this.position = position;
    this.width = 16;
    this.height = height;
  }

  draw() {
    c.fillStyle = "#FF00007B";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
  }
}
