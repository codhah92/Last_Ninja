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
    const jump = new Audio('./assets/audio/jump.mp3');
    if (key === "J") {
      if (this.pos[1] < 30){
        return;
      } else {
        jump.play();
        this.pos[1] -= 30;
        this.vel[1] = -2;
      }
    }
  }

  ninjaAction(key) {
    switch(key) {
      case "A":
        if (this.pos[0] > 10){
          this.vel[0] = -2;
        }
        // this.vel[1] = 0;
        break;
      case "W":
        if (this.pos[1] > 10) {
          this.vel[1] = -2;
        }
        // this.vel[0] = 0;
        break;
      case "S":
        if (this.pos[1] < 490) {
          this.vel[1] = 2;
        }
        // this.vel[0] = 0;
        break;
      case "D":
        if (this.pos[0] < 990) {
          this.vel[0] = 2;
        }
        // this.vel[1] = 0;
        break;
      case "K":
        this.throwKunai();
        break;
    }
  }

  throwKunai() {
    const kunaiSound = new Audio('./assets/audio/kunai_throw.mp3');
    if (this.kunais > 0) {
      this.kunais--;
      const kunai = new Kunai({
        pos: this.pos.slice(),
        vel: DEFAULTS.KUNAI_VEL,
        game: this.game
      });

      this.game.add(kunai);
      kunaiSound.play();
      return;
    } else {
      return;
    }
  }
}

module.exports = Ninja;
