// Firework particles for the explosion

class Particle {
  constructor(x, y, hu, firework) {
    this.pos = createVector(x, y);
    this.firework = firework;
// how long the particles will last for once they appear, starting from 1 being extremely short
    this.lifespan = 255;
    this.hu = hu;
    this.acc = createVector(0, 0);
    if (this.firework) {
// velocity of when the particle effect will be triggered
      this.vel = createVector(0, random(-5, -20));
    } else {
      this.vel = p5.Vector.random2D();
// Multiply the velocity between set range of the particles when explosion effect is triggered
      this.vel.mult(random(10, 15));
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    if (!this.firework) {
      this.vel.mult(0.9);
      this.lifespan -= 4;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  done() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }

  show() {

// customise the numbers for variation in size and colour
    if (!this.firework) {
      strokeWeight(1);
      stroke(this.hu, 255, 255, this.lifespan);
    } else {
      strokeWeight(1);
      stroke(this.hu, 255, 255);
    }

    point(this.pos.x, this.pos.y);
  }
}