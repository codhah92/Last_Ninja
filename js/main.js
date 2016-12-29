const Game = require('./game.js');
const GameView = require('./game_view.js');
const firebase = require('firebase');

const config = {
  apiKey: "AIzaSyAOF_CAPegYRNLDxwCdbPNGfItGwmCkJpE",
  authDomain: "last-ninja.firebaseapp.com",
  databaseURL: "https://last-ninja.firebaseio.com",
  storageBucket: "last-ninja.appspot.com",
  messagingSenderId: "399350145438"
};
firebase.initializeApp(config);

const database = firebase.database();

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx, database).load();
});
