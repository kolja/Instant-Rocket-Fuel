!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.irf=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var Animation, Shape, Timer;

Shape = _dereq_('./shape.coffee');

Timer = _dereq_('./timer.coffee');

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


},{"./shape.coffee":14,"./timer.coffee":17}],2:[function(_dereq_,module,exports){
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


},{}],3:[function(_dereq_,module,exports){
var BoundingBox, Vector;

Vector = _dereq_('./vector.coffee');

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

module.exports = BoundingBox;


},{"./vector.coffee":18}],4:[function(_dereq_,module,exports){
var BoundingBox, Vector;

Vector = _dereq_('./vector.coffee');

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

module.exports = BoundingBox;


},{"./vector.coffee":18}],5:[function(_dereq_,module,exports){
var Camera, Vector;

Vector = _dereq_('./vector.coffee');

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


},{"./vector.coffee":18}],6:[function(_dereq_,module,exports){
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


},{}],7:[function(_dereq_,module,exports){
var Game, Helpers, SceneManager, Timer,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

SceneManager = _dereq_('./scenemanager.coffee');

Helpers = _dereq_('./helpers.coffee');

Timer = _dereq_('./timer.coffee');

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
    canvas = document.createElement('canvas');
    canvas.setAttribute("width", this.params.width);
    canvas.setAttribute("height", this.params.height);
    document.querySelector("body").appendChild(canvas);
    this.ctx = canvas.getContext('2d');
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


},{"./helpers.coffee":8,"./scenemanager.coffee":13,"./timer.coffee":17}],8:[function(_dereq_,module,exports){
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


},{}],9:[function(_dereq_,module,exports){
module.exports = {
  Animation: _dereq_('./animation.coffee'),
  Background: _dereq_('./background.coffee'),
  BoundingBox: _dereq_('./boundingbox.coffee'),
  Camera: _dereq_('./camera.coffee'),
  EventManager: _dereq_('./eventmanager.coffee'),
  Game: _dereq_('./game.coffee'),
  Helpers: _dereq_('./helpers.coffee'),
  Keyboard: _dereq_('./keyboard.coffee'),
  Map: _dereq_('./map.coffee'),
  Scene: _dereq_('./scene.coffee'),
  SceneManager: _dereq_('./scenemanager.coffee'),
  Shape: _dereq_('./shape.coffee'),
  Sprite: _dereq_('./sprite.coffee'),
  Tile: _dereq_('./tile.coffee'),
  Timer: _dereq_('./timer.coffee'),
  Vector: _dereq_('./vector.coffee')
};


},{"./animation.coffee":1,"./background.coffee":2,"./boundingbox.coffee":4,"./camera.coffee":5,"./eventmanager.coffee":6,"./game.coffee":7,"./helpers.coffee":8,"./keyboard.coffee":10,"./map.coffee":11,"./scene.coffee":12,"./scenemanager.coffee":13,"./shape.coffee":14,"./sprite.coffee":15,"./tile.coffee":16,"./timer.coffee":17,"./vector.coffee":18}],10:[function(_dereq_,module,exports){
var Keyboard;

Keyboard = (function() {
  function Keyboard() {
    var code, name, rootElement, _ref,
      _this = this;
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
    rootElement = document.querySelector('html');
    rootElement.addEventListener("keydown", function(event) {
      return _this.keyarray[_this.mapping[event.which]] = true;
    });
    rootElement.addEventListener("keyup", function(event) {
      return _this.keyarray[_this.mapping[event.which]] = false;
    });
  }

  Keyboard.prototype.key = function(which) {
    return this.keyarray[which];
  };

  Keyboard.prototype.check = function() {
    return this.keyarray;
  };

  return Keyboard;

})();

module.exports = Keyboard;


},{}],11:[function(_dereq_,module,exports){
var Map, Tile;

Tile = _dereq_('./tile.coffee');

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


},{"./tile.coffee":16}],12:[function(_dereq_,module,exports){
var Scene;

Scene = (function() {
  function Scene() {}

  Scene.prototype.update = function() {};

  Scene.prototype.render = function() {};

  return Scene;

})();

module.exports = Scene;


},{}],13:[function(_dereq_,module,exports){
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

module.exports = SceneManager;


},{}],14:[function(_dereq_,module,exports){
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


},{}],15:[function(_dereq_,module,exports){
var Animation, Shape, Sprite;

Shape = _dereq_('./shape.coffee');

Animation = _dereq_('./animation.coffee');

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

module.exports = Sprite;


},{"./animation.coffee":1,"./shape.coffee":14}],16:[function(_dereq_,module,exports){
var BoundingBox, Tile, Vector;

BoundingBox = _dereq_('./boundingBox.coffee');

Vector = _dereq_('./vector.coffee');

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


},{"./boundingBox.coffee":3,"./vector.coffee":18}],17:[function(_dereq_,module,exports){
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


},{}],18:[function(_dereq_,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMva29samEvLm52bS92MC4xMC4wL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL3ByaXZhdGUvdmFyL3d3dy9pcmYvc3JjL2FuaW1hdGlvbi5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvYmFja2dyb3VuZC5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvYm91bmRpbmdCb3guY29mZmVlIiwiL3ByaXZhdGUvdmFyL3d3dy9pcmYvc3JjL2JvdW5kaW5nYm94LmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy9jYW1lcmEuY29mZmVlIiwiL3ByaXZhdGUvdmFyL3d3dy9pcmYvc3JjL2V2ZW50bWFuYWdlci5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvZ2FtZS5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvaGVscGVycy5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvaXJmLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy9rZXlib2FyZC5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvbWFwLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy9zY2VuZS5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvc2NlbmVtYW5hZ2VyLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy9zaGFwZS5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvc3ByaXRlLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy90aWxlLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy90aW1lci5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvdmVjdG9yLmNvZmZlZSJdLCJu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Q0FxQkEsQ0FBSyxDQUFMO0NBR0EsQ0FBUyxFQUFXLElBQWIsR0FBQTtDQTNHWCxFQWlGZTs7Q0FqRmYsRUE2R08sRUFBUCxJQUFPO0NBQ0gsRUFBUSxDQUFHLE9BQUg7Q0E5R1osRUE2R087O0NBN0dQOztDQURKOztBQWlIQSxDQWpIQSxFQWlIaUIsR0FBWCxDQUFOIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcblNoYXBlID0gcmVxdWlyZSAnLi9zaGFwZS5jb2ZmZWUnXG5UaW1lciA9IHJlcXVpcmUgJy4vdGltZXIuY29mZmVlJ1xuXG5jbGFzcyBBbmltYXRpb25cblxuICAgIGNvbnN0cnVjdG9yOiAoQHNwcml0ZSwgcGFyYW1zKSAtPlxuICAgICAgICBAZnBzID0gcGFyYW1zW1wiZnBzXCJdID8gMzBcbiAgICAgICAgQGxvb3AgPSBwYXJhbXNbXCJsb29wXCJdID8gdHJ1ZVxuICAgICAgICBAY2FsbGJhY2sgPSBwYXJhbXNbXCJjYWxsYmFja1wiXSA/IG51bGxcbiAgICAgICAgQGZyYW1lcyA9IGZvciBpbmRleCBpbiBwYXJhbXNbXCJmcmFtZXNcIl1cbiAgICAgICAgICAgIG5ldyBTaGFwZSBAc3ByaXRlLCBpbmRleFxuICAgICAgICBAbGFzdEZyYW1lID0gQGZyYW1lcy5sZW5ndGggLSAxXG4gICAgICAgIEB0aW1lciA9IG5ldyBUaW1lclxuICAgICAgICBAY3VycmVudEZyYW1lID0gMFxuICAgICAgICBAcGxheWluZyA9IHRydWVcblxuICAgIHJlbmRlcjogKGN0eCkgLT5cbiAgICAgICAgaWYgQHBsYXlpbmdcbiAgICAgICAgICAgIEBjdXJyZW50RnJhbWUgPSBNYXRoLmZsb29yKCBAdGltZXIudGltZVNpbmNlTGFzdFB1bmNoKCkgLyAoMTAwMCAvIEBmcHMpIClcbiAgICAgICAgICAgIGlmIEBjdXJyZW50RnJhbWUgPiBAbGFzdEZyYW1lXG4gICAgICAgICAgICAgICAgQGNhbGxiYWNrPygpXG4gICAgICAgICAgICAgICAgaWYgQGxvb3BcbiAgICAgICAgICAgICAgICAgICAgQHJld2luZCgpXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBAY3VycmVudEZyYW1lID0gQGxhc3RGcmFtZVxuICAgICAgICAgICAgICAgICAgICBAc3RvcCgpXG5cbiAgICAgICAgQGZyYW1lc1tAY3VycmVudEZyYW1lXS5yZW5kZXIoY3R4KVxuXG4gICAgcGxheTogLT5cbiAgICAgICAgQHBsYXlpbmcgPSB0cnVlXG5cbiAgICBzdG9wOiAtPlxuICAgICAgICBAcGxheWluZyA9IGZhbHNlXG5cbiAgICByZXdpbmQ6IC0+XG4gICAgICAgIEBjdXJyZW50RnJhbWUgPSAwXG4gICAgICAgIEB0aW1lci5wdW5jaCgpXG5cbm1vZHVsZS5leHBvcnRzID0gQW5pbWF0aW9uXG4iLCJjbGFzcyBCYWNrZ3JvdW5kXG4gICAgY29uc3RydWN0b3I6IChAc3ByaXRlKSAtPlxuICAgICAgICBAc3ByaXRlLmFkZEltYWdlIFwiYmFja2dyb3VuZFwiLCAwXG5cbiAgICByZW5kZXI6IChjdHgpIC0+XG4gICAgICAgIEBzcHJpdGUucmVuZGVyKCBcImJhY2tncm91bmRcIiwgY3R4IClcblxubW9kdWxlLmV4cG9ydHMgPSBCYWNrZ3JvdW5kXG4iLCJcblZlY3RvciA9IHJlcXVpcmUgJy4vdmVjdG9yLmNvZmZlZSdcblxuY2xhc3MgQm91bmRpbmdCb3hcbiAgICBjb25zdHJ1Y3RvcjogKEBjb29yLCBAZGltLCBAY29sb3I9XCJncmV5XCIpIC0+XG4gICAgICAgIEBjb29yID89IG5ldyBWZWN0b3JcbiAgICAgICAgQGRpbSA/PSBuZXcgVmVjdG9yXG5cbiAgICBpbnRlcnNlY3Q6IChvdGhlckJCKSAtPlxuICAgICAgICBAaW50ZXJzZWN0dihvdGhlckJCKSBhbmQgQGludGVyc2VjdGgob3RoZXJCQilcblxuICAgIGludGVyc2VjdHY6IChvdGhlckJCKSAtPlxuICAgICAgICBpZiBAY29vci55IDwgb3RoZXJCQi5jb29yLnlcbiAgICAgICAgICAgIGlmICgoQGRpbS55ICsgb3RoZXJCQi5kaW0ueSkgLyAyKSA8IChvdGhlckJCLmNvb3IueSAtIEBjb29yLnkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgaWYgKChAZGltLnkgKyBvdGhlckJCLmRpbS55KSAvIDIpIDwgKEBjb29yLnkgLSBvdGhlckJCLmNvb3IueSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgaW50ZXJzZWN0aDogKG90aGVyQkIpIC0+XG4gICAgICAgIGlmIEBjb29yLnggPCBvdGhlckJCLmNvb3IueFxuICAgICAgICAgICAgaWYgKChAZGltLnggKyBvdGhlckJCLmRpbS54KSAvIDIpIDwgKG90aGVyQkIuY29vci54IC0gQGNvb3IueClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBpZiAoKEBkaW0ueCArIG90aGVyQkIuZGltLngpIC8gMikgPCAoQGNvb3IueCAtIG90aGVyQkIuY29vci54KVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG5cblxuICAgIHJlbmRlcjogKGN0eCkgLT5cbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gQGNvbG9yXG4gICAgICAgIGN0eC5zdHJva2VSZWN0IEBjb29yLnggLSBAZGltLngvMiwgQGNvb3IueSAtIEBkaW0ueS8yLCBAZGltLngsIEBkaW0ueVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJvdW5kaW5nQm94XG4iLCJcblZlY3RvciA9IHJlcXVpcmUgJy4vdmVjdG9yLmNvZmZlZSdcblxuY2xhc3MgQm91bmRpbmdCb3hcbiAgICBjb25zdHJ1Y3RvcjogKEBjb29yLCBAZGltLCBAY29sb3I9XCJncmV5XCIpIC0+XG4gICAgICAgIEBjb29yID89IG5ldyBWZWN0b3JcbiAgICAgICAgQGRpbSA/PSBuZXcgVmVjdG9yXG5cbiAgICBpbnRlcnNlY3Q6IChvdGhlckJCKSAtPlxuICAgICAgICBAaW50ZXJzZWN0dihvdGhlckJCKSBhbmQgQGludGVyc2VjdGgob3RoZXJCQilcblxuICAgIGludGVyc2VjdHY6IChvdGhlckJCKSAtPlxuICAgICAgICBpZiBAY29vci55IDwgb3RoZXJCQi5jb29yLnlcbiAgICAgICAgICAgIGlmICgoQGRpbS55ICsgb3RoZXJCQi5kaW0ueSkgLyAyKSA8IChvdGhlckJCLmNvb3IueSAtIEBjb29yLnkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgaWYgKChAZGltLnkgKyBvdGhlckJCLmRpbS55KSAvIDIpIDwgKEBjb29yLnkgLSBvdGhlckJCLmNvb3IueSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgaW50ZXJzZWN0aDogKG90aGVyQkIpIC0+XG4gICAgICAgIGlmIEBjb29yLnggPCBvdGhlckJCLmNvb3IueFxuICAgICAgICAgICAgaWYgKChAZGltLnggKyBvdGhlckJCLmRpbS54KSAvIDIpIDwgKG90aGVyQkIuY29vci54IC0gQGNvb3IueClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBpZiAoKEBkaW0ueCArIG90aGVyQkIuZGltLngpIC8gMikgPCAoQGNvb3IueCAtIG90aGVyQkIuY29vci54KVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG5cblxuICAgIHJlbmRlcjogKGN0eCkgLT5cbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gQGNvbG9yXG4gICAgICAgIGN0eC5zdHJva2VSZWN0IEBjb29yLnggLSBAZGltLngvMiwgQGNvb3IueSAtIEBkaW0ueS8yLCBAZGltLngsIEBkaW0ueVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJvdW5kaW5nQm94XG4iLCJcblZlY3RvciA9IHJlcXVpcmUgJy4vdmVjdG9yLmNvZmZlZSdcblxuY2xhc3MgQ2FtZXJhXG4gICAgY29uc3RydWN0b3I6IChoYXNoKSAtPlxuICAgICAgICBAcHJvamVjdGlvbiA9IGhhc2hbXCJwcm9qZWN0aW9uXCJdXG4gICAgICAgIEB2cFdpZHRoID0gaGFzaFtcInZwV2lkdGhcIl0gICAjIFZpZXdwb3J0XG4gICAgICAgIEB2cEhlaWdodCA9IGhhc2hbXCJ2cEhlaWdodFwiXVxuICAgICAgICBAem9vbUZhY3RvciA9IGhhc2hbXCJ6b29tRmFjdG9yXCJdID8gMVxuICAgICAgICBAY29vciA9IG5ldyBWZWN0b3IoIDEwMCwgMTAwIClcblxuICAgIHVwZGF0ZTogKGRlbHRhKSAtPlxuXG4gICAgYXBwbHk6IChjdHgsIGNhbGxiYWNrKSAtPlxuXG4gICAgICAgIHN3aXRjaCBAcHJvamVjdGlvblxuICAgICAgICAgICAgd2hlbiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgY3R4LnNhdmUoKVxuICAgICAgICAgICAgICAgIGN0eC50cmFuc2xhdGUgQHZwV2lkdGgvMiAtIEBjb29yLngsIEB2cEhlaWdodC8yIC0gQGNvb3IueVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKClcbiAgICAgICAgICAgICAgICBjdHgucmVzdG9yZSgpXG4gICAgICAgICAgICB3aGVuIFwiaXNvXCJcbiAgICAgICAgICAgICAgICBjdHguc2F2ZSgpXG4gICAgICAgICAgICAgICAgY3R4LnNjYWxlIDEsIDAuNVxuICAgICAgICAgICAgICAgIGN0eC5yb3RhdGUgTWF0aC5QSS80XG4gICAgICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSAyMDAsIC00MDBcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgICAgICAgICAgY3R4LnJlc3RvcmUoKVxuXG5tb2R1bGUuZXhwb3J0cyA9IENhbWVyYVxuIiwiXG5jbGFzcyBFdmVudE1hbmFnZXJcblxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAZXZlbnRsaXN0ID0ge31cblxuICAgIHJlZ2lzdGVyOiAoZXZlbnQsIGNhbGxiYWNrKSAtPlxuICAgICAgICB1bmxlc3MgQGV2ZW50bGlzdFtldmVudF0/XG4gICAgICAgICAgICBAZXZlbnRsaXN0W2V2ZW50XSA9IFtdXG4gICAgICAgIEBldmVudGxpc3RbZXZlbnRdLnB1c2ggY2FsbGJhY2tcblxuICAgIHRyaWdnZXI6IChldmVudCwgb3JpZ2luKSAtPlxuICAgICAgICBmb3IgY2FsbGJhY2sgaW4gQGV2ZW50bGlzdFtldmVudF1cbiAgICAgICAgICAgIGNhbGxiYWNrKG9yaWdpbilcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudE1hbmFnZXJcbiIsIlxuU2NlbmVNYW5hZ2VyID0gcmVxdWlyZSAnLi9zY2VuZW1hbmFnZXIuY29mZmVlJ1xuSGVscGVycyA9IHJlcXVpcmUgJy4vaGVscGVycy5jb2ZmZWUnXG5UaW1lciA9IHJlcXVpcmUgJy4vdGltZXIuY29mZmVlJ1xuXG5jbGFzcyBHYW1lXG5cbiAgICBAYWRkU2NlbmU6IChzY2VuZSkgLT5cbiAgICAgICAgQHNjZW5lTWFuYWdlciA/PSBuZXcgU2NlbmVNYW5hZ2VyKClcbiAgICAgICAgQHNjZW5lTWFuYWdlci5hZGRTY2VuZSBzY2VuZVxuXG4gICAgY29uc3RydWN0b3I6IChwYXJhbXMpIC0+XG5cbiAgICAgICAgQHBhcmFtcyA9IEhlbHBlcnMuZXh0ZW5kIHtcbiAgICAgICAgICAgIFwid2lkdGhcIiA6IDgwMCxcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IDYwMFxuICAgICAgICB9LCBwYXJhbXNcblxuICAgICAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdjYW52YXMnXG4gICAgICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUgXCJ3aWR0aFwiLCBAcGFyYW1zLndpZHRoXG4gICAgICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUgXCJoZWlnaHRcIiwgQHBhcmFtcy5oZWlnaHRcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYXBwZW5kQ2hpbGQoY2FudmFzKVxuXG4gICAgICAgIEBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICAgICAgICBAY3R4LmZvbnQgPSAnNDAwIDE4cHggSGVsdmV0aWNhLCBzYW5zLXNlcmlmJ1xuICAgICAgICBAbG9vcCA9IG51bGxcbiAgICAgICAgQHRpbWVyID0gbmV3IFRpbWVyXG4gICAgICAgICMgdGhlIGluc3RhbmNlJ3Mgc2NlbmVtYW5hZ2VyIHBvaW50cyB0byB0aGUgQ2xhc3NlcyBTY2VuZW1hbmFnZXJcbiAgICAgICAgIyAob3IsIGlmIGl0IGRvZXNuJ3QgZXhpc3QsIGEgbmV3bHkgaW5zdGFudGlhdGVkIG9uZSlcbiAgICAgICAgQHNjZW5lTWFuYWdlciA9IEBjb25zdHJ1Y3Rvci5zY2VuZU1hbmFnZXIgfHwgbmV3IFNjZW5lTWFuYWdlcigpXG5cbiAgICBnYW1lbG9vcDogPT5cbiAgICAgICAgQHVwZGF0ZSgpXG4gICAgICAgIEByZW5kZXIoKVxuXG4gICAgc3RhcnQ6IC0+XG4gICAgICAgIEBsb29wID0gc2V0SW50ZXJ2YWwgQGdhbWVsb29wLCAxXG5cbiAgICBzdG9wOiAtPlxuICAgICAgICBAbG9vcC5jbGVhckludGVydmFsKClcblxuICAgIHVwZGF0ZTogLT5cbiAgICAgICAgQHRpbWVyLnB1bmNoKClcblxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgQGN0eC5jbGVhclJlY3QgMCwgMCwgQHBhcmFtcy53aWR0aCwgQHBhcmFtcy5oZWlnaHRcblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lXG4iLCJcblxuIyBodHRwOi8vY29mZmVlc2NyaXB0Y29va2Jvb2suY29tL2NoYXB0ZXJzL2FycmF5cy9zaHVmZmxpbmctYXJyYXktZWxlbWVudHNcbkFycmF5OjpzaHVmZmxlID0gLT4gQHNvcnQgLT4gMC41IC0gTWF0aC5yYW5kb20oKVxuXG5OdW1iZXI6OnRvSGV4ID0gKHBhZGRpbmc9MikgLT5cbiAgICBoZXggPSBAdG9TdHJpbmcgMTZcbiAgICB3aGlsZSAoaGV4Lmxlbmd0aCA8IHBhZGRpbmcpXG4gICAgICAgIGhleCA9IFwiMFwiICsgaGV4XG4gICAgcmV0dXJuIGhleFxuXG5jbGFzcyBIZWxwZXJzXG5cbiAgICBAZXh0ZW5kOiAob2JqZWN0LCBwcm9wZXJ0aWVzKSAtPlxuICAgICAgICBmb3Iga2V5LCB2YWwgb2YgcHJvcGVydGllc1xuICAgICAgICAgICAgb2JqZWN0W2tleV0gPSB2YWxcbiAgICAgICAgb2JqZWN0XG5cbm1vZHVsZS5leHBvcnRzID0gSGVscGVyc1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9XG4gICAgQW5pbWF0aW9uOiByZXF1aXJlICcuL2FuaW1hdGlvbi5jb2ZmZWUnXG4gICAgQmFja2dyb3VuZDogcmVxdWlyZSAnLi9iYWNrZ3JvdW5kLmNvZmZlZSdcbiAgICBCb3VuZGluZ0JveDogcmVxdWlyZSAnLi9ib3VuZGluZ2JveC5jb2ZmZWUnXG4gICAgQ2FtZXJhOiByZXF1aXJlICcuL2NhbWVyYS5jb2ZmZWUnXG4gICAgRXZlbnRNYW5hZ2VyOiByZXF1aXJlICcuL2V2ZW50bWFuYWdlci5jb2ZmZWUnXG4gICAgR2FtZTogcmVxdWlyZSAnLi9nYW1lLmNvZmZlZSdcbiAgICBIZWxwZXJzOiByZXF1aXJlICcuL2hlbHBlcnMuY29mZmVlJ1xuICAgIEtleWJvYXJkOiByZXF1aXJlICcuL2tleWJvYXJkLmNvZmZlZSdcbiAgICBNYXA6IHJlcXVpcmUgJy4vbWFwLmNvZmZlZSdcbiAgICBTY2VuZTogcmVxdWlyZSAnLi9zY2VuZS5jb2ZmZWUnXG4gICAgU2NlbmVNYW5hZ2VyOiByZXF1aXJlICcuL3NjZW5lbWFuYWdlci5jb2ZmZWUnXG4gICAgU2hhcGU6IHJlcXVpcmUgJy4vc2hhcGUuY29mZmVlJ1xuICAgIFNwcml0ZTogcmVxdWlyZSAnLi9zcHJpdGUuY29mZmVlJ1xuICAgIFRpbGU6IHJlcXVpcmUgJy4vdGlsZS5jb2ZmZWUnXG4gICAgVGltZXI6IHJlcXVpcmUgJy4vdGltZXIuY29mZmVlJ1xuICAgIFZlY3RvcjogcmVxdWlyZSAnLi92ZWN0b3IuY29mZmVlJ1xuXG5cbiIsIlxuY2xhc3MgS2V5Ym9hcmRcblxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAbWFwcGluZyA9XG4gICAgICAgICAgICA4OlwiYmFja3NwYWNlXCJcbiAgICAgICAgICAgIDk6XCJ0YWJcIlxuICAgICAgICAgICAgMTM6XCJyZXR1cm5cIlxuICAgICAgICAgICAgMTY6XCJzaGlmdFwiXG4gICAgICAgICAgICAxNzpcImN0cmxcIlxuICAgICAgICAgICAgMTg6XCJhbHRcIlxuICAgICAgICAgICAgMjc6XCJlc2NcIlxuICAgICAgICAgICAgMzI6XCJzcGFjZVwiXG4gICAgICAgICAgICAzNzpcImxlZnRcIlxuICAgICAgICAgICAgMzg6XCJ1cFwiXG4gICAgICAgICAgICAzOTpcInJpZ2h0XCJcbiAgICAgICAgICAgIDQwOlwiZG93blwiXG4gICAgICAgICAgICA0ODpcIjBcIlxuICAgICAgICAgICAgNDk6XCIxXCJcbiAgICAgICAgICAgIDQ5OlwiMVwiXG4gICAgICAgICAgICA0OTpcIjFcIlxuICAgICAgICAgICAgNDk6XCIxXCJcbiAgICAgICAgICAgIDQ5OlwiMVwiXG4gICAgICAgICAgICA0OTpcIjZcIlxuICAgICAgICAgICAgNDk6XCI3XCJcbiAgICAgICAgICAgIDQ5OlwiOFwiXG4gICAgICAgICAgICA1NzpcIjlcIlxuICAgICAgICAgICAgNjU6XCJhXCJcbiAgICAgICAgICAgIDY2OlwiYlwiXG4gICAgICAgICAgICA2NzpcImNcIlxuICAgICAgICAgICAgNjg6XCJkXCJcbiAgICAgICAgICAgIDY5OlwiZVwiXG4gICAgICAgICAgICA3MDpcImZcIlxuICAgICAgICAgICAgNzE6XCJnXCJcbiAgICAgICAgICAgIDcyOlwiaFwiXG4gICAgICAgICAgICA3MzpcImlcIlxuICAgICAgICAgICAgNzQ6XCJqXCJcbiAgICAgICAgICAgIDc1Olwia1wiXG4gICAgICAgICAgICA3NjpcImxcIlxuICAgICAgICAgICAgNzc6XCJtXCJcbiAgICAgICAgICAgIDc4OlwiblwiXG4gICAgICAgICAgICA3OTpcIm9cIlxuICAgICAgICAgICAgODA6XCJwXCJcbiAgICAgICAgICAgIDgxOlwicVwiXG4gICAgICAgICAgICA4MjpcInJcIlxuICAgICAgICAgICAgODM6XCJzXCJcbiAgICAgICAgICAgIDg0OlwidFwiXG4gICAgICAgICAgICA4NTpcInVcIlxuICAgICAgICAgICAgODc6XCJ3XCJcbiAgICAgICAgICAgIDg4OlwieFwiXG4gICAgICAgICAgICA4OTpcInlcIlxuICAgICAgICAgICAgOTA6XCJ6XCJcbiAgICAgICAgICAgIDkzOlwiY21kXCJcbiAgICAgICAgICAgIDE4ODpcIixcIlxuICAgICAgICAgICAgMTkwOlwiLlwiXG5cbiAgICAgICAgQGtleWFycmF5ID0gW11cblxuICAgICAgICBmb3IgY29kZSwgbmFtZSBvZiBAbWFwcGluZ1xuICAgICAgICAgICAgQGtleWFycmF5W25hbWVdID0gZmFsc2VcblxuICAgICAgICByb290RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgJ2h0bWwnXG5cbiAgICAgICAgcm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcImtleWRvd25cIiwgKGV2ZW50KSA9PlxuICAgICAgICAgICAgQGtleWFycmF5W0BtYXBwaW5nW2V2ZW50LndoaWNoXV0gPSB0cnVlXG5cbiAgICAgICAgcm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcImtleXVwXCIsIChldmVudCkgPT5cbiAgICAgICAgICAgIEBrZXlhcnJheVtAbWFwcGluZ1tldmVudC53aGljaF1dID0gZmFsc2VcblxuXG4gICAga2V5OiAod2hpY2gpIC0+XG4gICAgICAgIHJldHVybiBAa2V5YXJyYXlbd2hpY2hdXG5cbiAgICBjaGVjazogLT5cbiAgICAgICAgcmV0dXJuIEBrZXlhcnJheVxuXG5tb2R1bGUuZXhwb3J0cyA9IEtleWJvYXJkXG4iLCJcblRpbGUgPSByZXF1aXJlICcuL3RpbGUuY29mZmVlJ1xuXG5jbGFzcyBNYXBcbiAgICBjb25zdHJ1Y3RvcjogKGhhc2gpIC0+XG4gICAgICAgIEBzcHJpdGUgPSBoYXNoW1wic3ByaXRlXCJdXG4gICAgICAgIEB0aWxlcyA9IFtdXG4gICAgICAgIEB3aWR0aCA9IDAgIyB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBtYXAgaW4gdGlsZXMgLSBjYW4gb25seSBiZSBkZXRlcm1pbmVkIGFmdGVyIHRoZSBtYXBmaWxlIGxvYWRpbmcgaGFzIGNvbXBsZXRlZFxuICAgICAgICBAaGVpZ2h0ID0gMFxuXG4gICAgICAgICMgaW4gaGFzaFtcInBhdHRlcm5cIl0geW91IGNhbiBlaXRoZXIgcGFzcyBhIHN0cmluZyBsaWtlIFwic2ltcGxlXCIsIFwic3F1YXJlXCIgb3IgXCJjcm9zc1wiXG4gICAgICAgICMgaW4gd2hpY2ggY2FzZSB0aGUgcmVzcGVjdGl2ZSBtZXRob2Qgd2lsbCBiZSBjYWxsZWQuIEFsdGVybmF0aXZlbHksIHlvdSBjYW4gcGFzcyB5b3VyIG93biBjdXN0b20gZnVuY3Rpb24uXG4gICAgICAgIGlmIHR5cGVvZiBoYXNoW1wicGF0dGVyblwiXSBpcyBcImZ1bmN0aW9uXCJcbiAgICAgICAgICAgIEByZWFkID0gaGFzaFtcInBhdHRlcm5cIl1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgc3dpdGNoIGhhc2hbXCJwYXR0ZXJuXCJdXG4gICAgICAgICAgICAgICAgd2hlbiBcInNpbXBsZVwiXG4gICAgICAgICAgICAgICAgICAgIEByZWFkID0gQHJlYWRTaW1wbGVcbiAgICAgICAgICAgICAgICB3aGVuIFwic3F1YXJlXCJcbiAgICAgICAgICAgICAgICAgICAgQHJlYWQgPSBAcmVhZFNxdWFyZVxuICAgICAgICAgICAgICAgIHdoZW4gXCJjcm9zc1wiXG4gICAgICAgICAgICAgICAgICAgIEByZWFkID0gQHJlYWRDcm9zc1xuXG4gICAgICAgIEBtYXAgPSBuZXcgSW1hZ2UoKVxuICAgICAgICBAbWFwLnNyYyA9IGhhc2hbXCJtYXBmaWxlXCJdXG4gICAgICAgIEBtYXBEYXRhID0gW11cblxuICAgICAgICBAbG9hZE1hcERhdGFGcm9tSW1hZ2UoKVxuXG4gICAgcmVuZGVyOiAoY3R4LCBjYW1lcmEpIC0+XG4gICAgICAgIGZvciB0aWxlIGluIEB0aWxlc1xuICAgICAgICAgICAgaWYgdGlsZS5zcXVhcmVkRGlzdGFuY2VUbyhjYW1lcmEuY29vcikgPCAxMDAwMDBcbiAgICAgICAgICAgICAgICB0aWxlLnJlbmRlcihjdHgpXG5cbiAgICAjIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzEwMjgxOS9jaHJvbWUtZGlzYWJsZS1zYW1lLW9yaWdpbi1wb2xpY3lcbiAgICAjIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvOTM0MDEyL2dldC1pbWFnZS1kYXRhLWluLWphdmFzY3JpcHRcbiAgICBsb2FkTWFwRGF0YUZyb21JbWFnZTogLT5cbiAgICAgICAgJChAbWFwKS5sb2FkID0+XG4gICAgICAgICAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpXG4gICAgICAgICAgICBAd2lkdGggPSBAbWFwLndpZHRoXG4gICAgICAgICAgICBAaGVpZ2h0ID0gQG1hcC5oZWlnaHRcbiAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IEBtYXAud2lkdGhcbiAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBAbWFwLmhlaWdodFxuICAgICAgICAgICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKVxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSggQG1hcCwgMCwgMClcbiAgICAgICAgICAgIGRhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsMCxAbWFwLndpZHRoLEBtYXAuaGVpZ2h0KS5kYXRhXG5cbiAgICAgICAgICAgIGZvciBwLGkgaW4gZGF0YSBieSA0XG4gICAgICAgICAgICAgICAgcm93ID0gTWF0aC5mbG9vcigoaS80KS9AbWFwLndpZHRoKVxuICAgICAgICAgICAgICAgIEBtYXBEYXRhW3Jvd10gPz0gW11cbiAgICAgICAgICAgICAgICBAbWFwRGF0YVtyb3ddLnB1c2ggW051bWJlcihkYXRhW2ldKS50b0hleCgpLE51bWJlcihkYXRhW2krMV0pLnRvSGV4KCksTnVtYmVyKGRhdGFbaSsyXSkudG9IZXgoKSxOdW1iZXIoZGF0YVtpKzNdKS50b0hleCgpXVxuXG4gICAgICAgICAgICBAcmVhZCgpXG5cbiAgICAgICAgICAgIGZvciB0aWxlLCBpbmRleCBpbiBAdGlsZXNcbiAgICAgICAgICAgICAgICB0aWxlLm5laWdoYm9yW1wid1wiXSA9IEB0aWxlc1tpbmRleC0xXVxuICAgICAgICAgICAgICAgIHRpbGUubmVpZ2hib3JbXCJlXCJdID0gQHRpbGVzW2luZGV4KzFdXG4gICAgICAgICAgICAgICAgdGlsZS5uZWlnaGJvcltcIm5cIl0gPSBAdGlsZXNbaW5kZXgtQHdpZHRoXVxuICAgICAgICAgICAgICAgIHRpbGUubmVpZ2hib3JbXCJzXCJdID0gQHRpbGVzW2luZGV4K0B3aWR0aF1cblxuXG4gICAgcmVhZFNpbXBsZTogLT5cbiAgICAgICAgZm9yIHJvdyBpbiBbMC4uQG1hcC5oZWlnaHQtMV1cbiAgICAgICAgICAgIGZvciBjb2wgaW4gWzAuLkBtYXAud2lkdGgtMV1cbiAgICAgICAgICAgICAgICB0eXBlID0gXCIje0BtYXBEYXRhW3Jvd11bY29sXVswXX1cIlxuICAgICAgICAgICAgICAgIGdyZWVuID0gcGFyc2VJbnQoIEBtYXBEYXRhW3Jvd11bY29sXVsxXSwgMTYgKVxuICAgICAgICAgICAgICAgIHogPSBwYXJzZUludCggQG1hcERhdGFbcm93XVtjb2xdWzJdLCAxNiApXG4gICAgICAgICAgICAgICAgQHRpbGVzLnB1c2goIG5ldyBUaWxlKCBAc3ByaXRlLCB0eXBlLCByb3csIGNvbCwgZ3JlZW4sIHogKSlcblxuICAgIHJlYWRTcXVhcmU6IC0+XG4gICAgICAgIGZvciByb3cgaW4gWzAuLkBtYXAuaGVpZ2h0LTJdXG4gICAgICAgICAgICBmb3IgY29sIGluIFswLi5AbWFwLndpZHRoLTJdXG4gICAgICAgICAgICAgICAgdHlwZSA9IFwiI3tAbWFwRGF0YVtyb3ddW2NvbF1bMF19I3tAbWFwRGF0YVtyb3ddW2NvbCsxXVswXX0je0BtYXBEYXRhW3JvdysxXVtjb2xdWzBdfSN7QG1hcERhdGFbcm93KzFdW2NvbCsxXVswXX1cIlxuICAgICAgICAgICAgICAgIGdyZWVuID0gcGFyc2VJbnQoIEBtYXBEYXRhW3Jvd11bY29sXVsxXSwgMTYgKVxuICAgICAgICAgICAgICAgIHogPSBwYXJzZUludCggQG1hcERhdGFbcm93XVtjb2xdWzJdLCAxNiApXG4gICAgICAgICAgICAgICAgQHRpbGVzLnB1c2goIG5ldyBUaWxlKCBAc3ByaXRlLCB0eXBlLCByb3csIGNvbCwgZ3JlZW4sIHogKSlcblxuICAgIHJlYWRDcm9zczogLT5cbiAgICAgICAgZm9yIHJvdyBpbiBbMS4uQG1hcC5oZWlnaHQtMl0gYnkgMlxuICAgICAgICAgICAgZm9yIGNvbCBpbiBbMS4uQG1hcC53aWR0aC0yXSBieSAyXG4gICAgICAgICAgICAgICAgdW5sZXNzIEBtYXBEYXRhW3Jvd11bY29sXVswXSBpcyBcIjAwXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9IFwiI3tAbWFwRGF0YVtyb3ctMV1bY29sXVswXX0je0BtYXBEYXRhW3Jvd11bY29sKzFdWzBdfSN7QG1hcERhdGFbcm93KzFdW2NvbF1bMF19I3tAbWFwRGF0YVtyb3ddW2NvbC0xXVswXX1cIlxuICAgICAgICAgICAgICAgICAgICBncmVlbiA9IHBhcnNlSW50KCBAbWFwRGF0YVtyb3ddW2NvbF1bMV0sIDE2IClcbiAgICAgICAgICAgICAgICAgICAgeiA9IHBhcnNlSW50KCBAbWFwRGF0YVtyb3ddW2NvbF1bMl0sIDE2IClcbiAgICAgICAgICAgICAgICAgICAgQHRpbGVzLnB1c2goIG5ldyBUaWxlKCBAc3ByaXRlLCB0eXBlLCByb3cvMiwgY29sLzIsIGdyZWVuLCB6ICkpXG5cbiAgICB0aWxlQXRWZWN0b3I6ICh2ZWMpIC0+XG4gICAgICAgIHggPSBNYXRoLmZsb29yKCB2ZWMueCAvIEBzcHJpdGUuaW5uZXJXaWR0aCApXG4gICAgICAgIHkgPSBNYXRoLmZsb29yKCB2ZWMueSAvIEBzcHJpdGUuaW5uZXJIZWlnaHQgKVxuICAgICAgICBpbmRleCA9IHkgKiBAd2lkdGggKyB4XG4gICAgICAgIHJldHVybiBAdGlsZXNbaW5kZXhdXG5cbm1vZHVsZS5leHBvcnRzID0gTWFwXG5cbiIsImNsYXNzIFNjZW5lXG5cbiAgY29uc3RydWN0b3I6IC0+XG5cbiAgdXBkYXRlOiAtPlxuXG4gIHJlbmRlcjogLT5cblxubW9kdWxlLmV4cG9ydHMgPSBTY2VuZVxuIiwiIyAjIFRoZSBTY2VuZU1hbmFnZXJcbiMgaXMgdGhlIGNsYXNzIHRvIGhvbGQgYW5kIG1hbmFnZSAoc3dpdGNoIGJldHdlZW4pIHRoZSAnc2NlbmVzJyB0aGF0IHlvdXJcbiMgR2FtZSBjb25zaXN0cyBvZi4gSXQgbWFpbnRhaW5zXG5jbGFzcyBTY2VuZU1hbmFnZXJcbiAgICAjICogYSBoYXNoIHdpdGggYWxsIFNjZW5lcyBpbiB0aGUgZ2FtZVxuICAgICMgKiBhIHJlZmVyZW5jZSB0byB0aGUgdGhlIHNjZW5lIHRoYXQgaXMgY3VycmVudGx5IGFjdGl2ZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAc2NlbmVzID0ge31cbiAgICAgICAgQGN1cnJlbnRTY2VuZSA9IG51bGxcblxuICAgIGFkZFNjZW5lOiAoc2NlbmVDbGFzcykgLT5cbiAgICAgICAgQHNjZW5lc1tzY2VuZUNsYXNzLm5hbWVdID1cbiAgICAgICAgICAgIFwiY2xhc3NcIiAgICA6IHNjZW5lQ2xhc3NcbiAgICAgICAgICAgIFwiaW5zdGFuY2VcIiA6IG51bGxcblxuICAgIHNldFNjZW5lOiAoc2NlbmUsIHBhcmVudCkgLT5cbiAgICAgICAgIyBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIHNjZW5lLCB1bmxlc3MgaXQgaGFzIGJlZW4gY3JlYXRlZCBiZWZvcmVcbiAgICAgICAgQGN1cnJlbnRTY2VuZSA9IEBzY2VuZXNbc2NlbmVdLmluc3RhbmNlID89IG5ldyBAc2NlbmVzW3NjZW5lXS5jbGFzcyhwYXJlbnQpXG5cbm1vZHVsZS5leHBvcnRzID0gU2NlbmVNYW5hZ2VyXG4iLCJcbmNsYXNzIFNoYXBlXG5cbiAgICBjb25zdHJ1Y3RvcjogKEBzcHJpdGUsIGluZGV4KSAtPlxuICAgICAgICBAc3ggPSAoIGluZGV4ICogQHNwcml0ZS53aWR0aCApICUgQHNwcml0ZS50ZXhXaWR0aFxuICAgICAgICBAc3kgPSBNYXRoLmZsb29yKCggaW5kZXggKiBAc3ByaXRlLndpZHRoICkgLyBAc3ByaXRlLnRleFdpZHRoKSAqIEBzcHJpdGUuaGVpZ2h0XG5cbiAgICByZW5kZXI6IChjdHgpIC0+XG4gICAgICAgIGN0eC5zYXZlKClcbiAgICAgICAgY3R4LnRyYW5zbGF0ZSAtQHNwcml0ZS53aWR0aC8yLCAtQHNwcml0ZS5oZWlnaHQvMlxuICAgICAgICBjdHguZHJhd0ltYWdlKCBAc3ByaXRlLnRleHR1cmUsIEBzeCwgQHN5LCBAc3ByaXRlLndpZHRoLCBAc3ByaXRlLmhlaWdodCwgMCwgMCwgQHNwcml0ZS53aWR0aCwgQHNwcml0ZS5oZWlnaHQgKVxuICAgICAgICBjdHgucmVzdG9yZSgpXG5cbm1vZHVsZS5leHBvcnRzID0gU2hhcGVcbiIsIlxuIyBFdmVyeSBzcHJpdGUgaGFzIGEgVGV4dHVyZSBhbmQgYSBudW1iZXIgb2YgQXNzZXRzLlxuIyBUaGVzZSBBc3NldHMgY2FuIGJlIG9mIHR5cGUgU2hhcGUgKHNpbXBsZSBJbWFnZXMpIG9yIEFuaW1hdGlvblxuI1xuIyB1c2FnZTpcbiNcbiMgc3ByaXRlID0gbmV3IFNwcml0ZVxuIyAgIFwidGV4dHVyZVwiOiBcImltZy90ZXh0dXJlLnBuZ1xuIyAgIFwid2lkdGhcIjo1MFxuIyAgIFwiaGVpZ2h0XCI6NTBcbiMgICBcImtleVwiOlxuIyAgICAgXCJzcGFjZXNoaXBcIjogMVxuIyAgICAgXCJyb2NrXCI6IDJcbiMgICAgIFwiZW5lbXlcIjogM1xuI1xuIyBzcHJpdGUucmVuZGVyKFwic3BhY2VzaGlwXCIpXG4jXG5cblNoYXBlID0gcmVxdWlyZSAnLi9zaGFwZS5jb2ZmZWUnXG5BbmltYXRpb24gPSByZXF1aXJlICcuL2FuaW1hdGlvbi5jb2ZmZWUnXG5cbmNsYXNzIFNwcml0ZVxuICAgIGNvbnN0cnVjdG9yOiAoaGFzaCkgLT5cbiAgICAgICAgQGFzc2V0cyA9IHt9XG4gICAgICAgIEB3aWR0aCA9IGhhc2hbXCJ3aWR0aFwiXVxuICAgICAgICBAaGVpZ2h0ID0gaGFzaFtcImhlaWdodFwiXVxuICAgICAgICBAdGV4dHVyZSA9IG5ldyBJbWFnZSgpXG4gICAgICAgIEB0ZXh0dXJlLnNyYyA9IGhhc2hbXCJ0ZXh0dXJlXCJdXG4gICAgICAgIEBrZXkgPSBoYXNoW1wia2V5XCJdID8ge31cblxuICAgICAgICBmb3Iga2V5LCBpIG9mIEBrZXlcbiAgICAgICAgICAgIEBhZGRJbWFnZSBrZXksIGlcblxuICAgICAgICBAaW5uZXJXaWR0aCA9IGhhc2hbXCJpbm5lcldpZHRoXCJdID8gQHdpZHRoXG4gICAgICAgIEBpbm5lckhlaWdodCA9IGhhc2hbXCJpbm5lckhlaWdodFwiXSA/IEBoZWlnaHRcblxuICAgIGFkZEltYWdlOiAobmFtZSwgaW5kZXgpIC0+XG4gICAgICAgICQoQHRleHR1cmUpLmxvYWQgPT5cbiAgICAgICAgICAgIEB0ZXhXaWR0aCA9IEB0ZXh0dXJlLndpZHRoXG4gICAgICAgICAgICBAYXNzZXRzW25hbWVdID0gbmV3IFNoYXBlIHRoaXMsIGluZGV4XG5cbiAgICBhZGRBbmltYXRpb246IChuYW1lLCBwYXJhbXMpIC0+XG4gICAgICAgICQoQHRleHR1cmUpLmxvYWQgPT5cbiAgICAgICAgICAgIEB0ZXhXaWR0aCA9IEB0ZXh0dXJlLndpZHRoXG4gICAgICAgICAgICBAYXNzZXRzW25hbWVdID0gbmV3IEFuaW1hdGlvbiB0aGlzLCBwYXJhbXNcblxuICAgIHJlbmRlcjogKG5hbWUsIGN0eCkgLT5cbiAgICAgICAgQGFzc2V0c1tuYW1lXS5yZW5kZXIoY3R4KSBpZiBAYXNzZXRzW25hbWVdP1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBTcHJpdGVcbiIsIlxuQm91bmRpbmdCb3ggPSByZXF1aXJlICcuL2JvdW5kaW5nQm94LmNvZmZlZSdcblZlY3RvciA9IHJlcXVpcmUgJy4vdmVjdG9yLmNvZmZlZSdcblxuY2xhc3MgVGlsZVxuICAgIGNvbnN0cnVjdG9yOiAoQHNwcml0ZSwgQHR5cGUsIEByb3csIEBjb2wsIEBncmVlbj0wLCBAej0wKSAtPlxuICAgICAgICBAbmVpZ2hib3IgPSBbXVxuICAgICAgICBAeCA9IEBjb2wgKiBAc3ByaXRlLmlubmVyV2lkdGggKyBAc3ByaXRlLmlubmVyV2lkdGgvMlxuICAgICAgICBAeSA9IEByb3cgKiBAc3ByaXRlLmlubmVySGVpZ2h0ICsgQHNwcml0ZS5pbm5lckhlaWdodC8yXG4gICAgICAgIEBiYiA9IG5ldyBCb3VuZGluZ0JveCBuZXcgVmVjdG9yKCBAeCwgQHkgKSwgbmV3IFZlY3RvciggQHNwcml0ZS5pbm5lcldpZHRoLCBAc3ByaXRlLmlubmVySGVpZ2h0IClcbiAgICAgICAgQGJiLmNvbG9yID0gXCJncmVlblwiXG5cbiAgICBpc1dhbGthYmxlOiAtPlxuICAgICAgICBAZ3JlZW4gaXMgMFxuXG4gICAgc3F1YXJlZERpc3RhbmNlVG86ICh2ZWMpIC0+XG4gICAgICAgIHZlYy5zdWJ0cmFjdCggbmV3IFZlY3RvcihAeCxAeSkgKS5sZW5ndGhTcXVhcmVkKCkgIyBtYXliZSBhZGQgYSBkaXN0YW5jZSAoY2xhc3MtKW1ldGhvZCB0byB2ZWN0b3I/XG5cbiAgICByZW5kZXI6IChjdHgpIC0+XG4gICAgICAgIGN0eC5zYXZlKClcbiAgICAgICAgY3R4LnRyYW5zbGF0ZSBAeCAtIEB6LCBAeSAtIEB6XG4gICAgICAgIEBzcHJpdGUucmVuZGVyKCBAdHlwZSwgY3R4IClcbiAgICAgICAgY3R4LnJlc3RvcmUoKVxuXG4gICAgICAgICMgQGJiLnJlbmRlciBjdHhcblxubW9kdWxlLmV4cG9ydHMgPSBUaWxlXG5cbiIsIlxuIyBBIHNpbXBsZSBUaW1lcjpcbiMgaXQgaGVscHMgeW91IGtlZXAgdHJhY2sgb2YgdGhlIHRpbWUgdGhhdCBoYXMgZWxhcHNlZCBzaW5jZSB5b3UgbGFzdCBcInB1bmNoKClcIi1lZCBpdFxuXG5cbmNsYXNzIFRpbWVyXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBsYXN0X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICBAZGVsdGEgPSAwXG5cbiAgICAjIHB1bmNoIHJlc2V0cyB0aGUgdGltZXIgYW5kIHJldHVybnMgdGhlIHRpbWUgKGluIG1zKSBiZXR3ZWVuIHRoZSBsYXN0IHR3byBwdW5jaGVzXG4gICAgcHVuY2g6IC0+XG4gICAgICAgIHRoaXNfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICAgIEBkZWx0YSA9IHRoaXNfdGltZSAtIEBsYXN0X3RpbWVcbiAgICAgICAgQGxhc3RfdGltZSA9IHRoaXNfdGltZVxuICAgICAgICByZXR1cm4gQGRlbHRhXG5cbiAgICAjIGRlbHRhIGdpdmVzIHlvdSB0aGUgdGltZSB0aGF0IGhhcyBlbGFwc2VkIHNpbmNlIHRoZSB0aW1lciB3YXMgcHVuY2hlZCB0aGUgbGFzdCB0aW1lXG4gICAgdGltZVNpbmNlTGFzdFB1bmNoOiAtPlxuICAgICAgICB0aGlzX3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICB0aGlzX3RpbWUgLSBAbGFzdF90aW1lXG5cbiAgICBmcHM6IC0+XG4gICAgICAgIDEwMDAgLyBAZGVsdGFcblxubW9kdWxlLmV4cG9ydHMgPSBUaW1lclxuIiwiI1xuIyAgdmVjdG9yLmNvZmZlZVxuI1xuIyAgQ3JlYXRlZCBieSBLb2xqYSBXaWxja2UgaW4gT2N0b2JlciAyMDExXG4jICBDb3B5cmlnaHQgMjAxMS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiNcbiMgIFRoZSB1bmRlcnNjb3JlIGF0IHRoZSBlbmQgb2YgYSBtZXRob2Qgc2lnbmlmaWVzIHRoYXQgaXQgb3BlcmF0ZXMgb24gaXRzZWxmXG4jXG5cbmNsYXNzIFZlY3RvclxuICAgIGNvbnN0cnVjdG9yOiAoeCA9IDAsIHkgPSAwKSAtPlxuICAgICAgICBAeCA9IHhcbiAgICAgICAgQHkgPSB5XG5cbiAgICBjbG9uZTogLT5cbiAgICAgICAgbmV3IFZlY3RvciBAeCwgQHlcblxuICAgICMgQWRkIGFub3RoZXIgVmVjdG9yXG4gICAgYWRkOiAodmVjKSAtPlxuICAgICAgICBuZXcgVmVjdG9yIEB4ICsgdmVjLngsIEB5ICsgdmVjLnlcblxuICAgIGFkZF86ICh2ZWMpIC0+XG4gICAgICAgIEB4ICs9IHZlYy54XG4gICAgICAgIEB5ICs9IHZlYy55XG5cbiAgICAjIFN1YnRyYWN0IGFub3RoZXIgVmVjdG9yXG4gICAgc3VidHJhY3Q6ICh2ZWMpIC0+XG4gICAgICAgIG5ldyBWZWN0b3IgQHggLSB2ZWMueCwgQHkgLSB2ZWMueVxuXG4gICAgc3VidHJhY3RfOiAodmVjKSAtPlxuICAgICAgICBAeCAtPSB2ZWMueFxuICAgICAgICBAeSAtPSB2ZWMueVxuXG4gICAgIyBtdWx0aXBseSB0aGUgdmVjdG9yIHdpdGggYSBOdW1iZXJcbiAgICBtdWx0OiAobnVtKSAtPlxuICAgICAgICBuZXcgVmVjdG9yIEB4ICogbnVtLCBAeSAqIG51bVxuXG4gICAgbXVsdF86IChudW0pIC0+XG4gICAgICAgIEB4ICo9IG51bVxuICAgICAgICBAeSAqPSBudW1cblxuICAgICMgcmV0dXJucyB0aGUgbGVuZ3RoIG9mIHRoZSB2ZWN0b3IgKEJldHJhZylcbiAgICBsZW5ndGg6IC0+XG4gICAgICAgIE1hdGguc3FydCBAeCpAeCArIEB5KkB5XG5cbiAgICAjIHJldHVybiB0aGUgbGVuZ3RoIHNxdWFyZWQgKGZvciBvcHRpbWlzYXRpb24pXG4gICAgbGVuZ3RoU3F1YXJlZDogLT5cbiAgICAgICAgQHgqQHggKyBAeSpAeVxuXG4gICAgIyByZXR1cm5zIHRoZSBub3JtYWxpemVkIHZlY3RvciAoTGVuZ3RoID0gMSlcbiAgICBub3JtOiAoZmFjdG9yPTEpIC0+XG4gICAgICAgIGlmICggQGxlbmd0aCgpID4gMCApXG4gICAgICAgICAgICByZXR1cm4gQG11bHQgZmFjdG9yL2xcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG51bGxcblxuICAgIG5vcm1fOiAoZmFjdG9yPTEpIC0+XG4gICAgICAgIGlmICggQGxlbmd0aCgpID4gMCApXG4gICAgICAgICAgICByZXR1cm4gQG11bHRfIGZhY3Rvci9sXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBudWxsXG5cbiAgICAjIHJldHVybnMgdGhlIHNjYWxhcnByb2R1Y3RcbiAgICBzY2FsYXJQcm9kdWN0OiAodmVjKSAtPlxuICAgICAgICBAeCAqIHZlYy54ICsgQHkgKiB2ZWMueVxuXG4gICAgc2FtZURpcmVjdGlvbjogKHZlYykgLT5cbiAgICAgICAgaWYgKEBsZW5ndGhTcXVhcmVkKCkgPCBAYWRkKHZlYykubGVuZ3RoU3F1YXJlZCgpKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAjIHJldHVybnMgdGhlIGFuZ2xlIGl0IGZvcm1zIHdpdGggYSBnaXZlbiB2ZWN0b3JcbiAgICBhbmdsZVdpdGg6ICh2ZWMpIC0+XG4gICAgICAgIE1hdGguYWNvcyggQHNjYWxhclByb2R1Y3QoIHZlYyApIC8gQGxlbmd0aCgpICogdmVjLmxlbmd0aCgpIClcblxuICAgICMgcmV0dXJucyB0aGUgdmVjdG9ycHJvZHVjdCAodmVjdG9yL0tyZXV6cHJvZHVrdCkgLS0gbm90IHlldCBpbXBsZW1lbnRlZFxuICAgIHZlY3RvclByb2R1Y3Q6ICh2ZWMpIC0+XG4gICAgICAgIHJldHVybiB0aGlzXG5cbiAgICAjIHJldHVybnMgdGhlIGNvbXBvbmVudCBwYXJhbGxlbCB0byBhIGdpdmVuIHZlY3RvclxuICAgIHByb2plY3RUbzogKHZlYykgLT5cbiAgICAgICAgdmVjLm11bHQoIEBzY2FsYXJQcm9kdWN0KHZlYykgLyB2ZWMubGVuZ3RoU3F1YXJlZCgpIClcblxuICAgIHByb2plY3RUb186ICh2ZWMpIC0+XG4gICAgICAgIG0gPSBAc2NhbGFyUHJvZHVjdCh2ZWMpIC8gdmVjLmxlbmd0aFNxdWFyZWQoKVxuICAgICAgICBAeCAqPSBtXG4gICAgICAgIEB5ICo9IG1cblxuXG4gICAgIyBDbGFzcyBtZXRob2Q6IGNoZWNrcyBpZiB0d28gdmVjdG9ycyBhcmUgaW50ZXJzZWN0aW5nIC0gcmV0dXJucyBpbnRlcnNlY3Rpb24gcG9pbnRcbiAgICBAaW50ZXJzZWN0aW5nOiAob2EsIGEsIG9iLCBiKSAtPlxuXG4gICAgICAgIGMgPSBvYi5zdWJ0cmFjdCBvYVxuICAgICAgICBiID0gYi5tdWx0IC0xXG4gICAgICAgIGNvbCA9IFtdXG5cbiAgICAgICAgY29sWzBdID0gYS5jbG9uZSgpXG4gICAgICAgIGNvbFsxXSA9IGIuY2xvbmUoKVxuICAgICAgICBjb2xbMl0gPSBjLmNsb25lKClcbiAgICAgICAgbD0wOyBtPTE7IG49MlxuXG4gICAgICAgICMgTXVsdGlwbGljYXRvclxuXG4gICAgICAgIG11bHQgPSBjb2xbMF0ueSAvIGNvbFswXS54XG5cbiAgICAgICAgIyBCcmluZyBNYXRyaXggaW50byBUcmlhbmd1bGFyIHNoYXBlXG5cbiAgICAgICAgY29sWzBdLnkgPSAwXG4gICAgICAgIGNvbFsxXS55ID0gY29sWzFdLnkgLSAobXVsdCAqIGNvbFsxXS54KVxuICAgICAgICBjb2xbMl0ueSA9IGNvbFsyXS55IC0gKG11bHQgKiBjb2xbMl0ueClcblxuICAgICAgICAjIFJldmVyc2UgU3Vic3RpdHV0aW9uXG5cbiAgICAgICAgbXUgPSBjb2xbbl0ueSAvIGNvbFttXS55XG4gICAgICAgICMgbGIgPSAoY29sW25dLnggLSAoY29sW21dLnggKiBtdSkpIC8gY29sW2xdLnggIyAgbXUgaXMgc3VmZmljaWVudCBzbyB0aGlzIGRvZXNuJ3QgbmVlZCB0byBiZSBkb25lXG5cbiAgICAgICAgcmV0dXJuIG9iLnN1YnRyYWN0KCBiLm11bHQobXUpIClcblxuICAgIHByaW50OiAtPlxuICAgICAgICByZXR1cm4gXCIoI3tAeH0sICN7QHl9KVwiXG5cbm1vZHVsZS5leHBvcnRzID0gVmVjdG9yXG4iXX0=
(9)
});
