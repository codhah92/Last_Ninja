const DEFAULTS = {
  X_POS: 0,
  Y_POS: 0,
  WIDTH: 1400,
  HEIGHT: 500,
  SPEED: -1
};

class Background {
  constructor(options = {}) {
    this.xPos = DEFAULTS.X_POS;
    this.yPos = DEFAULTS.Y_POS;
    this.width = DEFAULTS.WIDTH;
    this.height = DEFAULTS.HEIGHT;
    this.speed = DEFAULTS.SPEED;
    this.game = options.game;
  }

  draw(ctx) {
    const imageRepository = new function() {
    	this.background = new Image();
    	this.background.src = "assets/ninja_map.jpg";
    };

    const imageRepository2 = new function() {
    	this.background = new Image();
    	this.background.src = "assets/ninja_map2.jpg";
    };

    const imageRepository3 = new function() {
    	this.background = new Image();
    	this.background.src = "assets/ninja_map3.jpg";
    };

    if (this.game.points < 20000){
      ctx.drawImage(
        imageRepository.background,
        this.xPos,
        this.yPos,
        this.width,
        this.height
      );

      ctx.drawImage(
        imageRepository.background,
        this.xPos + this.width,
        this.yPos,
        this.width,
        this.height
      );
    } else if (this.game.points < 40000){
      ctx.drawImage(
        imageRepository2.background,
        this.xPos,
        this.yPos,
        this.width,
        this.height
      );

      ctx.drawImage(
        imageRepository2.background,
        this.xPos + this.width,
        this.yPos,
        this.width,
        this.height
      );
    } else {
      ctx.drawImage(
        imageRepository3.background,
        this.xPos,
        this.yPos,
        this.width,
        this.height
      );

      ctx.drawImage(
        imageRepository3.background,
        this.xPos + this.width,
        this.yPos,
        this.width,
        this.height
      );
    }

    this.move();
    if (this.xPos < -1400){
      this.xPos = 0;
    }
  }

  move() {
    this.xPos += this.speed;
  }
}

module.exports = Background;
