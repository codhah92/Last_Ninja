const DEFAULTS = {
  X_POS: 0,
  Y_POS: 0,
  WIDTH: 1400,
  HEIGHT: 500,
  SPEED: -1
};

class Background {
  constructor() {
    this.xPos = DEFAULTS.X_POS;
    this.yPos = DEFAULTS.Y_POS;
    this.width = DEFAULTS.WIDTH;
    this.height = DEFAULTS.HEIGHT;
    this.speed = DEFAULTS.SPEED;
  }

  draw(ctx) {
    const imageRepository = new function() {
    	this.background = new Image();
    	this.background.src = "assets/ninja_map.jpg";
    };

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
