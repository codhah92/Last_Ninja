const MovingObject = require('./moving_object.js');
const Ninja = require('./ninja.js');
const Kunai = require('./kunai.js');

const DEFAULTS = {
  COLOR: "#ff1a1a",
	RADIUS: 15,
  MAX_SPEED: 10
};

class Star extends MovingObject {
  constructor(options = {}) {
    options.pos = options.pos || options.game.starInitialPos();
    options.vel = options.vel || [-Math.floor((Math.random() + 1) * DEFAULTS.MAX_SPEED), 0];
    options.color = DEFAULTS.COLOR;
    options.radius = DEFAULTS.RADIUS;
    super(options);
  }
}

module.exports = Star;
