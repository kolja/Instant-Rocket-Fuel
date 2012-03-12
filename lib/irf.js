(function() {
  var Animation, Background, BoundingBox, Camera, EventManager, Game, Keyboard, Map, Scene, SceneManager, Shape, Sprite, Tile, Timer, Vector, c, classes, root, sceneclass, _i, _len;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
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
  BoundingBox = (function() {
    function BoundingBox(coor, dim, color) {
      var _ref, _ref2;
      this.coor = coor;
      this.dim = dim;
      this.color = color != null ? color : "grey";
      if ((_ref = this.coor) == null) {
        this.coor = new Vector;
      }
      if ((_ref2 = this.dim) == null) {
        this.dim = new Vector;
      }
    }
    BoundingBox.prototype.intersect = function(otherBB) {
      return this.intersectv(otherBB) && this.intersecth(otherBB);
    };
    BoundingBox.prototype.intersectv = function(otherBB) {
      if (this.coor.y < otherBB.coor.y) {
        if (((this.dim.y + otherBB.dim.y) / 2) < (otherBB.coor.y - this.coor.y)) {
          return false;
        } else {
          return true;
        }
      } else {
        if (((this.dim.y + otherBB.dim.y) / 2) < (this.coor.y - otherBB.coor.y)) {
          return false;
        } else {
          return true;
        }
      }
    };
    BoundingBox.prototype.intersecth = function(otherBB) {
      if (this.coor.x < otherBB.coor.x) {
        if (((this.dim.x + otherBB.dim.x) / 2) < (otherBB.coor.x - this.coor.x)) {
          return false;
        } else {
          return true;
        }
      } else {
        if (((this.dim.x + otherBB.dim.x) / 2) < (this.coor.x - otherBB.coor.x)) {
          return false;
        } else {
          return true;
        }
      }
    };
    BoundingBox.prototype.render = function(ctx) {
      ctx.strokeStyle = this.color;
      return ctx.strokeRect(this.coor.x - this.dim.x / 2, this.coor.y - this.dim.y / 2, this.dim.x, this.dim.y);
    };
    return BoundingBox;
  })();
  Camera = (function() {
    function Camera(hash) {
      var _ref;
      this.projection = hash["projection"];
      this.vpWidth = hash["vpWidth"];
      this.vpHeight = hash["vpHeight"];
      this.zoomFactor = (_ref = hash["zoomFactor"]) != null ? _ref : 1;
      this.coor = new Vector(100, 100);
    }
    Camera.prototype.update = function(delta) {};
    Camera.prototype.apply = function(ctx, callback) {
      switch (this.projection) {
        case "normal":
          ctx.save();
          ctx.translate(this.vpWidth / 2 - this.coor.x, this.vpHeight / 2 - this.coor.y);
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
  EventManager = (function() {
    function EventManager() {
      this.eventlist = {};
    }
    EventManager.prototype.register = function(event, callback) {
      if (this.eventlist[event] == null) {
        this.eventlist[event] = [];
      }
      return this.eventlist[event].push(callback);
    };
    EventManager.prototype.trigger = function(event, origin) {
      var callback, _i, _len, _ref, _results;
      _ref = this.eventlist[event];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        callback = _ref[_i];
        _results.push(callback(origin));
      }
      return _results;
    };
    return EventManager;
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
      return this.ctx.clearRect(0, 0, this.width, this.height);
    };
    return Game;
  })();
  root = this;
  sceneclass = {};
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
  Keyboard = (function() {
    function Keyboard() {
      var code, name, _ref;
      this.mapping = {
        8: "backspace",
        9: "tab",
        13: "return",
        16: "shift",
        17: "ctrl",
        18: "alt",
        27: "esc",
        32: "space",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        48: "0",
        49: "1",
        49: "1",
        49: "1",
        49: "1",
        49: "1",
        49: "6",
        49: "7",
        49: "8",
        57: "9",
        65: "a",
        66: "b",
        67: "c",
        68: "d",
        69: "e",
        70: "f",
        71: "g",
        72: "h",
        73: "i",
        74: "j",
        75: "k",
        76: "l",
        77: "m",
        78: "n",
        79: "o",
        80: "p",
        81: "q",
        82: "r",
        83: "s",
        84: "t",
        85: "u",
        87: "w",
        88: "x",
        89: "y",
        90: "z",
        93: "cmd",
        188: ",",
        190: "."
      };
      this.keyarray = [];
      _ref = this.mapping;
      for (code in _ref) {
        name = _ref[code];
        this.keyarray[name] = false;
      }
      $("html").bind("keydown", __bind(function(event) {
        return this.keyarray[this.mapping[event.which]] = true;
      }, this));
      $("html").bind("keyup", __bind(function(event) {
        return this.keyarray[this.mapping[event.which]] = false;
      }, this));
    }
    Keyboard.prototype.key = function(which) {
      return this.keyarray[which];
    };
    Keyboard.prototype.check = function() {
      return this.keyarray;
    };
    return Keyboard;
  })();
  Map = (function() {
    function Map(hash) {
      this.sprite = hash["sprite"];
      this.tiles = [];
      this.width = 0;
      this.height = 0;
      if (typeof hash["pattern"] === "function") {
        this.read = hash["pattern"];
      } else {
        switch (hash["pattern"]) {
          case "simple":
            this.read = this.readSimple;
            break;
          case "square":
            this.read = this.readSquare;
            break;
          case "cross":
            this.read = this.readCross;
        }
      }
      this.map = new Image();
      this.map.src = hash["mapfile"];
      this.mapData = [];
      this.loadMapDataFromImage();
    }
    Map.prototype.render = function(ctx, camera) {
      var tile, _i, _len, _ref, _results;
      _ref = this.tiles;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tile = _ref[_i];
        _results.push(tile.squaredDistanceTo(camera.coor) < 100000 ? tile.render(ctx) : void 0);
      }
      return _results;
    };
    Map.prototype.loadMapDataFromImage = function() {
      return $(this.map).load(__bind(function() {
        var canvas, ctx, data, i, index, p, row, tile, _base, _len, _len2, _ref, _ref2, _results, _step;
        canvas = document.createElement("canvas");
        this.width = this.map.width;
        this.height = this.map.height;
        canvas.width = this.map.width;
        canvas.height = this.map.height;
        ctx = canvas.getContext("2d");
        ctx.drawImage(this.map, 0, 0);
        data = ctx.getImageData(0, 0, this.map.width, this.map.height).data;
        for (i = 0, _len = data.length, _step = 4; i < _len; i += _step) {
          p = data[i];
          row = Math.floor((i / 4) / this.map.width);
          if ((_ref = (_base = this.mapData)[row]) == null) {
            _base[row] = [];
          }
          this.mapData[row].push([Number(data[i]).toHex(), Number(data[i + 1]).toHex(), Number(data[i + 2]).toHex(), Number(data[i + 3]).toHex()]);
        }
        this.read();
        _ref2 = this.tiles;
        _results = [];
        for (index = 0, _len2 = _ref2.length; index < _len2; index++) {
          tile = _ref2[index];
          tile.neighbor["w"] = this.tiles[index - 1];
          tile.neighbor["e"] = this.tiles[index + 1];
          tile.neighbor["n"] = this.tiles[index - this.width];
          _results.push(tile.neighbor["s"] = this.tiles[index + this.width]);
        }
        return _results;
      }, this));
    };
    Map.prototype.readSimple = function() {
      var col, green, row, type, z, _ref, _results;
      _results = [];
      for (row = 0, _ref = this.map.height - 1; 0 <= _ref ? row <= _ref : row >= _ref; 0 <= _ref ? row++ : row--) {
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (col = 0, _ref2 = this.map.width - 1; 0 <= _ref2 ? col <= _ref2 : col >= _ref2; 0 <= _ref2 ? col++ : col--) {
            type = "" + this.mapData[row][col][0];
            green = parseInt(this.mapData[row][col][1], 16);
            z = parseInt(this.mapData[row][col][2], 16);
            _results2.push(this.tiles.push(new Tile(this.sprite, type, row, col, green, z)));
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };
    Map.prototype.readSquare = function() {
      var col, green, row, type, z, _ref, _results;
      _results = [];
      for (row = 0, _ref = this.map.height - 2; 0 <= _ref ? row <= _ref : row >= _ref; 0 <= _ref ? row++ : row--) {
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (col = 0, _ref2 = this.map.width - 2; 0 <= _ref2 ? col <= _ref2 : col >= _ref2; 0 <= _ref2 ? col++ : col--) {
            type = "" + this.mapData[row][col][0] + this.mapData[row][col + 1][0] + this.mapData[row + 1][col][0] + this.mapData[row + 1][col + 1][0];
            green = parseInt(this.mapData[row][col][1], 16);
            z = parseInt(this.mapData[row][col][2], 16);
            _results2.push(this.tiles.push(new Tile(this.sprite, type, row, col, green, z)));
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };
    Map.prototype.readCross = function() {
      var col, green, row, type, z, _ref, _results;
      _results = [];
      for (row = 1, _ref = this.map.height - 2; row <= _ref; row += 2) {
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (col = 1, _ref2 = this.map.width - 2; col <= _ref2; col += 2) {
            _results2.push(this.mapData[row][col][0] !== "00" ? (type = "" + this.mapData[row - 1][col][0] + this.mapData[row][col + 1][0] + this.mapData[row + 1][col][0] + this.mapData[row][col - 1][0], green = parseInt(this.mapData[row][col][1], 16), z = parseInt(this.mapData[row][col][2], 16), this.tiles.push(new Tile(this.sprite, type, row / 2, col / 2, green, z))) : void 0);
          }
          return _results2;
        }).call(this));
      }
      return _results;
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
      this.neighbor = [];
      this.x = this.col * this.sprite.innerWidth + this.sprite.innerWidth / 2;
      this.y = this.row * this.sprite.innerHeight + this.sprite.innerHeight / 2;
      this.bb = new BoundingBox(new Vector(this.x, this.y), new Vector(this.sprite.innerWidth, this.sprite.innerHeight));
      this.bb.color = "green";
    }
    Tile.prototype.isWalkable = function() {
      return this.green === 0;
    };
    Tile.prototype.squaredDistanceTo = function(vec) {
      return vec.subtract(new Vector(this.x, this.y)).lengthSquared();
    };
    Tile.prototype.render = function(ctx) {
      ctx.save();
      ctx.translate(this.x - this.z, this.y - this.z);
      this.sprite.render(this.type, ctx);
      ctx.restore();
      return this.bb.render(ctx);
    };
    return Tile;
  })();
  Scene = (function() {
    function Scene() {}
    Scene.prototype.update = function() {};
    Scene.prototype.render = function() {};
    return Scene;
  })();
  SceneManager = (function() {
    function SceneManager(parent, scenes) {
      var klass, name;
      this.parent = parent;
      this.scenearray = {};
      this.currentScene = null;
      for (name in scenes) {
        klass = scenes[name];
        this.addScene(name, klass);
      }
    }
    SceneManager.prototype.addScene = function(name, klass) {
      this.scenearray[name] = new klass(this.parent);
      if (this.currentScene == null) {
        return this.setScene(name);
      }
    };
    SceneManager.prototype.setScene = function(scene) {
      return this.currentScene = this.scenearray[scene];
    };
    return SceneManager;
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
      ctx.translate(-this.sprite.width / 2, -this.sprite.height / 2);
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
          if (typeof this.callback === "function") {
            this.callback();
          }
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
    Vector.prototype.add_ = function(vec) {
      this.x += vec.x;
      return this.y += vec.y;
    };
    Vector.prototype.subtract = function(vec) {
      return new Vector(this.x - vec.x, this.y - vec.y);
    };
    Vector.prototype.subtract_ = function(vec) {
      this.x -= vec.x;
      return this.y -= vec.y;
    };
    Vector.prototype.mult = function(num) {
      return new Vector(this.x * num, this.y * num);
    };
    Vector.prototype.mult_ = function(num) {
      this.x *= num;
      return this.y *= num;
    };
    Vector.prototype.length = function() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vector.prototype.lengthSquared = function() {
      return this.x * this.x + this.y * this.y;
    };
    Vector.prototype.norm = function(factor) {
      if (factor == null) {
        factor = 1;
      }
      if (this.length() > 0) {
        return this.mult(factor / l);
      } else {
        return null;
      }
    };
    Vector.prototype.norm_ = function(factor) {
      if (factor == null) {
        factor = 1;
      }
      if (this.length() > 0) {
        return this.mult_(factor / l);
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
    Vector.prototype.projectTo_ = function(vec) {
      var m;
      m = this.scalarProduct(vec) / vec.lengthSquared();
      this.x *= m;
      return this.y *= m;
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
  classes = ["Background", "BoundingBox", "Camera", "EventManager", "Game", "Keyboard", "Map", "Scene", "SceneManager", "Sprite", "Shape", "Animation", "Tile", "Timer", "Vector"];
  this.IRF = {};
  for (_i = 0, _len = classes.length; _i < _len; _i++) {
    c = classes[_i];
    this.IRF[c] = eval(c);
  }
}).call(this);
