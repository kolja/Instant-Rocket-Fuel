(function() {
  var Animation, Asteroids, Game, Map, Shape, Spaceship, Sprite, State, StateIntro, StateMain, Statemanager, Tile, Timer, Vector, root;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  this.mapdata = [['#', '#', '#', '#', '#', '#', '#', '#', '.', '.', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'], ['#', '#', '#', '#', '#', '#', '#', '#', '#', '.', '#', '#', '#', '#', '.', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'], ['#', '#', '#', '.', '.', '#', '#', '#', '#', '#', '.', '#', '#', '.', '.', '#', '#', '#', '.', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'], ['#', '#', '.', '#', '.', '#', '#', '#', '#', '#', '#', '#', '#', '.', '.', '#', '#', '.', '.', '#', '.', '#', '#', '#', '#', '#', '#', '#', '#', '#'], ['#', '.', '.', '#', '.', '#', '#', '#', '#', '.', '#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '#', '#', '#', '#', '#', '#', '#', '#'], ['.', '.', '.', '.', '.', '#', '.', '#', '#', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '#', '#', '#', '#', '#', '#', '#', '#'], ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '#', '#', '#', '.', '#', '.', '#', '#', '#'], ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '#', '#', '.', '.', '.', '#', '#', '#', '#'], ['.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.', '#', '#', '#', '.', '.', '.', '#', '#', '#', '.', '.', '#', '.', '#', '#'], ['#', '#', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.', '.', '#', '.', '.', '.', '#', '#', '#', '.', '.', '.', '#', '#', '#'], ['#', '#', '#', '#', '.', '#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.', '.', '#', '#', '#', '.', '.', '.', '#', '#', '#'], ['#', '#', '#', '#', '.', '#', '#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.', '.', '#', '#', '#', '.', '.', '.', '#', '#', '#'], ['.', '#', '#', '#', '.', '.', '#', '#', '.', '.', '.', '#', '.', '.', '.', '.', '.', '#', '.', '.', '#', '#', '#', '.', '.', '.', '.', '#', '#', '#'], ['.', '#', '#', '#', '.', '#', '#', '#', '.', '.', '.', '#', '#', '.', '.', '.', '.', '#', '.', '.', '#', '#', '#', '#', '.', '.', '.', '#', '#', '#'], ['.', '.', '#', '#', '.', '#', '#', '#', '#', '.', '#', '.', '#', '.', '.', '.', '.', '.', '.', '#', '#', '#', '#', '#', '#', '.', '#', '#', '#', '#'], ['.', '.', '.', '.', '.', '.', '#', '#', '#', '#', '#', '#', '.', '.', '.', '.', '.', '.', '.', '#', '#', '#', '#', '#', '#', '.', '#', '#', '#', '#'], ['.', '.', '.', '.', '.', '#', '#', '#', '#', '#', '#', '#', '.', '.', '.', '.', '.', '.', '.', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'], ['.', '.', '.', '#', '#', '#', '#', '#', '#', '#', '#', '#', '.', '.', '.', '#', '#', '.', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'], ['.', '.', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '.', '.', '.', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'], ['.', '.', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '.', '.', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#']];
  root = this;
  Array.prototype.shuffle = function() {
    return this.sort(function() {
      return 0.5 - Math.random();
    });
  };
  Game = (function() {
    function Game(width, height) {
      var canvas;
      this.width = width;
      this.height = height;
      this.gameloop = __bind(this.gameloop, this);
      canvas = $('<canvas/>').attr({
        "width": 1024,
        "height": 768
      });
      $("body").append(canvas);
      this.ctx = canvas[0].getContext('2d');
      this.ctx.font = '400 18px Helvetica, sans-serif';
      this.loop = null;
      this.timer = new Timer;
    }
    Game.prototype.gameloop = function() {
      this.update();
      return this.render();
    };
    Game.prototype.start = function() {
      return this.loop = setInterval(this.gameloop, 1);
    };
    Game.prototype.stop = function() {
      return this.loop.clearInterval();
    };
    Game.prototype.update = function() {
      return this.timer.punch();
    };
    Game.prototype.render = function() {
      return this.ctx.fillText(this.timer.fps().toFixed(1), 960, 20);
    };
    return Game;
  })();
  Asteroids = (function() {
    __extends(Asteroids, Game);
    function Asteroids(width, height) {
      var state, _i, _len, _ref;
      Asteroids.__super__.constructor.call(this, width, height);
      this.stateManager = new Statemanager;
      _ref = ["intro", "main"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        state = _ref[_i];
        this.stateManager.addState(state);
      }
      $("html").keypress(__bind(function(event) {
        var directions;
        console.log(event);
        return directions = {
          37: "left",
          38: "up",
          39: "right",
          40: "down",
          32: "space"
        };
      }, this));
    }
    Asteroids.prototype.update = function() {
      Asteroids.__super__.update.call(this);
      return this.stateManager.currentState.update(this.timer.delta);
    };
    Asteroids.prototype.render = function() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.stateManager.currentState.render(this.ctx);
      return Asteroids.__super__.render.call(this);
    };
    return Asteroids;
  })();
  $(function() {
    var asteroids;
    asteroids = new Asteroids(1024, 768);
    return asteroids.start();
  });
  Map = (function() {
    function Map(file) {
      var m, numCols, numRows, row, _fn, _ref;
      this.sprite = new Sprite("assets/images/sea_beach.png", 128, 128, 512);
      this.sprite.addImage("#.#.", 0);
      this.sprite.addImage("##..", 1);
      this.sprite.addImage(".#.#", 2);
      this.sprite.addImage("..##", 3);
      this.sprite.addImage("#.##", 4);
      this.sprite.addImage(".###", 5);
      this.sprite.addImage("###.", 6);
      this.sprite.addImage("##.#", 7);
      this.sprite.addImage(".#..", 8);
      this.sprite.addImage("#...", 9);
      this.sprite.addImage("...#", 10);
      this.sprite.addImage("..#.", 11);
      this.sprite.addImage(".##.", 12);
      this.sprite.addImage("#..#", 13);
      this.sprite.addImage(".XX.", 14);
      this.sprite.addImage("X..X", 15);
      this.sprite.addImage("....", 16);
      this.sprite.addImage("####", 17);
      m = root.mapdata;
      numRows = m.length;
      numCols = m[0].length;
      this.tiles = [];
      _fn = __bind(function() {
        var col, _ref2, _results;
        _results = [];
        for (col = 0, _ref2 = numCols - 2; 0 <= _ref2 ? col <= _ref2 : col >= _ref2; 0 <= _ref2 ? col++ : col--) {
          _results.push(__bind(function() {
            var type;
            type = "" + m[row][col] + m[row][col + 1] + m[row + 1][col] + m[row + 1][col + 1];
            return this.tiles.push(new Tile(this.sprite, type, row, col));
          }, this)());
        }
        return _results;
      }, this);
      for (row = 0, _ref = numRows - 2; 0 <= _ref ? row <= _ref : row >= _ref; 0 <= _ref ? row++ : row--) {
        _fn();
      }
    }
    Map.prototype.render = function(ctx) {
      var tile, _i, _len, _ref, _results;
      _ref = this.tiles;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tile = _ref[_i];
        _results.push((function(tile) {
          return tile.render(ctx);
        })(tile));
      }
      return _results;
    };
    return Map;
  })();
  Tile = (function() {
    function Tile(sprite, type, row, col) {
      this.sprite = sprite;
      this.type = type;
      this.row = row;
      this.col = col;
    }
    Tile.prototype.render = function(ctx) {
      ctx.save();
      ctx.translate(this.col * 128, this.row * 128);
      this.sprite.render(this.type, ctx);
      return ctx.restore();
    };
    return Tile;
  })();
  Spaceship = (function() {
    function Spaceship() {
      this.state = "normal";
      this.sprite = new Sprite("assets/images/test.png", 50, 50, 250);
      this.sprite.addAnimation("normal", {
        frames: [0, 1, 2, 3, 4].shuffle(),
        fps: 3,
        loop: true,
        callback: this.hello
      });
      this.coor = new Vector(Math.random() * 1024, Math.random() * 768);
      this.speed = new Vector(0.1, 0.1);
      if (Math.random() > 0.5) {
        this.speed = this.speed.mult(-1);
      }
    }
    Spaceship.prototype.update = function(delta) {
      this.coor = this.coor.add(this.speed.mult(delta));
      if (this.coor.x > 1024) {
        this.speed.x = this.speed.x * -1;
        this.coor.x = 1024;
      }
      if (this.coor.x < 0) {
        this.speed.x = this.speed.x * -1;
        this.coor.x = 0;
      }
      if (this.coor.y > 768) {
        this.speed.y = this.speed.y * -1;
        this.coor.y = 768;
      }
      if (this.coor.y < 0) {
        this.speed.y = this.speed.y * -1;
        return this.coor.y = 0;
      }
    };
    Spaceship.prototype.render = function(ctx) {
      ctx.save();
      ctx.translate(this.coor.x, this.coor.y);
      this.sprite.render(this.state, ctx);
      return ctx.restore();
    };
    Spaceship.prototype.hello = function() {
      return console.log("hello!");
    };
    return Spaceship;
  })();
  Sprite = (function() {
    function Sprite(file, width, height, texWidth) {
      this.width = width;
      this.height = height;
      this.texWidth = texWidth;
      this.texture = new Image();
      this.texture.src = file;
      this.assets = {};
    }
    Sprite.prototype.addImage = function(name, index) {
      return this.assets[name] = new Shape(this, index);
    };
    Sprite.prototype.addAnimation = function(name, params) {
      return this.assets[name] = new Animation(this, params);
    };
    Sprite.prototype.render = function(name, ctx) {
      return this.assets[name].render(ctx);
    };
    return Sprite;
  })();
  Shape = (function() {
    function Shape(sprite, index) {
      this.sprite = sprite;
      this.sx = (index * this.sprite.width) % this.sprite.texWidth;
      this.sy = Math.floor((index * this.sprite.width) / this.sprite.texWidth) * this.sprite.height;
    }
    Shape.prototype.render = function(ctx) {
      return ctx.drawImage(this.sprite.texture, this.sx, this.sy, this.sprite.width, this.sprite.height, 0, 0, this.sprite.width, this.sprite.height);
    };
    return Shape;
  })();
  Animation = (function() {
    function Animation(sprite, params) {
      var index, _ref, _ref2, _ref3;
      this.sprite = sprite;
      this.fps = (_ref = params["fps"]) != null ? _ref : 30;
      this.loop = (_ref2 = params["loop"]) != null ? _ref2 : true;
      this.callback = (_ref3 = params["callback"]) != null ? _ref3 : null;
      this.frames = (function() {
        var _i, _len, _ref4, _results;
        _ref4 = params["frames"];
        _results = [];
        for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
          index = _ref4[_i];
          _results.push(__bind(function(index) {
            return new Shape(this.sprite, index);
          }, this)(index));
        }
        return _results;
      }).call(this);
      this.lastFrame = this.frames.length - 1;
      this.timer = new Timer;
      this.currentFrame = 0;
      this.playing = true;
    }
    Animation.prototype.render = function(ctx) {
      if (this.playing) {
        this.currentFrame = Math.floor(this.timer.timeSinceLastPunch() / (1000 / this.fps));
        if (this.currentFrame > this.lastFrame) {
          this.callback();
          if (this.loop) {
            this.rewind();
          } else {
            this.currentFrame = this.lastFrame;
            this.stop();
          }
        }
      }
      return this.frames[this.currentFrame].render(ctx);
    };
    Animation.prototype.play = function() {
      return this.playing = true;
    };
    Animation.prototype.stop = function() {
      return this.playing = false;
    };
    Animation.prototype.rewind = function() {
      this.currentFrame = 0;
      return this.timer.punch();
    };
    return Animation;
  })();
  State = (function() {
    function State() {}
    State.prototype.update = function() {};
    State.prototype.draw = function() {};
    return State;
  })();
  StateIntro = (function() {
    __extends(StateIntro, State);
    function StateIntro() {
      var i, _fn;
      this.map = new Map("assets/map.png");
      this.spaceships = [];
      _fn = __bind(function(i) {
        return this.spaceships[i] = new Spaceship;
      }, this);
      for (i = 0; i <= 3; i++) {
        _fn(i);
      }
    }
    StateIntro.prototype.update = function(delta) {
      var spaceship, _i, _len, _ref, _results;
      _ref = this.spaceships;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        spaceship = _ref[_i];
        _results.push(__bind(function(spaceship) {
          return spaceship.update(delta);
        }, this)(spaceship));
      }
      return _results;
    };
    StateIntro.prototype.render = function(ctx) {
      var spaceship, _i, _len, _ref, _results;
      this.map.render(ctx);
      _ref = this.spaceships;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        spaceship = _ref[_i];
        _results.push(__bind(function(spaceship) {
          return spaceship.render(ctx);
        }, this)(spaceship));
      }
      return _results;
    };
    return StateIntro;
  })();
  StateMain = (function() {
    __extends(StateMain, State);
    function StateMain() {}
    StateMain.prototype.update = function() {};
    StateMain.prototype.render = function() {};
    return StateMain;
  })();
  Statemanager = (function() {
    function Statemanager() {
      this.statearray = {};
      this.currentState = null;
    }
    Statemanager.prototype.addState = function(state) {
      switch (state) {
        case "intro":
          this.statearray[state] = new StateIntro;
          break;
        case "main":
          this.statearray[state] = new StateMain;
      }
      if (this.currentState == null) {
        return this.setState(state);
      }
    };
    Statemanager.prototype.setState = function(state) {
      return this.currentState = this.statearray[state];
    };
    return Statemanager;
  })();
  Timer = (function() {
    function Timer() {
      this.last_time = new Date().getTime();
      this.delta = 0;
    }
    Timer.prototype.punch = function() {
      var this_time;
      this_time = new Date().getTime();
      this.delta = this_time - this.last_time;
      this.last_time = this_time;
      return this.delta;
    };
    Timer.prototype.timeSinceLastPunch = function() {
      var this_time;
      this_time = new Date().getTime();
      return this_time - this.last_time;
    };
    Timer.prototype.fps = function() {
      return 1000 / this.delta;
    };
    return Timer;
  })();
  Vector = (function() {
    function Vector(x, y) {
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      this.x = x;
      this.y = y;
    }
    Vector.prototype.clone = function() {
      return new Vector(this.x, this.y);
    };
    Vector.prototype.add = function(vec) {
      return new Vector(this.x + vec.x, this.y + vec.y);
    };
    Vector.prototype.subtract = function(vec) {
      return new Vector(this.x - vec.x, this.y - vec.y);
    };
    Vector.prototype.mult = function(num) {
      return new Vector(this.x * num, this.y * num);
    };
    Vector.prototype.length = function() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vector.prototype.lengthSquared = function() {
      return this.x * this.x + this.y * this.y;
    };
    Vector.prototype.norm = function(factor) {
      var l;
      if (factor == null) {
        factor = 1;
      }
      l = this.length();
      if (l > 0) {
        return this.mult(factor / l);
      } else {
        return null;
      }
    };
    Vector.prototype.scalarProduct = function(vec) {
      return this.x * vec.x + this.y * vec.y;
    };
    Vector.prototype.sameDirection = function(vec) {
      if (this.lengthSquared() < this.add(vec).lengthSquared()) {
        return true;
      } else {
        return false;
      }
    };
    Vector.prototype.angleWith = function(vec) {
      return Math.acos(this.scalarProduct(vec) / this.length() * vec.length());
    };
    Vector.prototype.vectorProduct = function(vec) {
      return this;
    };
    Vector.prototype.projectTo = function(vec) {
      return vec.mult(this.scalarProduct(vec) / vec.lengthSquared());
    };
    Vector.intersecting = function(oa, a, ob, b) {
      var c, col, l, m, mu, mult, n;
      c = ob.subtract(oa);
      b = b.mult(-1);
      col = [];
      col[0] = a.clone();
      col[1] = b.clone();
      col[2] = c.clone();
      l = 0;
      m = 1;
      n = 2;
      mult = col[0].y / col[0].x;
      col[0].y = 0;
      col[1].y = col[1].y - (mult * col[1].x);
      col[2].y = col[2].y - (mult * col[2].x);
      mu = col[n].y / col[m].y;
      return ob.subtract(b.mult(mu));
    };
    Vector.prototype.print = function() {
      return "(" + this.x + ", " + this.y + ")";
    };
    return Vector;
  })();
}).call(this);
