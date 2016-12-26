const Game = require('./game.js');

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ninja = this.game.makeNinja();
    this.background = this.game.addBackground(game);
    this.songIsPlaying = true;
    this.themeSong = new Audio('./assets/audio/ninja_theme.mp3');
    $(window).on("keydown", this.handleKeyEvent.bind(this));
    $('.play').on("click", this.handleNewGame.bind(this));
    $('.play-again').on("click", this.handlePlayAgain.bind(this));
    this.closePlayAgainModal = this.closePlayAgainModal.bind(this);
    this.closePlayNowModal = this.closePlayNowModal.bind(this);
    this.renderLose = this.renderLose.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
  }

  handleKeyEvent(e) {
    if (!this.game.lose) {
      if (e.keyCode === 84) {
        this.toggleSound();
      }

      if (GameView.KEYS[e.keyCode]) {
        this.ninja.jump(GameView.KEYS[e.keyCode]);
        this.ninja.ninjaAction(GameView.KEYS[e.keyCode]);
      }
    } else {
      return;
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
    this.themeSong.load();
    this.themeSong.play();
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
    const introSong = new Audio('./assets/audio/intro.mp3');
    introSong.play();
    const modal = document.getElementById('game-modal');
    modal.style.display = "block";
  }

  toggleSound() {
    if (this.songIsPlaying) {
      this.songIsPlaying = false;
      this.themeSong.pause();
    } else {
      this.songIsPlaying = true;
      this.themeSong.play();
    }
  }
}

GameView.KEYS = {
  74: "J",
  65: "A",
  68: "D",
  87: "W",
  83: "S",
  75: "K",
  84: "T"
};


module.exports = GameView;
