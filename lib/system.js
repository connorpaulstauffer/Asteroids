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

    var game = new Asteroids.Game();
    this.gameView = new Asteroids.GameView(game, this.ctx, this);
  };

  System.prototype.resetGame = function () {
    clearInterval(this.gameView.gameInterval);
    this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
    var game = new Asteroids.Game();
    this.gameView = new Asteroids.GameView(game, this.ctx, this);
  };

  System.prototype.bindHandlers = function () {
    $("#start-game").on("click", function () {
      $("#welcome-screen").addClass("hidden");
      $(".game-view").removeClass("hidden");
      this.gameView.start();
    }.bind(this));

    // $("#high-scores").once("click", function () {
    //   $("#welcome-screen").addClass("hidden");
    //   $("#scores").removeClass("hidden");
    //
    //   $("#back").once("click", function () {
    //     $("#scores").addClass("hidden");
    //     $("#welcome-screen").removeClass("hidden");
    //   })
    // });
  };

  System.prototype.gameOver = function (finalScore) {
    this.resetGame();
    $("#game-over").removeClass("hidden");
    $("#final-score").html(finalScore);

    $("#back").one("click", function () {
      $("#game-over").addClass("hidden");
      $("#welcome-screen").removeClass("hidden");
    })
  };

  // System.prototype.submitScore = function (finalScore) {
  //   var results = [{ name: $("#player-name").val(), score: finalScore }];
  //   var $headerRow = $("table tbody tr").first();
  //   var $rows = $("table tbody tr");
  //
  //   for (var i = 1; i < $rows.length; i++) {
  //     var name = $($rows[i]).find(".name").html()
  //     var score = parseInt($($rows[i]).find(".score").html())
  //     results.push({ name: name, score: score });
  //   };
  //
  //   results = _(results).sortBy("score").reverse();
  //   $("table tbody").html($headerRow);
  //
  //   _(results).each(function (result, idx) {
  //     if (idx > 9) { return; }
  //     var $row = $("<tr>");
  //     $row.append("<td>" + (idx + 1) + "</td>");
  //     $row.append("<td class=\"name\">" + result.name + "</td>");
  //     $row.append("<td class=\"score\">" + result.score + "</td>");
  //     $("table tbody").append($row);
  //   });
  //
  //   $("#game-over").addClass("hidden");
  //   $("#scores").removeClass("hidden");
  // };

  new Asteroids.System();
});
