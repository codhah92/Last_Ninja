const Ninja = require('./ninja.js');
const Star = require('./star.js');
const Kunai = require('./kunai.js');

class Game {
  constructor() {
    this.ninjas = [];
    this.stars = [];
    this.kunais = [];

    this.addStars();
  }

  add(object) {
    if (object instanceof Star) {
      this.stars.push(object);
    } else if (object instanceof Kunai) {
      this.kunais.push(object);
    } else if (object instanceof Ninja) {
      this.ninjas.push(object);
    } else {
      throw "Must be the wind";
    }
  }

  addStars() {
    for (let i = 0; i < Game.TOTAL_STARS; i++) {
      this.add(new Star({ game: this }));
    }
  }

  // allObjects() {
  //   const allObjects = [];
  //   allObjects.concat(this.ninjas);
  //   allObjects.concat(this.kunais);
  //   allObjects.concat(this.stars);
  //   return allObjects;
  // }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.ninjas.forEach((object) => {
      object.draw(ctx);
    });

    this.stars.forEach((object) => {
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

  step () {
    this.moveObjects();
    this.checkCollisions();
  }

  outOfScreen(object) {
    const xCoord = object.pos[0];
    const yCoord = object.pos[1];

    if (object instanceof Star) {
      return (xCoord < 0);
    } else if (object instanceof Kunai) {
      return (xCoord > 1000);
    } else if (object instanceof Ninja) {
      return (yCoord < 0 || yCoord > 500);
    }
  }

  // checkCollisions() {
  //   const allObjects = this.allObjects();
  //   for (let i = 0; i < allObjects.length; i++) {
  //     for (let j = 0; j < allObjects.length; j++) {
  //       const firstObject = allObjects[i];
  //       const secondObject = allObjects[j];
  //
  //       if (firstObject.)
  //     }
  //   }
  // }

}

Game.DIM_X = 1000;
Game.DIM_Y = 500;
Game.TOTAL_STARS = 30;

module.exports = Game;
