!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.irf=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Animation, Shape, Timer;

Shape = require('./shape.coffee');

Timer = require('./timer.coffee');

Animation = (function() {
  function Animation(sprite, params) {
    var index, _ref, _ref1, _ref2;
    this.sprite = sprite;
    this.fps = (_ref = params["fps"]) != null ? _ref : 30;
    this.loop = (_ref1 = params["loop"]) != null ? _ref1 : true;
    this.callback = (_ref2 = params["callback"]) != null ? _ref2 : null;
    this.frames = (function() {
      var _i, _len, _ref3, _results;
      _ref3 = params["frames"];
      _results = [];
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        index = _ref3[_i];
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

module.exports = Animation;


},{"./shape.coffee":14,"./timer.coffee":17}],2:[function(require,module,exports){
var Background;

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

module.exports = Background;


},{}],3:[function(require,module,exports){
var BoundingBox, Vector;

Vector = require('./vector.coffee');

BoundingBox = (function() {
  function BoundingBox(coor, dim, color) {
    this.coor = coor;
    this.dim = dim;
    this.color = color != null ? color : "grey";
    if (this.coor == null) {
      this.coor = new Vector;
    }
    if (this.dim == null) {
      this.dim = new Vector;
    }
    ({
      intersect: function(otherBB) {
        return this.intersectv(otherBB) && this.intersecth(otherBB);
      },
      intersectv: function(otherBB) {
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
      },
      intersecth: function(otherBB) {
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
      },
      render: function(ctx) {
        ctx.strokeStyle = this.color;
        return ctx.strokeRect(this.coor.x - this.dim.x / 2, this.coor.y - this.dim.y / 2, this.dim.x, this.dim.y);
      }
    });
  }

  return BoundingBox;

})();

module.exports = BoundingBox;


},{"./vector.coffee":18}],4:[function(require,module,exports){
var BoundingBox, Vector;

Vector = require('./vector.coffee');

BoundingBox = (function() {
  function BoundingBox(coor, dim, color) {
    this.coor = coor;
    this.dim = dim;
    this.color = color != null ? color : "grey";
    if (this.coor == null) {
      this.coor = new Vector;
    }
    if (this.dim == null) {
      this.dim = new Vector;
    }
    ({
      intersect: function(otherBB) {
        return this.intersectv(otherBB) && this.intersecth(otherBB);
      },
      intersectv: function(otherBB) {
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
      },
      intersecth: function(otherBB) {
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
      },
      render: function(ctx) {
        ctx.strokeStyle = this.color;
        return ctx.strokeRect(this.coor.x - this.dim.x / 2, this.coor.y - this.dim.y / 2, this.dim.x, this.dim.y);
      }
    });
  }

  return BoundingBox;

})();

module.exports = BoundingBox;


},{"./vector.coffee":18}],5:[function(require,module,exports){
var Camera;

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

module.exports = Camera;


},{}],6:[function(require,module,exports){
var EventManager;

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

module.exports = EventManager;


},{}],7:[function(require,module,exports){
var Game, SceneManager,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

SceneManager = require('./scenemanager.coffee');

Game = (function() {
  Game.addScene = function(scene) {
    if (this.sceneManager == null) {
      this.sceneManager = new SceneManager();
    }
    return this.sceneManager.addScene(scene);
  };

  function Game(params) {
    this.gameloop = __bind(this.gameloop, this);
    var canvas;
    this.params = Helpers.extend({
      "width": 800,
      "height": 600
    }, params);
    canvas = $('<canvas/>').attr({
      "width": this.params.width,
      "height": this.params.height
    });
    $("body").append(canvas);
    this.ctx = canvas[0].getContext('2d');
    this.ctx.font = '400 18px Helvetica, sans-serif';
    this.loop = null;
    this.timer = new Timer;
    this.sceneManager = this.constructor.sceneManager || new SceneManager();
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
    return this.ctx.clearRect(0, 0, this.params.width, this.params.height);
  };

  return Game;

})();

module.exports = Game;


},{"./scenemanager.coffee":13}],8:[function(require,module,exports){
var Helpers;

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

Helpers = (function() {
  function Helpers() {}

  Helpers.extend = function(object, properties) {
    var key, val;
    for (key in properties) {
      val = properties[key];
      object[key] = val;
    }
    return object;
  };

  return Helpers;

})();

module.exports = Helpers;


},{}],9:[function(require,module,exports){
module.exports = {
  animation: require('./animation.coffee'),
  background: require('./background.coffee'),
  boundingbox: require('./boundingbox.coffee'),
  camera: require('./camera.coffee'),
  eventmanager: require('./eventmanager.coffee'),
  game: require('./game.coffee'),
  helpers: require('./helpers.coffee'),
  keyboard: require('./keyboard.coffee'),
  map: require('./map.coffee'),
  scene: require('./scene.coffee'),
  scenemanager: require('./scenemanager.coffee'),
  shape: require('./shape.coffee'),
  sprite: require('./sprite.coffee'),
  tile: require('./tile.coffee'),
  timer: require('./timer.coffee'),
  vector: require('./vector.coffee')
};


},{"./animation.coffee":1,"./background.coffee":2,"./boundingbox.coffee":4,"./camera.coffee":5,"./eventmanager.coffee":6,"./game.coffee":7,"./helpers.coffee":8,"./keyboard.coffee":10,"./map.coffee":11,"./scene.coffee":12,"./scenemanager.coffee":13,"./shape.coffee":14,"./sprite.coffee":15,"./tile.coffee":16,"./timer.coffee":17,"./vector.coffee":18}],10:[function(require,module,exports){
var Keyboard;

Keyboard = (function() {
  var code, name, _ref,
    _this = this;

  function Keyboard() {
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
  }

  Keyboard.keyarray = [];

  _ref = Keyboard.mapping;
  for (code in _ref) {
    name = _ref[code];
    Keyboard.keyarray[name] = false;
  }

  $("html").bind("keydown", function(event) {
    return Keyboard.keyarray[Keyboard.mapping[event.which]] = true;
  });

  $("html").bind("keyup", function(event) {
    return Keyboard.keyarray[Keyboard.mapping[event.which]] = false;
  });

  Keyboard.prototype.key = function(which) {
    return this.keyarray[which];
  };

  Keyboard.prototype.check = function() {
    return this.keyarray;
  };

  return Keyboard;

}).call(this);

module.exports = Keyboard;


},{}],11:[function(require,module,exports){
var Map, Tile;

Tile = require('./tile.coffee');

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
      if (tile.squaredDistanceTo(camera.coor) < 100000) {
        _results.push(tile.render(ctx));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Map.prototype.loadMapDataFromImage = function() {
    var _this = this;
    return $(this.map).load(function() {
      var canvas, ctx, data, i, index, p, row, tile, _base, _i, _j, _len, _len1, _ref, _results;
      canvas = document.createElement("canvas");
      _this.width = _this.map.width;
      _this.height = _this.map.height;
      canvas.width = _this.map.width;
      canvas.height = _this.map.height;
      ctx = canvas.getContext("2d");
      ctx.drawImage(_this.map, 0, 0);
      data = ctx.getImageData(0, 0, _this.map.width, _this.map.height).data;
      for (i = _i = 0, _len = data.length; _i < _len; i = _i += 4) {
        p = data[i];
        row = Math.floor((i / 4) / _this.map.width);
        if ((_base = _this.mapData)[row] == null) {
          _base[row] = [];
        }
        _this.mapData[row].push([Number(data[i]).toHex(), Number(data[i + 1]).toHex(), Number(data[i + 2]).toHex(), Number(data[i + 3]).toHex()]);
      }
      _this.read();
      _ref = _this.tiles;
      _results = [];
      for (index = _j = 0, _len1 = _ref.length; _j < _len1; index = ++_j) {
        tile = _ref[index];
        tile.neighbor["w"] = _this.tiles[index - 1];
        tile.neighbor["e"] = _this.tiles[index + 1];
        tile.neighbor["n"] = _this.tiles[index - _this.width];
        _results.push(tile.neighbor["s"] = _this.tiles[index + _this.width]);
      }
      return _results;
    });
  };

  Map.prototype.readSimple = function() {
    var col, green, row, type, z, _i, _ref, _results;
    _results = [];
    for (row = _i = 0, _ref = this.map.height - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; row = 0 <= _ref ? ++_i : --_i) {
      _results.push((function() {
        var _j, _ref1, _results1;
        _results1 = [];
        for (col = _j = 0, _ref1 = this.map.width - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; col = 0 <= _ref1 ? ++_j : --_j) {
          type = "" + this.mapData[row][col][0];
          green = parseInt(this.mapData[row][col][1], 16);
          z = parseInt(this.mapData[row][col][2], 16);
          _results1.push(this.tiles.push(new Tile(this.sprite, type, row, col, green, z)));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

  Map.prototype.readSquare = function() {
    var col, green, row, type, z, _i, _ref, _results;
    _results = [];
    for (row = _i = 0, _ref = this.map.height - 2; 0 <= _ref ? _i <= _ref : _i >= _ref; row = 0 <= _ref ? ++_i : --_i) {
      _results.push((function() {
        var _j, _ref1, _results1;
        _results1 = [];
        for (col = _j = 0, _ref1 = this.map.width - 2; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; col = 0 <= _ref1 ? ++_j : --_j) {
          type = "" + this.mapData[row][col][0] + this.mapData[row][col + 1][0] + this.mapData[row + 1][col][0] + this.mapData[row + 1][col + 1][0];
          green = parseInt(this.mapData[row][col][1], 16);
          z = parseInt(this.mapData[row][col][2], 16);
          _results1.push(this.tiles.push(new Tile(this.sprite, type, row, col, green, z)));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

  Map.prototype.readCross = function() {
    var col, green, row, type, z, _i, _ref, _results;
    _results = [];
    for (row = _i = 1, _ref = this.map.height - 2; _i <= _ref; row = _i += 2) {
      _results.push((function() {
        var _j, _ref1, _results1;
        _results1 = [];
        for (col = _j = 1, _ref1 = this.map.width - 2; _j <= _ref1; col = _j += 2) {
          if (this.mapData[row][col][0] !== "00") {
            type = "" + this.mapData[row - 1][col][0] + this.mapData[row][col + 1][0] + this.mapData[row + 1][col][0] + this.mapData[row][col - 1][0];
            green = parseInt(this.mapData[row][col][1], 16);
            z = parseInt(this.mapData[row][col][2], 16);
            _results1.push(this.tiles.push(new Tile(this.sprite, type, row / 2, col / 2, green, z)));
          } else {
            _results1.push(void 0);
          }
        }
        return _results1;
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

module.exports = Map;


},{"./tile.coffee":16}],12:[function(require,module,exports){
var Scene;

Scene = (function() {
  function Scene() {}

  Scene.prototype.update = function() {};

  Scene.prototype.render = function() {};

  return Scene;

})();

module.exports = Scene;


},{}],13:[function(require,module,exports){
var SceneManager;

SceneManager = (function() {
  function SceneManager() {
    this.scenes = {};
    this.currentScene = null;
  }

  SceneManager.prototype.addScene = function(sceneClass) {
    return this.scenes[sceneClass.name] = {
      "class": sceneClass,
      "instance": null
    };
  };

  SceneManager.prototype.setScene = function(scene, parent) {
    var _base;
    return this.currentScene = (_base = this.scenes[scene]).instance != null ? (_base = this.scenes[scene]).instance : _base.instance = new this.scenes[scene]["class"](parent);
  };

  return SceneManager;

})();

this.irf.SceneManager = SceneManager;


},{}],14:[function(require,module,exports){
var Shape;

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

module.exports = Shape;


},{}],15:[function(require,module,exports){
var Animation, Shape, Sprite;

Shape = require('./shape.coffee');

Animation = require('./animation.coffee');

Sprite = (function() {
  function Sprite(hash) {
    var i, key, _ref, _ref1, _ref2, _ref3;
    this.assets = {};
    this.width = hash["width"];
    this.height = hash["height"];
    this.texture = new Image();
    this.texture.src = hash["texture"];
    this.key = (_ref = hash["key"]) != null ? _ref : {};
    _ref1 = this.key;
    for (key in _ref1) {
      i = _ref1[key];
      this.addImage(key, i);
    }
    this.innerWidth = (_ref2 = hash["innerWidth"]) != null ? _ref2 : this.width;
    this.innerHeight = (_ref3 = hash["innerHeight"]) != null ? _ref3 : this.height;
  }

  Sprite.prototype.addImage = function(name, index) {
    var _this = this;
    return $(this.texture).load(function() {
      _this.texWidth = _this.texture.width;
      return _this.assets[name] = new Shape(_this, index);
    });
  };

  Sprite.prototype.addAnimation = function(name, params) {
    var _this = this;
    return $(this.texture).load(function() {
      _this.texWidth = _this.texture.width;
      return _this.assets[name] = new Animation(_this, params);
    });
  };

  Sprite.prototype.render = function(name, ctx) {
    if (this.assets[name] != null) {
      return this.assets[name].render(ctx);
    }
  };

  return Sprite;

})();

this.irf.Sprite = Sprite;


},{"./animation.coffee":1,"./shape.coffee":14}],16:[function(require,module,exports){
var BoundingBox, Tile, Vector;

BoundingBox = require('./boundingBox.coffee');

Vector = require('./vector.coffee');

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
    return ctx.restore();
  };

  return Tile;

})();

module.exports = Tile;


},{"./boundingBox.coffee":3,"./vector.coffee":18}],17:[function(require,module,exports){
var Timer;

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

module.exports = Timer;


},{}],18:[function(require,module,exports){
var Vector;

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

module.exports = Vector;


},{}]},{},[9])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvcHJpdmF0ZS92YXIvd3d3L2lyZi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL3ByaXZhdGUvdmFyL3d3dy9pcmYvc3JjL2FuaW1hdGlvbi5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvYmFja2dyb3VuZC5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvYm91bmRpbmdCb3guY29mZmVlIiwiL3ByaXZhdGUvdmFyL3d3dy9pcmYvc3JjL2JvdW5kaW5nYm94LmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy9jYW1lcmEuY29mZmVlIiwiL3ByaXZhdGUvdmFyL3d3dy9pcmYvc3JjL2V2ZW50bWFuYWdlci5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvZ2FtZS5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvaGVscGVycy5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvaXJmLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy9rZXlib2FyZC5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvbWFwLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy9zY2VuZS5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvc2NlbmVtYW5hZ2VyLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy9zaGFwZS5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvc3ByaXRlLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy90aWxlLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy90aW1lci5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvdmVjdG9yLmNvZmZlZSJdLCJuYW1lcyI6W10s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QUFBO0NBM0dYLEVBaUZlOztDQWpGZixFQTZHTyxFQUFQLElBQU87Q0FDSCxFQUFRLENBQUcsT0FBSDtDQTlHWixFQTZHTzs7Q0E3R1A7O0NBREo7O0FBaUhBLENBakhBLEVBaUhpQixHQUFYLENBQU4iLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuU2hhcGUgPSByZXF1aXJlICcuL3NoYXBlLmNvZmZlZSdcblRpbWVyID0gcmVxdWlyZSAnLi90aW1lci5jb2ZmZWUnXG5cbmNsYXNzIEFuaW1hdGlvblxuXG4gICAgY29uc3RydWN0b3I6IChAc3ByaXRlLCBwYXJhbXMpIC0+XG4gICAgICAgIEBmcHMgPSBwYXJhbXNbXCJmcHNcIl0gPyAzMFxuICAgICAgICBAbG9vcCA9IHBhcmFtc1tcImxvb3BcIl0gPyB0cnVlXG4gICAgICAgIEBjYWxsYmFjayA9IHBhcmFtc1tcImNhbGxiYWNrXCJdID8gbnVsbFxuICAgICAgICBAZnJhbWVzID0gZm9yIGluZGV4IGluIHBhcmFtc1tcImZyYW1lc1wiXVxuICAgICAgICAgICAgbmV3IFNoYXBlIEBzcHJpdGUsIGluZGV4XG4gICAgICAgIEBsYXN0RnJhbWUgPSBAZnJhbWVzLmxlbmd0aCAtIDFcbiAgICAgICAgQHRpbWVyID0gbmV3IFRpbWVyXG4gICAgICAgIEBjdXJyZW50RnJhbWUgPSAwXG4gICAgICAgIEBwbGF5aW5nID0gdHJ1ZVxuXG4gICAgcmVuZGVyOiAoY3R4KSAtPlxuICAgICAgICBpZiBAcGxheWluZ1xuICAgICAgICAgICAgQGN1cnJlbnRGcmFtZSA9IE1hdGguZmxvb3IoIEB0aW1lci50aW1lU2luY2VMYXN0UHVuY2goKSAvICgxMDAwIC8gQGZwcykgKVxuICAgICAgICAgICAgaWYgQGN1cnJlbnRGcmFtZSA+IEBsYXN0RnJhbWVcbiAgICAgICAgICAgICAgICBAY2FsbGJhY2s/KClcbiAgICAgICAgICAgICAgICBpZiBAbG9vcFxuICAgICAgICAgICAgICAgICAgICBAcmV3aW5kKClcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIEBjdXJyZW50RnJhbWUgPSBAbGFzdEZyYW1lXG4gICAgICAgICAgICAgICAgICAgIEBzdG9wKClcblxuICAgICAgICBAZnJhbWVzW0BjdXJyZW50RnJhbWVdLnJlbmRlcihjdHgpXG5cbiAgICBwbGF5OiAtPlxuICAgICAgICBAcGxheWluZyA9IHRydWVcblxuICAgIHN0b3A6IC0+XG4gICAgICAgIEBwbGF5aW5nID0gZmFsc2VcblxuICAgIHJld2luZDogLT5cbiAgICAgICAgQGN1cnJlbnRGcmFtZSA9IDBcbiAgICAgICAgQHRpbWVyLnB1bmNoKClcblxubW9kdWxlLmV4cG9ydHMgPSBBbmltYXRpb25cbiIsImNsYXNzIEJhY2tncm91bmRcbiAgICBjb25zdHJ1Y3RvcjogKEBzcHJpdGUpIC0+XG4gICAgICAgIEBzcHJpdGUuYWRkSW1hZ2UgXCJiYWNrZ3JvdW5kXCIsIDBcblxuICAgIHJlbmRlcjogKGN0eCkgLT5cbiAgICAgICAgQHNwcml0ZS5yZW5kZXIoIFwiYmFja2dyb3VuZFwiLCBjdHggKVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhY2tncm91bmRcbiIsIlxuVmVjdG9yID0gcmVxdWlyZSAnLi92ZWN0b3IuY29mZmVlJ1xuXG5jbGFzcyBCb3VuZGluZ0JveFxuICAgIGNvbnN0cnVjdG9yOiAoQGNvb3IsIEBkaW0sIEBjb2xvcj1cImdyZXlcIikgLT5cbiAgICAgICAgQGNvb3IgPz0gbmV3IFZlY3RvclxuICAgICAgICBAZGltID89IG5ldyBWZWN0b3JcblxuICAgICAgICBpbnRlcnNlY3Q6IChvdGhlckJCKSAtPlxuICAgICAgICAgICAgQGludGVyc2VjdHYob3RoZXJCQikgYW5kIEBpbnRlcnNlY3RoKG90aGVyQkIpXG5cbiAgICAgICAgaW50ZXJzZWN0djogKG90aGVyQkIpIC0+XG4gICAgICAgICAgICBpZiBAY29vci55IDwgb3RoZXJCQi5jb29yLnlcbiAgICAgICAgICAgICAgICBpZiAoKEBkaW0ueSArIG90aGVyQkIuZGltLnkpIC8gMikgPCAob3RoZXJCQi5jb29yLnkgLSBAY29vci55KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgaWYgKChAZGltLnkgKyBvdGhlckJCLmRpbS55KSAvIDIpIDwgKEBjb29yLnkgLSBvdGhlckJCLmNvb3IueSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgICAgIGludGVyc2VjdGg6IChvdGhlckJCKSAtPlxuICAgICAgICAgICAgaWYgQGNvb3IueCA8IG90aGVyQkIuY29vci54XG4gICAgICAgICAgICAgICAgaWYgKChAZGltLnggKyBvdGhlckJCLmRpbS54KSAvIDIpIDwgKG90aGVyQkIuY29vci54IC0gQGNvb3IueClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGlmICgoQGRpbS54ICsgb3RoZXJCQi5kaW0ueCkgLyAyKSA8IChAY29vci54IC0gb3RoZXJCQi5jb29yLngpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcblxuXG4gICAgICAgIHJlbmRlcjogKGN0eCkgLT5cbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IEBjb2xvclxuICAgICAgICAgICAgY3R4LnN0cm9rZVJlY3QgQGNvb3IueCAtIEBkaW0ueC8yLCBAY29vci55IC0gQGRpbS55LzIsIEBkaW0ueCwgQGRpbS55XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBCb3VuZGluZ0JveFxuIiwiXG5WZWN0b3IgPSByZXF1aXJlICcuL3ZlY3Rvci5jb2ZmZWUnXG5cbmNsYXNzIEJvdW5kaW5nQm94XG4gICAgY29uc3RydWN0b3I6IChAY29vciwgQGRpbSwgQGNvbG9yPVwiZ3JleVwiKSAtPlxuICAgICAgICBAY29vciA/PSBuZXcgVmVjdG9yXG4gICAgICAgIEBkaW0gPz0gbmV3IFZlY3RvclxuXG4gICAgICAgIGludGVyc2VjdDogKG90aGVyQkIpIC0+XG4gICAgICAgICAgICBAaW50ZXJzZWN0dihvdGhlckJCKSBhbmQgQGludGVyc2VjdGgob3RoZXJCQilcblxuICAgICAgICBpbnRlcnNlY3R2OiAob3RoZXJCQikgLT5cbiAgICAgICAgICAgIGlmIEBjb29yLnkgPCBvdGhlckJCLmNvb3IueVxuICAgICAgICAgICAgICAgIGlmICgoQGRpbS55ICsgb3RoZXJCQi5kaW0ueSkgLyAyKSA8IChvdGhlckJCLmNvb3IueSAtIEBjb29yLnkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBpZiAoKEBkaW0ueSArIG90aGVyQkIuZGltLnkpIC8gMikgPCAoQGNvb3IueSAtIG90aGVyQkIuY29vci55KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG5cbiAgICAgICAgaW50ZXJzZWN0aDogKG90aGVyQkIpIC0+XG4gICAgICAgICAgICBpZiBAY29vci54IDwgb3RoZXJCQi5jb29yLnhcbiAgICAgICAgICAgICAgICBpZiAoKEBkaW0ueCArIG90aGVyQkIuZGltLngpIC8gMikgPCAob3RoZXJCQi5jb29yLnggLSBAY29vci54KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgaWYgKChAZGltLnggKyBvdGhlckJCLmRpbS54KSAvIDIpIDwgKEBjb29yLnggLSBvdGhlckJCLmNvb3IueClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuXG5cbiAgICAgICAgcmVuZGVyOiAoY3R4KSAtPlxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gQGNvbG9yXG4gICAgICAgICAgICBjdHguc3Ryb2tlUmVjdCBAY29vci54IC0gQGRpbS54LzIsIEBjb29yLnkgLSBAZGltLnkvMiwgQGRpbS54LCBAZGltLnlcblxuICBtb2R1bGUuZXhwb3J0cyA9IEJvdW5kaW5nQm94XG4iLCJcbmNsYXNzIENhbWVyYVxuICAgIGNvbnN0cnVjdG9yOiAoaGFzaCkgLT5cbiAgICAgICAgQHByb2plY3Rpb24gPSBoYXNoW1wicHJvamVjdGlvblwiXVxuICAgICAgICBAdnBXaWR0aCA9IGhhc2hbXCJ2cFdpZHRoXCJdICAgIyBWaWV3cG9ydFxuICAgICAgICBAdnBIZWlnaHQgPSBoYXNoW1widnBIZWlnaHRcIl1cbiAgICAgICAgQHpvb21GYWN0b3IgPSBoYXNoW1wiem9vbUZhY3RvclwiXSA/IDFcbiAgICAgICAgQGNvb3IgPSBuZXcgVmVjdG9yKCAxMDAsIDEwMCApXG5cbiAgICB1cGRhdGU6IChkZWx0YSkgLT5cblxuICAgIGFwcGx5OiAoY3R4LCBjYWxsYmFjaykgLT5cblxuICAgICAgICBzd2l0Y2ggQHByb2plY3Rpb25cbiAgICAgICAgICAgIHdoZW4gXCJub3JtYWxcIlxuICAgICAgICAgICAgICAgIGN0eC5zYXZlKClcbiAgICAgICAgICAgICAgICBjdHgudHJhbnNsYXRlIEB2cFdpZHRoLzIgLSBAY29vci54LCBAdnBIZWlnaHQvMiAtIEBjb29yLnlcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgICAgICAgICAgY3R4LnJlc3RvcmUoKVxuICAgICAgICAgICAgd2hlbiBcImlzb1wiXG4gICAgICAgICAgICAgICAgY3R4LnNhdmUoKVxuICAgICAgICAgICAgICAgIGN0eC5zY2FsZSAxLCAwLjVcbiAgICAgICAgICAgICAgICBjdHgucm90YXRlIE1hdGguUEkvNFxuICAgICAgICAgICAgICAgIGN0eC50cmFuc2xhdGUgMjAwLCAtNDAwXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgICAgICAgIGN0eC5yZXN0b3JlKClcblxubW9kdWxlLmV4cG9ydHMgPSBDYW1lcmFcbiIsIlxuY2xhc3MgRXZlbnRNYW5hZ2VyXG5cbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQGV2ZW50bGlzdCA9IHt9XG5cbiAgICByZWdpc3RlcjogKGV2ZW50LCBjYWxsYmFjaykgLT5cbiAgICAgICAgdW5sZXNzIEBldmVudGxpc3RbZXZlbnRdP1xuICAgICAgICAgICAgQGV2ZW50bGlzdFtldmVudF0gPSBbXVxuICAgICAgICBAZXZlbnRsaXN0W2V2ZW50XS5wdXNoIGNhbGxiYWNrXG5cbiAgICB0cmlnZ2VyOiAoZXZlbnQsIG9yaWdpbikgLT5cbiAgICAgICAgZm9yIGNhbGxiYWNrIGluIEBldmVudGxpc3RbZXZlbnRdXG4gICAgICAgICAgICBjYWxsYmFjayhvcmlnaW4pXG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRNYW5hZ2VyXG4iLCJcblNjZW5lTWFuYWdlciA9IHJlcXVpcmUgJy4vc2NlbmVtYW5hZ2VyLmNvZmZlZSdcblxuY2xhc3MgR2FtZVxuXG4gICAgQGFkZFNjZW5lOiAoc2NlbmUpIC0+XG4gICAgICAgIEBzY2VuZU1hbmFnZXIgPz0gbmV3IFNjZW5lTWFuYWdlcigpXG4gICAgICAgIEBzY2VuZU1hbmFnZXIuYWRkU2NlbmUgc2NlbmVcblxuICAgIGNvbnN0cnVjdG9yOiAocGFyYW1zKSAtPlxuXG4gICAgICAgIEBwYXJhbXMgPSBIZWxwZXJzLmV4dGVuZCB7XG4gICAgICAgICAgICBcIndpZHRoXCIgOiA4MDAsXG4gICAgICAgICAgICBcImhlaWdodFwiOiA2MDBcbiAgICAgICAgfSwgcGFyYW1zXG5cbiAgICAgICAgY2FudmFzID0gJCgnPGNhbnZhcy8+JykuYXR0cih7XCJ3aWR0aFwiOiBAcGFyYW1zLndpZHRoLCBcImhlaWdodFwiOiBAcGFyYW1zLmhlaWdodH0pXG4gICAgICAgICQoXCJib2R5XCIpLmFwcGVuZChjYW52YXMpXG4gICAgICAgIEBjdHggPSBjYW52YXNbMF0uZ2V0Q29udGV4dCgnMmQnKVxuICAgICAgICBAY3R4LmZvbnQgPSAnNDAwIDE4cHggSGVsdmV0aWNhLCBzYW5zLXNlcmlmJ1xuICAgICAgICBAbG9vcCA9IG51bGxcbiAgICAgICAgQHRpbWVyID0gbmV3IFRpbWVyXG4gICAgICAgICMgdGhlIGluc3RhbmNlJ3Mgc2NlbmVtYW5hZ2VyIHBvaW50cyB0byB0aGUgQ2xhc3NlcyBTY2VuZW1hbmFnZXJcbiAgICAgICAgIyAob3IsIGlmIGl0IGRvZXNuJ3QgZXhpc3QsIGEgbmV3bHkgaW5zdGFudGlhdGVkIG9uZSlcbiAgICAgICAgQHNjZW5lTWFuYWdlciA9IEBjb25zdHJ1Y3Rvci5zY2VuZU1hbmFnZXIgfHwgbmV3IFNjZW5lTWFuYWdlcigpXG5cbiAgICBnYW1lbG9vcDogPT5cbiAgICAgICAgQHVwZGF0ZSgpXG4gICAgICAgIEByZW5kZXIoKVxuXG4gICAgc3RhcnQ6IC0+XG4gICAgICAgIEBsb29wID0gc2V0SW50ZXJ2YWwgQGdhbWVsb29wLCAxXG5cbiAgICBzdG9wOiAtPlxuICAgICAgICBAbG9vcC5jbGVhckludGVydmFsKClcblxuICAgIHVwZGF0ZTogLT5cbiAgICAgICAgQHRpbWVyLnB1bmNoKClcblxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgQGN0eC5jbGVhclJlY3QgMCwgMCwgQHBhcmFtcy53aWR0aCwgQHBhcmFtcy5oZWlnaHRcblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lXG4iLCJcblxuIyBodHRwOi8vY29mZmVlc2NyaXB0Y29va2Jvb2suY29tL2NoYXB0ZXJzL2FycmF5cy9zaHVmZmxpbmctYXJyYXktZWxlbWVudHNcbkFycmF5OjpzaHVmZmxlID0gLT4gQHNvcnQgLT4gMC41IC0gTWF0aC5yYW5kb20oKVxuXG5OdW1iZXI6OnRvSGV4ID0gKHBhZGRpbmc9MikgLT5cbiAgICBoZXggPSBAdG9TdHJpbmcgMTZcbiAgICB3aGlsZSAoaGV4Lmxlbmd0aCA8IHBhZGRpbmcpXG4gICAgICAgIGhleCA9IFwiMFwiICsgaGV4XG4gICAgcmV0dXJuIGhleFxuXG5jbGFzcyBIZWxwZXJzXG5cbiAgICBAZXh0ZW5kOiAob2JqZWN0LCBwcm9wZXJ0aWVzKSAtPlxuICAgICAgICBmb3Iga2V5LCB2YWwgb2YgcHJvcGVydGllc1xuICAgICAgICAgICAgb2JqZWN0W2tleV0gPSB2YWxcbiAgICAgICAgb2JqZWN0XG5cbm1vZHVsZS5leHBvcnRzID0gSGVscGVyc1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9XG4gICAgYW5pbWF0aW9uOiByZXF1aXJlICcuL2FuaW1hdGlvbi5jb2ZmZWUnXG4gICAgYmFja2dyb3VuZDogcmVxdWlyZSAnLi9iYWNrZ3JvdW5kLmNvZmZlZSdcbiAgICBib3VuZGluZ2JveDogcmVxdWlyZSAnLi9ib3VuZGluZ2JveC5jb2ZmZWUnXG4gICAgY2FtZXJhOiByZXF1aXJlICcuL2NhbWVyYS5jb2ZmZWUnXG4gICAgZXZlbnRtYW5hZ2VyOiByZXF1aXJlICcuL2V2ZW50bWFuYWdlci5jb2ZmZWUnXG4gICAgZ2FtZTogcmVxdWlyZSAnLi9nYW1lLmNvZmZlZSdcbiAgICBoZWxwZXJzOiByZXF1aXJlICcuL2hlbHBlcnMuY29mZmVlJ1xuICAgIGtleWJvYXJkOiByZXF1aXJlICcuL2tleWJvYXJkLmNvZmZlZSdcbiAgICBtYXA6IHJlcXVpcmUgJy4vbWFwLmNvZmZlZSdcbiAgICBzY2VuZTogcmVxdWlyZSAnLi9zY2VuZS5jb2ZmZWUnXG4gICAgc2NlbmVtYW5hZ2VyOiByZXF1aXJlICcuL3NjZW5lbWFuYWdlci5jb2ZmZWUnXG4gICAgc2hhcGU6IHJlcXVpcmUgJy4vc2hhcGUuY29mZmVlJ1xuICAgIHNwcml0ZTogcmVxdWlyZSAnLi9zcHJpdGUuY29mZmVlJ1xuICAgIHRpbGU6IHJlcXVpcmUgJy4vdGlsZS5jb2ZmZWUnXG4gICAgdGltZXI6IHJlcXVpcmUgJy4vdGltZXIuY29mZmVlJ1xuICAgIHZlY3RvcjogcmVxdWlyZSAnLi92ZWN0b3IuY29mZmVlJ1xuXG5cbiIsImNsYXNzIEtleWJvYXJkXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBtYXBwaW5nID1cbiAgICAgICAgICAgIDg6XCJiYWNrc3BhY2VcIlxuICAgICAgICAgICAgOTpcInRhYlwiXG4gICAgICAgICAgICAxMzpcInJldHVyblwiXG4gICAgICAgICAgICAxNjpcInNoaWZ0XCJcbiAgICAgICAgICAgIDE3OlwiY3RybFwiXG4gICAgICAgICAgICAxODpcImFsdFwiXG4gICAgICAgICAgICAyNzpcImVzY1wiXG4gICAgICAgICAgICAzMjpcInNwYWNlXCJcbiAgICAgICAgICAgIDM3OlwibGVmdFwiXG4gICAgICAgICAgICAzODpcInVwXCJcbiAgICAgICAgICAgIDM5OlwicmlnaHRcIlxuICAgICAgICAgICAgNDA6XCJkb3duXCJcbiAgICAgICAgICAgIDQ4OlwiMFwiXG4gICAgICAgICAgICA0OTpcIjFcIlxuICAgICAgICAgICAgNDk6XCIxXCJcbiAgICAgICAgICAgIDQ5OlwiMVwiXG4gICAgICAgICAgICA0OTpcIjFcIlxuICAgICAgICAgICAgNDk6XCIxXCJcbiAgICAgICAgICAgIDQ5OlwiNlwiXG4gICAgICAgICAgICA0OTpcIjdcIlxuICAgICAgICAgICAgNDk6XCI4XCJcbiAgICAgICAgICAgIDU3OlwiOVwiXG4gICAgICAgICAgICA2NTpcImFcIlxuICAgICAgICAgICAgNjY6XCJiXCJcbiAgICAgICAgICAgIDY3OlwiY1wiXG4gICAgICAgICAgICA2ODpcImRcIlxuICAgICAgICAgICAgNjk6XCJlXCJcbiAgICAgICAgICAgIDcwOlwiZlwiXG4gICAgICAgICAgICA3MTpcImdcIlxuICAgICAgICAgICAgNzI6XCJoXCJcbiAgICAgICAgICAgIDczOlwiaVwiXG4gICAgICAgICAgICA3NDpcImpcIlxuICAgICAgICAgICAgNzU6XCJrXCJcbiAgICAgICAgICAgIDc2OlwibFwiXG4gICAgICAgICAgICA3NzpcIm1cIlxuICAgICAgICAgICAgNzg6XCJuXCJcbiAgICAgICAgICAgIDc5Olwib1wiXG4gICAgICAgICAgICA4MDpcInBcIlxuICAgICAgICAgICAgODE6XCJxXCJcbiAgICAgICAgICAgIDgyOlwiclwiXG4gICAgICAgICAgICA4MzpcInNcIlxuICAgICAgICAgICAgODQ6XCJ0XCJcbiAgICAgICAgICAgIDg1OlwidVwiXG4gICAgICAgICAgICA4NzpcIndcIlxuICAgICAgICAgICAgODg6XCJ4XCJcbiAgICAgICAgICAgIDg5OlwieVwiXG4gICAgICAgICAgICA5MDpcInpcIlxuICAgICAgICAgICAgOTM6XCJjbWRcIlxuICAgICAgICAgICAgMTg4OlwiLFwiXG4gICAgICAgICAgICAxOTA6XCIuXCJcblxuICAgICAgQGtleWFycmF5ID0gW11cblxuICAgICAgZm9yIGNvZGUsIG5hbWUgb2YgQG1hcHBpbmdcbiAgICAgICAgICBAa2V5YXJyYXlbbmFtZV0gPSBmYWxzZVxuXG4gICAgICAkKFwiaHRtbFwiKS5iaW5kIFwia2V5ZG93blwiLCAoZXZlbnQpID0+XG4gICAgICAgICAgQGtleWFycmF5W0BtYXBwaW5nW2V2ZW50LndoaWNoXV0gPSB0cnVlXG5cbiAgICAgICQoXCJodG1sXCIpLmJpbmQgXCJrZXl1cFwiLCAoZXZlbnQpID0+XG4gICAgICAgICAgQGtleWFycmF5W0BtYXBwaW5nW2V2ZW50LndoaWNoXV0gPSBmYWxzZVxuXG5cbiAgICBrZXk6ICh3aGljaCkgLT5cbiAgICAgICAgcmV0dXJuIEBrZXlhcnJheVt3aGljaF1cblxuICAgIGNoZWNrOiAtPlxuICAgICAgICByZXR1cm4gQGtleWFycmF5XG5cbm1vZHVsZS5leHBvcnRzID0gS2V5Ym9hcmRcbiIsIlxuVGlsZSA9IHJlcXVpcmUgJy4vdGlsZS5jb2ZmZWUnXG5cbmNsYXNzIE1hcFxuICAgIGNvbnN0cnVjdG9yOiAoaGFzaCkgLT5cbiAgICAgICAgQHNwcml0ZSA9IGhhc2hbXCJzcHJpdGVcIl1cbiAgICAgICAgQHRpbGVzID0gW11cbiAgICAgICAgQHdpZHRoID0gMCAjIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIG1hcCBpbiB0aWxlcyAtIGNhbiBvbmx5IGJlIGRldGVybWluZWQgYWZ0ZXIgdGhlIG1hcGZpbGUgbG9hZGluZyBoYXMgY29tcGxldGVkXG4gICAgICAgIEBoZWlnaHQgPSAwXG5cbiAgICAgICAgIyBpbiBoYXNoW1wicGF0dGVyblwiXSB5b3UgY2FuIGVpdGhlciBwYXNzIGEgc3RyaW5nIGxpa2UgXCJzaW1wbGVcIiwgXCJzcXVhcmVcIiBvciBcImNyb3NzXCJcbiAgICAgICAgIyBpbiB3aGljaCBjYXNlIHRoZSByZXNwZWN0aXZlIG1ldGhvZCB3aWxsIGJlIGNhbGxlZC4gQWx0ZXJuYXRpdmVseSwgeW91IGNhbiBwYXNzIHlvdXIgb3duIGN1c3RvbSBmdW5jdGlvbi5cbiAgICAgICAgaWYgdHlwZW9mIGhhc2hbXCJwYXR0ZXJuXCJdIGlzIFwiZnVuY3Rpb25cIlxuICAgICAgICAgICAgQHJlYWQgPSBoYXNoW1wicGF0dGVyblwiXVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBzd2l0Y2ggaGFzaFtcInBhdHRlcm5cIl1cbiAgICAgICAgICAgICAgICB3aGVuIFwic2ltcGxlXCJcbiAgICAgICAgICAgICAgICAgICAgQHJlYWQgPSBAcmVhZFNpbXBsZVxuICAgICAgICAgICAgICAgIHdoZW4gXCJzcXVhcmVcIlxuICAgICAgICAgICAgICAgICAgICBAcmVhZCA9IEByZWFkU3F1YXJlXG4gICAgICAgICAgICAgICAgd2hlbiBcImNyb3NzXCJcbiAgICAgICAgICAgICAgICAgICAgQHJlYWQgPSBAcmVhZENyb3NzXG5cbiAgICAgICAgQG1hcCA9IG5ldyBJbWFnZSgpXG4gICAgICAgIEBtYXAuc3JjID0gaGFzaFtcIm1hcGZpbGVcIl1cbiAgICAgICAgQG1hcERhdGEgPSBbXVxuXG4gICAgICAgIEBsb2FkTWFwRGF0YUZyb21JbWFnZSgpXG5cbiAgICByZW5kZXI6IChjdHgsIGNhbWVyYSkgLT5cbiAgICAgICAgZm9yIHRpbGUgaW4gQHRpbGVzXG4gICAgICAgICAgICBpZiB0aWxlLnNxdWFyZWREaXN0YW5jZVRvKGNhbWVyYS5jb29yKSA8IDEwMDAwMFxuICAgICAgICAgICAgICAgIHRpbGUucmVuZGVyKGN0eClcblxuICAgICMgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMTAyODE5L2Nocm9tZS1kaXNhYmxlLXNhbWUtb3JpZ2luLXBvbGljeVxuICAgICMgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy85MzQwMTIvZ2V0LWltYWdlLWRhdGEtaW4tamF2YXNjcmlwdFxuICAgIGxvYWRNYXBEYXRhRnJvbUltYWdlOiAtPlxuICAgICAgICAkKEBtYXApLmxvYWQgPT5cbiAgICAgICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIilcbiAgICAgICAgICAgIEB3aWR0aCA9IEBtYXAud2lkdGhcbiAgICAgICAgICAgIEBoZWlnaHQgPSBAbWFwLmhlaWdodFxuICAgICAgICAgICAgY2FudmFzLndpZHRoID0gQG1hcC53aWR0aFxuICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IEBtYXAuaGVpZ2h0XG4gICAgICAgICAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKCBAbWFwLCAwLCAwKVxuICAgICAgICAgICAgZGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwwLEBtYXAud2lkdGgsQG1hcC5oZWlnaHQpLmRhdGFcblxuICAgICAgICAgICAgZm9yIHAsaSBpbiBkYXRhIGJ5IDRcbiAgICAgICAgICAgICAgICByb3cgPSBNYXRoLmZsb29yKChpLzQpL0BtYXAud2lkdGgpXG4gICAgICAgICAgICAgICAgQG1hcERhdGFbcm93XSA/PSBbXVxuICAgICAgICAgICAgICAgIEBtYXBEYXRhW3Jvd10ucHVzaCBbTnVtYmVyKGRhdGFbaV0pLnRvSGV4KCksTnVtYmVyKGRhdGFbaSsxXSkudG9IZXgoKSxOdW1iZXIoZGF0YVtpKzJdKS50b0hleCgpLE51bWJlcihkYXRhW2krM10pLnRvSGV4KCldXG5cbiAgICAgICAgICAgIEByZWFkKClcblxuICAgICAgICAgICAgZm9yIHRpbGUsIGluZGV4IGluIEB0aWxlc1xuICAgICAgICAgICAgICAgIHRpbGUubmVpZ2hib3JbXCJ3XCJdID0gQHRpbGVzW2luZGV4LTFdXG4gICAgICAgICAgICAgICAgdGlsZS5uZWlnaGJvcltcImVcIl0gPSBAdGlsZXNbaW5kZXgrMV1cbiAgICAgICAgICAgICAgICB0aWxlLm5laWdoYm9yW1wiblwiXSA9IEB0aWxlc1tpbmRleC1Ad2lkdGhdXG4gICAgICAgICAgICAgICAgdGlsZS5uZWlnaGJvcltcInNcIl0gPSBAdGlsZXNbaW5kZXgrQHdpZHRoXVxuXG5cbiAgICByZWFkU2ltcGxlOiAtPlxuICAgICAgICBmb3Igcm93IGluIFswLi5AbWFwLmhlaWdodC0xXVxuICAgICAgICAgICAgZm9yIGNvbCBpbiBbMC4uQG1hcC53aWR0aC0xXVxuICAgICAgICAgICAgICAgIHR5cGUgPSBcIiN7QG1hcERhdGFbcm93XVtjb2xdWzBdfVwiXG4gICAgICAgICAgICAgICAgZ3JlZW4gPSBwYXJzZUludCggQG1hcERhdGFbcm93XVtjb2xdWzFdLCAxNiApXG4gICAgICAgICAgICAgICAgeiA9IHBhcnNlSW50KCBAbWFwRGF0YVtyb3ddW2NvbF1bMl0sIDE2IClcbiAgICAgICAgICAgICAgICBAdGlsZXMucHVzaCggbmV3IFRpbGUoIEBzcHJpdGUsIHR5cGUsIHJvdywgY29sLCBncmVlbiwgeiApKVxuXG4gICAgcmVhZFNxdWFyZTogLT5cbiAgICAgICAgZm9yIHJvdyBpbiBbMC4uQG1hcC5oZWlnaHQtMl1cbiAgICAgICAgICAgIGZvciBjb2wgaW4gWzAuLkBtYXAud2lkdGgtMl1cbiAgICAgICAgICAgICAgICB0eXBlID0gXCIje0BtYXBEYXRhW3Jvd11bY29sXVswXX0je0BtYXBEYXRhW3Jvd11bY29sKzFdWzBdfSN7QG1hcERhdGFbcm93KzFdW2NvbF1bMF19I3tAbWFwRGF0YVtyb3crMV1bY29sKzFdWzBdfVwiXG4gICAgICAgICAgICAgICAgZ3JlZW4gPSBwYXJzZUludCggQG1hcERhdGFbcm93XVtjb2xdWzFdLCAxNiApXG4gICAgICAgICAgICAgICAgeiA9IHBhcnNlSW50KCBAbWFwRGF0YVtyb3ddW2NvbF1bMl0sIDE2IClcbiAgICAgICAgICAgICAgICBAdGlsZXMucHVzaCggbmV3IFRpbGUoIEBzcHJpdGUsIHR5cGUsIHJvdywgY29sLCBncmVlbiwgeiApKVxuXG4gICAgcmVhZENyb3NzOiAtPlxuICAgICAgICBmb3Igcm93IGluIFsxLi5AbWFwLmhlaWdodC0yXSBieSAyXG4gICAgICAgICAgICBmb3IgY29sIGluIFsxLi5AbWFwLndpZHRoLTJdIGJ5IDJcbiAgICAgICAgICAgICAgICB1bmxlc3MgQG1hcERhdGFbcm93XVtjb2xdWzBdIGlzIFwiMDBcIlxuICAgICAgICAgICAgICAgICAgICB0eXBlID0gXCIje0BtYXBEYXRhW3Jvdy0xXVtjb2xdWzBdfSN7QG1hcERhdGFbcm93XVtjb2wrMV1bMF19I3tAbWFwRGF0YVtyb3crMV1bY29sXVswXX0je0BtYXBEYXRhW3Jvd11bY29sLTFdWzBdfVwiXG4gICAgICAgICAgICAgICAgICAgIGdyZWVuID0gcGFyc2VJbnQoIEBtYXBEYXRhW3Jvd11bY29sXVsxXSwgMTYgKVxuICAgICAgICAgICAgICAgICAgICB6ID0gcGFyc2VJbnQoIEBtYXBEYXRhW3Jvd11bY29sXVsyXSwgMTYgKVxuICAgICAgICAgICAgICAgICAgICBAdGlsZXMucHVzaCggbmV3IFRpbGUoIEBzcHJpdGUsIHR5cGUsIHJvdy8yLCBjb2wvMiwgZ3JlZW4sIHogKSlcblxuICAgIHRpbGVBdFZlY3RvcjogKHZlYykgLT5cbiAgICAgICAgeCA9IE1hdGguZmxvb3IoIHZlYy54IC8gQHNwcml0ZS5pbm5lcldpZHRoIClcbiAgICAgICAgeSA9IE1hdGguZmxvb3IoIHZlYy55IC8gQHNwcml0ZS5pbm5lckhlaWdodCApXG4gICAgICAgIGluZGV4ID0geSAqIEB3aWR0aCArIHhcbiAgICAgICAgcmV0dXJuIEB0aWxlc1tpbmRleF1cblxubW9kdWxlLmV4cG9ydHMgPSBNYXBcblxuIiwiY2xhc3MgU2NlbmVcblxuICBjb25zdHJ1Y3RvcjogLT5cblxuICB1cGRhdGU6IC0+XG5cbiAgcmVuZGVyOiAtPlxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjZW5lXG4iLCIjICMgVGhlIFNjZW5lTWFuYWdlclxuIyBpcyB0aGUgY2xhc3MgdG8gaG9sZCBhbmQgbWFuYWdlIChzd2l0Y2ggYmV0d2VlbikgdGhlICdzY2VuZXMnIHRoYXQgeW91clxuIyBHYW1lIGNvbnNpc3RzIG9mLiBJdCBtYWludGFpbnNcbmNsYXNzIFNjZW5lTWFuYWdlclxuICAgICMgKiBhIGhhc2ggd2l0aCBhbGwgU2NlbmVzIGluIHRoZSBnYW1lXG4gICAgIyAqIGEgcmVmZXJlbmNlIHRvIHRoZSB0aGUgc2NlbmUgdGhhdCBpcyBjdXJyZW50bHkgYWN0aXZlXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBzY2VuZXMgPSB7fVxuICAgICAgICBAY3VycmVudFNjZW5lID0gbnVsbFxuXG4gICAgYWRkU2NlbmU6IChzY2VuZUNsYXNzKSAtPlxuICAgICAgICBAc2NlbmVzW3NjZW5lQ2xhc3MubmFtZV0gPVxuICAgICAgICAgICAgXCJjbGFzc1wiICAgIDogc2NlbmVDbGFzc1xuICAgICAgICAgICAgXCJpbnN0YW5jZVwiIDogbnVsbFxuXG4gICAgc2V0U2NlbmU6IChzY2VuZSwgcGFyZW50KSAtPlxuICAgICAgICAjIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgc2NlbmUsIHVubGVzcyBpdCBoYXMgYmVlbiBjcmVhdGVkIGJlZm9yZVxuICAgICAgICBAY3VycmVudFNjZW5lID0gQHNjZW5lc1tzY2VuZV0uaW5zdGFuY2UgPz0gbmV3IEBzY2VuZXNbc2NlbmVdLmNsYXNzKHBhcmVudClcblxuQGlyZi5TY2VuZU1hbmFnZXIgPSBTY2VuZU1hbmFnZXJcbiIsIlxuY2xhc3MgU2hhcGVcblxuICAgIGNvbnN0cnVjdG9yOiAoQHNwcml0ZSwgaW5kZXgpIC0+XG4gICAgICAgIEBzeCA9ICggaW5kZXggKiBAc3ByaXRlLndpZHRoICkgJSBAc3ByaXRlLnRleFdpZHRoXG4gICAgICAgIEBzeSA9IE1hdGguZmxvb3IoKCBpbmRleCAqIEBzcHJpdGUud2lkdGggKSAvIEBzcHJpdGUudGV4V2lkdGgpICogQHNwcml0ZS5oZWlnaHRcblxuICAgIHJlbmRlcjogKGN0eCkgLT5cbiAgICAgICAgY3R4LnNhdmUoKVxuICAgICAgICBjdHgudHJhbnNsYXRlIC1Ac3ByaXRlLndpZHRoLzIsIC1Ac3ByaXRlLmhlaWdodC8yXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIEBzcHJpdGUudGV4dHVyZSwgQHN4LCBAc3ksIEBzcHJpdGUud2lkdGgsIEBzcHJpdGUuaGVpZ2h0LCAwLCAwLCBAc3ByaXRlLndpZHRoLCBAc3ByaXRlLmhlaWdodCApXG4gICAgICAgIGN0eC5yZXN0b3JlKClcblxubW9kdWxlLmV4cG9ydHMgPSBTaGFwZVxuIiwiXG4jIEV2ZXJ5IHNwcml0ZSBoYXMgYSBUZXh0dXJlIGFuZCBhIG51bWJlciBvZiBBc3NldHMuXG4jIFRoZXNlIEFzc2V0cyBjYW4gYmUgb2YgdHlwZSBTaGFwZSAoc2ltcGxlIEltYWdlcykgb3IgQW5pbWF0aW9uXG4jXG4jIHVzYWdlOlxuI1xuIyBzcHJpdGUgPSBuZXcgU3ByaXRlXG4jICAgXCJ0ZXh0dXJlXCI6IFwiaW1nL3RleHR1cmUucG5nXG4jICAgXCJ3aWR0aFwiOjUwXG4jICAgXCJoZWlnaHRcIjo1MFxuIyAgIFwia2V5XCI6XG4jICAgICBcInNwYWNlc2hpcFwiOiAxXG4jICAgICBcInJvY2tcIjogMlxuIyAgICAgXCJlbmVteVwiOiAzXG4jXG4jIHNwcml0ZS5yZW5kZXIoXCJzcGFjZXNoaXBcIilcbiNcblxuU2hhcGUgPSByZXF1aXJlICcuL3NoYXBlLmNvZmZlZSdcbkFuaW1hdGlvbiA9IHJlcXVpcmUgJy4vYW5pbWF0aW9uLmNvZmZlZSdcblxuY2xhc3MgU3ByaXRlXG4gICAgY29uc3RydWN0b3I6IChoYXNoKSAtPlxuICAgICAgICBAYXNzZXRzID0ge31cbiAgICAgICAgQHdpZHRoID0gaGFzaFtcIndpZHRoXCJdXG4gICAgICAgIEBoZWlnaHQgPSBoYXNoW1wiaGVpZ2h0XCJdXG4gICAgICAgIEB0ZXh0dXJlID0gbmV3IEltYWdlKClcbiAgICAgICAgQHRleHR1cmUuc3JjID0gaGFzaFtcInRleHR1cmVcIl1cbiAgICAgICAgQGtleSA9IGhhc2hbXCJrZXlcIl0gPyB7fVxuXG4gICAgICAgIGZvciBrZXksIGkgb2YgQGtleVxuICAgICAgICAgICAgQGFkZEltYWdlIGtleSwgaVxuXG4gICAgICAgIEBpbm5lcldpZHRoID0gaGFzaFtcImlubmVyV2lkdGhcIl0gPyBAd2lkdGhcbiAgICAgICAgQGlubmVySGVpZ2h0ID0gaGFzaFtcImlubmVySGVpZ2h0XCJdID8gQGhlaWdodFxuXG4gICAgYWRkSW1hZ2U6IChuYW1lLCBpbmRleCkgLT5cbiAgICAgICAgJChAdGV4dHVyZSkubG9hZCA9PlxuICAgICAgICAgICAgQHRleFdpZHRoID0gQHRleHR1cmUud2lkdGhcbiAgICAgICAgICAgIEBhc3NldHNbbmFtZV0gPSBuZXcgU2hhcGUgdGhpcywgaW5kZXhcblxuICAgIGFkZEFuaW1hdGlvbjogKG5hbWUsIHBhcmFtcykgLT5cbiAgICAgICAgJChAdGV4dHVyZSkubG9hZCA9PlxuICAgICAgICAgICAgQHRleFdpZHRoID0gQHRleHR1cmUud2lkdGhcbiAgICAgICAgICAgIEBhc3NldHNbbmFtZV0gPSBuZXcgQW5pbWF0aW9uIHRoaXMsIHBhcmFtc1xuXG4gICAgcmVuZGVyOiAobmFtZSwgY3R4KSAtPlxuICAgICAgICBAYXNzZXRzW25hbWVdLnJlbmRlcihjdHgpIGlmIEBhc3NldHNbbmFtZV0/XG5cblxuXG5AaXJmLlNwcml0ZSA9IFNwcml0ZVxuIiwiXG5Cb3VuZGluZ0JveCA9IHJlcXVpcmUgJy4vYm91bmRpbmdCb3guY29mZmVlJ1xuVmVjdG9yID0gcmVxdWlyZSAnLi92ZWN0b3IuY29mZmVlJ1xuXG5jbGFzcyBUaWxlXG4gICAgY29uc3RydWN0b3I6IChAc3ByaXRlLCBAdHlwZSwgQHJvdywgQGNvbCwgQGdyZWVuPTAsIEB6PTApIC0+XG4gICAgICAgIEBuZWlnaGJvciA9IFtdXG4gICAgICAgIEB4ID0gQGNvbCAqIEBzcHJpdGUuaW5uZXJXaWR0aCArIEBzcHJpdGUuaW5uZXJXaWR0aC8yXG4gICAgICAgIEB5ID0gQHJvdyAqIEBzcHJpdGUuaW5uZXJIZWlnaHQgKyBAc3ByaXRlLmlubmVySGVpZ2h0LzJcbiAgICAgICAgQGJiID0gbmV3IEJvdW5kaW5nQm94IG5ldyBWZWN0b3IoIEB4LCBAeSApLCBuZXcgVmVjdG9yKCBAc3ByaXRlLmlubmVyV2lkdGgsIEBzcHJpdGUuaW5uZXJIZWlnaHQgKVxuICAgICAgICBAYmIuY29sb3IgPSBcImdyZWVuXCJcblxuICAgIGlzV2Fsa2FibGU6IC0+XG4gICAgICAgIEBncmVlbiBpcyAwXG5cbiAgICBzcXVhcmVkRGlzdGFuY2VUbzogKHZlYykgLT5cbiAgICAgICAgdmVjLnN1YnRyYWN0KCBuZXcgVmVjdG9yKEB4LEB5KSApLmxlbmd0aFNxdWFyZWQoKSAjIG1heWJlIGFkZCBhIGRpc3RhbmNlIChjbGFzcy0pbWV0aG9kIHRvIHZlY3Rvcj9cblxuICAgIHJlbmRlcjogKGN0eCkgLT5cbiAgICAgICAgY3R4LnNhdmUoKVxuICAgICAgICBjdHgudHJhbnNsYXRlIEB4IC0gQHosIEB5IC0gQHpcbiAgICAgICAgQHNwcml0ZS5yZW5kZXIoIEB0eXBlLCBjdHggKVxuICAgICAgICBjdHgucmVzdG9yZSgpXG5cbiAgICAgICAgIyBAYmIucmVuZGVyIGN0eFxuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbGVcblxuIiwiXG4jIEEgc2ltcGxlIFRpbWVyOlxuIyBpdCBoZWxwcyB5b3Uga2VlcCB0cmFjayBvZiB0aGUgdGltZSB0aGF0IGhhcyBlbGFwc2VkIHNpbmNlIHlvdSBsYXN0IFwicHVuY2goKVwiLWVkIGl0XG5cblxuY2xhc3MgVGltZXJcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQGxhc3RfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICAgIEBkZWx0YSA9IDBcblxuICAgICMgcHVuY2ggcmVzZXRzIHRoZSB0aW1lciBhbmQgcmV0dXJucyB0aGUgdGltZSAoaW4gbXMpIGJldHdlZW4gdGhlIGxhc3QgdHdvIHB1bmNoZXNcbiAgICBwdW5jaDogLT5cbiAgICAgICAgdGhpc190aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgQGRlbHRhID0gdGhpc190aW1lIC0gQGxhc3RfdGltZVxuICAgICAgICBAbGFzdF90aW1lID0gdGhpc190aW1lXG4gICAgICAgIHJldHVybiBAZGVsdGFcblxuICAgICMgZGVsdGEgZ2l2ZXMgeW91IHRoZSB0aW1lIHRoYXQgaGFzIGVsYXBzZWQgc2luY2UgdGhlIHRpbWVyIHdhcyBwdW5jaGVkIHRoZSBsYXN0IHRpbWVcbiAgICB0aW1lU2luY2VMYXN0UHVuY2g6IC0+XG4gICAgICAgIHRoaXNfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICAgIHRoaXNfdGltZSAtIEBsYXN0X3RpbWVcblxuICAgIGZwczogLT5cbiAgICAgICAgMTAwMCAvIEBkZWx0YVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbWVyXG4iLCIjXG4jICB2ZWN0b3IuY29mZmVlXG4jXG4jICBDcmVhdGVkIGJ5IEtvbGphIFdpbGNrZSBpbiBPY3RvYmVyIDIwMTFcbiMgIENvcHlyaWdodCAyMDExLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuI1xuIyAgVGhlIHVuZGVyc2NvcmUgYXQgdGhlIGVuZCBvZiBhIG1ldGhvZCBzaWduaWZpZXMgdGhhdCBpdCBvcGVyYXRlcyBvbiBpdHNlbGZcbiNcblxuY2xhc3MgVmVjdG9yXG4gICAgY29uc3RydWN0b3I6ICh4ID0gMCwgeSA9IDApIC0+XG4gICAgICAgIEB4ID0geFxuICAgICAgICBAeSA9IHlcblxuICAgIGNsb25lOiAtPlxuICAgICAgICBuZXcgVmVjdG9yIEB4LCBAeVxuXG4gICAgIyBBZGQgYW5vdGhlciBWZWN0b3JcbiAgICBhZGQ6ICh2ZWMpIC0+XG4gICAgICAgIG5ldyBWZWN0b3IgQHggKyB2ZWMueCwgQHkgKyB2ZWMueVxuXG4gICAgYWRkXzogKHZlYykgLT5cbiAgICAgICAgQHggKz0gdmVjLnhcbiAgICAgICAgQHkgKz0gdmVjLnlcblxuICAgICMgU3VidHJhY3QgYW5vdGhlciBWZWN0b3JcbiAgICBzdWJ0cmFjdDogKHZlYykgLT5cbiAgICAgICAgbmV3IFZlY3RvciBAeCAtIHZlYy54LCBAeSAtIHZlYy55XG5cbiAgICBzdWJ0cmFjdF86ICh2ZWMpIC0+XG4gICAgICAgIEB4IC09IHZlYy54XG4gICAgICAgIEB5IC09IHZlYy55XG5cbiAgICAjIG11bHRpcGx5IHRoZSB2ZWN0b3Igd2l0aCBhIE51bWJlclxuICAgIG11bHQ6IChudW0pIC0+XG4gICAgICAgIG5ldyBWZWN0b3IgQHggKiBudW0sIEB5ICogbnVtXG5cbiAgICBtdWx0XzogKG51bSkgLT5cbiAgICAgICAgQHggKj0gbnVtXG4gICAgICAgIEB5ICo9IG51bVxuXG4gICAgIyByZXR1cm5zIHRoZSBsZW5ndGggb2YgdGhlIHZlY3RvciAoQmV0cmFnKVxuICAgIGxlbmd0aDogLT5cbiAgICAgICAgTWF0aC5zcXJ0IEB4KkB4ICsgQHkqQHlcblxuICAgICMgcmV0dXJuIHRoZSBsZW5ndGggc3F1YXJlZCAoZm9yIG9wdGltaXNhdGlvbilcbiAgICBsZW5ndGhTcXVhcmVkOiAtPlxuICAgICAgICBAeCpAeCArIEB5KkB5XG5cbiAgICAjIHJldHVybnMgdGhlIG5vcm1hbGl6ZWQgdmVjdG9yIChMZW5ndGggPSAxKVxuICAgIG5vcm06IChmYWN0b3I9MSkgLT5cbiAgICAgICAgaWYgKCBAbGVuZ3RoKCkgPiAwIClcbiAgICAgICAgICAgIHJldHVybiBAbXVsdCBmYWN0b3IvbFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgbm9ybV86IChmYWN0b3I9MSkgLT5cbiAgICAgICAgaWYgKCBAbGVuZ3RoKCkgPiAwIClcbiAgICAgICAgICAgIHJldHVybiBAbXVsdF8gZmFjdG9yL2xcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG51bGxcblxuICAgICMgcmV0dXJucyB0aGUgc2NhbGFycHJvZHVjdFxuICAgIHNjYWxhclByb2R1Y3Q6ICh2ZWMpIC0+XG4gICAgICAgIEB4ICogdmVjLnggKyBAeSAqIHZlYy55XG5cbiAgICBzYW1lRGlyZWN0aW9uOiAodmVjKSAtPlxuICAgICAgICBpZiAoQGxlbmd0aFNxdWFyZWQoKSA8IEBhZGQodmVjKS5sZW5ndGhTcXVhcmVkKCkpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcblxuICAgICMgcmV0dXJucyB0aGUgYW5nbGUgaXQgZm9ybXMgd2l0aCBhIGdpdmVuIHZlY3RvclxuICAgIGFuZ2xlV2l0aDogKHZlYykgLT5cbiAgICAgICAgTWF0aC5hY29zKCBAc2NhbGFyUHJvZHVjdCggdmVjICkgLyBAbGVuZ3RoKCkgKiB2ZWMubGVuZ3RoKCkgKVxuXG4gICAgIyByZXR1cm5zIHRoZSB2ZWN0b3Jwcm9kdWN0ICh2ZWN0b3IvS3JldXpwcm9kdWt0KSAtLSBub3QgeWV0IGltcGxlbWVudGVkXG4gICAgdmVjdG9yUHJvZHVjdDogKHZlYykgLT5cbiAgICAgICAgcmV0dXJuIHRoaXNcblxuICAgICMgcmV0dXJucyB0aGUgY29tcG9uZW50IHBhcmFsbGVsIHRvIGEgZ2l2ZW4gdmVjdG9yXG4gICAgcHJvamVjdFRvOiAodmVjKSAtPlxuICAgICAgICB2ZWMubXVsdCggQHNjYWxhclByb2R1Y3QodmVjKSAvIHZlYy5sZW5ndGhTcXVhcmVkKCkgKVxuXG4gICAgcHJvamVjdFRvXzogKHZlYykgLT5cbiAgICAgICAgbSA9IEBzY2FsYXJQcm9kdWN0KHZlYykgLyB2ZWMubGVuZ3RoU3F1YXJlZCgpXG4gICAgICAgIEB4ICo9IG1cbiAgICAgICAgQHkgKj0gbVxuXG5cbiAgICAjIENsYXNzIG1ldGhvZDogY2hlY2tzIGlmIHR3byB2ZWN0b3JzIGFyZSBpbnRlcnNlY3RpbmcgLSByZXR1cm5zIGludGVyc2VjdGlvbiBwb2ludFxuICAgIEBpbnRlcnNlY3Rpbmc6IChvYSwgYSwgb2IsIGIpIC0+XG5cbiAgICAgICAgYyA9IG9iLnN1YnRyYWN0IG9hXG4gICAgICAgIGIgPSBiLm11bHQgLTFcbiAgICAgICAgY29sID0gW11cblxuICAgICAgICBjb2xbMF0gPSBhLmNsb25lKClcbiAgICAgICAgY29sWzFdID0gYi5jbG9uZSgpXG4gICAgICAgIGNvbFsyXSA9IGMuY2xvbmUoKVxuICAgICAgICBsPTA7IG09MTsgbj0yXG5cbiAgICAgICAgIyBNdWx0aXBsaWNhdG9yXG5cbiAgICAgICAgbXVsdCA9IGNvbFswXS55IC8gY29sWzBdLnhcblxuICAgICAgICAjIEJyaW5nIE1hdHJpeCBpbnRvIFRyaWFuZ3VsYXIgc2hhcGVcblxuICAgICAgICBjb2xbMF0ueSA9IDBcbiAgICAgICAgY29sWzFdLnkgPSBjb2xbMV0ueSAtIChtdWx0ICogY29sWzFdLngpXG4gICAgICAgIGNvbFsyXS55ID0gY29sWzJdLnkgLSAobXVsdCAqIGNvbFsyXS54KVxuXG4gICAgICAgICMgUmV2ZXJzZSBTdWJzdGl0dXRpb25cblxuICAgICAgICBtdSA9IGNvbFtuXS55IC8gY29sW21dLnlcbiAgICAgICAgIyBsYiA9IChjb2xbbl0ueCAtIChjb2xbbV0ueCAqIG11KSkgLyBjb2xbbF0ueCAjICBtdSBpcyBzdWZmaWNpZW50IHNvIHRoaXMgZG9lc24ndCBuZWVkIHRvIGJlIGRvbmVcblxuICAgICAgICByZXR1cm4gb2Iuc3VidHJhY3QoIGIubXVsdChtdSkgKVxuXG4gICAgcHJpbnQ6IC0+XG4gICAgICAgIHJldHVybiBcIigje0B4fSwgI3tAeX0pXCJcblxubW9kdWxlLmV4cG9ydHMgPSBWZWN0b3JcbiJdfQ==
(9)
});
