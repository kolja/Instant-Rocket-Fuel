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
    if (otherBB == null) {
      return false;
    }
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
    if (otherBB == null) {
      return false;
    }
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
    this.timer = new Timer;
    this.sceneManager = this.constructor.sceneManager || new SceneManager();
  }

  Game.prototype.gameloop = function(timestamp) {
    this.update();
    this.render();
    if (this.loopID) {
      return this.loopID = window.requestAnimationFrame(this.gameloop);
    }
  };

  Game.prototype.start = function() {
    return this.loopID = window.requestAnimationFrame(this.gameloop);
  };

  Game.prototype.stop = function() {
    cancelAnimationFrame(this.loopID);
    return this.loopID = void 0;
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
    this.rd = null;
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
      if (tile.squaredDistanceTo(camera.coor) < this.renderDistance(camera)) {
        _results.push(tile.render(ctx));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Map.prototype.renderDistance = function(camera) {
    if (this.rd != null) {
      return this.rd;
    }
    return this.rd = (Math.pow(camera.vpWidth, 2) + Math.pow(camera.vpHeight, 2)) / 4;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMva29samEvLm52bS92MC4xMC4wL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL3ByaXZhdGUvdmFyL3d3dy9pcmYvc3JjL2FuaW1hdGlvbi5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvYmFja2dyb3VuZC5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvYm91bmRpbmdCb3guY29mZmVlIiwiL3ByaXZhdGUvdmFyL3d3dy9pcmYvc3JjL2JvdW5kaW5nYm94LmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy9jYW1lcmEuY29mZmVlIiwiL3ByaXZhdGUvdmFyL3d3dy9pcmYvc3JjL2V2ZW50bWFuYWdlci5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvZ2FtZS5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvaGVscGVycy5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvaXJmLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy9rZXlib2FyZC5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvbWFwLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy9zY2VuZS5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvc2NlbmVtYW5hZ2VyLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy9zaGFwZS5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvc3ByaXRlLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy90aWxlLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy90aW1lci5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvdmVjdG9yLmNvZmZlZSJdLCJu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WTs7Q0ExRVosQ0FpRkEsQ0FBZSxHQUFkLEdBQWUsR0FBaEI7Q0FFSSxPQUFBLGlCQUFBO0NBQUEsQ0FBTSxDQUFGLENBQUosSUFBSTtBQUNRLENBRFosRUFDSSxDQUFKO0NBREEsQ0FBQSxDQUVBLENBQUE7Q0FGQSxFQUlJLENBQUosQ0FBUztDQUpULEVBS0ksQ0FBSixDQUFTO0NBTFQsRUFNSSxDQUFKLENBQVM7Q0FOVCxFQU9FLENBQUY7Q0FQQSxFQU9PLENBQUY7Q0FQTCxFQU9ZLENBQUY7Q0FQVixFQVdPLENBQVA7Q0FYQSxFQWVJLENBQUo7Q0FmQSxFQWdCSSxDQUFKO0NBaEJBLEVBaUJJLENBQUo7Q0FqQkEsQ0FxQkEsQ0FBSyxDQUFMO0NBR0EsQ0FBUyxFQUFXLElBQWIsR0FBQTtDQTNHWCxFQWlGZTs7Q0FqRmYsRUE2R08sRUFBUCxJQUFPO0NBQ0gsRUFBUSxDQUFHLE9BQUg7Q0E5R1osRUE2R087O0NBN0dQOztDQURKOztBQWlIQSxDQWpIQSxFQWlIaUIsR0FBWCxDQUFOIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcblNoYXBlID0gcmVxdWlyZSAnLi9zaGFwZS5jb2ZmZWUnXG5UaW1lciA9IHJlcXVpcmUgJy4vdGltZXIuY29mZmVlJ1xuXG5jbGFzcyBBbmltYXRpb25cblxuICAgIGNvbnN0cnVjdG9yOiAoQHNwcml0ZSwgcGFyYW1zKSAtPlxuICAgICAgICBAZnBzID0gcGFyYW1zW1wiZnBzXCJdID8gMzBcbiAgICAgICAgQGxvb3AgPSBwYXJhbXNbXCJsb29wXCJdID8gdHJ1ZVxuICAgICAgICBAY2FsbGJhY2sgPSBwYXJhbXNbXCJjYWxsYmFja1wiXSA/IG51bGxcbiAgICAgICAgQGZyYW1lcyA9IGZvciBpbmRleCBpbiBwYXJhbXNbXCJmcmFtZXNcIl1cbiAgICAgICAgICAgIG5ldyBTaGFwZSBAc3ByaXRlLCBpbmRleFxuICAgICAgICBAbGFzdEZyYW1lID0gQGZyYW1lcy5sZW5ndGggLSAxXG4gICAgICAgIEB0aW1lciA9IG5ldyBUaW1lclxuICAgICAgICBAY3VycmVudEZyYW1lID0gMFxuICAgICAgICBAcGxheWluZyA9IHRydWVcblxuICAgIHJlbmRlcjogKGN0eCkgLT5cbiAgICAgICAgaWYgQHBsYXlpbmdcbiAgICAgICAgICAgIEBjdXJyZW50RnJhbWUgPSBNYXRoLmZsb29yKCBAdGltZXIudGltZVNpbmNlTGFzdFB1bmNoKCkgLyAoMTAwMCAvIEBmcHMpIClcbiAgICAgICAgICAgIGlmIEBjdXJyZW50RnJhbWUgPiBAbGFzdEZyYW1lXG4gICAgICAgICAgICAgICAgQGNhbGxiYWNrPygpXG4gICAgICAgICAgICAgICAgaWYgQGxvb3BcbiAgICAgICAgICAgICAgICAgICAgQHJld2luZCgpXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBAY3VycmVudEZyYW1lID0gQGxhc3RGcmFtZVxuICAgICAgICAgICAgICAgICAgICBAc3RvcCgpXG5cbiAgICAgICAgQGZyYW1lc1tAY3VycmVudEZyYW1lXS5yZW5kZXIoY3R4KVxuXG4gICAgcGxheTogLT5cbiAgICAgICAgQHBsYXlpbmcgPSB0cnVlXG5cbiAgICBzdG9wOiAtPlxuICAgICAgICBAcGxheWluZyA9IGZhbHNlXG5cbiAgICByZXdpbmQ6IC0+XG4gICAgICAgIEBjdXJyZW50RnJhbWUgPSAwXG4gICAgICAgIEB0aW1lci5wdW5jaCgpXG5cbm1vZHVsZS5leHBvcnRzID0gQW5pbWF0aW9uXG4iLCJjbGFzcyBCYWNrZ3JvdW5kXG4gICAgY29uc3RydWN0b3I6IChAc3ByaXRlKSAtPlxuICAgICAgICBAc3ByaXRlLmFkZEltYWdlIFwiYmFja2dyb3VuZFwiLCAwXG5cbiAgICByZW5kZXI6IChjdHgpIC0+XG4gICAgICAgIEBzcHJpdGUucmVuZGVyKCBcImJhY2tncm91bmRcIiwgY3R4IClcblxubW9kdWxlLmV4cG9ydHMgPSBCYWNrZ3JvdW5kXG4iLCJcblZlY3RvciA9IHJlcXVpcmUgJy4vdmVjdG9yLmNvZmZlZSdcblxuY2xhc3MgQm91bmRpbmdCb3hcbiAgICBjb25zdHJ1Y3RvcjogKEBjb29yLCBAZGltLCBAY29sb3I9XCJncmV5XCIpIC0+XG4gICAgICAgIEBjb29yID89IG5ldyBWZWN0b3JcbiAgICAgICAgQGRpbSA/PSBuZXcgVmVjdG9yXG5cbiAgICBpbnRlcnNlY3Q6IChvdGhlckJCKSAtPlxuICAgICAgICBpZiBub3Qgb3RoZXJCQj8gdGhlbiByZXR1cm4gZmFsc2VcbiAgICAgICAgQGludGVyc2VjdHYob3RoZXJCQikgYW5kIEBpbnRlcnNlY3RoKG90aGVyQkIpXG5cbiAgICBpbnRlcnNlY3R2OiAob3RoZXJCQikgLT5cbiAgICAgICAgaWYgQGNvb3IueSA8IG90aGVyQkIuY29vci55XG4gICAgICAgICAgICBpZiAoKEBkaW0ueSArIG90aGVyQkIuZGltLnkpIC8gMikgPCAob3RoZXJCQi5jb29yLnkgLSBAY29vci55KVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGlmICgoQGRpbS55ICsgb3RoZXJCQi5kaW0ueSkgLyAyKSA8IChAY29vci55IC0gb3RoZXJCQi5jb29yLnkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcblxuICAgIGludGVyc2VjdGg6IChvdGhlckJCKSAtPlxuICAgICAgICBpZiBAY29vci54IDwgb3RoZXJCQi5jb29yLnhcbiAgICAgICAgICAgIGlmICgoQGRpbS54ICsgb3RoZXJCQi5kaW0ueCkgLyAyKSA8IChvdGhlckJCLmNvb3IueCAtIEBjb29yLngpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgaWYgKChAZGltLnggKyBvdGhlckJCLmRpbS54KSAvIDIpIDwgKEBjb29yLnggLSBvdGhlckJCLmNvb3IueClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuXG5cbiAgICByZW5kZXI6IChjdHgpIC0+XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IEBjb2xvclxuICAgICAgICBjdHguc3Ryb2tlUmVjdCBAY29vci54IC0gQGRpbS54LzIsIEBjb29yLnkgLSBAZGltLnkvMiwgQGRpbS54LCBAZGltLnlcblxubW9kdWxlLmV4cG9ydHMgPSBCb3VuZGluZ0JveFxuIiwiXG5WZWN0b3IgPSByZXF1aXJlICcuL3ZlY3Rvci5jb2ZmZWUnXG5cbmNsYXNzIEJvdW5kaW5nQm94XG4gICAgY29uc3RydWN0b3I6IChAY29vciwgQGRpbSwgQGNvbG9yPVwiZ3JleVwiKSAtPlxuICAgICAgICBAY29vciA/PSBuZXcgVmVjdG9yXG4gICAgICAgIEBkaW0gPz0gbmV3IFZlY3RvclxuXG4gICAgaW50ZXJzZWN0OiAob3RoZXJCQikgLT5cbiAgICAgICAgaWYgbm90IG90aGVyQkI/IHRoZW4gcmV0dXJuIGZhbHNlXG4gICAgICAgIEBpbnRlcnNlY3R2KG90aGVyQkIpIGFuZCBAaW50ZXJzZWN0aChvdGhlckJCKVxuXG4gICAgaW50ZXJzZWN0djogKG90aGVyQkIpIC0+XG4gICAgICAgIGlmIEBjb29yLnkgPCBvdGhlckJCLmNvb3IueVxuICAgICAgICAgICAgaWYgKChAZGltLnkgKyBvdGhlckJCLmRpbS55KSAvIDIpIDwgKG90aGVyQkIuY29vci55IC0gQGNvb3IueSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBpZiAoKEBkaW0ueSArIG90aGVyQkIuZGltLnkpIC8gMikgPCAoQGNvb3IueSAtIG90aGVyQkIuY29vci55KVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG5cbiAgICBpbnRlcnNlY3RoOiAob3RoZXJCQikgLT5cbiAgICAgICAgaWYgQGNvb3IueCA8IG90aGVyQkIuY29vci54XG4gICAgICAgICAgICBpZiAoKEBkaW0ueCArIG90aGVyQkIuZGltLngpIC8gMikgPCAob3RoZXJCQi5jb29yLnggLSBAY29vci54KVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGlmICgoQGRpbS54ICsgb3RoZXJCQi5kaW0ueCkgLyAyKSA8IChAY29vci54IC0gb3RoZXJCQi5jb29yLngpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcblxuXG4gICAgcmVuZGVyOiAoY3R4KSAtPlxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBAY29sb3JcbiAgICAgICAgY3R4LnN0cm9rZVJlY3QgQGNvb3IueCAtIEBkaW0ueC8yLCBAY29vci55IC0gQGRpbS55LzIsIEBkaW0ueCwgQGRpbS55XG5cbm1vZHVsZS5leHBvcnRzID0gQm91bmRpbmdCb3hcbiIsIlxuVmVjdG9yID0gcmVxdWlyZSAnLi92ZWN0b3IuY29mZmVlJ1xuXG5jbGFzcyBDYW1lcmFcbiAgICBjb25zdHJ1Y3RvcjogKGhhc2gpIC0+XG4gICAgICAgIEBwcm9qZWN0aW9uID0gaGFzaFtcInByb2plY3Rpb25cIl1cbiAgICAgICAgQHZwV2lkdGggPSBoYXNoW1widnBXaWR0aFwiXSAgICMgVmlld3BvcnRcbiAgICAgICAgQHZwSGVpZ2h0ID0gaGFzaFtcInZwSGVpZ2h0XCJdXG4gICAgICAgIEB6b29tRmFjdG9yID0gaGFzaFtcInpvb21GYWN0b3JcIl0gPyAxXG4gICAgICAgIEBjb29yID0gbmV3IFZlY3RvciggMTAwLCAxMDAgKVxuXG4gICAgdXBkYXRlOiAoZGVsdGEpIC0+XG5cbiAgICBhcHBseTogKGN0eCwgY2FsbGJhY2spIC0+XG5cbiAgICAgICAgc3dpdGNoIEBwcm9qZWN0aW9uXG4gICAgICAgICAgICB3aGVuIFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgICBjdHguc2F2ZSgpXG4gICAgICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSBAdnBXaWR0aC8yIC0gQGNvb3IueCwgQHZwSGVpZ2h0LzIgLSBAY29vci55XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgICAgICAgIGN0eC5yZXN0b3JlKClcbiAgICAgICAgICAgIHdoZW4gXCJpc29cIlxuICAgICAgICAgICAgICAgIGN0eC5zYXZlKClcbiAgICAgICAgICAgICAgICBjdHguc2NhbGUgMSwgMC41XG4gICAgICAgICAgICAgICAgY3R4LnJvdGF0ZSBNYXRoLlBJLzRcbiAgICAgICAgICAgICAgICBjdHgudHJhbnNsYXRlIDIwMCwgLTQwMFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKClcbiAgICAgICAgICAgICAgICBjdHgucmVzdG9yZSgpXG5cbm1vZHVsZS5leHBvcnRzID0gQ2FtZXJhXG4iLCJcbmNsYXNzIEV2ZW50TWFuYWdlclxuXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBldmVudGxpc3QgPSB7fVxuXG4gICAgcmVnaXN0ZXI6IChldmVudCwgY2FsbGJhY2spIC0+XG4gICAgICAgIHVubGVzcyBAZXZlbnRsaXN0W2V2ZW50XT9cbiAgICAgICAgICAgIEBldmVudGxpc3RbZXZlbnRdID0gW11cbiAgICAgICAgQGV2ZW50bGlzdFtldmVudF0ucHVzaCBjYWxsYmFja1xuXG4gICAgdHJpZ2dlcjogKGV2ZW50LCBvcmlnaW4pIC0+XG4gICAgICAgIGZvciBjYWxsYmFjayBpbiBAZXZlbnRsaXN0W2V2ZW50XVxuICAgICAgICAgICAgY2FsbGJhY2sob3JpZ2luKVxuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50TWFuYWdlclxuIiwiXG5TY2VuZU1hbmFnZXIgPSByZXF1aXJlICcuL3NjZW5lbWFuYWdlci5jb2ZmZWUnXG5IZWxwZXJzID0gcmVxdWlyZSAnLi9oZWxwZXJzLmNvZmZlZSdcblRpbWVyID0gcmVxdWlyZSAnLi90aW1lci5jb2ZmZWUnXG5cbmNsYXNzIEdhbWVcblxuICAgIEBhZGRTY2VuZTogKHNjZW5lKSAtPlxuICAgICAgICBAc2NlbmVNYW5hZ2VyID89IG5ldyBTY2VuZU1hbmFnZXIoKVxuICAgICAgICBAc2NlbmVNYW5hZ2VyLmFkZFNjZW5lIHNjZW5lXG5cbiAgICBjb25zdHJ1Y3RvcjogKHBhcmFtcykgLT5cblxuICAgICAgICBAcGFyYW1zID0gSGVscGVycy5leHRlbmQge1xuICAgICAgICAgICAgXCJ3aWR0aFwiIDogODAwLFxuICAgICAgICAgICAgXCJoZWlnaHRcIjogNjAwXG4gICAgICAgIH0sIHBhcmFtc1xuXG4gICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2NhbnZhcydcbiAgICAgICAgY2FudmFzLnNldEF0dHJpYnV0ZSBcIndpZHRoXCIsIEBwYXJhbXMud2lkdGhcbiAgICAgICAgY2FudmFzLnNldEF0dHJpYnV0ZSBcImhlaWdodFwiLCBAcGFyYW1zLmhlaWdodFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hcHBlbmRDaGlsZChjYW52YXMpXG5cbiAgICAgICAgQGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgICAgIEBjdHguZm9udCA9ICc0MDAgMThweCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYnXG5cbiAgICAgICAgIyBUT0RPOiByZW1vdmUgVGltZXIgYXMgbmVjZXNzYXJ5IGluZ3JlZGllbnQuIFVzZSB0aGUgdGltZXN0YW1wIHBhcmFtZXRlciB0byByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgaW5zdGVhZC5cbiAgICAgICAgQHRpbWVyID0gbmV3IFRpbWVyXG5cbiAgICAgICAgIyB0aGUgaW5zdGFuY2UncyBzY2VuZW1hbmFnZXIgcG9pbnRzIHRvIHRoZSBDbGFzc2VzIFNjZW5lbWFuYWdlclxuICAgICAgICAjIChvciwgaWYgaXQgZG9lc24ndCBleGlzdCwgYSBuZXdseSBpbnN0YW50aWF0ZWQgb25lKVxuICAgICAgICBAc2NlbmVNYW5hZ2VyID0gQGNvbnN0cnVjdG9yLnNjZW5lTWFuYWdlciB8fCBuZXcgU2NlbmVNYW5hZ2VyKClcblxuICAgIGdhbWVsb29wOiAodGltZXN0YW1wKSA9PlxuICAgICAgICBAdXBkYXRlKClcbiAgICAgICAgQHJlbmRlcigpXG4gICAgICAgIEBsb29wSUQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIEBnYW1lbG9vcCBpZiBAbG9vcElEXG5cbiAgICBzdGFydDogLT5cbiAgICAgICAgQGxvb3BJRCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgQGdhbWVsb29wXG5cbiAgICBzdG9wOiAtPlxuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSBAbG9vcElEXG4gICAgICAgIEBsb29wSUQgPSB1bmRlZmluZWRcblxuICAgIHVwZGF0ZTogLT5cbiAgICAgICAgQHRpbWVyLnB1bmNoKClcblxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgQGN0eC5jbGVhclJlY3QgMCwgMCwgQHBhcmFtcy53aWR0aCwgQHBhcmFtcy5oZWlnaHRcblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lXG4iLCJcblxuIyBodHRwOi8vY29mZmVlc2NyaXB0Y29va2Jvb2suY29tL2NoYXB0ZXJzL2FycmF5cy9zaHVmZmxpbmctYXJyYXktZWxlbWVudHNcbkFycmF5OjpzaHVmZmxlID0gLT4gQHNvcnQgLT4gMC41IC0gTWF0aC5yYW5kb20oKVxuXG5OdW1iZXI6OnRvSGV4ID0gKHBhZGRpbmc9MikgLT5cbiAgICBoZXggPSBAdG9TdHJpbmcgMTZcbiAgICB3aGlsZSAoaGV4Lmxlbmd0aCA8IHBhZGRpbmcpXG4gICAgICAgIGhleCA9IFwiMFwiICsgaGV4XG4gICAgcmV0dXJuIGhleFxuXG5jbGFzcyBIZWxwZXJzXG5cbiAgICBAZXh0ZW5kOiAob2JqZWN0LCBwcm9wZXJ0aWVzKSAtPlxuICAgICAgICBmb3Iga2V5LCB2YWwgb2YgcHJvcGVydGllc1xuICAgICAgICAgICAgb2JqZWN0W2tleV0gPSB2YWxcbiAgICAgICAgb2JqZWN0XG5cbm1vZHVsZS5leHBvcnRzID0gSGVscGVyc1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9XG4gICAgQW5pbWF0aW9uOiByZXF1aXJlICcuL2FuaW1hdGlvbi5jb2ZmZWUnXG4gICAgQmFja2dyb3VuZDogcmVxdWlyZSAnLi9iYWNrZ3JvdW5kLmNvZmZlZSdcbiAgICBCb3VuZGluZ0JveDogcmVxdWlyZSAnLi9ib3VuZGluZ2JveC5jb2ZmZWUnXG4gICAgQ2FtZXJhOiByZXF1aXJlICcuL2NhbWVyYS5jb2ZmZWUnXG4gICAgRXZlbnRNYW5hZ2VyOiByZXF1aXJlICcuL2V2ZW50bWFuYWdlci5jb2ZmZWUnXG4gICAgR2FtZTogcmVxdWlyZSAnLi9nYW1lLmNvZmZlZSdcbiAgICBIZWxwZXJzOiByZXF1aXJlICcuL2hlbHBlcnMuY29mZmVlJ1xuICAgIEtleWJvYXJkOiByZXF1aXJlICcuL2tleWJvYXJkLmNvZmZlZSdcbiAgICBNYXA6IHJlcXVpcmUgJy4vbWFwLmNvZmZlZSdcbiAgICBTY2VuZTogcmVxdWlyZSAnLi9zY2VuZS5jb2ZmZWUnXG4gICAgU2NlbmVNYW5hZ2VyOiByZXF1aXJlICcuL3NjZW5lbWFuYWdlci5jb2ZmZWUnXG4gICAgU2hhcGU6IHJlcXVpcmUgJy4vc2hhcGUuY29mZmVlJ1xuICAgIFNwcml0ZTogcmVxdWlyZSAnLi9zcHJpdGUuY29mZmVlJ1xuICAgIFRpbGU6IHJlcXVpcmUgJy4vdGlsZS5jb2ZmZWUnXG4gICAgVGltZXI6IHJlcXVpcmUgJy4vdGltZXIuY29mZmVlJ1xuICAgIFZlY3RvcjogcmVxdWlyZSAnLi92ZWN0b3IuY29mZmVlJ1xuXG5cbiIsIlxuY2xhc3MgS2V5Ym9hcmRcblxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAbWFwcGluZyA9XG4gICAgICAgICAgICA4OlwiYmFja3NwYWNlXCJcbiAgICAgICAgICAgIDk6XCJ0YWJcIlxuICAgICAgICAgICAgMTM6XCJyZXR1cm5cIlxuICAgICAgICAgICAgMTY6XCJzaGlmdFwiXG4gICAgICAgICAgICAxNzpcImN0cmxcIlxuICAgICAgICAgICAgMTg6XCJhbHRcIlxuICAgICAgICAgICAgMjc6XCJlc2NcIlxuICAgICAgICAgICAgMzI6XCJzcGFjZVwiXG4gICAgICAgICAgICAzNzpcImxlZnRcIlxuICAgICAgICAgICAgMzg6XCJ1cFwiXG4gICAgICAgICAgICAzOTpcInJpZ2h0XCJcbiAgICAgICAgICAgIDQwOlwiZG93blwiXG4gICAgICAgICAgICA0ODpcIjBcIlxuICAgICAgICAgICAgNDk6XCIxXCJcbiAgICAgICAgICAgIDQ5OlwiMVwiXG4gICAgICAgICAgICA0OTpcIjFcIlxuICAgICAgICAgICAgNDk6XCIxXCJcbiAgICAgICAgICAgIDQ5OlwiMVwiXG4gICAgICAgICAgICA0OTpcIjZcIlxuICAgICAgICAgICAgNDk6XCI3XCJcbiAgICAgICAgICAgIDQ5OlwiOFwiXG4gICAgICAgICAgICA1NzpcIjlcIlxuICAgICAgICAgICAgNjU6XCJhXCJcbiAgICAgICAgICAgIDY2OlwiYlwiXG4gICAgICAgICAgICA2NzpcImNcIlxuICAgICAgICAgICAgNjg6XCJkXCJcbiAgICAgICAgICAgIDY5OlwiZVwiXG4gICAgICAgICAgICA3MDpcImZcIlxuICAgICAgICAgICAgNzE6XCJnXCJcbiAgICAgICAgICAgIDcyOlwiaFwiXG4gICAgICAgICAgICA3MzpcImlcIlxuICAgICAgICAgICAgNzQ6XCJqXCJcbiAgICAgICAgICAgIDc1Olwia1wiXG4gICAgICAgICAgICA3NjpcImxcIlxuICAgICAgICAgICAgNzc6XCJtXCJcbiAgICAgICAgICAgIDc4OlwiblwiXG4gICAgICAgICAgICA3OTpcIm9cIlxuICAgICAgICAgICAgODA6XCJwXCJcbiAgICAgICAgICAgIDgxOlwicVwiXG4gICAgICAgICAgICA4MjpcInJcIlxuICAgICAgICAgICAgODM6XCJzXCJcbiAgICAgICAgICAgIDg0OlwidFwiXG4gICAgICAgICAgICA4NTpcInVcIlxuICAgICAgICAgICAgODc6XCJ3XCJcbiAgICAgICAgICAgIDg4OlwieFwiXG4gICAgICAgICAgICA4OTpcInlcIlxuICAgICAgICAgICAgOTA6XCJ6XCJcbiAgICAgICAgICAgIDkzOlwiY21kXCJcbiAgICAgICAgICAgIDE4ODpcIixcIlxuICAgICAgICAgICAgMTkwOlwiLlwiXG5cbiAgICAgICAgQGtleWFycmF5ID0gW11cblxuICAgICAgICBmb3IgY29kZSwgbmFtZSBvZiBAbWFwcGluZ1xuICAgICAgICAgICAgQGtleWFycmF5W25hbWVdID0gZmFsc2VcblxuICAgICAgICByb290RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgJ2h0bWwnXG5cbiAgICAgICAgcm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcImtleWRvd25cIiwgKGV2ZW50KSA9PlxuICAgICAgICAgICAgQGtleWFycmF5W0BtYXBwaW5nW2V2ZW50LndoaWNoXV0gPSB0cnVlXG5cbiAgICAgICAgcm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcImtleXVwXCIsIChldmVudCkgPT5cbiAgICAgICAgICAgIEBrZXlhcnJheVtAbWFwcGluZ1tldmVudC53aGljaF1dID0gZmFsc2VcblxuXG4gICAga2V5OiAod2hpY2gpIC0+XG4gICAgICAgIHJldHVybiBAa2V5YXJyYXlbd2hpY2hdXG5cbiAgICBjaGVjazogLT5cbiAgICAgICAgcmV0dXJuIEBrZXlhcnJheVxuXG5tb2R1bGUuZXhwb3J0cyA9IEtleWJvYXJkXG4iLCJcblRpbGUgPSByZXF1aXJlICcuL3RpbGUuY29mZmVlJ1xuXG5jbGFzcyBNYXBcbiAgICBjb25zdHJ1Y3RvcjogKGhhc2gpIC0+XG4gICAgICAgIEBzcHJpdGUgPSBoYXNoW1wic3ByaXRlXCJdXG4gICAgICAgIEB0aWxlcyA9IFtdXG4gICAgICAgIEB3aWR0aCA9IDAgIyB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBtYXAgaW4gdGlsZXMgLSBjYW4gb25seSBiZSBkZXRlcm1pbmVkIGFmdGVyIHRoZSBtYXBmaWxlIGxvYWRpbmcgaGFzIGNvbXBsZXRlZFxuICAgICAgICBAaGVpZ2h0ID0gMFxuICAgICAgICBAcmQgPSBudWxsICMgcmVuZGVyRGlzdGFuY2VcblxuICAgICAgICAjIGluIGhhc2hbXCJwYXR0ZXJuXCJdIHlvdSBjYW4gZWl0aGVyIHBhc3MgYSBzdHJpbmcgbGlrZSBcInNpbXBsZVwiLCBcInNxdWFyZVwiIG9yIFwiY3Jvc3NcIlxuICAgICAgICAjIGluIHdoaWNoIGNhc2UgdGhlIHJlc3BlY3RpdmUgbWV0aG9kIHdpbGwgYmUgY2FsbGVkLiBBbHRlcm5hdGl2ZWx5LCB5b3UgY2FuIHBhc3MgeW91ciBvd24gY3VzdG9tIGZ1bmN0aW9uLlxuICAgICAgICBpZiB0eXBlb2YgaGFzaFtcInBhdHRlcm5cIl0gaXMgXCJmdW5jdGlvblwiXG4gICAgICAgICAgICBAcmVhZCA9IGhhc2hbXCJwYXR0ZXJuXCJdXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHN3aXRjaCBoYXNoW1wicGF0dGVyblwiXVxuICAgICAgICAgICAgICAgIHdoZW4gXCJzaW1wbGVcIlxuICAgICAgICAgICAgICAgICAgICBAcmVhZCA9IEByZWFkU2ltcGxlXG4gICAgICAgICAgICAgICAgd2hlbiBcInNxdWFyZVwiXG4gICAgICAgICAgICAgICAgICAgIEByZWFkID0gQHJlYWRTcXVhcmVcbiAgICAgICAgICAgICAgICB3aGVuIFwiY3Jvc3NcIlxuICAgICAgICAgICAgICAgICAgICBAcmVhZCA9IEByZWFkQ3Jvc3NcblxuICAgICAgICBAbWFwID0gbmV3IEltYWdlKClcbiAgICAgICAgQG1hcC5zcmMgPSBoYXNoW1wibWFwZmlsZVwiXVxuICAgICAgICBAbWFwRGF0YSA9IFtdXG5cbiAgICAgICAgQGxvYWRNYXBEYXRhRnJvbUltYWdlKClcblxuICAgIHJlbmRlcjogKGN0eCwgY2FtZXJhKSAtPlxuICAgICAgICBmb3IgdGlsZSBpbiBAdGlsZXNcbiAgICAgICAgICAgIGlmIHRpbGUuc3F1YXJlZERpc3RhbmNlVG8oY2FtZXJhLmNvb3IpIDwgQHJlbmRlckRpc3RhbmNlIGNhbWVyYVxuICAgICAgICAgICAgICAgIHRpbGUucmVuZGVyKGN0eClcblxuICAgIHJlbmRlckRpc3RhbmNlOiAoY2FtZXJhKSAtPlxuICAgICAgICByZXR1cm4gQHJkIGlmIEByZD8gIyBjYWNoZSB0aGUgcmVuZGVyIERpc3RhbmNlXG4gICAgICAgIEByZCA9IChNYXRoLnBvdyhjYW1lcmEudnBXaWR0aCwyKSArIE1hdGgucG93KGNhbWVyYS52cEhlaWdodCwyKSkvNFxuXG4gICAgIyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMxMDI4MTkvY2hyb21lLWRpc2FibGUtc2FtZS1vcmlnaW4tcG9saWN5XG4gICAgIyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzkzNDAxMi9nZXQtaW1hZ2UtZGF0YS1pbi1qYXZhc2NyaXB0XG4gICAgbG9hZE1hcERhdGFGcm9tSW1hZ2U6IC0+XG4gICAgICAgICQoQG1hcCkubG9hZCA9PlxuICAgICAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKVxuICAgICAgICAgICAgQHdpZHRoID0gQG1hcC53aWR0aFxuICAgICAgICAgICAgQGhlaWdodCA9IEBtYXAuaGVpZ2h0XG4gICAgICAgICAgICBjYW52YXMud2lkdGggPSBAbWFwLndpZHRoXG4gICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gQG1hcC5oZWlnaHRcbiAgICAgICAgICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIilcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoIEBtYXAsIDAsIDApXG4gICAgICAgICAgICBkYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLDAsQG1hcC53aWR0aCxAbWFwLmhlaWdodCkuZGF0YVxuXG4gICAgICAgICAgICBmb3IgcCxpIGluIGRhdGEgYnkgNFxuICAgICAgICAgICAgICAgIHJvdyA9IE1hdGguZmxvb3IoKGkvNCkvQG1hcC53aWR0aClcbiAgICAgICAgICAgICAgICBAbWFwRGF0YVtyb3ddID89IFtdXG4gICAgICAgICAgICAgICAgQG1hcERhdGFbcm93XS5wdXNoIFtOdW1iZXIoZGF0YVtpXSkudG9IZXgoKSxOdW1iZXIoZGF0YVtpKzFdKS50b0hleCgpLE51bWJlcihkYXRhW2krMl0pLnRvSGV4KCksTnVtYmVyKGRhdGFbaSszXSkudG9IZXgoKV1cblxuICAgICAgICAgICAgQHJlYWQoKVxuXG4gICAgICAgICAgICBmb3IgdGlsZSwgaW5kZXggaW4gQHRpbGVzXG4gICAgICAgICAgICAgICAgdGlsZS5uZWlnaGJvcltcIndcIl0gPSBAdGlsZXNbaW5kZXgtMV1cbiAgICAgICAgICAgICAgICB0aWxlLm5laWdoYm9yW1wiZVwiXSA9IEB0aWxlc1tpbmRleCsxXVxuICAgICAgICAgICAgICAgIHRpbGUubmVpZ2hib3JbXCJuXCJdID0gQHRpbGVzW2luZGV4LUB3aWR0aF1cbiAgICAgICAgICAgICAgICB0aWxlLm5laWdoYm9yW1wic1wiXSA9IEB0aWxlc1tpbmRleCtAd2lkdGhdXG5cblxuICAgIHJlYWRTaW1wbGU6IC0+XG4gICAgICAgIGZvciByb3cgaW4gWzAuLkBtYXAuaGVpZ2h0LTFdXG4gICAgICAgICAgICBmb3IgY29sIGluIFswLi5AbWFwLndpZHRoLTFdXG4gICAgICAgICAgICAgICAgdHlwZSA9IFwiI3tAbWFwRGF0YVtyb3ddW2NvbF1bMF19XCJcbiAgICAgICAgICAgICAgICBncmVlbiA9IHBhcnNlSW50KCBAbWFwRGF0YVtyb3ddW2NvbF1bMV0sIDE2IClcbiAgICAgICAgICAgICAgICB6ID0gcGFyc2VJbnQoIEBtYXBEYXRhW3Jvd11bY29sXVsyXSwgMTYgKVxuICAgICAgICAgICAgICAgIEB0aWxlcy5wdXNoKCBuZXcgVGlsZSggQHNwcml0ZSwgdHlwZSwgcm93LCBjb2wsIGdyZWVuLCB6ICkpXG5cbiAgICByZWFkU3F1YXJlOiAtPlxuICAgICAgICBmb3Igcm93IGluIFswLi5AbWFwLmhlaWdodC0yXVxuICAgICAgICAgICAgZm9yIGNvbCBpbiBbMC4uQG1hcC53aWR0aC0yXVxuICAgICAgICAgICAgICAgIHR5cGUgPSBcIiN7QG1hcERhdGFbcm93XVtjb2xdWzBdfSN7QG1hcERhdGFbcm93XVtjb2wrMV1bMF19I3tAbWFwRGF0YVtyb3crMV1bY29sXVswXX0je0BtYXBEYXRhW3JvdysxXVtjb2wrMV1bMF19XCJcbiAgICAgICAgICAgICAgICBncmVlbiA9IHBhcnNlSW50KCBAbWFwRGF0YVtyb3ddW2NvbF1bMV0sIDE2IClcbiAgICAgICAgICAgICAgICB6ID0gcGFyc2VJbnQoIEBtYXBEYXRhW3Jvd11bY29sXVsyXSwgMTYgKVxuICAgICAgICAgICAgICAgIEB0aWxlcy5wdXNoKCBuZXcgVGlsZSggQHNwcml0ZSwgdHlwZSwgcm93LCBjb2wsIGdyZWVuLCB6ICkpXG5cbiAgICByZWFkQ3Jvc3M6IC0+XG4gICAgICAgIGZvciByb3cgaW4gWzEuLkBtYXAuaGVpZ2h0LTJdIGJ5IDJcbiAgICAgICAgICAgIGZvciBjb2wgaW4gWzEuLkBtYXAud2lkdGgtMl0gYnkgMlxuICAgICAgICAgICAgICAgIHVubGVzcyBAbWFwRGF0YVtyb3ddW2NvbF1bMF0gaXMgXCIwMFwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBcIiN7QG1hcERhdGFbcm93LTFdW2NvbF1bMF19I3tAbWFwRGF0YVtyb3ddW2NvbCsxXVswXX0je0BtYXBEYXRhW3JvdysxXVtjb2xdWzBdfSN7QG1hcERhdGFbcm93XVtjb2wtMV1bMF19XCJcbiAgICAgICAgICAgICAgICAgICAgZ3JlZW4gPSBwYXJzZUludCggQG1hcERhdGFbcm93XVtjb2xdWzFdLCAxNiApXG4gICAgICAgICAgICAgICAgICAgIHogPSBwYXJzZUludCggQG1hcERhdGFbcm93XVtjb2xdWzJdLCAxNiApXG4gICAgICAgICAgICAgICAgICAgIEB0aWxlcy5wdXNoKCBuZXcgVGlsZSggQHNwcml0ZSwgdHlwZSwgcm93LzIsIGNvbC8yLCBncmVlbiwgeiApKVxuXG4gICAgdGlsZUF0VmVjdG9yOiAodmVjKSAtPlxuICAgICAgICB4ID0gTWF0aC5mbG9vciggdmVjLnggLyBAc3ByaXRlLmlubmVyV2lkdGggKVxuICAgICAgICB5ID0gTWF0aC5mbG9vciggdmVjLnkgLyBAc3ByaXRlLmlubmVySGVpZ2h0IClcbiAgICAgICAgaW5kZXggPSB5ICogQHdpZHRoICsgeFxuICAgICAgICByZXR1cm4gQHRpbGVzW2luZGV4XVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcFxuXG4iLCJjbGFzcyBTY2VuZVxuXG4gIGNvbnN0cnVjdG9yOiAtPlxuXG4gIHVwZGF0ZTogLT5cblxuICByZW5kZXI6IC0+XG5cbm1vZHVsZS5leHBvcnRzID0gU2NlbmVcbiIsIiMgIyBUaGUgU2NlbmVNYW5hZ2VyXG4jIGlzIHRoZSBjbGFzcyB0byBob2xkIGFuZCBtYW5hZ2UgKHN3aXRjaCBiZXR3ZWVuKSB0aGUgJ3NjZW5lcycgdGhhdCB5b3VyXG4jIEdhbWUgY29uc2lzdHMgb2YuIEl0IG1haW50YWluc1xuY2xhc3MgU2NlbmVNYW5hZ2VyXG4gICAgIyAqIGEgaGFzaCB3aXRoIGFsbCBTY2VuZXMgaW4gdGhlIGdhbWVcbiAgICAjICogYSByZWZlcmVuY2UgdG8gdGhlIHRoZSBzY2VuZSB0aGF0IGlzIGN1cnJlbnRseSBhY3RpdmVcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQHNjZW5lcyA9IHt9XG4gICAgICAgIEBjdXJyZW50U2NlbmUgPSBudWxsXG5cbiAgICBhZGRTY2VuZTogKHNjZW5lQ2xhc3MpIC0+XG4gICAgICAgIEBzY2VuZXNbc2NlbmVDbGFzcy5uYW1lXSA9XG4gICAgICAgICAgICBcImNsYXNzXCIgICAgOiBzY2VuZUNsYXNzXG4gICAgICAgICAgICBcImluc3RhbmNlXCIgOiBudWxsXG5cbiAgICBzZXRTY2VuZTogKHNjZW5lLCBwYXJlbnQpIC0+XG4gICAgICAgICMgY3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBzY2VuZSwgdW5sZXNzIGl0IGhhcyBiZWVuIGNyZWF0ZWQgYmVmb3JlXG4gICAgICAgIEBjdXJyZW50U2NlbmUgPSBAc2NlbmVzW3NjZW5lXS5pbnN0YW5jZSA/PSBuZXcgQHNjZW5lc1tzY2VuZV0uY2xhc3MocGFyZW50KVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjZW5lTWFuYWdlclxuIiwiXG5jbGFzcyBTaGFwZVxuXG4gICAgY29uc3RydWN0b3I6IChAc3ByaXRlLCBpbmRleCkgLT5cbiAgICAgICAgQHN4ID0gKCBpbmRleCAqIEBzcHJpdGUud2lkdGggKSAlIEBzcHJpdGUudGV4V2lkdGhcbiAgICAgICAgQHN5ID0gTWF0aC5mbG9vcigoIGluZGV4ICogQHNwcml0ZS53aWR0aCApIC8gQHNwcml0ZS50ZXhXaWR0aCkgKiBAc3ByaXRlLmhlaWdodFxuXG4gICAgcmVuZGVyOiAoY3R4KSAtPlxuICAgICAgICBjdHguc2F2ZSgpXG4gICAgICAgIGN0eC50cmFuc2xhdGUgLUBzcHJpdGUud2lkdGgvMiwgLUBzcHJpdGUuaGVpZ2h0LzJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSggQHNwcml0ZS50ZXh0dXJlLCBAc3gsIEBzeSwgQHNwcml0ZS53aWR0aCwgQHNwcml0ZS5oZWlnaHQsIDAsIDAsIEBzcHJpdGUud2lkdGgsIEBzcHJpdGUuaGVpZ2h0IClcbiAgICAgICAgY3R4LnJlc3RvcmUoKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNoYXBlXG4iLCJcbiMgRXZlcnkgc3ByaXRlIGhhcyBhIFRleHR1cmUgYW5kIGEgbnVtYmVyIG9mIEFzc2V0cy5cbiMgVGhlc2UgQXNzZXRzIGNhbiBiZSBvZiB0eXBlIFNoYXBlIChzaW1wbGUgSW1hZ2VzKSBvciBBbmltYXRpb25cbiNcbiMgdXNhZ2U6XG4jXG4jIHNwcml0ZSA9IG5ldyBTcHJpdGVcbiMgICBcInRleHR1cmVcIjogXCJpbWcvdGV4dHVyZS5wbmdcbiMgICBcIndpZHRoXCI6NTBcbiMgICBcImhlaWdodFwiOjUwXG4jICAgXCJrZXlcIjpcbiMgICAgIFwic3BhY2VzaGlwXCI6IDFcbiMgICAgIFwicm9ja1wiOiAyXG4jICAgICBcImVuZW15XCI6IDNcbiNcbiMgc3ByaXRlLnJlbmRlcihcInNwYWNlc2hpcFwiKVxuI1xuXG5TaGFwZSA9IHJlcXVpcmUgJy4vc2hhcGUuY29mZmVlJ1xuQW5pbWF0aW9uID0gcmVxdWlyZSAnLi9hbmltYXRpb24uY29mZmVlJ1xuXG5jbGFzcyBTcHJpdGVcbiAgICBjb25zdHJ1Y3RvcjogKGhhc2gpIC0+XG4gICAgICAgIEBhc3NldHMgPSB7fVxuICAgICAgICBAd2lkdGggPSBoYXNoW1wid2lkdGhcIl1cbiAgICAgICAgQGhlaWdodCA9IGhhc2hbXCJoZWlnaHRcIl1cbiAgICAgICAgQHRleHR1cmUgPSBuZXcgSW1hZ2UoKVxuICAgICAgICBAdGV4dHVyZS5zcmMgPSBoYXNoW1widGV4dHVyZVwiXVxuICAgICAgICBAa2V5ID0gaGFzaFtcImtleVwiXSA/IHt9XG5cbiAgICAgICAgZm9yIGtleSwgaSBvZiBAa2V5XG4gICAgICAgICAgICBAYWRkSW1hZ2Uga2V5LCBpXG5cbiAgICAgICAgQGlubmVyV2lkdGggPSBoYXNoW1wiaW5uZXJXaWR0aFwiXSA/IEB3aWR0aFxuICAgICAgICBAaW5uZXJIZWlnaHQgPSBoYXNoW1wiaW5uZXJIZWlnaHRcIl0gPyBAaGVpZ2h0XG5cbiAgICBhZGRJbWFnZTogKG5hbWUsIGluZGV4KSAtPlxuICAgICAgICAkKEB0ZXh0dXJlKS5sb2FkID0+XG4gICAgICAgICAgICBAdGV4V2lkdGggPSBAdGV4dHVyZS53aWR0aFxuICAgICAgICAgICAgQGFzc2V0c1tuYW1lXSA9IG5ldyBTaGFwZSB0aGlzLCBpbmRleFxuXG4gICAgYWRkQW5pbWF0aW9uOiAobmFtZSwgcGFyYW1zKSAtPlxuICAgICAgICAkKEB0ZXh0dXJlKS5sb2FkID0+XG4gICAgICAgICAgICBAdGV4V2lkdGggPSBAdGV4dHVyZS53aWR0aFxuICAgICAgICAgICAgQGFzc2V0c1tuYW1lXSA9IG5ldyBBbmltYXRpb24gdGhpcywgcGFyYW1zXG5cbiAgICByZW5kZXI6IChuYW1lLCBjdHgpIC0+XG4gICAgICAgIEBhc3NldHNbbmFtZV0ucmVuZGVyKGN0eCkgaWYgQGFzc2V0c1tuYW1lXT9cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gU3ByaXRlXG4iLCJcbkJvdW5kaW5nQm94ID0gcmVxdWlyZSAnLi9ib3VuZGluZ0JveC5jb2ZmZWUnXG5WZWN0b3IgPSByZXF1aXJlICcuL3ZlY3Rvci5jb2ZmZWUnXG5cbmNsYXNzIFRpbGVcbiAgICBjb25zdHJ1Y3RvcjogKEBzcHJpdGUsIEB0eXBlLCBAcm93LCBAY29sLCBAZ3JlZW49MCwgQHo9MCkgLT5cbiAgICAgICAgQG5laWdoYm9yID0gW11cbiAgICAgICAgQHggPSBAY29sICogQHNwcml0ZS5pbm5lcldpZHRoICsgQHNwcml0ZS5pbm5lcldpZHRoLzJcbiAgICAgICAgQHkgPSBAcm93ICogQHNwcml0ZS5pbm5lckhlaWdodCArIEBzcHJpdGUuaW5uZXJIZWlnaHQvMlxuICAgICAgICBAYmIgPSBuZXcgQm91bmRpbmdCb3ggbmV3IFZlY3RvciggQHgsIEB5ICksIG5ldyBWZWN0b3IoIEBzcHJpdGUuaW5uZXJXaWR0aCwgQHNwcml0ZS5pbm5lckhlaWdodCApXG4gICAgICAgIEBiYi5jb2xvciA9IFwiZ3JlZW5cIlxuXG4gICAgaXNXYWxrYWJsZTogLT5cbiAgICAgICAgQGdyZWVuIGlzIDBcblxuICAgIHNxdWFyZWREaXN0YW5jZVRvOiAodmVjKSAtPlxuICAgICAgICB2ZWMuc3VidHJhY3QoIG5ldyBWZWN0b3IoQHgsQHkpICkubGVuZ3RoU3F1YXJlZCgpICMgbWF5YmUgYWRkIGEgZGlzdGFuY2UgKGNsYXNzLSltZXRob2QgdG8gdmVjdG9yP1xuXG4gICAgcmVuZGVyOiAoY3R4KSAtPlxuICAgICAgICBjdHguc2F2ZSgpXG4gICAgICAgIGN0eC50cmFuc2xhdGUgQHggLSBAeiwgQHkgLSBAelxuICAgICAgICBAc3ByaXRlLnJlbmRlciggQHR5cGUsIGN0eCApXG4gICAgICAgIGN0eC5yZXN0b3JlKClcblxuICAgICAgICAjIEBiYi5yZW5kZXIgY3R4XG5cbm1vZHVsZS5leHBvcnRzID0gVGlsZVxuXG4iLCJcbiMgQSBzaW1wbGUgVGltZXI6XG4jIGl0IGhlbHBzIHlvdSBrZWVwIHRyYWNrIG9mIHRoZSB0aW1lIHRoYXQgaGFzIGVsYXBzZWQgc2luY2UgeW91IGxhc3QgXCJwdW5jaCgpXCItZWQgaXRcblxuXG5jbGFzcyBUaW1lclxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAbGFzdF90aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgQGRlbHRhID0gMFxuXG4gICAgIyBwdW5jaCByZXNldHMgdGhlIHRpbWVyIGFuZCByZXR1cm5zIHRoZSB0aW1lIChpbiBtcykgYmV0d2VlbiB0aGUgbGFzdCB0d28gcHVuY2hlc1xuICAgIHB1bmNoOiAtPlxuICAgICAgICB0aGlzX3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICBAZGVsdGEgPSB0aGlzX3RpbWUgLSBAbGFzdF90aW1lXG4gICAgICAgIEBsYXN0X3RpbWUgPSB0aGlzX3RpbWVcbiAgICAgICAgcmV0dXJuIEBkZWx0YVxuXG4gICAgIyBkZWx0YSBnaXZlcyB5b3UgdGhlIHRpbWUgdGhhdCBoYXMgZWxhcHNlZCBzaW5jZSB0aGUgdGltZXIgd2FzIHB1bmNoZWQgdGhlIGxhc3QgdGltZVxuICAgIHRpbWVTaW5jZUxhc3RQdW5jaDogLT5cbiAgICAgICAgdGhpc190aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgdGhpc190aW1lIC0gQGxhc3RfdGltZVxuXG4gICAgZnBzOiAtPlxuICAgICAgICAxMDAwIC8gQGRlbHRhXG5cbm1vZHVsZS5leHBvcnRzID0gVGltZXJcbiIsIiNcbiMgIHZlY3Rvci5jb2ZmZWVcbiNcbiMgIENyZWF0ZWQgYnkgS29samEgV2lsY2tlIGluIE9jdG9iZXIgMjAxMVxuIyAgQ29weXJpZ2h0IDIwMTEuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4jXG4jICBUaGUgdW5kZXJzY29yZSBhdCB0aGUgZW5kIG9mIGEgbWV0aG9kIHNpZ25pZmllcyB0aGF0IGl0IG9wZXJhdGVzIG9uIGl0c2VsZlxuI1xuXG5jbGFzcyBWZWN0b3JcbiAgICBjb25zdHJ1Y3RvcjogKHggPSAwLCB5ID0gMCkgLT5cbiAgICAgICAgQHggPSB4XG4gICAgICAgIEB5ID0geVxuXG4gICAgY2xvbmU6IC0+XG4gICAgICAgIG5ldyBWZWN0b3IgQHgsIEB5XG5cbiAgICAjIEFkZCBhbm90aGVyIFZlY3RvclxuICAgIGFkZDogKHZlYykgLT5cbiAgICAgICAgbmV3IFZlY3RvciBAeCArIHZlYy54LCBAeSArIHZlYy55XG5cbiAgICBhZGRfOiAodmVjKSAtPlxuICAgICAgICBAeCArPSB2ZWMueFxuICAgICAgICBAeSArPSB2ZWMueVxuXG4gICAgIyBTdWJ0cmFjdCBhbm90aGVyIFZlY3RvclxuICAgIHN1YnRyYWN0OiAodmVjKSAtPlxuICAgICAgICBuZXcgVmVjdG9yIEB4IC0gdmVjLngsIEB5IC0gdmVjLnlcblxuICAgIHN1YnRyYWN0XzogKHZlYykgLT5cbiAgICAgICAgQHggLT0gdmVjLnhcbiAgICAgICAgQHkgLT0gdmVjLnlcblxuICAgICMgbXVsdGlwbHkgdGhlIHZlY3RvciB3aXRoIGEgTnVtYmVyXG4gICAgbXVsdDogKG51bSkgLT5cbiAgICAgICAgbmV3IFZlY3RvciBAeCAqIG51bSwgQHkgKiBudW1cblxuICAgIG11bHRfOiAobnVtKSAtPlxuICAgICAgICBAeCAqPSBudW1cbiAgICAgICAgQHkgKj0gbnVtXG5cbiAgICAjIHJldHVybnMgdGhlIGxlbmd0aCBvZiB0aGUgdmVjdG9yIChCZXRyYWcpXG4gICAgbGVuZ3RoOiAtPlxuICAgICAgICBNYXRoLnNxcnQgQHgqQHggKyBAeSpAeVxuXG4gICAgIyByZXR1cm4gdGhlIGxlbmd0aCBzcXVhcmVkIChmb3Igb3B0aW1pc2F0aW9uKVxuICAgIGxlbmd0aFNxdWFyZWQ6IC0+XG4gICAgICAgIEB4KkB4ICsgQHkqQHlcblxuICAgICMgcmV0dXJucyB0aGUgbm9ybWFsaXplZCB2ZWN0b3IgKExlbmd0aCA9IDEpXG4gICAgbm9ybTogKGZhY3Rvcj0xKSAtPlxuICAgICAgICBpZiAoIEBsZW5ndGgoKSA+IDAgKVxuICAgICAgICAgICAgcmV0dXJuIEBtdWx0IGZhY3Rvci9sXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBudWxsXG5cbiAgICBub3JtXzogKGZhY3Rvcj0xKSAtPlxuICAgICAgICBpZiAoIEBsZW5ndGgoKSA+IDAgKVxuICAgICAgICAgICAgcmV0dXJuIEBtdWx0XyBmYWN0b3IvbFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgIyByZXR1cm5zIHRoZSBzY2FsYXJwcm9kdWN0XG4gICAgc2NhbGFyUHJvZHVjdDogKHZlYykgLT5cbiAgICAgICAgQHggKiB2ZWMueCArIEB5ICogdmVjLnlcblxuICAgIHNhbWVEaXJlY3Rpb246ICh2ZWMpIC0+XG4gICAgICAgIGlmIChAbGVuZ3RoU3F1YXJlZCgpIDwgQGFkZCh2ZWMpLmxlbmd0aFNxdWFyZWQoKSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgIyByZXR1cm5zIHRoZSBhbmdsZSBpdCBmb3JtcyB3aXRoIGEgZ2l2ZW4gdmVjdG9yXG4gICAgYW5nbGVXaXRoOiAodmVjKSAtPlxuICAgICAgICBNYXRoLmFjb3MoIEBzY2FsYXJQcm9kdWN0KCB2ZWMgKSAvIEBsZW5ndGgoKSAqIHZlYy5sZW5ndGgoKSApXG5cbiAgICAjIHJldHVybnMgdGhlIHZlY3RvcnByb2R1Y3QgKHZlY3Rvci9LcmV1enByb2R1a3QpIC0tIG5vdCB5ZXQgaW1wbGVtZW50ZWRcbiAgICB2ZWN0b3JQcm9kdWN0OiAodmVjKSAtPlxuICAgICAgICByZXR1cm4gdGhpc1xuXG4gICAgIyByZXR1cm5zIHRoZSBjb21wb25lbnQgcGFyYWxsZWwgdG8gYSBnaXZlbiB2ZWN0b3JcbiAgICBwcm9qZWN0VG86ICh2ZWMpIC0+XG4gICAgICAgIHZlYy5tdWx0KCBAc2NhbGFyUHJvZHVjdCh2ZWMpIC8gdmVjLmxlbmd0aFNxdWFyZWQoKSApXG5cbiAgICBwcm9qZWN0VG9fOiAodmVjKSAtPlxuICAgICAgICBtID0gQHNjYWxhclByb2R1Y3QodmVjKSAvIHZlYy5sZW5ndGhTcXVhcmVkKClcbiAgICAgICAgQHggKj0gbVxuICAgICAgICBAeSAqPSBtXG5cblxuICAgICMgQ2xhc3MgbWV0aG9kOiBjaGVja3MgaWYgdHdvIHZlY3RvcnMgYXJlIGludGVyc2VjdGluZyAtIHJldHVybnMgaW50ZXJzZWN0aW9uIHBvaW50XG4gICAgQGludGVyc2VjdGluZzogKG9hLCBhLCBvYiwgYikgLT5cblxuICAgICAgICBjID0gb2Iuc3VidHJhY3Qgb2FcbiAgICAgICAgYiA9IGIubXVsdCAtMVxuICAgICAgICBjb2wgPSBbXVxuXG4gICAgICAgIGNvbFswXSA9IGEuY2xvbmUoKVxuICAgICAgICBjb2xbMV0gPSBiLmNsb25lKClcbiAgICAgICAgY29sWzJdID0gYy5jbG9uZSgpXG4gICAgICAgIGw9MDsgbT0xOyBuPTJcblxuICAgICAgICAjIE11bHRpcGxpY2F0b3JcblxuICAgICAgICBtdWx0ID0gY29sWzBdLnkgLyBjb2xbMF0ueFxuXG4gICAgICAgICMgQnJpbmcgTWF0cml4IGludG8gVHJpYW5ndWxhciBzaGFwZVxuXG4gICAgICAgIGNvbFswXS55ID0gMFxuICAgICAgICBjb2xbMV0ueSA9IGNvbFsxXS55IC0gKG11bHQgKiBjb2xbMV0ueClcbiAgICAgICAgY29sWzJdLnkgPSBjb2xbMl0ueSAtIChtdWx0ICogY29sWzJdLngpXG5cbiAgICAgICAgIyBSZXZlcnNlIFN1YnN0aXR1dGlvblxuXG4gICAgICAgIG11ID0gY29sW25dLnkgLyBjb2xbbV0ueVxuICAgICAgICAjIGxiID0gKGNvbFtuXS54IC0gKGNvbFttXS54ICogbXUpKSAvIGNvbFtsXS54ICMgIG11IGlzIHN1ZmZpY2llbnQgc28gdGhpcyBkb2Vzbid0IG5lZWQgdG8gYmUgZG9uZVxuXG4gICAgICAgIHJldHVybiBvYi5zdWJ0cmFjdCggYi5tdWx0KG11KSApXG5cbiAgICBwcmludDogLT5cbiAgICAgICAgcmV0dXJuIFwiKCN7QHh9LCAje0B5fSlcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IFZlY3RvclxuIl19
(9)
});
