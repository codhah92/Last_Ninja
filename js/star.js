const MovingObject = require('./moving_object.js');

const DEFAULTS = {
  COLOR: "#505050",
	RADIUS: 15,
  MAX_SPEED: 5
};

class Star extends MovingObject {
  constructor(options = {}) {
    options.pos = options.pos || options.game.starInitialPos();
    options.vel = options.vel || -([Math.floor(Math.random() * DEFAULTS.MAX_SPEED), 0]);
    options.color = DEFAULTS.COLOR;
    options.radius = DEFAULTS.RADIUS;
    super(options);
  }
}

module.exports = Star;
