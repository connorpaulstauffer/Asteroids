(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};

  var Bullet = Asteroids.Bullet = function(options) {
    options.radius = Bullet.RADIUS;
    options.color = Bullet.COLOR;
    Asteroids.MovingObject.call(this, options);
    this.isWrappable = false;
  };
  Asteroids.Util.inherits(Asteroids.Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObj) {
    if (otherObj instanceof (Asteroids.Asteroid)) {
      this.game.removeAsteroid(otherObj);
    }
  };

  Bullet.RADIUS = 4;
  Bullet.COLOR = "#00F9FF";
})();
