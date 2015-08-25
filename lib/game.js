(function() {
  var Asteroids = window.Asteroids = window.Asteroids || {};

  var Game = Asteroids.Game = function() {
    this.ship = new Asteroids.Ship({
      pos: Asteroids.Game.prototype.randomPos(),
      game: this
    });
    this.bullets = [];
    this.asteroids = [];
    this.addAsteroids(Game.NUM_ASTEROIDS);
  };

  Game.prototype.allObjects = function () {
    return [this.ship].concat(this.bullets).concat(this.asteroids);
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.addAsteroids = function(numAsteroids, radius, pos) {
    for (var i = 0; i < numAsteroids; i++) {
      var opts = {};
      opts.game = this;
      opts.pos = pos || this.randomPos();
      opts.radius = radius;
      this.asteroids.push(new Asteroids.Asteroid(opts));
    }
  };

  Game.prototype.add = function(obj) {
    this.bullets.push(obj);
  };

  Game.prototype.randomPos = function() {
    var posX = Math.floor(Math.random() * Game.DIM_X);
    var posY = Math.floor(Math.random() * Game.DIM_Y);
    return [posX, posY];
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach(function (obj) {
      obj.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function() {
    this.allObjects().forEach(function (obj) { obj.move(); });
  };

  Game.prototype.wrap = function(pos) {
    var posX = pos[0], posY = pos[1];
    if (posX < 0) { posX = (Game.DIM_X + posX); }
    if (posX > Game.DIM_X) { posX = (posX % Game.DIM_X); }

    if (posY < 0) { posY = (Game.DIM_Y + posY); }
    if (posY > Game.DIM_Y) { posY = (posY % Game.DIM_Y); }

    return [posX, posY];
  };

  Game.prototype.checkCollisions = function () {
    var allObjs = this.allObjects();
    for (var i = 0; i < allObjs.length; i++) {
      for (var j = i + 1; j < allObjs.length; j++) {
        if (allObjs[i] === null || allObjs[j] === null) {
          continue;
        }

        if (allObjs[i].isCollidedWith(allObjs[j])) {
          allObjs[i].collideWith(allObjs[j]);
        }
      }
    }

    this.asteroids = this.asteroids.filter(function (val) {
      return val !== null;
    });
  };

  Game.prototype.removeAsteroid = function(asteroid, addNew) {
    this.asteroids[this.asteroids.indexOf(asteroid)] = null;
    this.asteroids = this.asteroids.filter(function (val) {
      return val !== null;
    });

    if (addNew) { this.addAsteroids(1); }
  };

  Game.prototype.fragmentAsteroid = function (asteroid) {
    var radius = (asteroid.radius == 40) ? 30 : 20;
    this.addAsteroids(2, radius, asteroid.pos);
  };

  Game.prototype.removeBullet = function(bullet) {
    this.bullets[this.bullets.indexOf(bullet)] = null;
    this.bullets = this.bullets.filter(function (val) {
      return val !== null;
    });
  };

  Game.prototype.isOutOfBounds = function(pos) {
    return pos[0] > Game.DIM_X || pos[0] < 0 || pos[1] > Game.DIM_Y || pos[1] < 0;
  };

  Game.DIM_X = window.innerWidth;
  Game.DIM_Y = window.innerHeight;
  Game.NUM_ASTEROIDS = 10;
})();
