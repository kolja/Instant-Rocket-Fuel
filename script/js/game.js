(function() {
  var Animation, Asteroids, Background, Camera, Game, Hero, Map, Shape, Spaceship, Sprite, State, StateBigBackground, StateHeight, StateIso, StateJumpNRun, StateMaze, Statemanager, Tile, Timer, Vector, root, stateclass;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  root = this;
  stateclass = {};
  Array.prototype.shuffle = function() {
    return this.sort(function() {
      return 0.5 - Math.random();
    });
  };
  Number.prototype.toHex = function(padding) {
    var hex;
    if (padding == null) {
      padding = 2;
    }
    hex = this.toString(16);
    while (hex.length < padding) {
      hex = "0" + hex;
    }
    return hex;
  };
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
  Game = (function() {
    function Game(width, height) {
      var canvas;
      this.width = width;
      this.height = height;
      this.gameloop = __bind(this.gameloop, this);
      canvas = $('<canvas/>').attr({
        "width": this.width,
        "height": this.height
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
  Map = (function() {
    function Map(hash) {
      this.sprite = hash["sprite"];
      this.tiles = [];
      this.width = 0;
      this.height = 0;
      this.loadMapDataFromImage(hash["mapfile"], hash["pattern"]);
    }
    Map.prototype.render = function(ctx) {
      var tile, _i, _len, _ref, _results;
      _ref = this.tiles;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tile = _ref[_i];
        _results.push(tile.render(ctx));
      }
      return _results;
    };
    Map.prototype.loadMapDataFromImage = function(file, pattern) {
      var m, map;
      map = new Image();
      map.src = file;
      m = [];
      return $(map).load(__bind(function() {
        var canvas, col, ctx, data, green, i, p, row, type, z, _len, _ref, _ref2, _ref3, _ref4, _results, _results2, _results3, _step, _step2;
        canvas = document.createElement("canvas");
        this.width = map.width;
        this.height = map.height;
        canvas.width = map.width;
        canvas.height = map.height;
        ctx = canvas.getContext("2d");
        ctx.drawImage(map, 0, 0);
        data = ctx.getImageData(0, 0, map.width, map.height).data;
        for (i = 0, _len = data.length, _step = 4; i < _len; i += _step) {
          p = data[i];
          row = Math.floor((i / 4) / map.width);
                    if ((_ref = m[row]) != null) {
            _ref;
          } else {
            m[row] = [];
          };
          m[row].push([Number(data[i]).toHex(), Number(data[i + 1]).toHex(), Number(data[i + 2]).toHex(), Number(data[i + 3]).toHex()]);
        }
        switch (pattern) {
          case "simple":
            _results = [];
            for (row = 0, _ref2 = map.height - 1; 0 <= _ref2 ? row <= _ref2 : row >= _ref2; 0 <= _ref2 ? row++ : row--) {
              _results.push((function() {
                var _ref3, _results2;
                _results2 = [];
                for (col = 0, _ref3 = map.width - 1; 0 <= _ref3 ? col <= _ref3 : col >= _ref3; 0 <= _ref3 ? col++ : col--) {
                  type = "" + m[row][col][0];
                  green = parseInt(m[row][col][1], 16);
                  z = parseInt(m[row][col][2], 16);
                  _results2.push(this.tiles.push(new Tile(this.sprite, type, row, col, green, z)));
                }
                return _results2;
              }).call(this));
            }
            return _results;
            break;
          case "square":
            _results2 = [];
            for (row = 0, _ref3 = map.height - 2; 0 <= _ref3 ? row <= _ref3 : row >= _ref3; 0 <= _ref3 ? row++ : row--) {
              _results2.push((function() {
                var _ref4, _results3;
                _results3 = [];
                for (col = 0, _ref4 = map.width - 2; 0 <= _ref4 ? col <= _ref4 : col >= _ref4; 0 <= _ref4 ? col++ : col--) {
                  type = "" + m[row][col][0] + m[row][col + 1][0] + m[row + 1][col][0] + m[row + 1][col + 1][0];
                  green = parseInt(m[row][col][1], 16);
                  z = parseInt(m[row][col][2], 16);
                  _results3.push(this.tiles.push(new Tile(this.sprite, type, row, col, green, z)));
                }
                return _results3;
              }).call(this));
            }
            return _results2;
            break;
          case "cross":
            _results3 = [];
            for (row = 1, _ref4 = map.height - 2, _step2 = 2; 1 <= _ref4 ? row <= _ref4 : row >= _ref4; row += _step2) {
              _results3.push((function() {
                var _ref5, _results4, _step3;
                _results4 = [];
                for (col = 1, _ref5 = map.width - 2, _step3 = 2; 1 <= _ref5 ? col <= _ref5 : col >= _ref5; col += _step3) {
                  _results4.push(m[row][col][0] !== "00" ? (type = "" + m[row - 1][col][0] + m[row][col + 1][0] + m[row + 1][col][0] + m[row][col - 1][0], green = parseInt(m[row][col][1], 16), z = parseInt(m[row][col][2], 16), this.tiles.push(new Tile(this.sprite, type, row / 2, col / 2, green, z))) : void 0);
                }
                return _results4;
              }).call(this));
            }
            return _results3;
        }
      }, this));
    };
    Map.prototype.tileAtVector = function(vec) {
      var index, x, y;
      x = Math.floor(vec.x / this.sprite.innerWidth);
      y = Math.floor(vec.y / this.sprite.innerHeight);
      index = y * this.width + x;
      return this.tiles[index];
    };
    return Map;
  })();
  Tile = (function() {
    function Tile(sprite, type, row, col, green, z) {
      this.sprite = sprite;
      this.type = type;
      this.row = row;
      this.col = col;
      this.green = green != null ? green : 0;
      this.z = z != null ? z : 0;
    }
    Tile.prototype.isWalkable = function() {
      return this.green === 0;
    };
    Tile.prototype.render = function(ctx) {
      ctx.save();
      ctx.translate(this.col * this.sprite.innerWidth - this.z, this.row * this.sprite.innerHeight - this.z);
      this.sprite.render(this.type, ctx);
      return ctx.restore();
    };
    return Tile;
  })();
  Background = (function() {
    function Background(sprite) {
      this.sprite = sprite;
      this.sprite.addImage("background", 0);
    }
    Background.prototype.render = function(ctx) {
      return this.sprite.render("background", ctx);
    };
    return Background;
  })();
  Sprite = (function() {
    function Sprite(hash) {
      var i, key, _ref, _ref2, _ref3, _ref4;
      this.assets = {};
      this.width = hash["width"];
      this.height = hash["height"];
      this.texture = new Image();
      this.texture.src = hash["texture"];
      this.key = (_ref = hash["key"]) != null ? _ref : {};
      _ref2 = this.key;
      for (key in _ref2) {
        i = _ref2[key];
        this.addImage(key, i);
      }
      this.innerWidth = (_ref3 = hash["innerWidth"]) != null ? _ref3 : this.width;
      this.innerHeight = (_ref4 = hash["innerHeight"]) != null ? _ref4 : this.height;
    }
    Sprite.prototype.addImage = function(name, index) {
      return $(this.texture).load(__bind(function() {
        this.texWidth = this.texture.width;
        return this.assets[name] = new Shape(this, index);
      }, this));
    };
    Sprite.prototype.addAnimation = function(name, params) {
      return $(this.texture).load(__bind(function() {
        this.texWidth = this.texture.width;
        return this.assets[name] = new Animation(this, params);
      }, this));
    };
    Sprite.prototype.render = function(name, ctx) {
      if (this.assets[name] != null) {
        return this.assets[name].render(ctx);
      }
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
      ctx.save();
      ctx.translate(this.sprite.width / 2, this.sprite.height / 2);
      ctx.drawImage(this.sprite.texture, this.sx, this.sy, this.sprite.width, this.sprite.height, 0, 0, this.sprite.width, this.sprite.height);
      return ctx.restore();
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
          _results.push(new Shape(this.sprite, index));
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
  Statemanager = (function() {
    function Statemanager(parent, states) {
      var state, _i, _len;
      this.parent = parent;
      this.statearray = {};
      this.currentState = null;
      for (_i = 0, _len = states.length; _i < _len; _i++) {
        state = states[_i];
        this.addState(state);
      }
    }
    Statemanager.prototype.addState = function(state) {
      this.statearray[state] = new stateclass[state](this.parent);
      if (this.currentState == null) {
        return this.setState(state);
      }
    };
    Statemanager.prototype.setState = function(state) {
      return this.currentState = this.statearray[state];
    };
    return Statemanager;
  })();
  Camera = (function() {
    function Camera(projection) {
      this.projection = projection;
      this.coor = new Vector(100, 100);
    }
    Camera.prototype.update = function(delta) {};
    Camera.prototype.apply = function(ctx, callback) {
      switch (this.projection) {
        case "normal":
          ctx.save();
          ctx.translate(500 - this.coor.x, 300 - this.coor.y);
          callback();
          return ctx.restore();
        case "iso":
          ctx.save();
          ctx.scale(1, 0.5);
          ctx.rotate(Math.PI / 4);
          ctx.translate(200, -400);
          callback();
          return ctx.restore();
      }
    };
    return Camera;
  })();
  Asteroids = (function() {
    __extends(Asteroids, Game);
    function Asteroids(width, height) {
      Asteroids.__super__.constructor.call(this, width, height);
      this.stateManager = new Statemanager(this, ["bigbg", "jumpnrun", "iso", "maze", "height"]);
      this.stateManager.setState("jumpnrun");
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
  stateclass["bigbg"] = StateBigBackground = (function() {
    __extends(StateBigBackground, State);
    function StateBigBackground(parent) {
      var backgroundsprite, i;
      this.parent = parent;
      console.log("width: " + this.parent.width + " -- height: " + this.parent.height);
      backgroundsprite = new Sprite({
        "texture": "assets/images/weltraum.jpg",
        "width": 500,
        "height": 500
      });
      this.background = new Background(backgroundsprite);
      this.spaceships = [];
      for (i = 0; i <= 3; i++) {
        this.spaceships[i] = new Spaceship;
      }
    }
    StateBigBackground.prototype.update = function(delta) {
      var spaceship, _i, _len, _ref, _results;
      _ref = this.spaceships;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        spaceship = _ref[_i];
        _results.push(spaceship.update(delta));
      }
      return _results;
    };
    StateBigBackground.prototype.render = function(ctx) {
      var spaceship, _i, _len, _ref, _results;
      this.background.render(ctx);
      _ref = this.spaceships;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        spaceship = _ref[_i];
        _results.push(spaceship.render(ctx));
      }
      return _results;
    };
    return StateBigBackground;
  })();
  stateclass["height"] = StateHeight = (function() {
    __extends(StateHeight, State);
    function StateHeight(parent) {
      var simple;
      this.parent = parent;
      simple = new Sprite({
        "texture": "assets/images/beach3d.png",
        "width": 107,
        "height": 107,
        "innerWidth": 87,
        "innerHeight": 87,
        "key": {
          "00": 12,
          "dd": 12
        }
      });
      this.background = new Map({
        "mapfile": "assets/minimap.png",
        "pattern": "simple",
        "sprite": simple
      });
    }
    StateHeight.prototype.update = function(delta) {};
    StateHeight.prototype.render = function(ctx) {
      return this.background.render(ctx);
    };
    return StateHeight;
  })();
  stateclass["iso"] = StateIso = (function() {
    __extends(StateIso, State);
    function StateIso(parent) {
      var beach3d;
      this.parent = parent;
      beach3d = new Sprite({
        "texture": "assets/images/beach3d.png",
        "width": 107,
        "height": 107,
        "innerWidth": 87,
        "innerHeight": 87,
        "key": {
          "dd00dddd": 0,
          "00dddddd": 1,
          "dddd00dd": 2,
          "dddddd00": 3,
          "dd00dd00": 4,
          "0000dddd": 5,
          "00dd00dd": 6,
          "dddd0000": 7,
          "0000dd00": 8,
          "000000dd": 9,
          "00dd0000": 10,
          "dd000000": 11,
          "dddddddd": 12,
          "00000000": 13,
          "dd0000dd": 14,
          "00dddd00": 15
        }
      });
      this.background = new Map({
        "mapfile": "assets/map.png",
        "pattern": "square",
        "sprite": beach3d
      });
    }
    StateIso.prototype.update = function(delta) {};
    StateIso.prototype.render = function(ctx) {
      return this.background.render(ctx);
    };
    return StateIso;
  })();
  stateclass["jumpnrun"] = StateJumpNRun = (function() {
    __extends(StateJumpNRun, State);
    function StateJumpNRun(parent) {
      var i, jumpnrunSprite;
      this.parent = parent;
      this.hero = new Hero;
      jumpnrunSprite = new Sprite({
        "texture": "assets/images/jumpnrun.png",
        "width": 100,
        "height": 100,
        "innerWidth": 95,
        "innerHeight": 95,
        "key": {
          "00": 0,
          "11": 1,
          '22': 2,
          "33": 3,
          "44": 4,
          '55': 5,
          "66": 6,
          "77": 7,
          '88': 8,
          "99": 9,
          "aa": 10,
          'bb': 11
        }
      });
      this.background = new Map({
        "mapfile": "assets/jumpnrun_map.png",
        "pattern": "simple",
        "sprite": jumpnrunSprite
      });
      this.spaceships = [];
      for (i = 0; i <= 3; i++) {
        this.spaceships[i] = new Spaceship;
      }
    }
    StateJumpNRun.prototype.update = function(delta) {
      var spaceship, _i, _len, _ref, _results;
      this.hero.update(delta, this.background);
      _ref = this.spaceships;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        spaceship = _ref[_i];
        _results.push(spaceship.update(delta));
      }
      return _results;
    };
    StateJumpNRun.prototype.render = function(ctx) {
      return this.hero.camera.apply(ctx, __bind(function() {
        var spaceship, _i, _len, _ref, _results;
        this.background.render(ctx);
        this.hero.render(ctx);
        _ref = this.spaceships;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          spaceship = _ref[_i];
          _results.push(spaceship.render(ctx));
        }
        return _results;
      }, this));
    };
    return StateJumpNRun;
  })();
  stateclass["maze"] = StateMaze = (function() {
    __extends(StateMaze, State);
    function StateMaze(parent) {
      var i, maze;
      this.parent = parent;
      maze = new Sprite({
        "texture": "assets/images/walls.png",
        "width": 100,
        "height": 100,
        "innerWidth": 50,
        "innerHeight": 50,
        "key": {
          "dddddddd": 0,
          "dd00dddd": 1,
          "dddd00dd": 2,
          "dddddd00": 3,
          "00dddddd": 4,
          "00000000": 5,
          "00dddd00": 6,
          "0000dddd": 7,
          "dd0000dd": 8,
          "dddd0000": 9,
          "00dd00dd": 12,
          "dd00dd00": 13,
          "00dd0000": 14,
          "0000dd00": 15,
          "000000dd": 16,
          "dd000000": 17
        }
      });
      this.background = new Map({
        "mapfile": "assets/maze.png",
        "pattern": "cross",
        "sprite": maze
      });
      this.spaceships = [];
      for (i = 0; i <= 3; i++) {
        this.spaceships[i] = new Spaceship;
      }
    }
    StateMaze.prototype.update = function(delta) {
      var spaceship, _i, _len, _ref, _results;
      _ref = this.spaceships;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        spaceship = _ref[_i];
        _results.push(spaceship.update(delta));
      }
      return _results;
    };
    StateMaze.prototype.render = function(ctx) {
      var spaceship, _i, _len, _ref, _results;
      this.background.render(ctx);
      _ref = this.spaceships;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        spaceship = _ref[_i];
        _results.push(spaceship.render(ctx));
      }
      return _results;
    };
    return StateMaze;
  })();
  Spaceship = (function() {
    function Spaceship() {
      this.state = "normal";
      this.sprite = new Sprite({
        "texture": "assets/images/test.png",
        "width": 50,
        "height": 50
      });
      this.sprite.addImage("normal", Math.floor(Math.random() * 10));
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
  Hero = (function() {
    function Hero() {
      var direction, _i, _len, _ref;
      this.state = "normal";
      this.sprite = new Sprite({
        "texture": "assets/images/test.png",
        "width": 50,
        "height": 50,
        "key": {
          "normal": 3,
          "jumping": 5
        }
      });
      this.coor = new Vector(100, 100);
      this.speed = new Vector(0, 0);
      this.force = 0.01;
      this.gravity = 0.01;
      this.camera = new Camera("normal");
      this.key = [];
      _ref = ['left', 'up', 'right', 'down', 'space'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        direction = _ref[_i];
        this.key[direction] = false;
      }
      $("html").bind("keydown", __bind(function(event) {
        var directions;
        directions = {
          37: "left",
          38: "up",
          39: "right",
          40: "down",
          32: "space"
        };
        return this.key[directions[event.which]] = true;
      }, this));
      $("html").bind("keyup", __bind(function(event) {
        var directions;
        directions = {
          37: "left",
          38: "up",
          39: "right",
          40: "down",
          32: "space"
        };
        return this.key[directions[event.which]] = false;
      }, this));
    }
    Hero.prototype.update = function(delta, map) {
      if (map.tileAtVector(this.coor).isWalkable()) {
        this.speed.y += this.gravity;
      } else {
        this.speed.y = 0;
        this.state = "normal";
      }
      if (this.key["right"]) {
        this.speed.x += this.force;
      } else if (this.key["left"]) {
        this.speed.x -= this.force;
      } else {
        if (this.speed.x > 0) {
          this.speed.x -= this.force;
        } else {
          this.speed.x += this.force;
        }
      }
      if (this.key["space"] && this.state !== "jumping") {
        this.state = "jumping";
        this.speed.y = -0.5;
      }
      this.coor = this.coor.add(this.speed.mult(delta));
      return this.camera.coor = this.coor;
    };
    Hero.prototype.render = function(ctx) {
      ctx.save();
      ctx.translate(this.coor.x, this.coor.y);
      this.sprite.render(this.state, ctx);
      return ctx.restore();
    };
    return Hero;
  })();
}).call(this);
