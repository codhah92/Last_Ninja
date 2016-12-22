class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ninja = this.game.makeNinja();
  }

  start() {
    this.game.draw(this.ctx);
    setInterval(this.game.draw(this.ctx), 200);
  }

  animate() {
  }

  bindKeyHandlers() {
  }
}

module.exports = GameView;
