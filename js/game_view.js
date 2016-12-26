const Game = require('./game.js');

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ninja = this.game.makeNinja();
    this.background = this.game.addBackground(game);
    $(window).on("keydown", this.handleKeyEvent.bind(this));
    $('.play').on("click", this.handleNewGame.bind(this));
    $('.play-again').on("click", this.handlePlayAgain.bind(this));
    this.closePlayAgainModal = this.closePlayAgainModal.bind(this);
    this.closePlayNowModal = this.closePlayNowModal.bind(this);
    this.renderLose = this.renderLose.bind(this);
  }

  handleKeyEvent(e) {
    if (GameView.KEYS[event.keyCode]) {
      this.ninja.jump(GameView.KEYS[event.keyCode]);
      this.ninja.float(GameView.KEYS[event.keyCode]);
    }
  }

  nextLevel() {
    if (this.game.points % 10000 === 0) {
      this.ninja.kunais += 1;
      Game.TOTAL_STARS += 3;
    } else if (this.game.points % 25000 === 0) {
      this.ninja.kunais += 5;
      Game.TOTAL_STARS += 3;
    }
  }


  update() {
    if (!this.game.lose) {
      this.game.step();
      this.nextLevel();
      this.renderPointsCount();
      this.renderKunaiCount();
      this.game.draw(this.ctx);
      requestAnimationFrame(this.update.bind(this));
    } else {
      this.renderLose();
    }
  }

  renderLose() {
    const loseModal = document.getElementById('lose-modal');
    loseModal.style.display = "block";
  }

  renderKunaiCount() {
    $('.kunais').text(this.ninja.kunais);
  }

  renderPointsCount() {
    $('.points').text(this.game.points);
  }

  handleNewGame() {
    if (this.game.lose) {
      this.closePlayNowModal();
      this.start();
    }
  }

  handlePlayAgain() {
    this.closePlayAgainModal();
    this.start();
  }

  closePlayNowModal() {
    const modal = document.getElementById('game-modal');
    modal.style.display = "none";
  }

  closePlayAgainModal() {
    const modal = document.getElementById('lose-modal');
    modal.style.display = "none";
  }

  start() {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.game = null;
    this.game = new Game();
    this.ninja = this.game.makeNinja();
    this.game.addBackground();
    this.game.lose = false;
    this.renderPointsCount();
    requestAnimationFrame(this.update.bind(this));
  }

  load() {
    const modal = document.getElementById('game-modal');
    modal.style.display = "block";
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
