$(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};

  var System = Asteroids.System = function () {
    this.setupGame();
    this.bindHandlers();
  };

  System.prototype.setupGame = function () {
    this.canvasEl = document.getElementById("game-canvas");

    this.canvasEl.height = $("#root").height();
    this.canvasEl.width = $("#root").width();

    this.ctx = this.canvasEl.getContext('2d');

    this.game = new Asteroids.Game();
    this.gameView = new Asteroids.GameView(this.game, this.ctx, this);
  };

  System.prototype.resetGame = function () {
    clearInterval(this.gameView.gameInterval);
    this.game = new Asteroids.Game();
    this.gameView = new Asteroids.GameView(this.game, this.ctx, this);
  };

  System.prototype.bindHandlers = function () {
    $("#start-game").on("click", function () {
      $("#welcome-screen").addClass("hidden");
      $(".game-view").removeClass("hidden");
      this.gameView.start();
    }.bind(this));

  System.prototype.gameOver = function (finalScore) {
    this.resetGame();
    $("#game-over").removeClass("hidden");
    $("#final-score").html(finalScore);

    $("#back").one("click", function () {
      this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
      $("#game-over").addClass("hidden");
      $("#welcome-screen").removeClass("hidden");
    }.bind(this))
  };

  new Asteroids.System();
});
