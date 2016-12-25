const MovingObject = require('./moving_object.js');

const DEFAULTS = {
  COLOR: "#000",
	RADIUS: 5,
  SPEED: 10
};

class Kunai extends MovingObject {
  constructor(options = {}) {
    options.color = DEFAULTS.COLOR;
    options.radius = DEFAULTS.RADIUS;
    options.speed = DEFAULTS.SPEED;
    super(options);
  }
}

module.exports = Kunai;
