//Helper class for sketch.js
class Obstacle {
  constructor(x, y, xDir, yDir) {
    this.x = x;
    this.y = y;
    this.xDir = xDir;
    this.yDir = yDir;
    this.active = true;
    this.new = true;
  }

  isActive() {
    return this.active;
  }

  move() {
    this.x += this.xDir * 2;
    this.y += this.yDir * 2;
  }

  destroy() {
    this.x = -200;
    this.y = -200;
    this.active = false;
  }

  draw() {
    push();
    translate(this.x, this.y);
    rectMode(CENTER);
    //rotate(atan2(this.yDir, this.xDir));
    fill(200, 0, 0);
    rect(0, 0, 90, 20);
    pop();
  }

  drawObjCollision() {
    push();
    rectMode(CENTER);
    fill(0, 0, 255, 10);
    rect(this.x, this.y, 90, 20);
    pop();
  }

  isOutOfBounds() {
    return this.x < -200 || this.x > canvasContainer.width() + 200 || this.y < -200 || this.y > canvasContainer.height() + 200;
  }
  checkPlayerCollision(x,y) {
    return rectRect(this.x, this.y, 90, 20, canvasContainer.width() - x - 15, y, 60, 100);
  }

};


// RECTANGLE/RECTANGLE
//Source: https://github.com/jeffThompson/CollisionDetection/blob/master/CodeExamples/RectRect/RectRect.pde
function rectRect(r2x, r2y, r2w, r2h, r1x, r1y, r1w, r1h) {
    // are the sides of one rectangle touching the other?
    if (r1x - r1w/2 <= r2x + r2w/2 &&    // r1 right edge past r2 left
        r1x + r1w/2 >= r2x - r2w/2 &&    // r1 left edge past r2 right
        r1y - r1h/2 <= r2y + r2h/2 &&    // r1 top edge past r2 bottom
        r1y + r1h/2 >= r2y - r2h/2) {    // r1 bottom edge past r2 top
          return true;
    }
    return false;
  }