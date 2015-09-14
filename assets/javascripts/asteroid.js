$(function() {
  var Asteroids = window.Asteroids = window.Asteroids || {};

  var Asteroid = Asteroids.Asteroid = function(options) {
    var randomVel = (Math.random() * 1.5 * 2) - 1.5;
    options.color = options.color || Asteroid.COLOR;
    options.vel = Asteroids.Util.randomVec(randomVel);
    options.radius = options.radius || Asteroid.RADIUS;
    Asteroids.MovingObject.call(this, options);
    this.numberOfSides = 6;
    if (this.radius < 40) { this.isWrappable = false; }
  };

  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);


  Asteroid.prototype.draw = function (ctx) {
    var posX = this.pos[0];
    var posY = this.pos[1];

    ctx.beginPath();

    ctx.moveTo(posX + this.radius * Math.cos(0), posY + this.radius * Math.sin(0));

    for (var i = 1; i <= this.numberOfSides; i++) {
      var newX = posX + this.radius * Math.cos(i * 2 * Math.PI / this.numberOfSides);
      var newY = posY + this.radius * Math.sin(i * 2 * Math.PI / this.numberOfSides);
      ctx.lineTo(newX, newY);
    };

    ctx.strokeStyle = this.color;
    ctx.lineWidth = 5;
    ctx.stroke();
  };

  Asteroid.prototype.collideWith = function(otherObject) {
  };


  Asteroid.COLOR = "WHITE";
  Asteroid.RADIUS = 40;

});
