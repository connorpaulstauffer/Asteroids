$(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};

  var GameView = Asteroids.GameView = function(game, ctx, system) {
    this.game = game;
    this.ctx = ctx;
    this.addScoreAndLives();
    this.game.setGameView(this);
    this.system = system;
  };

  GameView.prototype.addScoreAndLives = function () {
    for (var i = 0; i < 3; i++) {
      var $span = $("<span>X </span>");
      $("#lives").append($span);
    }
    $("#score").html("0");
  };

  GameView.prototype.updateScoreBoard = function (score) {
    $("#score").html(score);
  };

  GameView.prototype.decrementLives = function () {
    $("#lives span").last().remove();
  };

  GameView.prototype.gameOver = function () {
    this.system.gameOver();
  };

  GameView.prototype.bindKeyHandlers = function() {
    var theGame = this.game;

    $( window ).on("keydown", function (event) {
      if (event.which == 39) {
        theGame.ship.rotate(1);
      } else if (event.which == 37) {
        theGame.ship.rotate(-1);
      } else if (event.which == 38) {
        theGame.ship.accelerate();
      } else if (event.which == 32) {
        theGame.ship.fireBullets();
      }
    });

    $( window ).on("keyup", function (event) {
      if (event.which == 39 || event.which == 37) {
        theGame.ship.stopRotate();
      } else if (event.which == 38) {
        theGame.ship.stopAccelerating();
      } else if (event.which == 32) {
        theGame.ship.stopFiringBullets();
      }
    });
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();

    this.gameInterval = setInterval((function() {
      this.game.step();
      this.game.draw(this.ctx);
    }).bind(this), 5);
  };
});
