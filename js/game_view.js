class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ninja = this.game.makeNinja();
  }

  update() {
    this.game.step();
    this.game.draw(this.ctx);
  }

  start() {
    setInterval(this.update.bind(this), 20);
  }

  animate() {
  }

  bindKeyHandlers() {
  }
}

module.exports = GameView;
