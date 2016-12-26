const Game = require("./game.js");
const GameView = require("./game_view.js");

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const modal = document.getElementById('game-modal');
  const btn = document.getElementById("gameplay");
  const span = document.getElementsByClassName("close")[0];
  btn.onclick = function() {
      modal.style.display = "block";
  };
  span.onclick = function() {
      modal.style.display = "none";
  };
  window.onclick = function(event) {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  };

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
});
