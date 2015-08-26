$(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};

  var System = Asteroids.System = function () {
    this.setupGame();
    this.bindHandlers();
  };

  System.prototype.setupGame = function () {
    var canvasEl = document.getElementById("game-canvas");

    canvasEl.height = $("#root").height();
    canvasEl.width = $("#root").width();

    var ctx = canvasEl.getContext('2d');
    var game = new Asteroids.Game();
    this.gameView = new Asteroids.GameView(game, ctx, this);
  };

  System.prototype.bindHandlers = function () {
    $("#start-game").on("click", function () {
      $("#welcome-screen").addClass("hidden");
      $(".game-view").removeClass("hidden")
      this.gameView.start();
    }.bind(this));

    $("#high-scores").on("click", function () {
      $("#welcome-screen").addClass("hidden");
      $("#scores").removeClass("hidden");

      $("#back").on("click", function () {
        $("#scores").addClass("hidden");
        $("#welcome-screen").removeClass("hidden");
      })
    });
  };

  System.prototype.gameOver = function () {
    $("#game-over").removeClass("hidden");
  };

  new Asteroids.System();
});
