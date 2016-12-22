class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ninja = game.makeNinja();
  }
}

module.exports = GameView;
