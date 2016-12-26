const MovingObject = require('./moving_object.js');
const Sprite = require('./sprite.js');
const KunaiImage = new Image();
KunaiImage.src = "./assets/weapons.png";

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

  draw(ctx) {
    const kunai = Sprite({
      context: ctx,
      width: 40,
      height: 27,
      image: KunaiImage
    });
    ctx.drawImage(kunai.image, 250, 610, kunai.width, kunai.height,
      this.pos[0] - 5, this.pos[1] - 5, kunai.width, kunai.height);
  }
}

module.exports = Kunai;
