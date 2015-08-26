$(function() {
  var Asteroids = window.Asteroids = window.Asteroids || {};

  var Ship = Asteroids.Ship = function(options) {
    options.radius = Ship.RADIUS;
    options.color = Ship.COLOR;
    options.vel = [0, 0];
    Asteroids.MovingObject.call(this, options);
    this.orientation = 270;
    this.decelerationIntervals = [];
    this.setDecelerationInterval();
  };
  Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPos();
    this.vel = [0, 0];
  };

  Ship.prototype.collideWith = function (otherObj) {
    if (otherObj instanceof (Asteroids.Asteroid)) {
      this.game.decrementLives();
      this.relocate();
    }
  };

  Ship.prototype.setDecelerationInterval = function () {
    setInterval(function () {
      if (Math.abs(this.vel[0]) < 0.1) {
        this.vel[0] = 0;
      } else {
        if (this.vel[0] > 0) {
          this.vel[0] -= 0.1;
        } else {
          this.vel[0] += 0.1;
        }
      }

      if (Math.abs(this.vel[1]) < 0.1) {
        this.vel[1] = 0;
      } else {
        if (this.vel[1] > 0) {
          this.vel[1] -= 0.1;
        } else {
          this.vel[1] += 0.1;
        }
      }
    }.bind(this), 100);
  };

  Ship.prototype.accelerate = function () {
    if (this.accelerateInterval) { return; }

    this.accelerateInterval = setInterval(function () {
      var impulse = .5;
      var dx = Math.cos(this.orientation * (Math.PI / 180)) * impulse;
      var dy = Math.sin(this.orientation * (Math.PI / 180)) * impulse;
      if (Math.sqrt(Math.pow(this.vel[0] + dx, 2) + Math.pow(this.vel[1] + dy, 2)) > 3) {
        return;
      }
      this.vel[0] += dx;
      this.vel[1] += dy;
    }.bind(this), 100)
  };

  Ship.prototype.stopAccelerating = function () {
    if (this.accelerateInterval) {
      clearInterval(this.accelerateInterval)
      this.accelerateInterval = null;
    }
  };

  Ship.prototype.fireBullet = function () {
    var bulletSpeed = 10;
    var bulletVelX = 10 * Math.cos(this.orientation * (Math.PI / 180));
    var bulletVelY = 10 * Math.sin(this.orientation * (Math.PI / 180));

    var bulletOpts = {
      vel: [bulletVelX, bulletVelY],
      pos: this.pos,
      game: this.game
    };

    this.game.add(new Asteroids.Bullet(bulletOpts));
  };

  Ship.prototype.fireBullets = function () {
    if (this.firingInterval) { return; }
    this.fireBullet();
    this.firingInterval = setInterval(this.fireBullet.bind(this), 500);
  };

  Ship.prototype.stopFiringBullets = function () {
    if (this.firingInterval) {
      clearInterval(this.firingInterval);
      this.firingInterval = null;
    }
  };

  Ship.prototype.draw = function (ctx) {
    var posX = this.pos[0];
    var posY = this.pos[1];

    ctx.fillStyle = this.color;
    ctx.beginPath();

    var tipX = posX + 25 * Math.cos(this.orientation * (Math.PI / 180));
    var tipY = posY + 25 * Math.sin(this.orientation * (Math.PI / 180));

    var distanceToBase = Math.sqrt(Math.pow(25, 2) + Math.pow(20, 2));

    var baseLeftX = posX + distanceToBase * Math.cos(
      (this.orientation * (Math.PI / 180)) + Math.PI - Math.atan(20 / 25)
    )
    var baseLeftY = posY + distanceToBase * Math.sin(
      (this.orientation * (Math.PI / 180)) + Math.PI - Math.atan(20 / 25)
    )

    var baseRightX = posX + distanceToBase * Math.cos(
      (this.orientation * (Math.PI / 180)) - Math.PI + Math.atan(20 / 25)
    )
    var baseRightY = posY + distanceToBase * Math.sin(
      (this.orientation * (Math.PI / 180)) - Math.PI + Math.atan(20 / 25)
    )

    var path = new Path2D();

    path.moveTo(tipX, tipY);
    path.lineTo(baseLeftX, baseLeftY);
    path.lineTo(baseRightX, baseRightY);

    ctx.fill(path);
  };

  Ship.prototype.rotate = function (direction) {
    if (this.rotateInterval) { return; }
    this.rotateInterval = setInterval(function () {
      this.orientation += direction * 10;

      if (this.orientation < 0) {
        this.orientation += 360;
      } else {
        this.orientation %= 360;
      }
    }.bind(this), 20);
  };

  Ship.prototype.stopRotate = function () {
    if (this.rotateInterval) {
      clearInterval(this.rotateInterval);
      this.rotateInterval = null;
    }
  };

  Ship.RADIUS = 15;
  Ship.COLOR = "WHITE";

});
