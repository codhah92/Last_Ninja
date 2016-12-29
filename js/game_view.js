const Game = require('./game.js');
const Database = require('./database.js');

class GameView {
  constructor(game, ctx, database) {
    this.ctx = ctx;
    this.game = game;
    this.ninja = this.game.makeNinja();
    this.background = this.game.addBackground(game);
    this.songIsPlaying = true;
    this.themeSong = new Audio('./assets/audio/ninja_theme.mp3');
    this.toggleSound = this.toggleSound.bind(this);
    this.database = database;
    Database.getHighScores(this, database);
  }

  bindKeyHandlers() {
    $(window).on('keydown', function(e) {
      this.handleKeyEvent(e);
    }.bind(this));

    $('.gameplay-label').on('click', function(e) {
      this.handleOpenGamePlayModal(e);
    }.bind(this));

    $('.close-gameplay').on('click', function(e) {
      this.handleCloseGamePlayModal(e);
    }.bind(this));

    $('.play').on("click", function(e) {
      this.handleNewGame(e);
    }.bind(this));

    $('.play-again').on("click", function(e) {
      this.handlePlayAgain(e);
    }.bind(this));

    $('.high-scores-label').on('click', function(e) {
      this.handleOpenHighScores(e);
    }.bind(this));

    $('.close-high-score').on('click', function(e) {
      this.handleCloseHighScores(e);
    }.bind(this));
  }

  handleOpenHighScores(e) {
    e.preventDefault();
    $('.high-score-modal').removeClass('hidden');
    $('.high-score-modal-content').removeClass('hidden');
  }

  handleCloseHighScores(e) {
    e.preventDefault();
    $('.high-score-modal').addClass('hidden');
    $('.high-score-modal-content').addClass('hidden');
  }

  handleOpenGamePlayModal(e) {
    e.preventDefault();
    $('.gameplay-modal').removeClass('hidden');
  }

  handleCloseGamePlayModal(e) {
    e.preventDefault();
    $('.gameplay-modal').addClass('hidden');
  }

  handleClosePlayAgainModal(e) {
    e.preventDefault();
    $('.lose-modal').addClass('hidden');
  }

  handleKeyEvent(e) {
    if (e.keyCode === 84) {
      this.toggleSound();
    }
    if (!this.game.lose) {
      if (GameView.KEYS[e.keyCode]) {
        this.ninja.jump(GameView.KEYS[e.keyCode]);
        this.ninja.ninjaAction(GameView.KEYS[e.keyCode]);
      }
    } else {
      return;
    }
  }

  nextLevel() {
    if (this.game.points % 25000 === 0) {
      this.ninja.kunais += 5;
      Game.TOTAL_STARS += 3;
    } else if (this.game.points % 10000 === 0) {
      this.ninja.kunais += 2;
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
      // Database.setHighScore(this.database, this.game.points);
    }
  }

  renderLose() {
    $('.lose-modal').removeClass('hidden');
  }

  renderKunaiCount() {
    $('.kunais').text(this.ninja.kunais);
  }

  renderPointsCount() {
    $('.points').text(this.game.points);
  }

  handleNewGame(e) {
    e.preventDefault();

    if (this.game.lose) {
      this.handleCloseGamePlayModal(e);
      this.start();
    }
  }

  handlePlayAgain(e) {
    e.preventDefault();
    this.handleClosePlayAgainModal(e);
    this.start();
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
    this.bindKeyHandlers();
    const introSong = new Audio('./assets/audio/intro.mp3');
    introSong.play();
    const modal = document.getElementById('game-modal');
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
