$(function() {
  var Asteroids = window.Asteroids = window.Asteroids || {};

  Asteroids.Util = {
    inherits: function(ChildClass, ParentClass) {
      var Surrogate = function() {};
      Surrogate.prototype = ParentClass.prototype;
      ChildClass.prototype = new Surrogate();
      ChildClass.prototype.constructor = ChildClass;
    },

    dist: function(pos1, pos2) {
      var x1 = pos1[0], x2 = pos2[0];
      var y1 = pos1[1], y2 = pos2[1];
      return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    },

    norm: function(vec) {
      return Asteroids.Util.dist([0, 0], vec);
    },

    randomVec: function(length) {
      // dx = 3, norm has to be 5, 5^2 = 3^2 + dy^2
      // length^2 = dx^2 + dy^2
      // length^2 - dx^2 = dy^2
      // sqrt(length^2 - dx^2) = dy
      var dx = (Math.random() * length * 2) - length;
      var dy = Math.sqrt(Math.pow(length, 2) - Math.pow(dx, 2));
      var randomYDir = [-1, 1];
      return [dx, (dy * randomYDir[Math.floor(Math.random() * randomYDir.length)])];
    }
  };


});
