class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ninja = this.game.makeNinja();
    this.background = this.game.addBackground();
    $(window).on("keydown", this.handleKeyEvent.bind(this));
  }

  // bindKeyHandlers() {
  //   $(window).on("keydown", function(e) {
  //     this.handleKeyEvent(e);
  //   }.bind(this));
  // }

  handleKeyEvent(e) {
    if (GameView.KEYS[event.keyCode]) {
      this.ninja.jump(GameView.KEYS[event.keyCode]);
      this.ninja.float(GameView.KEYS[event.keyCode]);
    }
  }

  update() {
    if (!this.game.lose) {
      this.game.step();
      this.renderPointsCount();
      this.renderKunaiCount();
      this.game.draw(this.ctx);
      requestAnimationFrame(this.update.bind(this));
    } else {
      // this.renderLose();
    }
  }

  renderLose() {

  }

  renderKunaiCount() {
    $('.kunais').text(this.ninja.kunais);
  }

  renderPointsCount() {
    $('.points').text(this.game.points);
  }

  start() {
    // this.bindKeyHandlers();
    this.renderPointsCount();
    requestAnimationFrame(this.update.bind(this));
  }

  bindKeyHandlers() {
  }
}

GameView.KEYS = {
  74: "J",
  65: "A",
  68: "D",
  87: "W",
  83: "S",
  75: "K"
};


module.exports = GameView;
