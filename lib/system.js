$(function () {
  var canvasEl = document.getElementById("game-canvas");
  // debugger;
  canvasEl.height = $("#root").height();
  canvasEl.width = $("#root").width();

  var ctx = canvasEl.getContext('2d');
  var game = new Asteroids.Game();
  var gameView = new Asteroids.GameView(game, ctx);

  $("#start-game").on("click", function () {
    $("#welcome-screen").addClass("hidden");
    gameView.start();
  });

  $("#high-scores").on("click", function () {
    $("#welcome-screen").addClass("hidden");
    $("#scores").removeClass("hidden");
  });

});
