const MovingObject = require('./moving_object.js');

const DEFAULTS = {
  COLOR: "#006600",
  RADIUS: 15
};

class Ninja extends MovingObject {
  constructor(options) {
    options.pos = options.pos;
    options.isJumping = false;
    options.vel = [0, 2];
    options.radius = DEFAULTS.RADIUS;
    options.color = DEFAULTS.COLOR;
    super(options);
  }

  jump() {
    this.pos[1] -= 10;
  }


}

module.exports = Ninja;
