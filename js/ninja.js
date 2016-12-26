const MovingObject = require('./moving_object.js');
const Kunai = require('./kunai.js');
const Sprite = require('./sprite.js');
const NinjaImage = new Image();
NinjaImage.src = "./assets/ninja_sprite_sheet.png";

const DEFAULTS = {
  COLOR: "#006600",
  RADIUS: 20,
  KUNAI_VEL: [10, 0]
};

class Ninja extends MovingObject {
  constructor(options) {
    options.pos = options.pos;
    options.isJumping = false;
    options.vel = [0, 0];
    options.radius = DEFAULTS.RADIUS;
    options.color = DEFAULTS.COLOR;
    super(options);
    this.kunais = 3;
    this.unlimitedMode = true;
  }

  draw(ctx) {
    const ninja = Sprite({
      context: ctx,
      width: 40,
      height: 40,
      image: NinjaImage
    });
    ctx.drawImage(ninja.image, 12, 50, ninja.width, ninja.height,
      this.pos[0] - 20, this.pos[1] - 20, ninja.width, ninja.height);
  }

  jump(key) {
    if (key === "J") {
      this.pos[1] -= 30;
      this.vel[1] = -2;
    }
  }

  ninjaAction(key) {
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
      case "K":
        this.throwKunai();
        break;
    }
  }

  throwKunai() {
    if (this.kunais > 0) {
      this.kunais--;
      const kunai = new Kunai({
        pos: this.pos.slice(),
        vel: DEFAULTS.KUNAI_VEL,
        game: this.game
      });

      this.game.add(kunai);
      const kunaiSound = new Audio('./assets/audio/kunai_throw.mp3');
      kunaiSound.play();
      return;
    } else {
      return;
    }
  }
}

module.exports = Ninja;
