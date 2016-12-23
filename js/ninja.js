const MovingObject = require('./moving_object.js');

const DEFAULTS = {
  COLOR: "#006600",
  RADIUS: 15
};

class Ninja extends MovingObject {
  constructor(options) {
    options.pos = options.pos;
    options.isJumping = false;
    options.vel = [0, 0];
    options.radius = DEFAULTS.RADIUS;
    options.color = DEFAULTS.COLOR;
    super(options);
  }

  jump(key) {
    if (key === "J") {
      this.pos[1] -= 30;
    }
  }

  impulse(key) {
    switch(key) {
      case "A":
        this.vel[0] = -2;
        // this.vel[1] = 0;
        break;
      case "W":
        this.vel[1] = -2;
        // this.vel[0] = 0;
        break;
      case "S":
        this.vel[1] = 2;
        // this.vel[0] = 0;
        break;
      case "D":
        this.vel[0] = 2;
        // this.vel[1] = 0;
        break;
    }
  }
}

module.exports = Ninja;
