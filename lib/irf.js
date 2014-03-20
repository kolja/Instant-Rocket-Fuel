!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.irf=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
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


},{"./vector.coffee":21}],2:[function(_dereq_,module,exports){
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


},{"./vector.coffee":21}],3:[function(_dereq_,module,exports){
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
        ctx.translate(this.vpWidth / 2 - this.coor.x, this.vpHeight / 2 - this.coor.y);
        callback();
        return ctx.restore();
    }
  };

  return Camera;

})();

module.exports = Camera;


},{"./vector.coffee":21}],4:[function(_dereq_,module,exports){
var EventManager;

EventManager = (function() {
  function EventManager() {
    this.eventlist = {};
    this.on = this.register;
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


},{}],5:[function(_dereq_,module,exports){
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


},{"./helpers.coffee":6,"./scenemanager.coffee":15}],6:[function(_dereq_,module,exports){
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


},{}],7:[function(_dereq_,module,exports){
module.exports = {
  Animation: _dereq_('./sprite/animation.coffee'),
  Background: _dereq_('./sprite/background.coffee'),
  BoundingBox: _dereq_('./boundingbox.coffee'),
  Camera: _dereq_('./camera.coffee'),
  EventManager: _dereq_('./eventmanager.coffee'),
  Game: _dereq_('./game.coffee'),
  Helpers: _dereq_('./helpers.coffee'),
  Keyboard: _dereq_('./keyboard.coffee'),
  Map: _dereq_('./map/map.coffee'),
  Scene: _dereq_('./scene.coffee'),
  SceneManager: _dereq_('./scenemanager.coffee'),
  Shape: _dereq_('./sprite/shape.coffee'),
  Sprite: _dereq_('./sprite/sprite.coffee'),
  Tile: _dereq_('./map/tile.coffee'),
  Timer: _dereq_('./timer.coffee'),
  Vector: _dereq_('./vector.coffee')
};


},{"./boundingbox.coffee":2,"./camera.coffee":3,"./eventmanager.coffee":4,"./game.coffee":5,"./helpers.coffee":6,"./keyboard.coffee":8,"./map/map.coffee":10,"./map/tile.coffee":13,"./scene.coffee":14,"./scenemanager.coffee":15,"./sprite/animation.coffee":16,"./sprite/background.coffee":17,"./sprite/shape.coffee":18,"./sprite/sprite.coffee":19,"./timer.coffee":20,"./vector.coffee":21}],8:[function(_dereq_,module,exports){
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


},{}],9:[function(_dereq_,module,exports){
var DataSource;

DataSource = (function() {
  function DataSource(_arg) {
    var read;
    read = _arg.read, this.file = _arg.file, this.callback = _arg.callback;
    this.mapData = {};
    if (typeof read === "function") {
      this.read = read;
    }
    switch (read) {
      case "image":
        this.read = this.readImage;
        break;
      case "file":
        this.read = this.readFile;
        break;
      default:
        this.read = this.readLiteral;
    }
  }

  DataSource.prototype.readImage = function() {
    var img,
      _this = this;
    img = new Image();
    img.src = this.file;
    return img.onload = function() {
      var canvas, ctx, data, i, p, row, _base, _i, _len;
      canvas = document.createElement("canvas");
      _this.mapData.width = canvas.width = img.width;
      _this.mapData.height = canvas.height = img.height;
      ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      data = ctx.getImageData(0, 0, _this.mapData.width, _this.mapData.height).data;
      for (i = _i = 0, _len = data.length; _i < _len; i = _i += 4) {
        p = data[i];
        row = Math.floor((i / 4) / _this.mapData.width);
        if ((_base = _this.mapData)[row] == null) {
          _base[row] = [];
        }
        _this.mapData[row].push([Number(data[i]).toHex(), Number(data[i + 1]).toHex(), Number(data[i + 2]).toHex(), Number(data[i + 3]).toHex()]);
      }
      return _this.callback(_this.mapData);
    };
  };

  DataSource.prototype.readFile = function() {
    var request;
    request = new XMLHttpRequest();
    request.onload = function() {
      this.mapData = JSON.parse(request.responseText);
      return this.callback(this.mapdata);
    };
    request.open("GET", this.file, true);
    return request.send();
  };

  DataSource.prototype.readLiteral = function() {
    this.mapData = this.file;
    return this.callback(this.mapData);
  };

  return DataSource;

})();

module.exports = DataSource;


},{}],10:[function(_dereq_,module,exports){
var DataSource, Map, MovementRules, ReadStrategy,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

DataSource = _dereq_('./datasource.coffee');

ReadStrategy = _dereq_('./readstrategy.coffee');

MovementRules = _dereq_('./movementrules.coffee');

Map = (function() {
  function Map(_arg) {
    this.sprite = _arg.sprite, this.read = _arg.read, this.pattern = _arg.pattern, this.movement = _arg.movement, this.mapFile = _arg.mapFile, this.ed = _arg.ed;
    this.parseToTiles = __bind(this.parseToTiles, this);
    if (this.read == null) {
      this.read = "image";
    }
    if (this.pattern == null) {
      this.pattern = "simple";
    }
    if (this.movement == null) {
      this.movement = "northSouthEastWest";
    }
    this.width = 0;
    this.height = 0;
    this.rd = null;
    new DataSource({
      read: this.read,
      file: this.mapFile,
      callback: this.parseToTiles
    }).read();
  }

  Map.prototype.parseToTiles = function(mapData) {
    var _ref;
    this.width = mapData.width, this.height = mapData.height;
    this.tiles = (new ReadStrategy(this.pattern)).read(mapData, this.sprite);
    (new MovementRules(this.movement)).applyRules(this);
    return (_ref = this.ed) != null ? _ref.trigger("map.finishedLoading") : void 0;
  };

  Map.prototype.renderDistance = function(camera) {
    if (this.rd != null) {
      return this.rd;
    }
    return this.rd = (Math.pow(camera.vpWidth + 20, 2) + Math.pow(camera.vpHeight + 20, 2)) / 4;
  };

  Map.prototype.tileAtVector = function(vec) {
    var index, x, y;
    x = Math.floor(vec.x / this.sprite.innerWidth);
    y = Math.floor(vec.y / this.sprite.innerHeight);
    index = y * this.width + x;
    return this.tiles[index];
  };

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

  return Map;

})();

module.exports = Map;


},{"./datasource.coffee":9,"./movementrules.coffee":11,"./readstrategy.coffee":12}],11:[function(_dereq_,module,exports){
var MovementRules;

MovementRules = (function() {
  function MovementRules(rules) {
    if (typeof rules === "function") {
      this.rules = rules;
    }
    switch (rules) {
      case "hexagon":
        this.rules = this.hexagon;
        break;
      default:
        this.rules = this.northSouthEastWest;
    }
  }

  MovementRules.prototype.applyRules = function(map) {
    return this.rules(map);
  };

  MovementRules.prototype.northSouthEastWest = function(map) {
    var index, tile, _i, _len, _ref, _results;
    _ref = map.tiles;
    _results = [];
    for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
      tile = _ref[index];
      tile.neighbor["w"] = map.tiles[index - 1];
      tile.neighbor["e"] = map.tiles[index + 1];
      tile.neighbor["n"] = map.tiles[index - map.width];
      _results.push(tile.neighbor["s"] = map.tiles[index + map.width]);
    }
    return _results;
  };

  MovementRules.prototype.hexagon = function(map) {};

  return MovementRules;

})();

module.exports = MovementRules;


},{}],12:[function(_dereq_,module,exports){
var ReadStrategy, Tile;

Tile = _dereq_("./tile.coffee");

ReadStrategy = (function() {
  function ReadStrategy(pattern) {
    this.pattern = pattern;
    if (typeof this.pattern === "function") {
      this.read = this.pattern;
    } else {
      switch (this.pattern) {
        case "square":
          this.read = this.readSquare;
          break;
        case "cross":
          this.read = this.readCross;
          break;
        default:
          this.read = this.readSimple;
      }
    }
  }

  ReadStrategy.prototype.readSimple = function(mapData, sprite) {
    var col, green, row, tiles, type, z, _i, _j, _ref, _ref1;
    tiles = [];
    for (row = _i = 0, _ref = mapData.height - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; row = 0 <= _ref ? ++_i : --_i) {
      for (col = _j = 0, _ref1 = mapData.width - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; col = 0 <= _ref1 ? ++_j : --_j) {
        type = "" + mapData[row][col][0];
        green = parseInt(mapData[row][col][1], 16);
        z = parseInt(mapData[row][col][2], 16);
        tiles.push(new Tile(sprite, type, row, col, green, z));
      }
    }
    return tiles;
  };

  ReadStrategy.prototype.readSquare = function(mapData, sprite) {
    var col, green, row, tiles, type, z, _i, _j, _ref, _ref1;
    tiles = [];
    for (row = _i = 0, _ref = mapData.height - 2; 0 <= _ref ? _i <= _ref : _i >= _ref; row = 0 <= _ref ? ++_i : --_i) {
      for (col = _j = 0, _ref1 = mapData.width - 2; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; col = 0 <= _ref1 ? ++_j : --_j) {
        type = "" + mapData[row][col][0] + mapData[row][col + 1][0] + mapData[row + 1][col][0] + mapData[row + 1][col + 1][0];
        green = parseInt(mapData[row][col][1], 16);
        z = parseInt(mapData[row][col][2], 16);
        tiles.push(new Tile(sprite, type, row, col, green, z));
      }
    }
    return tiles;
  };

  ReadStrategy.prototype.readCross = function(mapData, sprite) {
    var col, green, row, tiles, type, z, _i, _j, _ref, _ref1;
    tiles = [];
    for (row = _i = 1, _ref = mapData.height - 2; _i <= _ref; row = _i += 2) {
      for (col = _j = 1, _ref1 = mapData.width - 2; _j <= _ref1; col = _j += 2) {
        if (mapData[row][col][0] !== "00") {
          type = "" + mapData[row - 1][col][0] + mapData[row][col + 1][0] + mapData[row + 1][col][0] + mapData[row][col - 1][0];
          green = parseInt(mapData[row][col][1], 16);
          z = parseInt(mapData[row][col][2], 16);
          tiles.push(new Tile(sprite, type, row / 2, col / 2, green, z));
        }
      }
    }
    return tiles;
  };

  return ReadStrategy;

})();

module.exports = ReadStrategy;


},{"./tile.coffee":13}],13:[function(_dereq_,module,exports){
var BoundingBox, Tile, Vector;

BoundingBox = _dereq_('../boundingBox.coffee');

Vector = _dereq_('../vector.coffee');

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


},{"../boundingBox.coffee":1,"../vector.coffee":21}],14:[function(_dereq_,module,exports){
var Scene;

Scene = (function() {
  function Scene() {}

  Scene.prototype.update = function() {};

  Scene.prototype.render = function() {};

  return Scene;

})();

module.exports = Scene;


},{}],15:[function(_dereq_,module,exports){
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


},{}],16:[function(_dereq_,module,exports){
var Animation, Shape, Timer;

Shape = _dereq_('./shape.coffee');

Timer = _dereq_('../timer.coffee');

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


},{"../timer.coffee":20,"./shape.coffee":18}],17:[function(_dereq_,module,exports){
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


},{}],18:[function(_dereq_,module,exports){
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


},{}],19:[function(_dereq_,module,exports){
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


},{"./animation.coffee":16,"./shape.coffee":18}],20:[function(_dereq_,module,exports){
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


},{}],21:[function(_dereq_,module,exports){
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


},{}]},{},[7])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzLzAxay93d3cvaXJmL3NyYy9ib3VuZGluZ0JveC5jb2ZmZWUiLCIvVXNlcnMvMDFrL3d3dy9pcmYvc3JjL2JvdW5kaW5nYm94LmNvZmZlZSIsIi9Vc2Vycy8wMWsvd3d3L2lyZi9zcmMvY2FtZXJhLmNvZmZlZSIsIi9Vc2Vycy8wMWsvd3d3L2lyZi9zcmMvZXZlbnRtYW5hZ2VyLmNvZmZlZSIsIi9Vc2Vycy8wMWsvd3d3L2lyZi9zcmMvZ2FtZS5jb2ZmZWUiLCIvVXNlcnMvMDFrL3d3dy9pcmYvc3JjL2hlbHBlcnMuY29mZmVlIiwiL1VzZXJzLzAxay93d3cvaXJmL3NyYy9pcmYuY29mZmVlIiwiL1VzZXJzLzAxay93d3cvaXJmL3NyYy9rZXlib2FyZC5jb2ZmZWUiLCIvVXNlcnMvMDFrL3d3dy9pcmYvc3JjL21hcC9kYXRhc291cmNlLmNvZmZlZSIsIi9Vc2Vycy8wMWsvd3d3L2lyZi9zcmMvbWFwL21hcC5jb2ZmZWUiLCIvVXNlcnMvMDFrL3d3dy9pcmYvc3JjL21hcC9tb3ZlbWVudHJ1bGVzLmNvZmZlZSIsIi9Vc2Vycy8wMWsvd3d3L2lyZi9zcmMvbWFwL3JlYWRzdHJhdGVneS5jb2ZmZWUiLCIvVXNlcnMvMDFrL3d3dy9pcmYvc3JjL21hcC90aWxlLmNvZmZlZSIsIi9Vc2Vycy8wMWsvd3d3L2lyZi9zcmMvc2NlbmUuY29mZmVlIiwiL1VzZXJzLzAxay93d3cvaXJmL3NyYy9zY2VuZW1hbmFnZXIuY29mZmVlIiwiL1VzZXJzLzAxay93d3cvaXJmL3NyYy9zcHJpdGUvYW5pbWF0aW9uLmNvZmZlZSIsIi9Vc2Vycy8wMWsvd3d3L2lyZi9zcmMvc3ByaXRlL2JhY2tncm91bmQuY29mZmVlIiwiL1VzZXJzLzAxay93d3cvaXJmL3NyYy9zcHJpdGUvc2hhcGUuY29mZmVlIiwiL1VzZXJzLzAxay93d3cvaXJmL3NyYy9zcHJpdGUvc3ByaXRlLmNvZmZlZSIsIi9Vc2Vycy8wMWsvd3d3L2lyZi9zcmMvdGltZXIuY29mZmVlIiwiL1VzZXJzLzAxay93d3cvaXJmL3NyYy92ZWN0b3IuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQ0EsSUFBQSxlQUFBOztBQUFBLENBQUEsRUFBUyxHQUFULENBQVMsVUFBQTs7QUFFSCxDQUZOO0NBR2lCLENBQUEsQ0FBQSxDQUFBLENBQUEsZ0JBQUU7Q0FDWCxFQURXLENBQUQ7Q0FDVixFQURrQixDQUFEO0NBQ2pCLEVBRHdCLENBQUQsRUFDdkI7O0FBQVMsQ0FBUixFQUFRLENBQVIsRUFBRDtNQUFBOztBQUNRLENBQVAsRUFBTyxDQUFQLEVBQUQ7TUFGUztDQUFiLEVBQWE7O0NBQWIsRUFJVyxJQUFBLEVBQVg7Q0FDSSxHQUFBLFdBQUE7Q0FBcUIsSUFBQSxRQUFPO01BQTVCO0NBQ0MsR0FBQSxHQUFELEdBQUEsQ0FBQTtDQU5KLEVBSVc7O0NBSlgsRUFRWSxJQUFBLEVBQUMsQ0FBYjtDQUNJLEVBQWEsQ0FBYixHQUFvQjtDQUNoQixFQUFTLENBQU4sRUFBSCxDQUFxQjtDQUNqQixJQUFBLFVBQU87TUFEWCxFQUFBO0NBR0ksR0FBQSxXQUFPO1FBSmY7TUFBQTtDQU1JLEVBQVMsQ0FBTixFQUFILENBQXFCO0NBQ2pCLElBQUEsVUFBTztNQURYLEVBQUE7Q0FHSSxHQUFBLFdBQU87UUFUZjtNQURRO0NBUlosRUFRWTs7Q0FSWixFQW9CWSxJQUFBLEVBQUMsQ0FBYjtDQUNJLEVBQWEsQ0FBYixHQUFvQjtDQUNoQixFQUFTLENBQU4sRUFBSCxDQUFxQjtDQUNqQixJQUFBLFVBQU87TUFEWCxFQUFBO0NBR0ksR0FBQSxXQUFPO1FBSmY7TUFBQTtDQU1JLEVBQVMsQ0FBTixFQUFILENBQXFCO0NBQ2pCLElBQUEsVUFBTztNQURYLEVBQUE7Q0FHSSxHQUFBLFdBQU87UUFUZjtNQURRO0NBcEJaLEVBb0JZOztDQXBCWixF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MEVZOztDQTFFWixDQWlGQSxDQUFlLEdBQWQsR0FBZSxHQUFoQjtDQUVJLE9BQUEsaUJBQUE7Q0FBQSxDQUFNLENBQUYsQ0FBSixJQUFJO0FBQ1EsQ0FEWixFQUNJLENBQUo7Q0FEQSxDQUFBLENBRUEsQ0FBQTtDQUZBLEVBSUksQ0FBSixDQUFTO0NBSlQsRUFLSSxDQUFKLENBQVM7Q0FMVCxFQU1JLENBQUosQ0FBUztDQU5ULEVBT0UsQ0FBRjtDQVBBLEVBT08sQ0FBRjtDQVBMLEVBT1ksQ0FBRjtDQVBWLEVBV08sQ0FBUDtDQVhBLEVBZUksQ0FBSjtDQWZBLEVBZ0JJLENBQUo7Q0FoQkEsRUFpQkksQ0FBSjtDQWpCQSxDQXFCQSxDQUFLLENBQUw7Q0FHQSxDQUFTLEVBQVcsSUFBYixHQUFBO0NBM0dYLEVBaUZlOztDQWpGZixFQTZHTyxFQUFQLElBQU87Q0FDSCxFQUFRLENBQUcsT0FBSDtDQTlHWixFQTZHTzs7Q0E3R1A7O0NBREo7O0FBaUhBLENBakhBLEVBaUhpQixHQUFYLENBQU4iLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuVmVjdG9yID0gcmVxdWlyZSAnLi92ZWN0b3IuY29mZmVlJ1xuXG5jbGFzcyBCb3VuZGluZ0JveFxuICAgIGNvbnN0cnVjdG9yOiAoQGNvb3IsIEBkaW0sIEBjb2xvcj1cImdyZXlcIikgLT5cbiAgICAgICAgQGNvb3IgPz0gbmV3IFZlY3RvclxuICAgICAgICBAZGltID89IG5ldyBWZWN0b3JcblxuICAgIGludGVyc2VjdDogKG90aGVyQkIpIC0+XG4gICAgICAgIGlmIG5vdCBvdGhlckJCPyB0aGVuIHJldHVybiBmYWxzZVxuICAgICAgICBAaW50ZXJzZWN0dihvdGhlckJCKSBhbmQgQGludGVyc2VjdGgob3RoZXJCQilcblxuICAgIGludGVyc2VjdHY6IChvdGhlckJCKSAtPlxuICAgICAgICBpZiBAY29vci55IDwgb3RoZXJCQi5jb29yLnlcbiAgICAgICAgICAgIGlmICgoQGRpbS55ICsgb3RoZXJCQi5kaW0ueSkgLyAyKSA8IChvdGhlckJCLmNvb3IueSAtIEBjb29yLnkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgaWYgKChAZGltLnkgKyBvdGhlckJCLmRpbS55KSAvIDIpIDwgKEBjb29yLnkgLSBvdGhlckJCLmNvb3IueSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgaW50ZXJzZWN0aDogKG90aGVyQkIpIC0+XG4gICAgICAgIGlmIEBjb29yLnggPCBvdGhlckJCLmNvb3IueFxuICAgICAgICAgICAgaWYgKChAZGltLnggKyBvdGhlckJCLmRpbS54KSAvIDIpIDwgKG90aGVyQkIuY29vci54IC0gQGNvb3IueClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBpZiAoKEBkaW0ueCArIG90aGVyQkIuZGltLngpIC8gMikgPCAoQGNvb3IueCAtIG90aGVyQkIuY29vci54KVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG5cblxuICAgIHJlbmRlcjogKGN0eCkgLT5cbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gQGNvbG9yXG4gICAgICAgIGN0eC5zdHJva2VSZWN0IEBjb29yLnggLSBAZGltLngvMiwgQGNvb3IueSAtIEBkaW0ueS8yLCBAZGltLngsIEBkaW0ueVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJvdW5kaW5nQm94XG4iLCJcblZlY3RvciA9IHJlcXVpcmUgJy4vdmVjdG9yLmNvZmZlZSdcblxuY2xhc3MgQm91bmRpbmdCb3hcbiAgICBjb25zdHJ1Y3RvcjogKEBjb29yLCBAZGltLCBAY29sb3I9XCJncmV5XCIpIC0+XG4gICAgICAgIEBjb29yID89IG5ldyBWZWN0b3JcbiAgICAgICAgQGRpbSA/PSBuZXcgVmVjdG9yXG5cbiAgICBpbnRlcnNlY3Q6IChvdGhlckJCKSAtPlxuICAgICAgICBpZiBub3Qgb3RoZXJCQj8gdGhlbiByZXR1cm4gZmFsc2VcbiAgICAgICAgQGludGVyc2VjdHYob3RoZXJCQikgYW5kIEBpbnRlcnNlY3RoKG90aGVyQkIpXG5cbiAgICBpbnRlcnNlY3R2OiAob3RoZXJCQikgLT5cbiAgICAgICAgaWYgQGNvb3IueSA8IG90aGVyQkIuY29vci55XG4gICAgICAgICAgICBpZiAoKEBkaW0ueSArIG90aGVyQkIuZGltLnkpIC8gMikgPCAob3RoZXJCQi5jb29yLnkgLSBAY29vci55KVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGlmICgoQGRpbS55ICsgb3RoZXJCQi5kaW0ueSkgLyAyKSA8IChAY29vci55IC0gb3RoZXJCQi5jb29yLnkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcblxuICAgIGludGVyc2VjdGg6IChvdGhlckJCKSAtPlxuICAgICAgICBpZiBAY29vci54IDwgb3RoZXJCQi5jb29yLnhcbiAgICAgICAgICAgIGlmICgoQGRpbS54ICsgb3RoZXJCQi5kaW0ueCkgLyAyKSA8IChvdGhlckJCLmNvb3IueCAtIEBjb29yLngpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgaWYgKChAZGltLnggKyBvdGhlckJCLmRpbS54KSAvIDIpIDwgKEBjb29yLnggLSBvdGhlckJCLmNvb3IueClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuXG5cbiAgICByZW5kZXI6IChjdHgpIC0+XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IEBjb2xvclxuICAgICAgICBjdHguc3Ryb2tlUmVjdCBAY29vci54IC0gQGRpbS54LzIsIEBjb29yLnkgLSBAZGltLnkvMiwgQGRpbS54LCBAZGltLnlcblxubW9kdWxlLmV4cG9ydHMgPSBCb3VuZGluZ0JveFxuIiwiXG5WZWN0b3IgPSByZXF1aXJlICcuL3ZlY3Rvci5jb2ZmZWUnXG5cbmNsYXNzIENhbWVyYVxuICAgIGNvbnN0cnVjdG9yOiAoaGFzaCkgLT5cbiAgICAgICAgQHByb2plY3Rpb24gPSBoYXNoW1wicHJvamVjdGlvblwiXVxuICAgICAgICBAdnBXaWR0aCA9IGhhc2hbXCJ2cFdpZHRoXCJdICAgIyBWaWV3cG9ydFxuICAgICAgICBAdnBIZWlnaHQgPSBoYXNoW1widnBIZWlnaHRcIl1cbiAgICAgICAgQHpvb21GYWN0b3IgPSBoYXNoW1wiem9vbUZhY3RvclwiXSA/IDFcbiAgICAgICAgQGNvb3IgPSBuZXcgVmVjdG9yKCAxMDAsIDEwMCApXG5cbiAgICB1cGRhdGU6IChkZWx0YSkgLT5cblxuICAgIGFwcGx5OiAoY3R4LCBjYWxsYmFjaykgLT5cblxuICAgICAgICBzd2l0Y2ggQHByb2plY3Rpb25cbiAgICAgICAgICAgIHdoZW4gXCJub3JtYWxcIlxuICAgICAgICAgICAgICAgIGN0eC5zYXZlKClcbiAgICAgICAgICAgICAgICBjdHgudHJhbnNsYXRlIEB2cFdpZHRoLzIgLSBAY29vci54LCBAdnBIZWlnaHQvMiAtIEBjb29yLnlcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgICAgICAgICAgY3R4LnJlc3RvcmUoKVxuICAgICAgICAgICAgd2hlbiBcImlzb1wiXG4gICAgICAgICAgICAgICAgY3R4LnNhdmUoKVxuICAgICAgICAgICAgICAgIGN0eC5zY2FsZSAxLCAwLjVcbiAgICAgICAgICAgICAgICBjdHgucm90YXRlIE1hdGguUEkvNFxuICAgICAgICAgICAgICAgIGN0eC50cmFuc2xhdGUgQHZwV2lkdGgvMiAtIEBjb29yLngsIEB2cEhlaWdodC8yIC0gQGNvb3IueVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKClcbiAgICAgICAgICAgICAgICBjdHgucmVzdG9yZSgpXG5cbm1vZHVsZS5leHBvcnRzID0gQ2FtZXJhXG4iLCJcbmNsYXNzIEV2ZW50TWFuYWdlclxuXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBldmVudGxpc3QgPSB7fVxuICAgICAgICBAb24gPSBAcmVnaXN0ZXIgIyBhbGlhc1xuXG4gICAgcmVnaXN0ZXI6IChldmVudCwgY2FsbGJhY2spIC0+XG4gICAgICAgIHVubGVzcyBAZXZlbnRsaXN0W2V2ZW50XT9cbiAgICAgICAgICAgIEBldmVudGxpc3RbZXZlbnRdID0gW11cbiAgICAgICAgQGV2ZW50bGlzdFtldmVudF0ucHVzaCBjYWxsYmFja1xuXG4gICAgdHJpZ2dlcjogKGV2ZW50LCBvcmlnaW4pIC0+XG4gICAgICAgIGZvciBjYWxsYmFjayBpbiBAZXZlbnRsaXN0W2V2ZW50XVxuICAgICAgICAgICAgY2FsbGJhY2sob3JpZ2luKVxuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50TWFuYWdlclxuIiwiXG5TY2VuZU1hbmFnZXIgPSByZXF1aXJlICcuL3NjZW5lbWFuYWdlci5jb2ZmZWUnXG5IZWxwZXJzID0gcmVxdWlyZSAnLi9oZWxwZXJzLmNvZmZlZSdcblxuY2xhc3MgR2FtZVxuXG4gICAgQGFkZFNjZW5lOiAoc2NlbmUpIC0+XG4gICAgICAgIEBzY2VuZU1hbmFnZXIgPz0gbmV3IFNjZW5lTWFuYWdlcigpXG4gICAgICAgIEBzY2VuZU1hbmFnZXIuYWRkU2NlbmUgc2NlbmVcblxuICAgIGNvbnN0cnVjdG9yOiAocGFyYW1zKSAtPlxuXG4gICAgICAgIEBwYXJhbXMgPSBIZWxwZXJzLmV4dGVuZCB7XG4gICAgICAgICAgICBcIndpZHRoXCIgOiA4MDAsXG4gICAgICAgICAgICBcImhlaWdodFwiOiA2MDBcbiAgICAgICAgfSwgcGFyYW1zXG5cbiAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnY2FudmFzJ1xuICAgICAgICBjYW52YXMuc2V0QXR0cmlidXRlIFwid2lkdGhcIiwgQHBhcmFtcy53aWR0aFxuICAgICAgICBjYW52YXMuc2V0QXR0cmlidXRlIFwiaGVpZ2h0XCIsIEBwYXJhbXMuaGVpZ2h0XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFwcGVuZENoaWxkKGNhbnZhcylcblxuICAgICAgICBAY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICAgICAgQGN0eC5mb250ID0gJzQwMCAxOHB4IEhlbHZldGljYSwgc2Fucy1zZXJpZidcblxuICAgICAgICAjIHRoZSBpbnN0YW5jZSdzIHNjZW5lbWFuYWdlciBwb2ludHMgdG8gdGhlIENsYXNzZXMgU2NlbmVtYW5hZ2VyXG4gICAgICAgICMgKG9yLCBpZiBpdCBkb2Vzbid0IGV4aXN0LCBhIG5ld2x5IGluc3RhbnRpYXRlZCBvbmUpXG4gICAgICAgIEBzY2VuZU1hbmFnZXIgPSBAY29uc3RydWN0b3Iuc2NlbmVNYW5hZ2VyIHx8IG5ldyBTY2VuZU1hbmFnZXIoKVxuXG4gICAgZ2FtZWxvb3A6ICh0aW1lc3RhbXApID0+XG4gICAgICAgIEBkZWx0YSA9IHRpbWVzdGFtcCAtIEBsYXN0dGltZVxuICAgICAgICBAbGFzdHRpbWUgPSB0aW1lc3RhbXBcblxuICAgICAgICBAdXBkYXRlIEBkZWx0YVxuICAgICAgICBAcmVuZGVyKClcblxuICAgICAgICBAbG9vcElEID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIEBnYW1lbG9vcCBpZiBAbG9vcElEXG5cbiAgICBzdGFydDogLT5cbiAgICAgICAgQGxhc3R0aW1lID0gcGVyZm9ybWFuY2Uubm93KCkgIyBtb3JlIGFjY3VyYXRlIHRoYW4gRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICBAbG9vcElEID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIEBnYW1lbG9vcFxuXG4gICAgc3RvcDogLT5cbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUgQGxvb3BJRFxuICAgICAgICBAbG9vcElEID0gdW5kZWZpbmVkXG5cbiAgICB1cGRhdGU6ICh0aW1lc3RhbXApIC0+XG4gICAgICAgICMgb3ZlcnJpZGUgaW4gdGhlIGdhbWVcblxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgQGN0eC5jbGVhclJlY3QgMCwgMCwgQHBhcmFtcy53aWR0aCwgQHBhcmFtcy5oZWlnaHRcblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lXG4iLCJcblxuIyBodHRwOi8vY29mZmVlc2NyaXB0Y29va2Jvb2suY29tL2NoYXB0ZXJzL2FycmF5cy9zaHVmZmxpbmctYXJyYXktZWxlbWVudHNcbkFycmF5OjpzaHVmZmxlID0gLT4gQHNvcnQgLT4gMC41IC0gTWF0aC5yYW5kb20oKVxuXG5OdW1iZXI6OnRvSGV4ID0gKHBhZGRpbmc9MikgLT5cbiAgICBoZXggPSBAdG9TdHJpbmcgMTZcbiAgICB3aGlsZSAoaGV4Lmxlbmd0aCA8IHBhZGRpbmcpXG4gICAgICAgIGhleCA9IFwiMFwiICsgaGV4XG4gICAgcmV0dXJuIGhleFxuXG5jbGFzcyBIZWxwZXJzXG5cbiAgICBAZXh0ZW5kOiAob2JqZWN0LCBwcm9wZXJ0aWVzKSAtPlxuICAgICAgICBmb3Iga2V5LCB2YWwgb2YgcHJvcGVydGllc1xuICAgICAgICAgICAgb2JqZWN0W2tleV0gPSB2YWxcbiAgICAgICAgb2JqZWN0XG5cbm1vZHVsZS5leHBvcnRzID0gSGVscGVyc1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9XG4gICAgQW5pbWF0aW9uOiByZXF1aXJlICcuL3Nwcml0ZS9hbmltYXRpb24uY29mZmVlJ1xuICAgIEJhY2tncm91bmQ6IHJlcXVpcmUgJy4vc3ByaXRlL2JhY2tncm91bmQuY29mZmVlJ1xuICAgIEJvdW5kaW5nQm94OiByZXF1aXJlICcuL2JvdW5kaW5nYm94LmNvZmZlZSdcbiAgICBDYW1lcmE6IHJlcXVpcmUgJy4vY2FtZXJhLmNvZmZlZSdcbiAgICBFdmVudE1hbmFnZXI6IHJlcXVpcmUgJy4vZXZlbnRtYW5hZ2VyLmNvZmZlZSdcbiAgICBHYW1lOiByZXF1aXJlICcuL2dhbWUuY29mZmVlJ1xuICAgIEhlbHBlcnM6IHJlcXVpcmUgJy4vaGVscGVycy5jb2ZmZWUnXG4gICAgS2V5Ym9hcmQ6IHJlcXVpcmUgJy4va2V5Ym9hcmQuY29mZmVlJ1xuICAgIE1hcDogcmVxdWlyZSAnLi9tYXAvbWFwLmNvZmZlZSdcbiAgICBTY2VuZTogcmVxdWlyZSAnLi9zY2VuZS5jb2ZmZWUnXG4gICAgU2NlbmVNYW5hZ2VyOiByZXF1aXJlICcuL3NjZW5lbWFuYWdlci5jb2ZmZWUnXG4gICAgU2hhcGU6IHJlcXVpcmUgJy4vc3ByaXRlL3NoYXBlLmNvZmZlZSdcbiAgICBTcHJpdGU6IHJlcXVpcmUgJy4vc3ByaXRlL3Nwcml0ZS5jb2ZmZWUnXG4gICAgVGlsZTogcmVxdWlyZSAnLi9tYXAvdGlsZS5jb2ZmZWUnXG4gICAgVGltZXI6IHJlcXVpcmUgJy4vdGltZXIuY29mZmVlJ1xuICAgIFZlY3RvcjogcmVxdWlyZSAnLi92ZWN0b3IuY29mZmVlJ1xuXG5cbiIsIlxuY2xhc3MgS2V5Ym9hcmRcblxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAbWFwcGluZyA9XG4gICAgICAgICAgICA4OlwiYmFja3NwYWNlXCJcbiAgICAgICAgICAgIDk6XCJ0YWJcIlxuICAgICAgICAgICAgMTM6XCJyZXR1cm5cIlxuICAgICAgICAgICAgMTY6XCJzaGlmdFwiXG4gICAgICAgICAgICAxNzpcImN0cmxcIlxuICAgICAgICAgICAgMTg6XCJhbHRcIlxuICAgICAgICAgICAgMjc6XCJlc2NcIlxuICAgICAgICAgICAgMzI6XCJzcGFjZVwiXG4gICAgICAgICAgICAzNzpcImxlZnRcIlxuICAgICAgICAgICAgMzg6XCJ1cFwiXG4gICAgICAgICAgICAzOTpcInJpZ2h0XCJcbiAgICAgICAgICAgIDQwOlwiZG93blwiXG4gICAgICAgICAgICA0ODpcIjBcIlxuICAgICAgICAgICAgNDk6XCIxXCJcbiAgICAgICAgICAgIDQ5OlwiMVwiXG4gICAgICAgICAgICA0OTpcIjFcIlxuICAgICAgICAgICAgNDk6XCIxXCJcbiAgICAgICAgICAgIDQ5OlwiMVwiXG4gICAgICAgICAgICA0OTpcIjZcIlxuICAgICAgICAgICAgNDk6XCI3XCJcbiAgICAgICAgICAgIDQ5OlwiOFwiXG4gICAgICAgICAgICA1NzpcIjlcIlxuICAgICAgICAgICAgNjU6XCJhXCJcbiAgICAgICAgICAgIDY2OlwiYlwiXG4gICAgICAgICAgICA2NzpcImNcIlxuICAgICAgICAgICAgNjg6XCJkXCJcbiAgICAgICAgICAgIDY5OlwiZVwiXG4gICAgICAgICAgICA3MDpcImZcIlxuICAgICAgICAgICAgNzE6XCJnXCJcbiAgICAgICAgICAgIDcyOlwiaFwiXG4gICAgICAgICAgICA3MzpcImlcIlxuICAgICAgICAgICAgNzQ6XCJqXCJcbiAgICAgICAgICAgIDc1Olwia1wiXG4gICAgICAgICAgICA3NjpcImxcIlxuICAgICAgICAgICAgNzc6XCJtXCJcbiAgICAgICAgICAgIDc4OlwiblwiXG4gICAgICAgICAgICA3OTpcIm9cIlxuICAgICAgICAgICAgODA6XCJwXCJcbiAgICAgICAgICAgIDgxOlwicVwiXG4gICAgICAgICAgICA4MjpcInJcIlxuICAgICAgICAgICAgODM6XCJzXCJcbiAgICAgICAgICAgIDg0OlwidFwiXG4gICAgICAgICAgICA4NTpcInVcIlxuICAgICAgICAgICAgODc6XCJ3XCJcbiAgICAgICAgICAgIDg4OlwieFwiXG4gICAgICAgICAgICA4OTpcInlcIlxuICAgICAgICAgICAgOTA6XCJ6XCJcbiAgICAgICAgICAgIDkzOlwiY21kXCJcbiAgICAgICAgICAgIDE4ODpcIixcIlxuICAgICAgICAgICAgMTkwOlwiLlwiXG5cbiAgICAgICAgQGtleWFycmF5ID0gW11cblxuICAgICAgICBmb3IgY29kZSwgbmFtZSBvZiBAbWFwcGluZ1xuICAgICAgICAgICAgQGtleWFycmF5W25hbWVdID0gZmFsc2VcblxuICAgICAgICByb290RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgJ2h0bWwnXG5cbiAgICAgICAgcm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcImtleWRvd25cIiwgKGV2ZW50KSA9PlxuICAgICAgICAgICAgQGtleWFycmF5W0BtYXBwaW5nW2V2ZW50LndoaWNoXV0gPSB0cnVlXG5cbiAgICAgICAgcm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcImtleXVwXCIsIChldmVudCkgPT5cbiAgICAgICAgICAgIEBrZXlhcnJheVtAbWFwcGluZ1tldmVudC53aGljaF1dID0gZmFsc2VcblxuXG4gICAga2V5OiAod2hpY2gpIC0+XG4gICAgICAgIHJldHVybiBAa2V5YXJyYXlbd2hpY2hdXG5cbiAgICBjaGVjazogLT5cbiAgICAgICAgcmV0dXJuIEBrZXlhcnJheVxuXG5tb2R1bGUuZXhwb3J0cyA9IEtleWJvYXJkXG4iLCJcbmNsYXNzIERhdGFTb3VyY2VcblxuICAgIGNvbnN0cnVjdG9yOiAoe3JlYWQsIEBmaWxlLCBAY2FsbGJhY2t9KSAtPlxuICAgICAgICBAbWFwRGF0YSA9IHt9XG4gICAgICAgIGlmIHR5cGVvZihyZWFkKSA9PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICAgIEByZWFkID0gcmVhZFxuICAgICAgICBzd2l0Y2ggcmVhZFxuICAgICAgICAgICAgd2hlbiBcImltYWdlXCJcbiAgICAgICAgICAgICAgICBAcmVhZCA9IEByZWFkSW1hZ2VcbiAgICAgICAgICAgIHdoZW4gXCJmaWxlXCJcbiAgICAgICAgICAgICAgICBAcmVhZCA9IEByZWFkRmlsZVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIEByZWFkID0gQHJlYWRMaXRlcmFsXG5cbiAgICAjIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvOTM0MDEyL2dldC1pbWFnZS1kYXRhLWluLWphdmFzY3JpcHRcbiAgICByZWFkSW1hZ2U6IC0+XG4gICAgICAgIGltZyA9IG5ldyBJbWFnZSgpXG4gICAgICAgIGltZy5zcmMgPSBAZmlsZVxuICAgICAgICBpbWcub25sb2FkID0gPT5cbiAgICAgICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIilcbiAgICAgICAgICAgIEBtYXBEYXRhLndpZHRoID0gY2FudmFzLndpZHRoID0gaW1nLndpZHRoXG4gICAgICAgICAgICBAbWFwRGF0YS5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0ID0gaW1nLmhlaWdodFxuICAgICAgICAgICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKVxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSggaW1nLCAwLCAwKVxuICAgICAgICAgICAgZGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwwLEBtYXBEYXRhLndpZHRoLEBtYXBEYXRhLmhlaWdodCkuZGF0YVxuXG4gICAgICAgICAgICBmb3IgcCxpIGluIGRhdGEgYnkgNFxuICAgICAgICAgICAgICAgIHJvdyA9IE1hdGguZmxvb3IoKGkvNCkvQG1hcERhdGEud2lkdGgpXG4gICAgICAgICAgICAgICAgQG1hcERhdGFbcm93XSA/PSBbXVxuICAgICAgICAgICAgICAgIEBtYXBEYXRhW3Jvd10ucHVzaCBbTnVtYmVyKGRhdGFbaV0pLnRvSGV4KCksTnVtYmVyKGRhdGFbaSsxXSkudG9IZXgoKSxOdW1iZXIoZGF0YVtpKzJdKS50b0hleCgpLE51bWJlcihkYXRhW2krM10pLnRvSGV4KCldXG5cbiAgICAgICAgICAgIEBjYWxsYmFjayBAbWFwRGF0YVxuXG4gICAgIyB1bnRlc3RlZCFcbiAgICByZWFkRmlsZTogLT5cbiAgICAgICAgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gLT5cbiAgICAgICAgICAgIEBtYXBEYXRhID0gSlNPTi5wYXJzZSByZXF1ZXN0LnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgQGNhbGxiYWNrIEBtYXBkYXRhXG4gICAgICAgIHJlcXVlc3Qub3BlbiBcIkdFVFwiLCBAZmlsZSwgdHJ1ZVxuICAgICAgICByZXF1ZXN0LnNlbmQoKVxuXG4gICAgcmVhZExpdGVyYWw6IC0+XG4gICAgICAgIEBtYXBEYXRhID0gQGZpbGVcbiAgICAgICAgQGNhbGxiYWNrIEBtYXBEYXRhXG5cbm1vZHVsZS5leHBvcnRzID0gRGF0YVNvdXJjZVxuXG4iLCJcbkRhdGFTb3VyY2UgPSByZXF1aXJlICcuL2RhdGFzb3VyY2UuY29mZmVlJ1xuUmVhZFN0cmF0ZWd5ID0gcmVxdWlyZSAnLi9yZWFkc3RyYXRlZ3kuY29mZmVlJ1xuTW92ZW1lbnRSdWxlcyA9IHJlcXVpcmUgJy4vbW92ZW1lbnRydWxlcy5jb2ZmZWUnXG5cbmNsYXNzIE1hcFxuICAgIGNvbnN0cnVjdG9yOiAoe0BzcHJpdGUsIEByZWFkLCBAcGF0dGVybiwgQG1vdmVtZW50LCBAbWFwRmlsZSwgQGVkfSkgLT5cblxuICAgICAgICAjIGRlZmF1bHRzOlxuICAgICAgICBAcmVhZCA/PSBcImltYWdlXCIgIyByZWFkIE1hcCBEYXRhIGZyb20gYW4gaW1hZ2UsIGZyb20gYSBmaWxlIG9yIGZyb20gYSBsaXRlcmFsIG9iamVjdFxuICAgICAgICBAcGF0dGVybiA/PSBcInNpbXBsZVwiICMgaG93IHNob3VsZCB0aGUgbWFwRGF0YSBiZSBpbnRlcnByZXRlZD9cbiAgICAgICAgQG1vdmVtZW50ID89IFwibm9ydGhTb3V0aEVhc3RXZXN0XCIgIyB3aGF0IGFyZSB0aGUgbmVpZ2hib3JzIG9mIGFuIGluZGl2aWR1YWwgdGlsZT9cblxuICAgICAgICBAd2lkdGggPSAwICMgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgbWFwIGluIHRpbGVzIC0gY2FuIG9ubHkgYmUgZGV0ZXJtaW5lZCBhZnRlciB0aGUgbWFwZmlsZSBsb2FkaW5nIGhhcyBjb21wbGV0ZWRcbiAgICAgICAgQGhlaWdodCA9IDBcbiAgICAgICAgQHJkID0gbnVsbCAjIHJlbmRlckRpc3RhbmNlXG5cbiAgICAgICAgbmV3IERhdGFTb3VyY2UoXG4gICAgICAgICAgICByZWFkOiBAcmVhZFxuICAgICAgICAgICAgZmlsZTogQG1hcEZpbGVcbiAgICAgICAgICAgIGNhbGxiYWNrOiBAcGFyc2VUb1RpbGVzXG4gICAgICAgICkucmVhZCgpXG5cbiAgICBwYXJzZVRvVGlsZXM6IChtYXBEYXRhKSA9PlxuICAgICAgICB7QHdpZHRoLCBAaGVpZ2h0fSA9IG1hcERhdGFcbiAgICAgICAgQHRpbGVzID0gKG5ldyBSZWFkU3RyYXRlZ3kgQHBhdHRlcm4pLnJlYWQgbWFwRGF0YSwgQHNwcml0ZVxuICAgICAgICAobmV3IE1vdmVtZW50UnVsZXMgQG1vdmVtZW50KS5hcHBseVJ1bGVzIHRoaXNcbiAgICAgICAgQGVkPy50cmlnZ2VyIFwibWFwLmZpbmlzaGVkTG9hZGluZ1wiXG5cbiAgICByZW5kZXJEaXN0YW5jZTogKGNhbWVyYSkgLT5cbiAgICAgICAgcmV0dXJuIEByZCBpZiBAcmQ/ICMgY2FjaGUgdGhlIHJlbmRlciBEaXN0YW5jZVxuICAgICAgICBAcmQgPSAoTWF0aC5wb3coY2FtZXJhLnZwV2lkdGgrMjAsMikgKyBNYXRoLnBvdyhjYW1lcmEudnBIZWlnaHQrMjAsMikpLzRcblxuICAgIHRpbGVBdFZlY3RvcjogKHZlYykgLT5cbiAgICAgICAgeCA9IE1hdGguZmxvb3IoIHZlYy54IC8gQHNwcml0ZS5pbm5lcldpZHRoIClcbiAgICAgICAgeSA9IE1hdGguZmxvb3IoIHZlYy55IC8gQHNwcml0ZS5pbm5lckhlaWdodCApXG4gICAgICAgIGluZGV4ID0geSAqIEB3aWR0aCArIHhcbiAgICAgICAgcmV0dXJuIEB0aWxlc1tpbmRleF1cblxuICAgIHJlbmRlcjogKGN0eCwgY2FtZXJhKSAtPlxuICAgICAgICBmb3IgdGlsZSBpbiBAdGlsZXNcbiAgICAgICAgICAgIGlmIHRpbGUuc3F1YXJlZERpc3RhbmNlVG8oY2FtZXJhLmNvb3IpIDwgQHJlbmRlckRpc3RhbmNlIGNhbWVyYVxuICAgICAgICAgICAgICAgIHRpbGUucmVuZGVyKGN0eClcblxubW9kdWxlLmV4cG9ydHMgPSBNYXBcblxuIiwiXG5jbGFzcyBNb3ZlbWVudFJ1bGVzXG5cbiAgICBjb25zdHJ1Y3RvcjogKHJ1bGVzKSAtPlxuICAgICAgICBpZiB0eXBlb2YocnVsZXMpID09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgICAgQHJ1bGVzID0gcnVsZXNcbiAgICAgICAgc3dpdGNoIHJ1bGVzXG4gICAgICAgICAgICB3aGVuIFwiaGV4YWdvblwiXG4gICAgICAgICAgICAgICAgQHJ1bGVzID0gQGhleGFnb25cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBAcnVsZXMgPSBAbm9ydGhTb3V0aEVhc3RXZXN0XG5cbiAgICBhcHBseVJ1bGVzOiAobWFwKSAtPlxuICAgICAgICBAcnVsZXMgbWFwXG5cbiAgICBub3J0aFNvdXRoRWFzdFdlc3Q6IChtYXApIC0+XG4gICAgICAgIGZvciB0aWxlLCBpbmRleCBpbiBtYXAudGlsZXNcbiAgICAgICAgICAgIHRpbGUubmVpZ2hib3JbXCJ3XCJdID0gbWFwLnRpbGVzW2luZGV4LTFdXG4gICAgICAgICAgICB0aWxlLm5laWdoYm9yW1wiZVwiXSA9IG1hcC50aWxlc1tpbmRleCsxXVxuICAgICAgICAgICAgdGlsZS5uZWlnaGJvcltcIm5cIl0gPSBtYXAudGlsZXNbaW5kZXgtbWFwLndpZHRoXVxuICAgICAgICAgICAgdGlsZS5uZWlnaGJvcltcInNcIl0gPSBtYXAudGlsZXNbaW5kZXgrbWFwLndpZHRoXVxuXG4gICAgaGV4YWdvbjogKG1hcCkgLT5cbiAgICAgICAgIyBpbXBsZW1lbnRhdGlvbiBsZWZ0IGFzIGFuIGV4ZXJjaXNlIHRvIHRoZSByZWFkZXJcblxubW9kdWxlLmV4cG9ydHMgPSBNb3ZlbWVudFJ1bGVzXG5cbiIsIlxuVGlsZSA9IHJlcXVpcmUgXCIuL3RpbGUuY29mZmVlXCJcblxuY2xhc3MgUmVhZFN0cmF0ZWd5XG5cbiAgICBjb25zdHJ1Y3RvcjogKEBwYXR0ZXJuKSAtPlxuICAgICAgICBpZiB0eXBlb2YoQHBhdHRlcm4pIGlzIFwiZnVuY3Rpb25cIlxuICAgICAgICAgICAgQHJlYWQgPSBAcGF0dGVyblxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBzd2l0Y2ggQHBhdHRlcm5cbiAgICAgICAgICAgICAgICB3aGVuIFwic3F1YXJlXCJcbiAgICAgICAgICAgICAgICAgICAgQHJlYWQgPSBAcmVhZFNxdWFyZVxuICAgICAgICAgICAgICAgIHdoZW4gXCJjcm9zc1wiXG4gICAgICAgICAgICAgICAgICAgIEByZWFkID0gQHJlYWRDcm9zc1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgQHJlYWQgPSBAcmVhZFNpbXBsZVxuXG4gICAgcmVhZFNpbXBsZTogKG1hcERhdGEsIHNwcml0ZSkgLT5cbiAgICAgICAgdGlsZXMgPSBbXVxuICAgICAgICBmb3Igcm93IGluIFswLi5tYXBEYXRhLmhlaWdodC0xXVxuICAgICAgICAgICAgZm9yIGNvbCBpbiBbMC4ubWFwRGF0YS53aWR0aC0xXVxuICAgICAgICAgICAgICAgIHR5cGUgPSBcIiN7bWFwRGF0YVtyb3ddW2NvbF1bMF19XCJcbiAgICAgICAgICAgICAgICBncmVlbiA9IHBhcnNlSW50KCBtYXBEYXRhW3Jvd11bY29sXVsxXSwgMTYgKVxuICAgICAgICAgICAgICAgIHogPSBwYXJzZUludCggbWFwRGF0YVtyb3ddW2NvbF1bMl0sIDE2IClcbiAgICAgICAgICAgICAgICB0aWxlcy5wdXNoKCBuZXcgVGlsZSggc3ByaXRlLCB0eXBlLCByb3csIGNvbCwgZ3JlZW4sIHogKSlcbiAgICAgICAgcmV0dXJuIHRpbGVzXG5cbiAgICByZWFkU3F1YXJlOiAobWFwRGF0YSwgc3ByaXRlKSAtPlxuICAgICAgICB0aWxlcyA9IFtdXG4gICAgICAgIGZvciByb3cgaW4gWzAuLm1hcERhdGEuaGVpZ2h0LTJdXG4gICAgICAgICAgICBmb3IgY29sIGluIFswLi5tYXBEYXRhLndpZHRoLTJdXG4gICAgICAgICAgICAgICAgdHlwZSA9IFwiI3ttYXBEYXRhW3Jvd11bY29sXVswXX0je21hcERhdGFbcm93XVtjb2wrMV1bMF19I3ttYXBEYXRhW3JvdysxXVtjb2xdWzBdfSN7bWFwRGF0YVtyb3crMV1bY29sKzFdWzBdfVwiXG4gICAgICAgICAgICAgICAgZ3JlZW4gPSBwYXJzZUludCggbWFwRGF0YVtyb3ddW2NvbF1bMV0sIDE2IClcbiAgICAgICAgICAgICAgICB6ID0gcGFyc2VJbnQoIG1hcERhdGFbcm93XVtjb2xdWzJdLCAxNiApXG4gICAgICAgICAgICAgICAgdGlsZXMucHVzaCggbmV3IFRpbGUoIHNwcml0ZSwgdHlwZSwgcm93LCBjb2wsIGdyZWVuLCB6ICkpXG4gICAgICAgIHJldHVybiB0aWxlc1xuXG4gICAgcmVhZENyb3NzOiAobWFwRGF0YSwgc3ByaXRlKSAtPlxuICAgICAgICB0aWxlcyA9IFtdXG4gICAgICAgIGZvciByb3cgaW4gWzEuLm1hcERhdGEuaGVpZ2h0LTJdIGJ5IDJcbiAgICAgICAgICAgIGZvciBjb2wgaW4gWzEuLm1hcERhdGEud2lkdGgtMl0gYnkgMlxuICAgICAgICAgICAgICAgIHVubGVzcyBtYXBEYXRhW3Jvd11bY29sXVswXSBpcyBcIjAwXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9IFwiI3ttYXBEYXRhW3Jvdy0xXVtjb2xdWzBdfSN7bWFwRGF0YVtyb3ddW2NvbCsxXVswXX0je21hcERhdGFbcm93KzFdW2NvbF1bMF19I3ttYXBEYXRhW3Jvd11bY29sLTFdWzBdfVwiXG4gICAgICAgICAgICAgICAgICAgIGdyZWVuID0gcGFyc2VJbnQoIG1hcERhdGFbcm93XVtjb2xdWzFdLCAxNiApXG4gICAgICAgICAgICAgICAgICAgIHogPSBwYXJzZUludCggbWFwRGF0YVtyb3ddW2NvbF1bMl0sIDE2IClcbiAgICAgICAgICAgICAgICAgICAgdGlsZXMucHVzaCggbmV3IFRpbGUoIHNwcml0ZSwgdHlwZSwgcm93LzIsIGNvbC8yLCBncmVlbiwgeiApKVxuICAgICAgICByZXR1cm4gdGlsZXNcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFkU3RyYXRlZ3lcblxuIiwiXG5Cb3VuZGluZ0JveCA9IHJlcXVpcmUgJy4uL2JvdW5kaW5nQm94LmNvZmZlZSdcblZlY3RvciA9IHJlcXVpcmUgJy4uL3ZlY3Rvci5jb2ZmZWUnXG5cbmNsYXNzIFRpbGVcbiAgICBjb25zdHJ1Y3RvcjogKEBzcHJpdGUsIEB0eXBlLCBAcm93LCBAY29sLCBAZ3JlZW49MCwgQHo9MCkgLT5cbiAgICAgICAgQG5laWdoYm9yID0gW11cbiAgICAgICAgQHggPSBAY29sICogQHNwcml0ZS5pbm5lcldpZHRoICsgQHNwcml0ZS5pbm5lcldpZHRoLzJcbiAgICAgICAgQHkgPSBAcm93ICogQHNwcml0ZS5pbm5lckhlaWdodCArIEBzcHJpdGUuaW5uZXJIZWlnaHQvMlxuICAgICAgICBAYmIgPSBuZXcgQm91bmRpbmdCb3ggbmV3IFZlY3RvciggQHgsIEB5ICksIG5ldyBWZWN0b3IoIEBzcHJpdGUuaW5uZXJXaWR0aCwgQHNwcml0ZS5pbm5lckhlaWdodCApXG5cbiAgICBpc1dhbGthYmxlOiAtPlxuICAgICAgICBAZ3JlZW4gaXMgMFxuXG4gICAgc3F1YXJlZERpc3RhbmNlVG86ICh2ZWMpIC0+XG4gICAgICAgIHZlYy5zdWJ0cmFjdCggbmV3IFZlY3RvcihAeCxAeSkgKS5sZW5ndGhTcXVhcmVkKCkgIyBtYXliZSBhZGQgYSBkaXN0YW5jZSAoY2xhc3MtKW1ldGhvZCB0byB2ZWN0b3I/XG5cbiAgICByZW5kZXI6IChjdHgpIC0+XG4gICAgICAgIGN0eC5zYXZlKClcbiAgICAgICAgY3R4LnRyYW5zbGF0ZSBAeCAtIEB6LCBAeSAtIEB6XG4gICAgICAgIEBzcHJpdGUucmVuZGVyKCBAdHlwZSwgY3R4IClcbiAgICAgICAgY3R4LnJlc3RvcmUoKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbGVcblxuIiwiY2xhc3MgU2NlbmVcblxuICBjb25zdHJ1Y3RvcjogLT5cblxuICB1cGRhdGU6IC0+XG5cbiAgcmVuZGVyOiAtPlxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjZW5lXG4iLCIjICMgVGhlIFNjZW5lTWFuYWdlclxuIyBpcyB0aGUgY2xhc3MgdG8gaG9sZCBhbmQgbWFuYWdlIChzd2l0Y2ggYmV0d2VlbikgdGhlICdzY2VuZXMnIHRoYXQgeW91clxuIyBHYW1lIGNvbnNpc3RzIG9mLiBJdCBtYWludGFpbnNcbmNsYXNzIFNjZW5lTWFuYWdlclxuICAgICMgKiBhIGhhc2ggd2l0aCBhbGwgU2NlbmVzIGluIHRoZSBnYW1lXG4gICAgIyAqIGEgcmVmZXJlbmNlIHRvIHRoZSB0aGUgc2NlbmUgdGhhdCBpcyBjdXJyZW50bHkgYWN0aXZlXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBzY2VuZXMgPSB7fVxuICAgICAgICBAY3VycmVudFNjZW5lID0gbnVsbFxuXG4gICAgYWRkU2NlbmU6IChzY2VuZUNsYXNzKSAtPlxuICAgICAgICBAc2NlbmVzW3NjZW5lQ2xhc3MubmFtZV0gPVxuICAgICAgICAgICAgXCJjbGFzc1wiICAgIDogc2NlbmVDbGFzc1xuICAgICAgICAgICAgXCJpbnN0YW5jZVwiIDogbnVsbFxuXG4gICAgc2V0U2NlbmU6IChzY2VuZSwgcGFyZW50KSAtPlxuICAgICAgICAjIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgc2NlbmUsIHVubGVzcyBpdCBoYXMgYmVlbiBjcmVhdGVkIGJlZm9yZVxuICAgICAgICBAY3VycmVudFNjZW5lID0gQHNjZW5lc1tzY2VuZV0uaW5zdGFuY2UgPz0gbmV3IEBzY2VuZXNbc2NlbmVdLmNsYXNzKHBhcmVudClcblxubW9kdWxlLmV4cG9ydHMgPSBTY2VuZU1hbmFnZXJcbiIsIlxuU2hhcGUgPSByZXF1aXJlICcuL3NoYXBlLmNvZmZlZSdcblRpbWVyID0gcmVxdWlyZSAnLi4vdGltZXIuY29mZmVlJ1xuXG5jbGFzcyBBbmltYXRpb25cblxuICAgIGNvbnN0cnVjdG9yOiAoQHNwcml0ZSwgcGFyYW1zKSAtPlxuICAgICAgICBAZnBzID0gcGFyYW1zW1wiZnBzXCJdID8gMzBcbiAgICAgICAgQGxvb3AgPSBwYXJhbXNbXCJsb29wXCJdID8gdHJ1ZVxuICAgICAgICBAY2FsbGJhY2sgPSBwYXJhbXNbXCJjYWxsYmFja1wiXSA/IG51bGxcbiAgICAgICAgQGZyYW1lcyA9IGZvciBpbmRleCBpbiBwYXJhbXNbXCJmcmFtZXNcIl1cbiAgICAgICAgICAgIG5ldyBTaGFwZSBAc3ByaXRlLCBpbmRleFxuICAgICAgICBAbGFzdEZyYW1lID0gQGZyYW1lcy5sZW5ndGggLSAxXG4gICAgICAgIEB0aW1lciA9IG5ldyBUaW1lclxuICAgICAgICBAY3VycmVudEZyYW1lID0gMFxuICAgICAgICBAcGxheWluZyA9IHRydWVcblxuICAgIHJlbmRlcjogKGN0eCkgLT5cbiAgICAgICAgaWYgQHBsYXlpbmdcbiAgICAgICAgICAgIEBjdXJyZW50RnJhbWUgPSBNYXRoLmZsb29yKCBAdGltZXIudGltZVNpbmNlTGFzdFB1bmNoKCkgLyAoMTAwMCAvIEBmcHMpIClcbiAgICAgICAgICAgIGlmIEBjdXJyZW50RnJhbWUgPiBAbGFzdEZyYW1lXG4gICAgICAgICAgICAgICAgQGNhbGxiYWNrPygpXG4gICAgICAgICAgICAgICAgaWYgQGxvb3BcbiAgICAgICAgICAgICAgICAgICAgQHJld2luZCgpXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBAY3VycmVudEZyYW1lID0gQGxhc3RGcmFtZVxuICAgICAgICAgICAgICAgICAgICBAc3RvcCgpXG5cbiAgICAgICAgQGZyYW1lc1tAY3VycmVudEZyYW1lXS5yZW5kZXIoY3R4KVxuXG4gICAgcGxheTogLT5cbiAgICAgICAgQHBsYXlpbmcgPSB0cnVlXG5cbiAgICBzdG9wOiAtPlxuICAgICAgICBAcGxheWluZyA9IGZhbHNlXG5cbiAgICByZXdpbmQ6IC0+XG4gICAgICAgIEBjdXJyZW50RnJhbWUgPSAwXG4gICAgICAgIEB0aW1lci5wdW5jaCgpXG5cbm1vZHVsZS5leHBvcnRzID0gQW5pbWF0aW9uXG4iLCJjbGFzcyBCYWNrZ3JvdW5kXG4gICAgY29uc3RydWN0b3I6IChAc3ByaXRlKSAtPlxuICAgICAgICBAc3ByaXRlLmFkZEltYWdlIFwiYmFja2dyb3VuZFwiLCAwXG5cbiAgICByZW5kZXI6IChjdHgpIC0+XG4gICAgICAgIEBzcHJpdGUucmVuZGVyKCBcImJhY2tncm91bmRcIiwgY3R4IClcblxubW9kdWxlLmV4cG9ydHMgPSBCYWNrZ3JvdW5kXG4iLCJcbmNsYXNzIFNoYXBlXG5cbiAgICBjb25zdHJ1Y3RvcjogKEBzcHJpdGUsIGluZGV4KSAtPlxuICAgICAgICBAc3ggPSAoIGluZGV4ICogQHNwcml0ZS53aWR0aCApICUgQHNwcml0ZS50ZXhXaWR0aFxuICAgICAgICBAc3kgPSBNYXRoLmZsb29yKCggaW5kZXggKiBAc3ByaXRlLndpZHRoICkgLyBAc3ByaXRlLnRleFdpZHRoKSAqIEBzcHJpdGUuaGVpZ2h0XG5cbiAgICByZW5kZXI6IChjdHgpIC0+XG4gICAgICAgIGN0eC5zYXZlKClcbiAgICAgICAgY3R4LnRyYW5zbGF0ZSAtQHNwcml0ZS53aWR0aC8yLCAtQHNwcml0ZS5oZWlnaHQvMlxuICAgICAgICBjdHguZHJhd0ltYWdlKCBAc3ByaXRlLnRleHR1cmUsIEBzeCwgQHN5LCBAc3ByaXRlLndpZHRoLCBAc3ByaXRlLmhlaWdodCwgMCwgMCwgQHNwcml0ZS53aWR0aCwgQHNwcml0ZS5oZWlnaHQgKVxuICAgICAgICBjdHgucmVzdG9yZSgpXG5cbm1vZHVsZS5leHBvcnRzID0gU2hhcGVcbiIsIlxuIyBFdmVyeSBzcHJpdGUgaGFzIGEgVGV4dHVyZSBhbmQgYSBudW1iZXIgb2YgQXNzZXRzLlxuIyBUaGVzZSBBc3NldHMgY2FuIGJlIG9mIHR5cGUgU2hhcGUgKHNpbXBsZSBJbWFnZXMpIG9yIEFuaW1hdGlvblxuI1xuIyB1c2FnZTpcbiNcbiMgc3ByaXRlID0gbmV3IFNwcml0ZVxuIyAgIFwidGV4dHVyZVwiOiBcImltZy90ZXh0dXJlLnBuZ1xuIyAgIFwid2lkdGhcIjo1MFxuIyAgIFwiaGVpZ2h0XCI6NTBcbiMgICBcImtleVwiOlxuIyAgICAgXCJzcGFjZXNoaXBcIjogMVxuIyAgICAgXCJyb2NrXCI6IDJcbiMgICAgIFwiZW5lbXlcIjogM1xuI1xuIyBzcHJpdGUucmVuZGVyKFwic3BhY2VzaGlwXCIpXG4jXG5cblNoYXBlID0gcmVxdWlyZSAnLi9zaGFwZS5jb2ZmZWUnXG5BbmltYXRpb24gPSByZXF1aXJlICcuL2FuaW1hdGlvbi5jb2ZmZWUnXG5cbmNsYXNzIFNwcml0ZVxuICAgIGNvbnN0cnVjdG9yOiAoaGFzaCkgLT5cbiAgICAgICAgQGFzc2V0cyA9IHt9XG4gICAgICAgIEB3aWR0aCA9IGhhc2hbXCJ3aWR0aFwiXVxuICAgICAgICBAaGVpZ2h0ID0gaGFzaFtcImhlaWdodFwiXVxuICAgICAgICBAdGV4dHVyZSA9IG5ldyBJbWFnZSgpXG4gICAgICAgIEB0ZXh0dXJlLnNyYyA9IGhhc2hbXCJ0ZXh0dXJlXCJdXG4gICAgICAgIEBrZXkgPSBoYXNoW1wia2V5XCJdID8ge31cblxuICAgICAgICBmb3Iga2V5LCBpIG9mIEBrZXlcbiAgICAgICAgICAgIEBhZGRJbWFnZSBrZXksIGlcblxuICAgICAgICBAaW5uZXJXaWR0aCA9IGhhc2hbXCJpbm5lcldpZHRoXCJdID8gQHdpZHRoXG4gICAgICAgIEBpbm5lckhlaWdodCA9IGhhc2hbXCJpbm5lckhlaWdodFwiXSA/IEBoZWlnaHRcblxuICAgIGFkZEltYWdlOiAobmFtZSwgaW5kZXgpIC0+XG4gICAgICAgICQoQHRleHR1cmUpLmxvYWQgPT5cbiAgICAgICAgICAgIEB0ZXhXaWR0aCA9IEB0ZXh0dXJlLndpZHRoXG4gICAgICAgICAgICBAYXNzZXRzW25hbWVdID0gbmV3IFNoYXBlIHRoaXMsIGluZGV4XG5cbiAgICBhZGRBbmltYXRpb246IChuYW1lLCBwYXJhbXMpIC0+XG4gICAgICAgICQoQHRleHR1cmUpLmxvYWQgPT5cbiAgICAgICAgICAgIEB0ZXhXaWR0aCA9IEB0ZXh0dXJlLndpZHRoXG4gICAgICAgICAgICBAYXNzZXRzW25hbWVdID0gbmV3IEFuaW1hdGlvbiB0aGlzLCBwYXJhbXNcblxuICAgIHJlbmRlcjogKG5hbWUsIGN0eCkgLT5cbiAgICAgICAgQGFzc2V0c1tuYW1lXS5yZW5kZXIoY3R4KSBpZiBAYXNzZXRzW25hbWVdP1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBTcHJpdGVcbiIsIlxuIyBBIHNpbXBsZSBUaW1lcjpcbiMgaXQgaGVscHMgeW91IGtlZXAgdHJhY2sgb2YgdGhlIHRpbWUgdGhhdCBoYXMgZWxhcHNlZCBzaW5jZSB5b3UgbGFzdCBcInB1bmNoKClcIi1lZCBpdFxuXG5jbGFzcyBUaW1lclxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAbGFzdF90aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgQGRlbHRhID0gMFxuXG4gICAgIyBwdW5jaCByZXNldHMgdGhlIHRpbWVyIGFuZCByZXR1cm5zIHRoZSB0aW1lIChpbiBtcykgYmV0d2VlbiB0aGUgbGFzdCB0d28gcHVuY2hlc1xuICAgIHB1bmNoOiAtPlxuICAgICAgICB0aGlzX3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICBAZGVsdGEgPSB0aGlzX3RpbWUgLSBAbGFzdF90aW1lXG4gICAgICAgIEBsYXN0X3RpbWUgPSB0aGlzX3RpbWVcbiAgICAgICAgcmV0dXJuIEBkZWx0YVxuXG4gICAgIyBkZWx0YSBnaXZlcyB5b3UgdGhlIHRpbWUgdGhhdCBoYXMgZWxhcHNlZCBzaW5jZSB0aGUgdGltZXIgd2FzIHB1bmNoZWQgdGhlIGxhc3QgdGltZVxuICAgIHRpbWVTaW5jZUxhc3RQdW5jaDogLT5cbiAgICAgICAgdGhpc190aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgdGhpc190aW1lIC0gQGxhc3RfdGltZVxuXG4gICAgZnBzOiAtPlxuICAgICAgICAxMDAwIC8gQGRlbHRhXG5cbm1vZHVsZS5leHBvcnRzID0gVGltZXJcbiIsIiNcbiMgIHZlY3Rvci5jb2ZmZWVcbiNcbiMgIENyZWF0ZWQgYnkgS29samEgV2lsY2tlIGluIE9jdG9iZXIgMjAxMVxuIyAgQ29weXJpZ2h0IDIwMTEuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4jXG4jICBUaGUgdW5kZXJzY29yZSBhdCB0aGUgZW5kIG9mIGEgbWV0aG9kIHNpZ25pZmllcyB0aGF0IGl0IG9wZXJhdGVzIG9uIGl0c2VsZlxuI1xuXG5jbGFzcyBWZWN0b3JcbiAgICBjb25zdHJ1Y3RvcjogKHggPSAwLCB5ID0gMCkgLT5cbiAgICAgICAgQHggPSB4XG4gICAgICAgIEB5ID0geVxuXG4gICAgY2xvbmU6IC0+XG4gICAgICAgIG5ldyBWZWN0b3IgQHgsIEB5XG5cbiAgICAjIEFkZCBhbm90aGVyIFZlY3RvclxuICAgIGFkZDogKHZlYykgLT5cbiAgICAgICAgbmV3IFZlY3RvciBAeCArIHZlYy54LCBAeSArIHZlYy55XG5cbiAgICBhZGRfOiAodmVjKSAtPlxuICAgICAgICBAeCArPSB2ZWMueFxuICAgICAgICBAeSArPSB2ZWMueVxuXG4gICAgIyBTdWJ0cmFjdCBhbm90aGVyIFZlY3RvclxuICAgIHN1YnRyYWN0OiAodmVjKSAtPlxuICAgICAgICBuZXcgVmVjdG9yIEB4IC0gdmVjLngsIEB5IC0gdmVjLnlcblxuICAgIHN1YnRyYWN0XzogKHZlYykgLT5cbiAgICAgICAgQHggLT0gdmVjLnhcbiAgICAgICAgQHkgLT0gdmVjLnlcblxuICAgICMgbXVsdGlwbHkgdGhlIHZlY3RvciB3aXRoIGEgTnVtYmVyXG4gICAgbXVsdDogKG51bSkgLT5cbiAgICAgICAgbmV3IFZlY3RvciBAeCAqIG51bSwgQHkgKiBudW1cblxuICAgIG11bHRfOiAobnVtKSAtPlxuICAgICAgICBAeCAqPSBudW1cbiAgICAgICAgQHkgKj0gbnVtXG5cbiAgICAjIHJldHVybnMgdGhlIGxlbmd0aCBvZiB0aGUgdmVjdG9yIChCZXRyYWcpXG4gICAgbGVuZ3RoOiAtPlxuICAgICAgICBNYXRoLnNxcnQgQHgqQHggKyBAeSpAeVxuXG4gICAgIyByZXR1cm4gdGhlIGxlbmd0aCBzcXVhcmVkIChmb3Igb3B0aW1pc2F0aW9uKVxuICAgIGxlbmd0aFNxdWFyZWQ6IC0+XG4gICAgICAgIEB4KkB4ICsgQHkqQHlcblxuICAgICMgcmV0dXJucyB0aGUgbm9ybWFsaXplZCB2ZWN0b3IgKExlbmd0aCA9IDEpXG4gICAgbm9ybTogKGZhY3Rvcj0xKSAtPlxuICAgICAgICBpZiAoIEBsZW5ndGgoKSA+IDAgKVxuICAgICAgICAgICAgcmV0dXJuIEBtdWx0IGZhY3Rvci9sXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBudWxsXG5cbiAgICBub3JtXzogKGZhY3Rvcj0xKSAtPlxuICAgICAgICBpZiAoIEBsZW5ndGgoKSA+IDAgKVxuICAgICAgICAgICAgcmV0dXJuIEBtdWx0XyBmYWN0b3IvbFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgIyByZXR1cm5zIHRoZSBzY2FsYXJwcm9kdWN0XG4gICAgc2NhbGFyUHJvZHVjdDogKHZlYykgLT5cbiAgICAgICAgQHggKiB2ZWMueCArIEB5ICogdmVjLnlcblxuICAgIHNhbWVEaXJlY3Rpb246ICh2ZWMpIC0+XG4gICAgICAgIGlmIChAbGVuZ3RoU3F1YXJlZCgpIDwgQGFkZCh2ZWMpLmxlbmd0aFNxdWFyZWQoKSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgIyByZXR1cm5zIHRoZSBhbmdsZSBpdCBmb3JtcyB3aXRoIGEgZ2l2ZW4gdmVjdG9yXG4gICAgYW5nbGVXaXRoOiAodmVjKSAtPlxuICAgICAgICBNYXRoLmFjb3MoIEBzY2FsYXJQcm9kdWN0KCB2ZWMgKSAvIEBsZW5ndGgoKSAqIHZlYy5sZW5ndGgoKSApXG5cbiAgICAjIHJldHVybnMgdGhlIHZlY3RvcnByb2R1Y3QgKHZlY3Rvci9LcmV1enByb2R1a3QpIC0tIG5vdCB5ZXQgaW1wbGVtZW50ZWRcbiAgICB2ZWN0b3JQcm9kdWN0OiAodmVjKSAtPlxuICAgICAgICByZXR1cm4gdGhpc1xuXG4gICAgIyByZXR1cm5zIHRoZSBjb21wb25lbnQgcGFyYWxsZWwgdG8gYSBnaXZlbiB2ZWN0b3JcbiAgICBwcm9qZWN0VG86ICh2ZWMpIC0+XG4gICAgICAgIHZlYy5tdWx0KCBAc2NhbGFyUHJvZHVjdCh2ZWMpIC8gdmVjLmxlbmd0aFNxdWFyZWQoKSApXG5cbiAgICBwcm9qZWN0VG9fOiAodmVjKSAtPlxuICAgICAgICBtID0gQHNjYWxhclByb2R1Y3QodmVjKSAvIHZlYy5sZW5ndGhTcXVhcmVkKClcbiAgICAgICAgQHggKj0gbVxuICAgICAgICBAeSAqPSBtXG5cblxuICAgICMgQ2xhc3MgbWV0aG9kOiBjaGVja3MgaWYgdHdvIHZlY3RvcnMgYXJlIGludGVyc2VjdGluZyAtIHJldHVybnMgaW50ZXJzZWN0aW9uIHBvaW50XG4gICAgQGludGVyc2VjdGluZzogKG9hLCBhLCBvYiwgYikgLT5cblxuICAgICAgICBjID0gb2Iuc3VidHJhY3Qgb2FcbiAgICAgICAgYiA9IGIubXVsdCAtMVxuICAgICAgICBjb2wgPSBbXVxuXG4gICAgICAgIGNvbFswXSA9IGEuY2xvbmUoKVxuICAgICAgICBjb2xbMV0gPSBiLmNsb25lKClcbiAgICAgICAgY29sWzJdID0gYy5jbG9uZSgpXG4gICAgICAgIGw9MDsgbT0xOyBuPTJcblxuICAgICAgICAjIE11bHRpcGxpY2F0b3JcblxuICAgICAgICBtdWx0ID0gY29sWzBdLnkgLyBjb2xbMF0ueFxuXG4gICAgICAgICMgQnJpbmcgTWF0cml4IGludG8gVHJpYW5ndWxhciBzaGFwZVxuXG4gICAgICAgIGNvbFswXS55ID0gMFxuICAgICAgICBjb2xbMV0ueSA9IGNvbFsxXS55IC0gKG11bHQgKiBjb2xbMV0ueClcbiAgICAgICAgY29sWzJdLnkgPSBjb2xbMl0ueSAtIChtdWx0ICogY29sWzJdLngpXG5cbiAgICAgICAgIyBSZXZlcnNlIFN1YnN0aXR1dGlvblxuXG4gICAgICAgIG11ID0gY29sW25dLnkgLyBjb2xbbV0ueVxuICAgICAgICAjIGxiID0gKGNvbFtuXS54IC0gKGNvbFttXS54ICogbXUpKSAvIGNvbFtsXS54ICMgIG11IGlzIHN1ZmZpY2llbnQgc28gdGhpcyBkb2Vzbid0IG5lZWQgdG8gYmUgZG9uZVxuXG4gICAgICAgIHJldHVybiBvYi5zdWJ0cmFjdCggYi5tdWx0KG11KSApXG5cbiAgICBwcmludDogLT5cbiAgICAgICAgcmV0dXJuIFwiKCN7QHh9LCAje0B5fSlcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IFZlY3RvclxuIl19
(7)
});
