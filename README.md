# Asteroids

[Live][live]
[live]: http://connorpaulstauffer.com/Asteroids

## Description

Javascript implementation of the popular browser game, Asteroids.


## Features

  * Renders graphics in an HTML Canvas 2D context.
    * [Ship][ship] draw method determines coordinated based on midpoint and
    orientation.
  * Implements [acceleration][ship], [deceleration][ship], and collisions with
  Javascript.
  * [Asteroids][asteroid], [bullets][bullet], and [ship][ship] inherit from
  [moving object][moving] class, overriding methods as necessary.
