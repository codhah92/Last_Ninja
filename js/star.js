const MovingObject = require('./moving_object.js');
const Ninja = require('./ninja.js');
const Kunai = require('./kunai.js');
const Sprite = require('./sprite.js');
const StarImage = new Image();
StarImage.src = "./assets/weapons.png";
const StarImage2 = new Image();
StarImage2.src = "./assets/weapons2.png";

const DEFAULTS = {
  COLOR: "#ff1a1a",
	RADIUS: 20,
  MAX_SPEED: 10
};

class Star extends MovingObject {
  constructor(options = {}) {
    options.pos = options.pos || options.game.starInitialPos();
    options.vel = options.vel || [-Math.floor((Math.random() + 0.5) * DEFAULTS.MAX_SPEED), 0];
    options.color = DEFAULTS.COLOR;
    options.radius = DEFAULTS.RADIUS;
    super(options);
  }

  draw(ctx) {
    const star = Sprite({
      context: ctx,
      width: 60,
      height: 60,
      image: StarImage
    });

    const star2 = Sprite({
      context: ctx,
      width: 60,
      height: 40,
      image: StarImage2
    });

    if (this.game.points < 20000) {
      ctx.drawImage(star.image, 300, 600, star.width, star.height,
        this.pos[0] - 20, this.pos[1] - 20, star.width, star.height);
    } else {
      ctx.drawImage(star2.image, 4, 15, star2.width, star2.height,
        this.pos[0] - 20, this.pos[1] - 20, star2.width, star2.height);
    }
  }
}

module.exports = Star;
