const Ninja = require('./ninja.js');
const Star = require('./star.js');
const Kunai = require('./kunai.js');
const Background = require('./background.js');

class Game {
  constructor() {
    this.ninjas = [];
    this.stars = [];
    this.kunais = [];
    this.backgrounds = [];
    this.points = 0;
    this.lose = true;
    this.unlimitedMode = false;
    if (this.unlimitedMode) {
      setInterval(this.addStars.bind(this), 100);
    } else {
      setInterval(this.addStars.bind(this), 2000);
    }
  }

  add(object) {
    if (object instanceof Star) {
      this.stars.push(object);
    } else if (object instanceof Kunai) {
      this.kunais.push(object);
    } else if (object instanceof Ninja) {
      this.ninjas.push(object);
    } else if (object instanceof Background){
      this.backgrounds.push(object);
    } else {
      throw "Must be the wind";
    }
  }

  addPoints() {
    this.points += 10;
  }

  addStars() {
    for (let i = 0; i < Game.TOTAL_STARS; i++) {
      this.add(new Star({ game: this }));
    }
  }

  addBackground(game) {
    const background = new Background({ game: this});
    this.add(background);
  }

  allObjects() {
    return [].concat(
      this.backgrounds,
      this.ninjas,
      this.stars,
      this.kunais
    );
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }

  makeNinja() {
    const ninja = new Ninja({
      pos: this.ninjaInitialPos(),
      game: this
    });

    this.add(ninja);

    return ninja;
  }

  ninjaInitialPos() {
    const initialPos = [Math.random() * 150 + 50, Math.random() * 150 + 100];
    return initialPos;
  }

  starInitialPos() {
    return [Game.DIM_X , Math.random() * Game.DIM_Y];
  }

  moveObjects() {
    this.allObjects().forEach((object) => {
      if (object) {
        object.move();
      }
    });
  }

  step() {
    if (!this.lose) {
      this.moveObjects();
      this.addPoints();
      this.keepNinjaInWalls();
      this.checkCollisions();
      this.removeOutOfBoundsStars();
      // setInterval(this.addStars.bind(this), 2000); Hard Mode
    }
  }

  removeOutOfBoundsStars() {
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      if (this.outOfScreen(star)){
        this.remove(star);
      }
    }
  }

  outOfScreen(object) {
    const xCoord = object.pos[0];
    const yCoord = object.pos[1];

    if (object instanceof Star) {
      return (xCoord < 0);
    } else if (object instanceof Kunai) {
      return (xCoord > 1000);
    } else if (object instanceof Ninja) {
      return (yCoord < 0 || yCoord > 490 || xCoord < 10 || xCoord > 1000);
    }
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const firstObject = allObjects[i];
        const secondObject = allObjects[j];
        if ((firstObject instanceof Ninja) && (secondObject instanceof Star)){
          if (firstObject.isCollidedWith(secondObject)) {
            const ninjaHit = new Audio('./assets/audio/ninja_hit.mp3');
            ninjaHit.play();
            firstObject.remove();
            secondObject.remove();
            this.lose = true;
            this.refresh();
          }
        }

        if ((firstObject instanceof Star) && (secondObject instanceof Kunai)){
          if (firstObject.isCollidedWith(secondObject)) {
            const kunaiStarHit = new Audio('./assets/audio/kunai_star_hit.mp3');
            kunaiStarHit.play();
            firstObject.remove();
            secondObject.remove();
            this.points += 500;
          }
        }
      }
    }
  }
  refresh() {
    this.ninjas = [];
    this.stars = [];
    this.kunais = [];
    Game.TOTAL_STARS = 5;
  }

  keepNinjaInWalls() {
    const ninja = this.ninjas[0];
    if (ninja instanceof Ninja) {
      if (this.outOfScreen(ninja)) {
        ninja.vel = [0, 0];
      }
    }
  }

  remove(object) {
    if (object instanceof Ninja) {
      this.ninjas.splice(this.ninjas.indexOf(object), 1);
    } else if (object instanceof Star) {
      this.stars.splice(this.stars.indexOf(object), 1);
    } else if (object instanceof Kunai) {
      this.kunais.splice(this.kunais.indexOf(object), 1);
    }
  }
}

Game.DIM_X = 1000;
Game.DIM_Y = 500;
Game.TOTAL_STARS = 5;
Game.TOTAL_KUNAIS = 5;

module.exports = Game;
