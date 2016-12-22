class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ninja = this.game.makeNinja();

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
    }

    if (GameView.KEYS[event.keyCode]) {
       this.ninja.move(GameView.KEYS[event.keyCode]);
     }
  }

  update() {
    this.game.step();
    this.game.draw(this.ctx);
  }

  start() {
    // this.bindKeyHandlers();
    setInterval(this.update.bind(this), 20);
  }

  animate() {
  }

  bindKeyHandlers() {
  }
}

GameView.KEYS = {
  74: "J",
  65: "A",
  68: "D",
  87: "W",
  83: "S"
};


module.exports = GameView;
