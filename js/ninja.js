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

  move(key) {
    switch(key) {
      case "A":
        this.pos[0] -= 5;
        break;
      case "W":
        this.pos[1] -= 5;
        break;
      case "S":
        this.pos[1] += 5;
        break;
      case "D":
        this.pos[0] += 5;
        break;
    }
  }

}

module.exports = Ninja;
