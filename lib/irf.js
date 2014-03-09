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
var Game, Helpers, SceneManager,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

SceneManager = _dereq_('./scenemanager.coffee');

Helpers = _dereq_('./helpers.coffee');

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
    this.sceneManager = this.constructor.sceneManager || new SceneManager();
  }

  Game.prototype.gameloop = function(timestamp) {
    this.delta = timestamp - this.lasttime;
    this.lasttime = timestamp;
    this.update(this.delta);
    this.render();
    if (this.loopID) {
      return this.loopID = requestAnimationFrame(this.gameloop);
    }
  };

  Game.prototype.start = function() {
    this.lasttime = performance.now();
    return this.loopID = requestAnimationFrame(this.gameloop);
  };

  Game.prototype.stop = function() {
    cancelAnimationFrame(this.loopID);
    return this.loopID = void 0;
  };

  Game.prototype.update = function(timestamp) {};

  Game.prototype.render = function() {
    return this.ctx.clearRect(0, 0, this.params.width, this.params.height);
  };

  return Game;

})();

module.exports = Game;


},{"./helpers.coffee":8,"./scenemanager.coffee":13}],8:[function(_dereq_,module,exports){
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
    return this.rd = (Math.pow(camera.vpWidth + 20, 2) + Math.pow(camera.vpHeight + 20, 2)) / 4;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMva29samEvLm52bS92MC4xMC4wL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL3ByaXZhdGUvdmFyL3d3dy9pcmYvc3JjL2FuaW1hdGlvbi5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvYmFja2dyb3VuZC5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvYm91bmRpbmdCb3guY29mZmVlIiwiL3ByaXZhdGUvdmFyL3d3dy9pcmYvc3JjL2JvdW5kaW5nYm94LmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy9jYW1lcmEuY29mZmVlIiwiL3ByaXZhdGUvdmFyL3d3dy9pcmYvc3JjL2V2ZW50bWFuYWdlci5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvZ2FtZS5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvaGVscGVycy5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvaXJmLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy9rZXlib2FyZC5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvbWFwLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy9zY2VuZS5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvc2NlbmVtYW5hZ2VyLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy9zaGFwZS5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvc3ByaXRlLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy90aWxlLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy90aW1lci5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvdmVjdG9yLmNvZmZlZSJdLCJu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Q0ExRVosQ0FpRkEsQ0FBZSxHQUFkLEdBQWUsR0FBaEI7Q0FFSSxPQUFBLGlCQUFBO0NBQUEsQ0FBTSxDQUFGLENBQUosSUFBSTtBQUNRLENBRFosRUFDSSxDQUFKO0NBREEsQ0FBQSxDQUVBLENBQUE7Q0FGQSxFQUlJLENBQUosQ0FBUztDQUpULEVBS0ksQ0FBSixDQUFTO0NBTFQsRUFNSSxDQUFKLENBQVM7Q0FOVCxFQU9FLENBQUY7Q0FQQSxFQU9PLENBQUY7Q0FQTCxFQU9ZLENBQUY7Q0FQVixFQVdPLENBQVA7Q0FYQSxFQWVJLENBQUo7Q0FmQSxFQWdCSSxDQUFKO0NBaEJBLEVBaUJJLENBQUo7Q0FqQkEsQ0FxQkEsQ0FBSyxDQUFMO0NBR0EsQ0FBUyxFQUFXLElBQWIsR0FBQTtDQTNHWCxFQWlGZTs7Q0FqRmYsRUE2R08sRUFBUCxJQUFPO0NBQ0gsRUFBUSxDQUFHLE9BQUg7Q0E5R1osRUE2R087O0NBN0dQOztDQURKOztBQWlIQSxDQWpIQSxFQWlIaUIsR0FBWCxDQUFOIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcblNoYXBlID0gcmVxdWlyZSAnLi9zaGFwZS5jb2ZmZWUnXG5UaW1lciA9IHJlcXVpcmUgJy4vdGltZXIuY29mZmVlJ1xuXG5jbGFzcyBBbmltYXRpb25cblxuICAgIGNvbnN0cnVjdG9yOiAoQHNwcml0ZSwgcGFyYW1zKSAtPlxuICAgICAgICBAZnBzID0gcGFyYW1zW1wiZnBzXCJdID8gMzBcbiAgICAgICAgQGxvb3AgPSBwYXJhbXNbXCJsb29wXCJdID8gdHJ1ZVxuICAgICAgICBAY2FsbGJhY2sgPSBwYXJhbXNbXCJjYWxsYmFja1wiXSA/IG51bGxcbiAgICAgICAgQGZyYW1lcyA9IGZvciBpbmRleCBpbiBwYXJhbXNbXCJmcmFtZXNcIl1cbiAgICAgICAgICAgIG5ldyBTaGFwZSBAc3ByaXRlLCBpbmRleFxuICAgICAgICBAbGFzdEZyYW1lID0gQGZyYW1lcy5sZW5ndGggLSAxXG4gICAgICAgIEB0aW1lciA9IG5ldyBUaW1lclxuICAgICAgICBAY3VycmVudEZyYW1lID0gMFxuICAgICAgICBAcGxheWluZyA9IHRydWVcblxuICAgIHJlbmRlcjogKGN0eCkgLT5cbiAgICAgICAgaWYgQHBsYXlpbmdcbiAgICAgICAgICAgIEBjdXJyZW50RnJhbWUgPSBNYXRoLmZsb29yKCBAdGltZXIudGltZVNpbmNlTGFzdFB1bmNoKCkgLyAoMTAwMCAvIEBmcHMpIClcbiAgICAgICAgICAgIGlmIEBjdXJyZW50RnJhbWUgPiBAbGFzdEZyYW1lXG4gICAgICAgICAgICAgICAgQGNhbGxiYWNrPygpXG4gICAgICAgICAgICAgICAgaWYgQGxvb3BcbiAgICAgICAgICAgICAgICAgICAgQHJld2luZCgpXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBAY3VycmVudEZyYW1lID0gQGxhc3RGcmFtZVxuICAgICAgICAgICAgICAgICAgICBAc3RvcCgpXG5cbiAgICAgICAgQGZyYW1lc1tAY3VycmVudEZyYW1lXS5yZW5kZXIoY3R4KVxuXG4gICAgcGxheTogLT5cbiAgICAgICAgQHBsYXlpbmcgPSB0cnVlXG5cbiAgICBzdG9wOiAtPlxuICAgICAgICBAcGxheWluZyA9IGZhbHNlXG5cbiAgICByZXdpbmQ6IC0+XG4gICAgICAgIEBjdXJyZW50RnJhbWUgPSAwXG4gICAgICAgIEB0aW1lci5wdW5jaCgpXG5cbm1vZHVsZS5leHBvcnRzID0gQW5pbWF0aW9uXG4iLCJjbGFzcyBCYWNrZ3JvdW5kXG4gICAgY29uc3RydWN0b3I6IChAc3ByaXRlKSAtPlxuICAgICAgICBAc3ByaXRlLmFkZEltYWdlIFwiYmFja2dyb3VuZFwiLCAwXG5cbiAgICByZW5kZXI6IChjdHgpIC0+XG4gICAgICAgIEBzcHJpdGUucmVuZGVyKCBcImJhY2tncm91bmRcIiwgY3R4IClcblxubW9kdWxlLmV4cG9ydHMgPSBCYWNrZ3JvdW5kXG4iLCJcblZlY3RvciA9IHJlcXVpcmUgJy4vdmVjdG9yLmNvZmZlZSdcblxuY2xhc3MgQm91bmRpbmdCb3hcbiAgICBjb25zdHJ1Y3RvcjogKEBjb29yLCBAZGltLCBAY29sb3I9XCJncmV5XCIpIC0+XG4gICAgICAgIEBjb29yID89IG5ldyBWZWN0b3JcbiAgICAgICAgQGRpbSA/PSBuZXcgVmVjdG9yXG5cbiAgICBpbnRlcnNlY3Q6IChvdGhlckJCKSAtPlxuICAgICAgICBpZiBub3Qgb3RoZXJCQj8gdGhlbiByZXR1cm4gZmFsc2VcbiAgICAgICAgQGludGVyc2VjdHYob3RoZXJCQikgYW5kIEBpbnRlcnNlY3RoKG90aGVyQkIpXG5cbiAgICBpbnRlcnNlY3R2OiAob3RoZXJCQikgLT5cbiAgICAgICAgaWYgQGNvb3IueSA8IG90aGVyQkIuY29vci55XG4gICAgICAgICAgICBpZiAoKEBkaW0ueSArIG90aGVyQkIuZGltLnkpIC8gMikgPCAob3RoZXJCQi5jb29yLnkgLSBAY29vci55KVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGlmICgoQGRpbS55ICsgb3RoZXJCQi5kaW0ueSkgLyAyKSA8IChAY29vci55IC0gb3RoZXJCQi5jb29yLnkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcblxuICAgIGludGVyc2VjdGg6IChvdGhlckJCKSAtPlxuICAgICAgICBpZiBAY29vci54IDwgb3RoZXJCQi5jb29yLnhcbiAgICAgICAgICAgIGlmICgoQGRpbS54ICsgb3RoZXJCQi5kaW0ueCkgLyAyKSA8IChvdGhlckJCLmNvb3IueCAtIEBjb29yLngpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgaWYgKChAZGltLnggKyBvdGhlckJCLmRpbS54KSAvIDIpIDwgKEBjb29yLnggLSBvdGhlckJCLmNvb3IueClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuXG5cbiAgICByZW5kZXI6IChjdHgpIC0+XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IEBjb2xvclxuICAgICAgICBjdHguc3Ryb2tlUmVjdCBAY29vci54IC0gQGRpbS54LzIsIEBjb29yLnkgLSBAZGltLnkvMiwgQGRpbS54LCBAZGltLnlcblxubW9kdWxlLmV4cG9ydHMgPSBCb3VuZGluZ0JveFxuIiwiXG5WZWN0b3IgPSByZXF1aXJlICcuL3ZlY3Rvci5jb2ZmZWUnXG5cbmNsYXNzIEJvdW5kaW5nQm94XG4gICAgY29uc3RydWN0b3I6IChAY29vciwgQGRpbSwgQGNvbG9yPVwiZ3JleVwiKSAtPlxuICAgICAgICBAY29vciA/PSBuZXcgVmVjdG9yXG4gICAgICAgIEBkaW0gPz0gbmV3IFZlY3RvclxuXG4gICAgaW50ZXJzZWN0OiAob3RoZXJCQikgLT5cbiAgICAgICAgaWYgbm90IG90aGVyQkI/IHRoZW4gcmV0dXJuIGZhbHNlXG4gICAgICAgIEBpbnRlcnNlY3R2KG90aGVyQkIpIGFuZCBAaW50ZXJzZWN0aChvdGhlckJCKVxuXG4gICAgaW50ZXJzZWN0djogKG90aGVyQkIpIC0+XG4gICAgICAgIGlmIEBjb29yLnkgPCBvdGhlckJCLmNvb3IueVxuICAgICAgICAgICAgaWYgKChAZGltLnkgKyBvdGhlckJCLmRpbS55KSAvIDIpIDwgKG90aGVyQkIuY29vci55IC0gQGNvb3IueSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBpZiAoKEBkaW0ueSArIG90aGVyQkIuZGltLnkpIC8gMikgPCAoQGNvb3IueSAtIG90aGVyQkIuY29vci55KVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG5cbiAgICBpbnRlcnNlY3RoOiAob3RoZXJCQikgLT5cbiAgICAgICAgaWYgQGNvb3IueCA8IG90aGVyQkIuY29vci54XG4gICAgICAgICAgICBpZiAoKEBkaW0ueCArIG90aGVyQkIuZGltLngpIC8gMikgPCAob3RoZXJCQi5jb29yLnggLSBAY29vci54KVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGlmICgoQGRpbS54ICsgb3RoZXJCQi5kaW0ueCkgLyAyKSA8IChAY29vci54IC0gb3RoZXJCQi5jb29yLngpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcblxuXG4gICAgcmVuZGVyOiAoY3R4KSAtPlxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBAY29sb3JcbiAgICAgICAgY3R4LnN0cm9rZVJlY3QgQGNvb3IueCAtIEBkaW0ueC8yLCBAY29vci55IC0gQGRpbS55LzIsIEBkaW0ueCwgQGRpbS55XG5cbm1vZHVsZS5leHBvcnRzID0gQm91bmRpbmdCb3hcbiIsIlxuVmVjdG9yID0gcmVxdWlyZSAnLi92ZWN0b3IuY29mZmVlJ1xuXG5jbGFzcyBDYW1lcmFcbiAgICBjb25zdHJ1Y3RvcjogKGhhc2gpIC0+XG4gICAgICAgIEBwcm9qZWN0aW9uID0gaGFzaFtcInByb2plY3Rpb25cIl1cbiAgICAgICAgQHZwV2lkdGggPSBoYXNoW1widnBXaWR0aFwiXSAgICMgVmlld3BvcnRcbiAgICAgICAgQHZwSGVpZ2h0ID0gaGFzaFtcInZwSGVpZ2h0XCJdXG4gICAgICAgIEB6b29tRmFjdG9yID0gaGFzaFtcInpvb21GYWN0b3JcIl0gPyAxXG4gICAgICAgIEBjb29yID0gbmV3IFZlY3RvciggMTAwLCAxMDAgKVxuXG4gICAgdXBkYXRlOiAoZGVsdGEpIC0+XG5cbiAgICBhcHBseTogKGN0eCwgY2FsbGJhY2spIC0+XG5cbiAgICAgICAgc3dpdGNoIEBwcm9qZWN0aW9uXG4gICAgICAgICAgICB3aGVuIFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgICBjdHguc2F2ZSgpXG4gICAgICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSBAdnBXaWR0aC8yIC0gQGNvb3IueCwgQHZwSGVpZ2h0LzIgLSBAY29vci55XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgICAgICAgIGN0eC5yZXN0b3JlKClcbiAgICAgICAgICAgIHdoZW4gXCJpc29cIlxuICAgICAgICAgICAgICAgIGN0eC5zYXZlKClcbiAgICAgICAgICAgICAgICBjdHguc2NhbGUgMSwgMC41XG4gICAgICAgICAgICAgICAgY3R4LnJvdGF0ZSBNYXRoLlBJLzRcbiAgICAgICAgICAgICAgICBjdHgudHJhbnNsYXRlIDIwMCwgLTQwMFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKClcbiAgICAgICAgICAgICAgICBjdHgucmVzdG9yZSgpXG5cbm1vZHVsZS5leHBvcnRzID0gQ2FtZXJhXG4iLCJcbmNsYXNzIEV2ZW50TWFuYWdlclxuXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBldmVudGxpc3QgPSB7fVxuXG4gICAgcmVnaXN0ZXI6IChldmVudCwgY2FsbGJhY2spIC0+XG4gICAgICAgIHVubGVzcyBAZXZlbnRsaXN0W2V2ZW50XT9cbiAgICAgICAgICAgIEBldmVudGxpc3RbZXZlbnRdID0gW11cbiAgICAgICAgQGV2ZW50bGlzdFtldmVudF0ucHVzaCBjYWxsYmFja1xuXG4gICAgdHJpZ2dlcjogKGV2ZW50LCBvcmlnaW4pIC0+XG4gICAgICAgIGZvciBjYWxsYmFjayBpbiBAZXZlbnRsaXN0W2V2ZW50XVxuICAgICAgICAgICAgY2FsbGJhY2sob3JpZ2luKVxuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50TWFuYWdlclxuIiwiXG5TY2VuZU1hbmFnZXIgPSByZXF1aXJlICcuL3NjZW5lbWFuYWdlci5jb2ZmZWUnXG5IZWxwZXJzID0gcmVxdWlyZSAnLi9oZWxwZXJzLmNvZmZlZSdcblxuY2xhc3MgR2FtZVxuXG4gICAgQGFkZFNjZW5lOiAoc2NlbmUpIC0+XG4gICAgICAgIEBzY2VuZU1hbmFnZXIgPz0gbmV3IFNjZW5lTWFuYWdlcigpXG4gICAgICAgIEBzY2VuZU1hbmFnZXIuYWRkU2NlbmUgc2NlbmVcblxuICAgIGNvbnN0cnVjdG9yOiAocGFyYW1zKSAtPlxuXG4gICAgICAgIEBwYXJhbXMgPSBIZWxwZXJzLmV4dGVuZCB7XG4gICAgICAgICAgICBcIndpZHRoXCIgOiA4MDAsXG4gICAgICAgICAgICBcImhlaWdodFwiOiA2MDBcbiAgICAgICAgfSwgcGFyYW1zXG5cbiAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnY2FudmFzJ1xuICAgICAgICBjYW52YXMuc2V0QXR0cmlidXRlIFwid2lkdGhcIiwgQHBhcmFtcy53aWR0aFxuICAgICAgICBjYW52YXMuc2V0QXR0cmlidXRlIFwiaGVpZ2h0XCIsIEBwYXJhbXMuaGVpZ2h0XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFwcGVuZENoaWxkKGNhbnZhcylcblxuICAgICAgICBAY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICAgICAgQGN0eC5mb250ID0gJzQwMCAxOHB4IEhlbHZldGljYSwgc2Fucy1zZXJpZidcblxuICAgICAgICAjIHRoZSBpbnN0YW5jZSdzIHNjZW5lbWFuYWdlciBwb2ludHMgdG8gdGhlIENsYXNzZXMgU2NlbmVtYW5hZ2VyXG4gICAgICAgICMgKG9yLCBpZiBpdCBkb2Vzbid0IGV4aXN0LCBhIG5ld2x5IGluc3RhbnRpYXRlZCBvbmUpXG4gICAgICAgIEBzY2VuZU1hbmFnZXIgPSBAY29uc3RydWN0b3Iuc2NlbmVNYW5hZ2VyIHx8IG5ldyBTY2VuZU1hbmFnZXIoKVxuXG4gICAgZ2FtZWxvb3A6ICh0aW1lc3RhbXApID0+XG4gICAgICAgIEBkZWx0YSA9IHRpbWVzdGFtcCAtIEBsYXN0dGltZVxuICAgICAgICBAbGFzdHRpbWUgPSB0aW1lc3RhbXBcblxuICAgICAgICBAdXBkYXRlIEBkZWx0YVxuICAgICAgICBAcmVuZGVyKClcblxuICAgICAgICBAbG9vcElEID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIEBnYW1lbG9vcCBpZiBAbG9vcElEXG5cbiAgICBzdGFydDogLT5cbiAgICAgICAgQGxhc3R0aW1lID0gcGVyZm9ybWFuY2Uubm93KCkgIyBtb3JlIGFjY3VyYXRlIHRoYW4gRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICBAbG9vcElEID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIEBnYW1lbG9vcFxuXG4gICAgc3RvcDogLT5cbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUgQGxvb3BJRFxuICAgICAgICBAbG9vcElEID0gdW5kZWZpbmVkXG5cbiAgICB1cGRhdGU6ICh0aW1lc3RhbXApIC0+XG4gICAgICAgICMgb3ZlcnJpZGUgaW4gdGhlIGdhbWVcblxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgQGN0eC5jbGVhclJlY3QgMCwgMCwgQHBhcmFtcy53aWR0aCwgQHBhcmFtcy5oZWlnaHRcblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lXG4iLCJcblxuIyBodHRwOi8vY29mZmVlc2NyaXB0Y29va2Jvb2suY29tL2NoYXB0ZXJzL2FycmF5cy9zaHVmZmxpbmctYXJyYXktZWxlbWVudHNcbkFycmF5OjpzaHVmZmxlID0gLT4gQHNvcnQgLT4gMC41IC0gTWF0aC5yYW5kb20oKVxuXG5OdW1iZXI6OnRvSGV4ID0gKHBhZGRpbmc9MikgLT5cbiAgICBoZXggPSBAdG9TdHJpbmcgMTZcbiAgICB3aGlsZSAoaGV4Lmxlbmd0aCA8IHBhZGRpbmcpXG4gICAgICAgIGhleCA9IFwiMFwiICsgaGV4XG4gICAgcmV0dXJuIGhleFxuXG5jbGFzcyBIZWxwZXJzXG5cbiAgICBAZXh0ZW5kOiAob2JqZWN0LCBwcm9wZXJ0aWVzKSAtPlxuICAgICAgICBmb3Iga2V5LCB2YWwgb2YgcHJvcGVydGllc1xuICAgICAgICAgICAgb2JqZWN0W2tleV0gPSB2YWxcbiAgICAgICAgb2JqZWN0XG5cbm1vZHVsZS5leHBvcnRzID0gSGVscGVyc1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9XG4gICAgQW5pbWF0aW9uOiByZXF1aXJlICcuL2FuaW1hdGlvbi5jb2ZmZWUnXG4gICAgQmFja2dyb3VuZDogcmVxdWlyZSAnLi9iYWNrZ3JvdW5kLmNvZmZlZSdcbiAgICBCb3VuZGluZ0JveDogcmVxdWlyZSAnLi9ib3VuZGluZ2JveC5jb2ZmZWUnXG4gICAgQ2FtZXJhOiByZXF1aXJlICcuL2NhbWVyYS5jb2ZmZWUnXG4gICAgRXZlbnRNYW5hZ2VyOiByZXF1aXJlICcuL2V2ZW50bWFuYWdlci5jb2ZmZWUnXG4gICAgR2FtZTogcmVxdWlyZSAnLi9nYW1lLmNvZmZlZSdcbiAgICBIZWxwZXJzOiByZXF1aXJlICcuL2hlbHBlcnMuY29mZmVlJ1xuICAgIEtleWJvYXJkOiByZXF1aXJlICcuL2tleWJvYXJkLmNvZmZlZSdcbiAgICBNYXA6IHJlcXVpcmUgJy4vbWFwLmNvZmZlZSdcbiAgICBTY2VuZTogcmVxdWlyZSAnLi9zY2VuZS5jb2ZmZWUnXG4gICAgU2NlbmVNYW5hZ2VyOiByZXF1aXJlICcuL3NjZW5lbWFuYWdlci5jb2ZmZWUnXG4gICAgU2hhcGU6IHJlcXVpcmUgJy4vc2hhcGUuY29mZmVlJ1xuICAgIFNwcml0ZTogcmVxdWlyZSAnLi9zcHJpdGUuY29mZmVlJ1xuICAgIFRpbGU6IHJlcXVpcmUgJy4vdGlsZS5jb2ZmZWUnXG4gICAgVGltZXI6IHJlcXVpcmUgJy4vdGltZXIuY29mZmVlJ1xuICAgIFZlY3RvcjogcmVxdWlyZSAnLi92ZWN0b3IuY29mZmVlJ1xuXG5cbiIsIlxuY2xhc3MgS2V5Ym9hcmRcblxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAbWFwcGluZyA9XG4gICAgICAgICAgICA4OlwiYmFja3NwYWNlXCJcbiAgICAgICAgICAgIDk6XCJ0YWJcIlxuICAgICAgICAgICAgMTM6XCJyZXR1cm5cIlxuICAgICAgICAgICAgMTY6XCJzaGlmdFwiXG4gICAgICAgICAgICAxNzpcImN0cmxcIlxuICAgICAgICAgICAgMTg6XCJhbHRcIlxuICAgICAgICAgICAgMjc6XCJlc2NcIlxuICAgICAgICAgICAgMzI6XCJzcGFjZVwiXG4gICAgICAgICAgICAzNzpcImxlZnRcIlxuICAgICAgICAgICAgMzg6XCJ1cFwiXG4gICAgICAgICAgICAzOTpcInJpZ2h0XCJcbiAgICAgICAgICAgIDQwOlwiZG93blwiXG4gICAgICAgICAgICA0ODpcIjBcIlxuICAgICAgICAgICAgNDk6XCIxXCJcbiAgICAgICAgICAgIDQ5OlwiMVwiXG4gICAgICAgICAgICA0OTpcIjFcIlxuICAgICAgICAgICAgNDk6XCIxXCJcbiAgICAgICAgICAgIDQ5OlwiMVwiXG4gICAgICAgICAgICA0OTpcIjZcIlxuICAgICAgICAgICAgNDk6XCI3XCJcbiAgICAgICAgICAgIDQ5OlwiOFwiXG4gICAgICAgICAgICA1NzpcIjlcIlxuICAgICAgICAgICAgNjU6XCJhXCJcbiAgICAgICAgICAgIDY2OlwiYlwiXG4gICAgICAgICAgICA2NzpcImNcIlxuICAgICAgICAgICAgNjg6XCJkXCJcbiAgICAgICAgICAgIDY5OlwiZVwiXG4gICAgICAgICAgICA3MDpcImZcIlxuICAgICAgICAgICAgNzE6XCJnXCJcbiAgICAgICAgICAgIDcyOlwiaFwiXG4gICAgICAgICAgICA3MzpcImlcIlxuICAgICAgICAgICAgNzQ6XCJqXCJcbiAgICAgICAgICAgIDc1Olwia1wiXG4gICAgICAgICAgICA3NjpcImxcIlxuICAgICAgICAgICAgNzc6XCJtXCJcbiAgICAgICAgICAgIDc4OlwiblwiXG4gICAgICAgICAgICA3OTpcIm9cIlxuICAgICAgICAgICAgODA6XCJwXCJcbiAgICAgICAgICAgIDgxOlwicVwiXG4gICAgICAgICAgICA4MjpcInJcIlxuICAgICAgICAgICAgODM6XCJzXCJcbiAgICAgICAgICAgIDg0OlwidFwiXG4gICAgICAgICAgICA4NTpcInVcIlxuICAgICAgICAgICAgODc6XCJ3XCJcbiAgICAgICAgICAgIDg4OlwieFwiXG4gICAgICAgICAgICA4OTpcInlcIlxuICAgICAgICAgICAgOTA6XCJ6XCJcbiAgICAgICAgICAgIDkzOlwiY21kXCJcbiAgICAgICAgICAgIDE4ODpcIixcIlxuICAgICAgICAgICAgMTkwOlwiLlwiXG5cbiAgICAgICAgQGtleWFycmF5ID0gW11cblxuICAgICAgICBmb3IgY29kZSwgbmFtZSBvZiBAbWFwcGluZ1xuICAgICAgICAgICAgQGtleWFycmF5W25hbWVdID0gZmFsc2VcblxuICAgICAgICByb290RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgJ2h0bWwnXG5cbiAgICAgICAgcm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcImtleWRvd25cIiwgKGV2ZW50KSA9PlxuICAgICAgICAgICAgQGtleWFycmF5W0BtYXBwaW5nW2V2ZW50LndoaWNoXV0gPSB0cnVlXG5cbiAgICAgICAgcm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcImtleXVwXCIsIChldmVudCkgPT5cbiAgICAgICAgICAgIEBrZXlhcnJheVtAbWFwcGluZ1tldmVudC53aGljaF1dID0gZmFsc2VcblxuXG4gICAga2V5OiAod2hpY2gpIC0+XG4gICAgICAgIHJldHVybiBAa2V5YXJyYXlbd2hpY2hdXG5cbiAgICBjaGVjazogLT5cbiAgICAgICAgcmV0dXJuIEBrZXlhcnJheVxuXG5tb2R1bGUuZXhwb3J0cyA9IEtleWJvYXJkXG4iLCJcblRpbGUgPSByZXF1aXJlICcuL3RpbGUuY29mZmVlJ1xuXG5jbGFzcyBNYXBcbiAgICBjb25zdHJ1Y3RvcjogKGhhc2gpIC0+XG4gICAgICAgIEBzcHJpdGUgPSBoYXNoW1wic3ByaXRlXCJdXG4gICAgICAgIEB0aWxlcyA9IFtdXG4gICAgICAgIEB3aWR0aCA9IDAgIyB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBtYXAgaW4gdGlsZXMgLSBjYW4gb25seSBiZSBkZXRlcm1pbmVkIGFmdGVyIHRoZSBtYXBmaWxlIGxvYWRpbmcgaGFzIGNvbXBsZXRlZFxuICAgICAgICBAaGVpZ2h0ID0gMFxuICAgICAgICBAcmQgPSBudWxsICMgcmVuZGVyRGlzdGFuY2VcblxuICAgICAgICAjIGluIGhhc2hbXCJwYXR0ZXJuXCJdIHlvdSBjYW4gZWl0aGVyIHBhc3MgYSBzdHJpbmcgbGlrZSBcInNpbXBsZVwiLCBcInNxdWFyZVwiIG9yIFwiY3Jvc3NcIlxuICAgICAgICAjIGluIHdoaWNoIGNhc2UgdGhlIHJlc3BlY3RpdmUgbWV0aG9kIHdpbGwgYmUgY2FsbGVkLiBBbHRlcm5hdGl2ZWx5LCB5b3UgY2FuIHBhc3MgeW91ciBvd24gY3VzdG9tIGZ1bmN0aW9uLlxuICAgICAgICBpZiB0eXBlb2YgaGFzaFtcInBhdHRlcm5cIl0gaXMgXCJmdW5jdGlvblwiXG4gICAgICAgICAgICBAcmVhZCA9IGhhc2hbXCJwYXR0ZXJuXCJdXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHN3aXRjaCBoYXNoW1wicGF0dGVyblwiXVxuICAgICAgICAgICAgICAgIHdoZW4gXCJzaW1wbGVcIlxuICAgICAgICAgICAgICAgICAgICBAcmVhZCA9IEByZWFkU2ltcGxlXG4gICAgICAgICAgICAgICAgd2hlbiBcInNxdWFyZVwiXG4gICAgICAgICAgICAgICAgICAgIEByZWFkID0gQHJlYWRTcXVhcmVcbiAgICAgICAgICAgICAgICB3aGVuIFwiY3Jvc3NcIlxuICAgICAgICAgICAgICAgICAgICBAcmVhZCA9IEByZWFkQ3Jvc3NcblxuICAgICAgICBAbWFwID0gbmV3IEltYWdlKClcbiAgICAgICAgQG1hcC5zcmMgPSBoYXNoW1wibWFwZmlsZVwiXVxuICAgICAgICBAbWFwRGF0YSA9IFtdXG5cbiAgICAgICAgQGxvYWRNYXBEYXRhRnJvbUltYWdlKClcblxuICAgIHJlbmRlcjogKGN0eCwgY2FtZXJhKSAtPlxuICAgICAgICBmb3IgdGlsZSBpbiBAdGlsZXNcbiAgICAgICAgICAgIGlmIHRpbGUuc3F1YXJlZERpc3RhbmNlVG8oY2FtZXJhLmNvb3IpIDwgQHJlbmRlckRpc3RhbmNlIGNhbWVyYVxuICAgICAgICAgICAgICAgIHRpbGUucmVuZGVyKGN0eClcblxuICAgIHJlbmRlckRpc3RhbmNlOiAoY2FtZXJhKSAtPlxuICAgICAgICByZXR1cm4gQHJkIGlmIEByZD8gIyBjYWNoZSB0aGUgcmVuZGVyIERpc3RhbmNlXG4gICAgICAgIEByZCA9IChNYXRoLnBvdyhjYW1lcmEudnBXaWR0aCsyMCwyKSArIE1hdGgucG93KGNhbWVyYS52cEhlaWdodCsyMCwyKSkvNFxuXG4gICAgIyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzkzNDAxMi9nZXQtaW1hZ2UtZGF0YS1pbi1qYXZhc2NyaXB0XG4gICAgbG9hZE1hcERhdGFGcm9tSW1hZ2U6IC0+XG4gICAgICAgICQoQG1hcCkubG9hZCA9PlxuICAgICAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKVxuICAgICAgICAgICAgQHdpZHRoID0gQG1hcC53aWR0aFxuICAgICAgICAgICAgQGhlaWdodCA9IEBtYXAuaGVpZ2h0XG4gICAgICAgICAgICBjYW52YXMud2lkdGggPSBAbWFwLndpZHRoXG4gICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gQG1hcC5oZWlnaHRcbiAgICAgICAgICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIilcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoIEBtYXAsIDAsIDApXG4gICAgICAgICAgICBkYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLDAsQG1hcC53aWR0aCxAbWFwLmhlaWdodCkuZGF0YVxuXG4gICAgICAgICAgICBmb3IgcCxpIGluIGRhdGEgYnkgNFxuICAgICAgICAgICAgICAgIHJvdyA9IE1hdGguZmxvb3IoKGkvNCkvQG1hcC53aWR0aClcbiAgICAgICAgICAgICAgICBAbWFwRGF0YVtyb3ddID89IFtdXG4gICAgICAgICAgICAgICAgQG1hcERhdGFbcm93XS5wdXNoIFtOdW1iZXIoZGF0YVtpXSkudG9IZXgoKSxOdW1iZXIoZGF0YVtpKzFdKS50b0hleCgpLE51bWJlcihkYXRhW2krMl0pLnRvSGV4KCksTnVtYmVyKGRhdGFbaSszXSkudG9IZXgoKV1cblxuICAgICAgICAgICAgQHJlYWQoKVxuXG4gICAgICAgICAgICBmb3IgdGlsZSwgaW5kZXggaW4gQHRpbGVzXG4gICAgICAgICAgICAgICAgdGlsZS5uZWlnaGJvcltcIndcIl0gPSBAdGlsZXNbaW5kZXgtMV1cbiAgICAgICAgICAgICAgICB0aWxlLm5laWdoYm9yW1wiZVwiXSA9IEB0aWxlc1tpbmRleCsxXVxuICAgICAgICAgICAgICAgIHRpbGUubmVpZ2hib3JbXCJuXCJdID0gQHRpbGVzW2luZGV4LUB3aWR0aF1cbiAgICAgICAgICAgICAgICB0aWxlLm5laWdoYm9yW1wic1wiXSA9IEB0aWxlc1tpbmRleCtAd2lkdGhdXG5cblxuICAgIHJlYWRTaW1wbGU6IC0+XG4gICAgICAgIGZvciByb3cgaW4gWzAuLkBtYXAuaGVpZ2h0LTFdXG4gICAgICAgICAgICBmb3IgY29sIGluIFswLi5AbWFwLndpZHRoLTFdXG4gICAgICAgICAgICAgICAgdHlwZSA9IFwiI3tAbWFwRGF0YVtyb3ddW2NvbF1bMF19XCJcbiAgICAgICAgICAgICAgICBncmVlbiA9IHBhcnNlSW50KCBAbWFwRGF0YVtyb3ddW2NvbF1bMV0sIDE2IClcbiAgICAgICAgICAgICAgICB6ID0gcGFyc2VJbnQoIEBtYXBEYXRhW3Jvd11bY29sXVsyXSwgMTYgKVxuICAgICAgICAgICAgICAgIEB0aWxlcy5wdXNoKCBuZXcgVGlsZSggQHNwcml0ZSwgdHlwZSwgcm93LCBjb2wsIGdyZWVuLCB6ICkpXG5cbiAgICByZWFkU3F1YXJlOiAtPlxuICAgICAgICBmb3Igcm93IGluIFswLi5AbWFwLmhlaWdodC0yXVxuICAgICAgICAgICAgZm9yIGNvbCBpbiBbMC4uQG1hcC53aWR0aC0yXVxuICAgICAgICAgICAgICAgIHR5cGUgPSBcIiN7QG1hcERhdGFbcm93XVtjb2xdWzBdfSN7QG1hcERhdGFbcm93XVtjb2wrMV1bMF19I3tAbWFwRGF0YVtyb3crMV1bY29sXVswXX0je0BtYXBEYXRhW3JvdysxXVtjb2wrMV1bMF19XCJcbiAgICAgICAgICAgICAgICBncmVlbiA9IHBhcnNlSW50KCBAbWFwRGF0YVtyb3ddW2NvbF1bMV0sIDE2IClcbiAgICAgICAgICAgICAgICB6ID0gcGFyc2VJbnQoIEBtYXBEYXRhW3Jvd11bY29sXVsyXSwgMTYgKVxuICAgICAgICAgICAgICAgIEB0aWxlcy5wdXNoKCBuZXcgVGlsZSggQHNwcml0ZSwgdHlwZSwgcm93LCBjb2wsIGdyZWVuLCB6ICkpXG5cbiAgICByZWFkQ3Jvc3M6IC0+XG4gICAgICAgIGZvciByb3cgaW4gWzEuLkBtYXAuaGVpZ2h0LTJdIGJ5IDJcbiAgICAgICAgICAgIGZvciBjb2wgaW4gWzEuLkBtYXAud2lkdGgtMl0gYnkgMlxuICAgICAgICAgICAgICAgIHVubGVzcyBAbWFwRGF0YVtyb3ddW2NvbF1bMF0gaXMgXCIwMFwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBcIiN7QG1hcERhdGFbcm93LTFdW2NvbF1bMF19I3tAbWFwRGF0YVtyb3ddW2NvbCsxXVswXX0je0BtYXBEYXRhW3JvdysxXVtjb2xdWzBdfSN7QG1hcERhdGFbcm93XVtjb2wtMV1bMF19XCJcbiAgICAgICAgICAgICAgICAgICAgZ3JlZW4gPSBwYXJzZUludCggQG1hcERhdGFbcm93XVtjb2xdWzFdLCAxNiApXG4gICAgICAgICAgICAgICAgICAgIHogPSBwYXJzZUludCggQG1hcERhdGFbcm93XVtjb2xdWzJdLCAxNiApXG4gICAgICAgICAgICAgICAgICAgIEB0aWxlcy5wdXNoKCBuZXcgVGlsZSggQHNwcml0ZSwgdHlwZSwgcm93LzIsIGNvbC8yLCBncmVlbiwgeiApKVxuXG4gICAgdGlsZUF0VmVjdG9yOiAodmVjKSAtPlxuICAgICAgICB4ID0gTWF0aC5mbG9vciggdmVjLnggLyBAc3ByaXRlLmlubmVyV2lkdGggKVxuICAgICAgICB5ID0gTWF0aC5mbG9vciggdmVjLnkgLyBAc3ByaXRlLmlubmVySGVpZ2h0IClcbiAgICAgICAgaW5kZXggPSB5ICogQHdpZHRoICsgeFxuICAgICAgICByZXR1cm4gQHRpbGVzW2luZGV4XVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcFxuXG4iLCJjbGFzcyBTY2VuZVxuXG4gIGNvbnN0cnVjdG9yOiAtPlxuXG4gIHVwZGF0ZTogLT5cblxuICByZW5kZXI6IC0+XG5cbm1vZHVsZS5leHBvcnRzID0gU2NlbmVcbiIsIiMgIyBUaGUgU2NlbmVNYW5hZ2VyXG4jIGlzIHRoZSBjbGFzcyB0byBob2xkIGFuZCBtYW5hZ2UgKHN3aXRjaCBiZXR3ZWVuKSB0aGUgJ3NjZW5lcycgdGhhdCB5b3VyXG4jIEdhbWUgY29uc2lzdHMgb2YuIEl0IG1haW50YWluc1xuY2xhc3MgU2NlbmVNYW5hZ2VyXG4gICAgIyAqIGEgaGFzaCB3aXRoIGFsbCBTY2VuZXMgaW4gdGhlIGdhbWVcbiAgICAjICogYSByZWZlcmVuY2UgdG8gdGhlIHRoZSBzY2VuZSB0aGF0IGlzIGN1cnJlbnRseSBhY3RpdmVcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQHNjZW5lcyA9IHt9XG4gICAgICAgIEBjdXJyZW50U2NlbmUgPSBudWxsXG5cbiAgICBhZGRTY2VuZTogKHNjZW5lQ2xhc3MpIC0+XG4gICAgICAgIEBzY2VuZXNbc2NlbmVDbGFzcy5uYW1lXSA9XG4gICAgICAgICAgICBcImNsYXNzXCIgICAgOiBzY2VuZUNsYXNzXG4gICAgICAgICAgICBcImluc3RhbmNlXCIgOiBudWxsXG5cbiAgICBzZXRTY2VuZTogKHNjZW5lLCBwYXJlbnQpIC0+XG4gICAgICAgICMgY3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBzY2VuZSwgdW5sZXNzIGl0IGhhcyBiZWVuIGNyZWF0ZWQgYmVmb3JlXG4gICAgICAgIEBjdXJyZW50U2NlbmUgPSBAc2NlbmVzW3NjZW5lXS5pbnN0YW5jZSA/PSBuZXcgQHNjZW5lc1tzY2VuZV0uY2xhc3MocGFyZW50KVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjZW5lTWFuYWdlclxuIiwiXG5jbGFzcyBTaGFwZVxuXG4gICAgY29uc3RydWN0b3I6IChAc3ByaXRlLCBpbmRleCkgLT5cbiAgICAgICAgQHN4ID0gKCBpbmRleCAqIEBzcHJpdGUud2lkdGggKSAlIEBzcHJpdGUudGV4V2lkdGhcbiAgICAgICAgQHN5ID0gTWF0aC5mbG9vcigoIGluZGV4ICogQHNwcml0ZS53aWR0aCApIC8gQHNwcml0ZS50ZXhXaWR0aCkgKiBAc3ByaXRlLmhlaWdodFxuXG4gICAgcmVuZGVyOiAoY3R4KSAtPlxuICAgICAgICBjdHguc2F2ZSgpXG4gICAgICAgIGN0eC50cmFuc2xhdGUgLUBzcHJpdGUud2lkdGgvMiwgLUBzcHJpdGUuaGVpZ2h0LzJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSggQHNwcml0ZS50ZXh0dXJlLCBAc3gsIEBzeSwgQHNwcml0ZS53aWR0aCwgQHNwcml0ZS5oZWlnaHQsIDAsIDAsIEBzcHJpdGUud2lkdGgsIEBzcHJpdGUuaGVpZ2h0IClcbiAgICAgICAgY3R4LnJlc3RvcmUoKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNoYXBlXG4iLCJcbiMgRXZlcnkgc3ByaXRlIGhhcyBhIFRleHR1cmUgYW5kIGEgbnVtYmVyIG9mIEFzc2V0cy5cbiMgVGhlc2UgQXNzZXRzIGNhbiBiZSBvZiB0eXBlIFNoYXBlIChzaW1wbGUgSW1hZ2VzKSBvciBBbmltYXRpb25cbiNcbiMgdXNhZ2U6XG4jXG4jIHNwcml0ZSA9IG5ldyBTcHJpdGVcbiMgICBcInRleHR1cmVcIjogXCJpbWcvdGV4dHVyZS5wbmdcbiMgICBcIndpZHRoXCI6NTBcbiMgICBcImhlaWdodFwiOjUwXG4jICAgXCJrZXlcIjpcbiMgICAgIFwic3BhY2VzaGlwXCI6IDFcbiMgICAgIFwicm9ja1wiOiAyXG4jICAgICBcImVuZW15XCI6IDNcbiNcbiMgc3ByaXRlLnJlbmRlcihcInNwYWNlc2hpcFwiKVxuI1xuXG5TaGFwZSA9IHJlcXVpcmUgJy4vc2hhcGUuY29mZmVlJ1xuQW5pbWF0aW9uID0gcmVxdWlyZSAnLi9hbmltYXRpb24uY29mZmVlJ1xuXG5jbGFzcyBTcHJpdGVcbiAgICBjb25zdHJ1Y3RvcjogKGhhc2gpIC0+XG4gICAgICAgIEBhc3NldHMgPSB7fVxuICAgICAgICBAd2lkdGggPSBoYXNoW1wid2lkdGhcIl1cbiAgICAgICAgQGhlaWdodCA9IGhhc2hbXCJoZWlnaHRcIl1cbiAgICAgICAgQHRleHR1cmUgPSBuZXcgSW1hZ2UoKVxuICAgICAgICBAdGV4dHVyZS5zcmMgPSBoYXNoW1widGV4dHVyZVwiXVxuICAgICAgICBAa2V5ID0gaGFzaFtcImtleVwiXSA/IHt9XG5cbiAgICAgICAgZm9yIGtleSwgaSBvZiBAa2V5XG4gICAgICAgICAgICBAYWRkSW1hZ2Uga2V5LCBpXG5cbiAgICAgICAgQGlubmVyV2lkdGggPSBoYXNoW1wiaW5uZXJXaWR0aFwiXSA/IEB3aWR0aFxuICAgICAgICBAaW5uZXJIZWlnaHQgPSBoYXNoW1wiaW5uZXJIZWlnaHRcIl0gPyBAaGVpZ2h0XG5cbiAgICBhZGRJbWFnZTogKG5hbWUsIGluZGV4KSAtPlxuICAgICAgICAkKEB0ZXh0dXJlKS5sb2FkID0+XG4gICAgICAgICAgICBAdGV4V2lkdGggPSBAdGV4dHVyZS53aWR0aFxuICAgICAgICAgICAgQGFzc2V0c1tuYW1lXSA9IG5ldyBTaGFwZSB0aGlzLCBpbmRleFxuXG4gICAgYWRkQW5pbWF0aW9uOiAobmFtZSwgcGFyYW1zKSAtPlxuICAgICAgICAkKEB0ZXh0dXJlKS5sb2FkID0+XG4gICAgICAgICAgICBAdGV4V2lkdGggPSBAdGV4dHVyZS53aWR0aFxuICAgICAgICAgICAgQGFzc2V0c1tuYW1lXSA9IG5ldyBBbmltYXRpb24gdGhpcywgcGFyYW1zXG5cbiAgICByZW5kZXI6IChuYW1lLCBjdHgpIC0+XG4gICAgICAgIEBhc3NldHNbbmFtZV0ucmVuZGVyKGN0eCkgaWYgQGFzc2V0c1tuYW1lXT9cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gU3ByaXRlXG4iLCJcbkJvdW5kaW5nQm94ID0gcmVxdWlyZSAnLi9ib3VuZGluZ0JveC5jb2ZmZWUnXG5WZWN0b3IgPSByZXF1aXJlICcuL3ZlY3Rvci5jb2ZmZWUnXG5cbmNsYXNzIFRpbGVcbiAgICBjb25zdHJ1Y3RvcjogKEBzcHJpdGUsIEB0eXBlLCBAcm93LCBAY29sLCBAZ3JlZW49MCwgQHo9MCkgLT5cbiAgICAgICAgQG5laWdoYm9yID0gW11cbiAgICAgICAgQHggPSBAY29sICogQHNwcml0ZS5pbm5lcldpZHRoICsgQHNwcml0ZS5pbm5lcldpZHRoLzJcbiAgICAgICAgQHkgPSBAcm93ICogQHNwcml0ZS5pbm5lckhlaWdodCArIEBzcHJpdGUuaW5uZXJIZWlnaHQvMlxuICAgICAgICBAYmIgPSBuZXcgQm91bmRpbmdCb3ggbmV3IFZlY3RvciggQHgsIEB5ICksIG5ldyBWZWN0b3IoIEBzcHJpdGUuaW5uZXJXaWR0aCwgQHNwcml0ZS5pbm5lckhlaWdodCApXG4gICAgICAgIEBiYi5jb2xvciA9IFwiZ3JlZW5cIlxuXG4gICAgaXNXYWxrYWJsZTogLT5cbiAgICAgICAgQGdyZWVuIGlzIDBcblxuICAgIHNxdWFyZWREaXN0YW5jZVRvOiAodmVjKSAtPlxuICAgICAgICB2ZWMuc3VidHJhY3QoIG5ldyBWZWN0b3IoQHgsQHkpICkubGVuZ3RoU3F1YXJlZCgpICMgbWF5YmUgYWRkIGEgZGlzdGFuY2UgKGNsYXNzLSltZXRob2QgdG8gdmVjdG9yP1xuXG4gICAgcmVuZGVyOiAoY3R4KSAtPlxuICAgICAgICBjdHguc2F2ZSgpXG4gICAgICAgIGN0eC50cmFuc2xhdGUgQHggLSBAeiwgQHkgLSBAelxuICAgICAgICBAc3ByaXRlLnJlbmRlciggQHR5cGUsIGN0eCApXG4gICAgICAgIGN0eC5yZXN0b3JlKClcblxuICAgICAgICAjIEBiYi5yZW5kZXIgY3R4XG5cbm1vZHVsZS5leHBvcnRzID0gVGlsZVxuXG4iLCJcbiMgQSBzaW1wbGUgVGltZXI6XG4jIGl0IGhlbHBzIHlvdSBrZWVwIHRyYWNrIG9mIHRoZSB0aW1lIHRoYXQgaGFzIGVsYXBzZWQgc2luY2UgeW91IGxhc3QgXCJwdW5jaCgpXCItZWQgaXRcblxuY2xhc3MgVGltZXJcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQGxhc3RfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICAgIEBkZWx0YSA9IDBcblxuICAgICMgcHVuY2ggcmVzZXRzIHRoZSB0aW1lciBhbmQgcmV0dXJucyB0aGUgdGltZSAoaW4gbXMpIGJldHdlZW4gdGhlIGxhc3QgdHdvIHB1bmNoZXNcbiAgICBwdW5jaDogLT5cbiAgICAgICAgdGhpc190aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgQGRlbHRhID0gdGhpc190aW1lIC0gQGxhc3RfdGltZVxuICAgICAgICBAbGFzdF90aW1lID0gdGhpc190aW1lXG4gICAgICAgIHJldHVybiBAZGVsdGFcblxuICAgICMgZGVsdGEgZ2l2ZXMgeW91IHRoZSB0aW1lIHRoYXQgaGFzIGVsYXBzZWQgc2luY2UgdGhlIHRpbWVyIHdhcyBwdW5jaGVkIHRoZSBsYXN0IHRpbWVcbiAgICB0aW1lU2luY2VMYXN0UHVuY2g6IC0+XG4gICAgICAgIHRoaXNfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICAgIHRoaXNfdGltZSAtIEBsYXN0X3RpbWVcblxuICAgIGZwczogLT5cbiAgICAgICAgMTAwMCAvIEBkZWx0YVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbWVyXG4iLCIjXG4jICB2ZWN0b3IuY29mZmVlXG4jXG4jICBDcmVhdGVkIGJ5IEtvbGphIFdpbGNrZSBpbiBPY3RvYmVyIDIwMTFcbiMgIENvcHlyaWdodCAyMDExLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuI1xuIyAgVGhlIHVuZGVyc2NvcmUgYXQgdGhlIGVuZCBvZiBhIG1ldGhvZCBzaWduaWZpZXMgdGhhdCBpdCBvcGVyYXRlcyBvbiBpdHNlbGZcbiNcblxuY2xhc3MgVmVjdG9yXG4gICAgY29uc3RydWN0b3I6ICh4ID0gMCwgeSA9IDApIC0+XG4gICAgICAgIEB4ID0geFxuICAgICAgICBAeSA9IHlcblxuICAgIGNsb25lOiAtPlxuICAgICAgICBuZXcgVmVjdG9yIEB4LCBAeVxuXG4gICAgIyBBZGQgYW5vdGhlciBWZWN0b3JcbiAgICBhZGQ6ICh2ZWMpIC0+XG4gICAgICAgIG5ldyBWZWN0b3IgQHggKyB2ZWMueCwgQHkgKyB2ZWMueVxuXG4gICAgYWRkXzogKHZlYykgLT5cbiAgICAgICAgQHggKz0gdmVjLnhcbiAgICAgICAgQHkgKz0gdmVjLnlcblxuICAgICMgU3VidHJhY3QgYW5vdGhlciBWZWN0b3JcbiAgICBzdWJ0cmFjdDogKHZlYykgLT5cbiAgICAgICAgbmV3IFZlY3RvciBAeCAtIHZlYy54LCBAeSAtIHZlYy55XG5cbiAgICBzdWJ0cmFjdF86ICh2ZWMpIC0+XG4gICAgICAgIEB4IC09IHZlYy54XG4gICAgICAgIEB5IC09IHZlYy55XG5cbiAgICAjIG11bHRpcGx5IHRoZSB2ZWN0b3Igd2l0aCBhIE51bWJlclxuICAgIG11bHQ6IChudW0pIC0+XG4gICAgICAgIG5ldyBWZWN0b3IgQHggKiBudW0sIEB5ICogbnVtXG5cbiAgICBtdWx0XzogKG51bSkgLT5cbiAgICAgICAgQHggKj0gbnVtXG4gICAgICAgIEB5ICo9IG51bVxuXG4gICAgIyByZXR1cm5zIHRoZSBsZW5ndGggb2YgdGhlIHZlY3RvciAoQmV0cmFnKVxuICAgIGxlbmd0aDogLT5cbiAgICAgICAgTWF0aC5zcXJ0IEB4KkB4ICsgQHkqQHlcblxuICAgICMgcmV0dXJuIHRoZSBsZW5ndGggc3F1YXJlZCAoZm9yIG9wdGltaXNhdGlvbilcbiAgICBsZW5ndGhTcXVhcmVkOiAtPlxuICAgICAgICBAeCpAeCArIEB5KkB5XG5cbiAgICAjIHJldHVybnMgdGhlIG5vcm1hbGl6ZWQgdmVjdG9yIChMZW5ndGggPSAxKVxuICAgIG5vcm06IChmYWN0b3I9MSkgLT5cbiAgICAgICAgaWYgKCBAbGVuZ3RoKCkgPiAwIClcbiAgICAgICAgICAgIHJldHVybiBAbXVsdCBmYWN0b3IvbFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgbm9ybV86IChmYWN0b3I9MSkgLT5cbiAgICAgICAgaWYgKCBAbGVuZ3RoKCkgPiAwIClcbiAgICAgICAgICAgIHJldHVybiBAbXVsdF8gZmFjdG9yL2xcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG51bGxcblxuICAgICMgcmV0dXJucyB0aGUgc2NhbGFycHJvZHVjdFxuICAgIHNjYWxhclByb2R1Y3Q6ICh2ZWMpIC0+XG4gICAgICAgIEB4ICogdmVjLnggKyBAeSAqIHZlYy55XG5cbiAgICBzYW1lRGlyZWN0aW9uOiAodmVjKSAtPlxuICAgICAgICBpZiAoQGxlbmd0aFNxdWFyZWQoKSA8IEBhZGQodmVjKS5sZW5ndGhTcXVhcmVkKCkpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcblxuICAgICMgcmV0dXJucyB0aGUgYW5nbGUgaXQgZm9ybXMgd2l0aCBhIGdpdmVuIHZlY3RvclxuICAgIGFuZ2xlV2l0aDogKHZlYykgLT5cbiAgICAgICAgTWF0aC5hY29zKCBAc2NhbGFyUHJvZHVjdCggdmVjICkgLyBAbGVuZ3RoKCkgKiB2ZWMubGVuZ3RoKCkgKVxuXG4gICAgIyByZXR1cm5zIHRoZSB2ZWN0b3Jwcm9kdWN0ICh2ZWN0b3IvS3JldXpwcm9kdWt0KSAtLSBub3QgeWV0IGltcGxlbWVudGVkXG4gICAgdmVjdG9yUHJvZHVjdDogKHZlYykgLT5cbiAgICAgICAgcmV0dXJuIHRoaXNcblxuICAgICMgcmV0dXJucyB0aGUgY29tcG9uZW50IHBhcmFsbGVsIHRvIGEgZ2l2ZW4gdmVjdG9yXG4gICAgcHJvamVjdFRvOiAodmVjKSAtPlxuICAgICAgICB2ZWMubXVsdCggQHNjYWxhclByb2R1Y3QodmVjKSAvIHZlYy5sZW5ndGhTcXVhcmVkKCkgKVxuXG4gICAgcHJvamVjdFRvXzogKHZlYykgLT5cbiAgICAgICAgbSA9IEBzY2FsYXJQcm9kdWN0KHZlYykgLyB2ZWMubGVuZ3RoU3F1YXJlZCgpXG4gICAgICAgIEB4ICo9IG1cbiAgICAgICAgQHkgKj0gbVxuXG5cbiAgICAjIENsYXNzIG1ldGhvZDogY2hlY2tzIGlmIHR3byB2ZWN0b3JzIGFyZSBpbnRlcnNlY3RpbmcgLSByZXR1cm5zIGludGVyc2VjdGlvbiBwb2ludFxuICAgIEBpbnRlcnNlY3Rpbmc6IChvYSwgYSwgb2IsIGIpIC0+XG5cbiAgICAgICAgYyA9IG9iLnN1YnRyYWN0IG9hXG4gICAgICAgIGIgPSBiLm11bHQgLTFcbiAgICAgICAgY29sID0gW11cblxuICAgICAgICBjb2xbMF0gPSBhLmNsb25lKClcbiAgICAgICAgY29sWzFdID0gYi5jbG9uZSgpXG4gICAgICAgIGNvbFsyXSA9IGMuY2xvbmUoKVxuICAgICAgICBsPTA7IG09MTsgbj0yXG5cbiAgICAgICAgIyBNdWx0aXBsaWNhdG9yXG5cbiAgICAgICAgbXVsdCA9IGNvbFswXS55IC8gY29sWzBdLnhcblxuICAgICAgICAjIEJyaW5nIE1hdHJpeCBpbnRvIFRyaWFuZ3VsYXIgc2hhcGVcblxuICAgICAgICBjb2xbMF0ueSA9IDBcbiAgICAgICAgY29sWzFdLnkgPSBjb2xbMV0ueSAtIChtdWx0ICogY29sWzFdLngpXG4gICAgICAgIGNvbFsyXS55ID0gY29sWzJdLnkgLSAobXVsdCAqIGNvbFsyXS54KVxuXG4gICAgICAgICMgUmV2ZXJzZSBTdWJzdGl0dXRpb25cblxuICAgICAgICBtdSA9IGNvbFtuXS55IC8gY29sW21dLnlcbiAgICAgICAgIyBsYiA9IChjb2xbbl0ueCAtIChjb2xbbV0ueCAqIG11KSkgLyBjb2xbbF0ueCAjICBtdSBpcyBzdWZmaWNpZW50IHNvIHRoaXMgZG9lc24ndCBuZWVkIHRvIGJlIGRvbmVcblxuICAgICAgICByZXR1cm4gb2Iuc3VidHJhY3QoIGIubXVsdChtdSkgKVxuXG4gICAgcHJpbnQ6IC0+XG4gICAgICAgIHJldHVybiBcIigje0B4fSwgI3tAeX0pXCJcblxubW9kdWxlLmV4cG9ydHMgPSBWZWN0b3JcbiJdfQ==
(9)
});
