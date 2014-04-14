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


},{"./vector.coffee":21}],3:[function(_dereq_,module,exports){
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


},{}],4:[function(_dereq_,module,exports){
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


},{"./helpers.coffee":5,"./scenemanager.coffee":15}],5:[function(_dereq_,module,exports){
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


},{}],6:[function(_dereq_,module,exports){
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


},{"./boundingbox.coffee":1,"./camera.coffee":2,"./eventmanager.coffee":3,"./game.coffee":4,"./helpers.coffee":5,"./keyboard.coffee":7,"./map/map.coffee":9,"./map/tile.coffee":13,"./scene.coffee":14,"./scenemanager.coffee":15,"./sprite/animation.coffee":16,"./sprite/background.coffee":17,"./sprite/shape.coffee":18,"./sprite/sprite.coffee":19,"./timer.coffee":20,"./vector.coffee":21}],7:[function(_dereq_,module,exports){
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


},{}],8:[function(_dereq_,module,exports){
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
    var _this = this;
    this.mapData = this.file;
    return setTimeout(function() {
      return _this.callback(_this.mapData);
    }, 100);
  };

  return DataSource;

})();

module.exports = DataSource;


},{}],9:[function(_dereq_,module,exports){
var DataSource, Map, MovementRules, PlacementStrategy, ReadStrategy,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

DataSource = _dereq_('./datasource.coffee');

ReadStrategy = _dereq_('./readstrategy.coffee');

MovementRules = _dereq_('./movementrules.coffee');

PlacementStrategy = _dereq_('./placementstrategy.coffee');

Map = (function() {
  function Map(_arg) {
    this.sprite = _arg.sprite, this.read = _arg.read, this.pattern = _arg.pattern, this.movement = _arg.movement, this.tilePlacement = _arg.tilePlacement, this.mapFile = _arg.mapFile, this.ed = _arg.ed;
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
    if (this.tilePlacement == null) {
      this.tilePlacement = "grid";
    }
    this.width = 0;
    this.height = 0;
    this.rd = null;
    new DataSource({
      read: this.read,
      file: this.mapFile,
      callback: this.parseToTiles
    }).read();
    this.tilePlacementStrategy = new PlacementStrategy(this.tilePlacement, this);
  }

  Map.prototype.parseToTiles = function(mapData) {
    var _ref;
    this.width = mapData.width, this.height = mapData.height;
    this.tiles = (new ReadStrategy(this.pattern, this)).read(mapData, this.sprite);
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
    return this.tiles[this.tilePlacementStrategy.tileIndex(vec)];
  };

  Map.prototype.render = function(ctx, camera) {
    var tile, _i, _len, _ref, _results;
    _ref = this.tiles;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      tile = _ref[_i];
      _results.push(tile.render(ctx));
    }
    return _results;
  };

  return Map;

})();

module.exports = Map;


},{"./datasource.coffee":8,"./movementrules.coffee":10,"./placementstrategy.coffee":11,"./readstrategy.coffee":12}],10:[function(_dereq_,module,exports){
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


},{}],11:[function(_dereq_,module,exports){
var PlacementStrategy, Vector,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Vector = _dereq_("../vector.coffee");

PlacementStrategy = (function() {
  function PlacementStrategy(strategy, map) {
    this.strategy = strategy;
    this.map = map;
    this.coorHex = __bind(this.coorHex, this);
    this.coorGrid = __bind(this.coorGrid, this);
    this.tileIndexGrid = __bind(this.tileIndexGrid, this);
    this.tileIndex = this.tileIndexGrid;
    if (typeof this.strategy === "function") {
      this.coor = this.strategy;
    } else {
      switch (this.strategy) {
        case "hexagon":
          this.coor = this.coorHex;
          break;
        default:
          this.coor = this.coorGrid;
      }
    }
  }

  PlacementStrategy.prototype.tileIndexGrid = function(vec) {
    var x, y;
    x = Math.floor(vec.x / this.map.sprite.innerWidth);
    y = Math.floor(vec.y / this.map.sprite.innerHeight);
    return y * this.map.width + x;
  };

  PlacementStrategy.prototype.coorGrid = function(data) {
    var x, y;
    x = data.col * this.map.sprite.innerWidth + this.map.sprite.innerWidth / 2 - (data.z || 0);
    y = data.row * this.map.sprite.innerHeight + this.map.sprite.innerHeight / 2 - (data.z || 0);
    return new Vector(x, y);
  };

  PlacementStrategy.prototype.coorHex = function(data) {
    var x, xOffset, y;
    xOffset = data.row % 2 === 0 ? this.map.sprite.innerWidth / 2 : 0;
    x = data.col * this.map.sprite.innerWidth + this.map.sprite.innerWidth / 2 - xOffset;
    y = data.row * this.map.sprite.innerHeight + this.map.sprite.innerHeight / 2;
    return new Vector(x, y);
  };

  return PlacementStrategy;

})();

module.exports = PlacementStrategy;


},{"../vector.coffee":21}],12:[function(_dereq_,module,exports){
var ReadStrategy, Tile;

Tile = _dereq_("./tile.coffee");

ReadStrategy = (function() {
  function ReadStrategy(pattern, map) {
    this.pattern = pattern;
    this.map = map;
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
    var col, row, tiles, _i, _j, _ref, _ref1;
    tiles = [];
    for (row = _i = 0, _ref = mapData.height - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; row = 0 <= _ref ? ++_i : --_i) {
      for (col = _j = 0, _ref1 = mapData.width - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; col = 0 <= _ref1 ? ++_j : --_j) {
        tiles.push(new Tile({
          sprite: sprite,
          data: {
            col: col,
            row: row,
            type: "" + mapData[row][col][0],
            walkable: parseInt(mapData[row][col][1], 16),
            z: parseInt(mapData[row][col][2], 16)
          },
          map: this.map
        }));
      }
    }
    return tiles;
  };

  ReadStrategy.prototype.readSquare = function(mapData, sprite) {
    var col, row, tiles, _i, _j, _ref, _ref1;
    tiles = [];
    for (row = _i = 0, _ref = mapData.height - 2; 0 <= _ref ? _i <= _ref : _i >= _ref; row = 0 <= _ref ? ++_i : --_i) {
      for (col = _j = 0, _ref1 = mapData.width - 2; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; col = 0 <= _ref1 ? ++_j : --_j) {
        tiles.push(new Tile({
          sprite: sprite,
          data: {
            col: col,
            row: row,
            type: "" + mapData[row][col][0] + mapData[row][col + 1][0] + mapData[row + 1][col][0] + mapData[row + 1][col + 1][0],
            walkable: parseInt(mapData[row][col][1], 16),
            z: parseInt(mapData[row][col][2], 16)
          },
          map: this.map
        }));
      }
    }
    return tiles;
  };

  ReadStrategy.prototype.readCross = function(mapData, sprite) {
    var col, row, tiles, _i, _j, _ref, _ref1;
    tiles = [];
    for (row = _i = 1, _ref = mapData.height - 2; _i <= _ref; row = _i += 2) {
      for (col = _j = 1, _ref1 = mapData.width - 2; _j <= _ref1; col = _j += 2) {
        if (mapData[row][col][0] !== "00") {
          tiles.push(new Tile({
            sprite: sprite,
            data: {
              col: col,
              row: row,
              type: "" + mapData[row - 1][col][0] + mapData[row][col + 1][0] + mapData[row + 1][col][0] + mapData[row][col - 1][0],
              walkable: parseInt(mapData[row][col][1], 16),
              z: parseInt(mapData[row][col][2], 16)
            },
            map: this.map
          }));
        }
      }
    }
    return tiles;
  };

  return ReadStrategy;

})();

module.exports = ReadStrategy;


},{"./tile.coffee":13}],13:[function(_dereq_,module,exports){
var BoundingBox, Tile, Vector,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

BoundingBox = _dereq_('../boundingbox.coffee');

Vector = _dereq_('../vector.coffee');

Tile = (function() {
  function Tile(_arg) {
    var _ref;
    this.sprite = _arg.sprite, this.data = _arg.data, this.map = _arg.map;
    this.render = __bind(this.render, this);
    this.neighbor = [];
    _ref = this.map.tilePlacementStrategy.coor(this.data), this.x = _ref.x, this.y = _ref.y;
    this.bb = new BoundingBox(new Vector(this.x, this.y), new Vector(this.sprite.innerWidth, this.sprite.innerHeight));
    if (!(this.data.walkable > 0)) {
      this.isWalkable = true;
    }
  }

  Tile.prototype.render = function(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    this.sprite.render(this.data.type, ctx);
    return ctx.restore();
  };

  return Tile;

})();

module.exports = Tile;


},{"../boundingbox.coffee":1,"../vector.coffee":21}],14:[function(_dereq_,module,exports){
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


},{}]},{},[6])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzLzAxay93d3cvaXJmL3NyYy9ib3VuZGluZ2JveC5jb2ZmZWUiLCIvVXNlcnMvMDFrL3d3dy9pcmYvc3JjL2NhbWVyYS5jb2ZmZWUiLCIvVXNlcnMvMDFrL3d3dy9pcmYvc3JjL2V2ZW50bWFuYWdlci5jb2ZmZWUiLCIvVXNlcnMvMDFrL3d3dy9pcmYvc3JjL2dhbWUuY29mZmVlIiwiL1VzZXJzLzAxay93d3cvaXJmL3NyYy9oZWxwZXJzLmNvZmZlZSIsIi9Vc2Vycy8wMWsvd3d3L2lyZi9zcmMvaXJmLmNvZmZlZSIsIi9Vc2Vycy8wMWsvd3d3L2lyZi9zcmMva2V5Ym9hcmQuY29mZmVlIiwiL1VzZXJzLzAxay93d3cvaXJmL3NyYy9tYXAvZGF0YXNvdXJjZS5jb2ZmZWUiLCIvVXNlcnMvMDFrL3d3dy9pcmYvc3JjL21hcC9tYXAuY29mZmVlIiwiL1VzZXJzLzAxay93d3cvaXJmL3NyYy9tYXAvbW92ZW1lbnRydWxlcy5jb2ZmZWUiLCIvVXNlcnMvMDFrL3d3dy9pcmYvc3JjL21hcC9wbGFjZW1lbnRzdHJhdGVneS5jb2ZmZWUiLCIvVXNlcnMvMDFrL3d3dy9pcmYvc3JjL21hcC9yZWFkc3RyYXRlZ3kuY29mZmVlIiwiL1VzZXJzLzAxay93d3cvaXJmL3NyYy9tYXAvdGlsZS5jb2ZmZWUiLCIvVXNlcnMvMDFrL3d3dy9pcmYvc3JjL3NjZW5lLmNvZmZlZSIsIi9Vc2Vycy8wMWsvd3d3L2lyZi9zcmMvc2NlbmVtYW5hZ2VyLmNvZmZlZSIsIi9Vc2Vycy8wMWsvd3d3L2lyZi9zcmMvc3ByaXRlL2FuaW1hdGlvbi5jb2ZmZWUiLCIvVXNlcnMvMDFrL3d3dy9pcmYvc3JjL3Nwcml0ZS9iYWNrZ3JvdW5kLmNvZmZlZSIsIi9Vc2Vycy8wMWsvd3d3L2lyZi9zcmMvc3ByaXRlL3NoYXBlLmNvZmZlZSIsIi9Vc2Vycy8wMWsvd3d3L2lyZi9zcmMvc3ByaXRlL3Nwcml0ZS5jb2ZmZWUiLCIvVXNlcnMvMDFrL3d3dy9pcmYvc3JjL3RpbWVyLmNvZmZlZSIsIi9Vc2Vycy8wMWsvd3d3L2lyZi9zcmMvdmVjdG9yLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0NBLElBQUEsZUFBQTs7QUFBQSxDQUFBLEVBQVMsR0FBVCxDQUFTLFVBQUE7O0FBRUgsQ0FGTjtDQUdpQixDQUFBLENBQUEsQ0FBQSxDQUFBLGdCQUFFO0NBQ1gsRUFEVyxDQUFEO0NBQ1YsRUFEa0IsQ0FBRDtDQUNqQixFQUR3QixDQUFELEVBQ3ZCOztBQUFTLENBQVIsRUFBUSxDQUFSLEVBQUQ7TUFBQTs7QUFDUSxDQUFQLEVBQU8sQ0FBUCxFQUFEO01BRlM7Q0FBYixFQUFhOztDQUFiLEVBSVcsSUFBQSxFQUFYO0NBQ0ksR0FBQSxXQUFBO0NBQXFCLElBQUEsUUFBTztNQUE1QjtDQUNDLEdBQUEsR0FBRCxHQUFBLENBQUE7Q0FOSixFQUlXOztDQUpYLEVBUVksSUFBQSxFQUFDLENBQWI7Q0FDSSxFQUFhLENBQWIsR0FBb0I7Q0FDaEIsRUFBUyxDQUFOLEVBQUgsQ0FBcUI7Q0FDakIsSUFBQSxVQUFPO01BRFgsRUFBQTtDQUdJLEdBQUEsV0FBTztRQUpmO01BQUE7Q0FNSSxFQUFTLENBQU4sRUFBSCxDQUFxQjtDQUNqQixJQUFBLFVBQU87TUFEWCxFQUFBO0NBR0ksR0FBQSxXQUFPO1FBVGY7TUFEUTtDQVJaLEVBUVk7O0NBUlosRUFvQlksSUFBQSxFQUFDLENBQWI7Q0FDSSxFQUFhLENBQWIsR0FBb0I7Q0FDaEIsRUFBUyxDQUFOLEVBQUgsQ0FBcUI7Q0FDakIsSUFBQSxVQUFPO01BRFgsRUFBQTtDQUdJLEdBQUEsV0FBTztRQUpmO01BQUE7Q0FNSSxFQUFTLENBQU4sRUFBSCxDQUFxQjtDQUNqQixJQUFBLFVBQU87TUFEWCxFQUFBO0NBR0ksR0FBQSxXQUFPO1FBVGY7TUFEUTtDQXBCWixFQW9C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Q0FoRWYsRUErRFc7O0NBL0RYLEVBbUVlLE1BQUMsSUFBaEI7Q0FDSSxHQUFBLE9BQU87Q0FwRVgsRUFtRWU7O0NBbkVmLEVBdUVXLE1BQVg7Q0FDUSxFQUFELENBQUgsT0FBQSxFQUFVO0NBeEVkLEVBdUVXOztDQXZFWCxFQTBFWSxNQUFDLENBQWI7Q0FDSSxPQUFBO0NBQUEsRUFBSSxDQUFKLFNBQUk7Q0FBSixHQUNBO0NBQ0MsR0FBQSxPQUFEO0NBN0VKLEVBMEVZOztDQTFFWixDQWlGQSxDQUFlLEdBQWQsR0FBZSxHQUFoQjtDQUVJLE9BQUEsaUJBQUE7Q0FBQSxDQUFNLENBQUYsQ0FBSixJQUFJO0FBQ1EsQ0FEWixFQUNJLENBQUo7Q0FEQSxDQUFBLENBRUEsQ0FBQTtDQUZBLEVBSUksQ0FBSixDQUFTO0NBSlQsRUFLSSxDQUFKLENBQVM7Q0FMVCxFQU1JLENBQUosQ0FBUztDQU5ULEVBT0UsQ0FBRjtDQVBBLEVBT08sQ0FBRjtDQVBMLEVBT1ksQ0FBRjtDQVBWLEVBV08sQ0FBUDtDQVhBLEVBZUksQ0FBSjtDQWZBLEVBZ0JJLENBQUo7Q0FoQkEsRUFpQkksQ0FBSjtDQWpCQSxDQXFCQSxDQUFLLENBQUw7Q0FHQSxDQUFTLEVBQVcsSUFBYixHQUFBO0NBM0dYLEVBaUZlOztDQWpGZixFQTZHTyxFQUFQLElBQU87Q0FDSCxFQUFRLENBQUcsT0FBSDtDQTlHWixFQTZHTzs7Q0E3R1A7O0NBREo7O0FBaUhBLENBakhBLEVBaUhpQixHQUFYLENBQU4iLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuVmVjdG9yID0gcmVxdWlyZSAnLi92ZWN0b3IuY29mZmVlJ1xuXG5jbGFzcyBCb3VuZGluZ0JveFxuICAgIGNvbnN0cnVjdG9yOiAoQGNvb3IsIEBkaW0sIEBjb2xvcj1cImdyZXlcIikgLT5cbiAgICAgICAgQGNvb3IgPz0gbmV3IFZlY3RvclxuICAgICAgICBAZGltID89IG5ldyBWZWN0b3JcblxuICAgIGludGVyc2VjdDogKG90aGVyQkIpIC0+XG4gICAgICAgIGlmIG5vdCBvdGhlckJCPyB0aGVuIHJldHVybiBmYWxzZVxuICAgICAgICBAaW50ZXJzZWN0dihvdGhlckJCKSBhbmQgQGludGVyc2VjdGgob3RoZXJCQilcblxuICAgIGludGVyc2VjdHY6IChvdGhlckJCKSAtPlxuICAgICAgICBpZiBAY29vci55IDwgb3RoZXJCQi5jb29yLnlcbiAgICAgICAgICAgIGlmICgoQGRpbS55ICsgb3RoZXJCQi5kaW0ueSkgLyAyKSA8IChvdGhlckJCLmNvb3IueSAtIEBjb29yLnkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgaWYgKChAZGltLnkgKyBvdGhlckJCLmRpbS55KSAvIDIpIDwgKEBjb29yLnkgLSBvdGhlckJCLmNvb3IueSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgaW50ZXJzZWN0aDogKG90aGVyQkIpIC0+XG4gICAgICAgIGlmIEBjb29yLnggPCBvdGhlckJCLmNvb3IueFxuICAgICAgICAgICAgaWYgKChAZGltLnggKyBvdGhlckJCLmRpbS54KSAvIDIpIDwgKG90aGVyQkIuY29vci54IC0gQGNvb3IueClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBpZiAoKEBkaW0ueCArIG90aGVyQkIuZGltLngpIC8gMikgPCAoQGNvb3IueCAtIG90aGVyQkIuY29vci54KVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG5cblxuICAgIHJlbmRlcjogKGN0eCkgLT5cbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gQGNvbG9yXG4gICAgICAgIGN0eC5zdHJva2VSZWN0IEBjb29yLnggLSBAZGltLngvMiwgQGNvb3IueSAtIEBkaW0ueS8yLCBAZGltLngsIEBkaW0ueVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJvdW5kaW5nQm94XG4iLCJcblZlY3RvciA9IHJlcXVpcmUgJy4vdmVjdG9yLmNvZmZlZSdcblxuY2xhc3MgQ2FtZXJhXG4gICAgY29uc3RydWN0b3I6IChoYXNoKSAtPlxuICAgICAgICBAcHJvamVjdGlvbiA9IGhhc2hbXCJwcm9qZWN0aW9uXCJdXG4gICAgICAgIEB2cFdpZHRoID0gaGFzaFtcInZwV2lkdGhcIl0gICAjIFZpZXdwb3J0XG4gICAgICAgIEB2cEhlaWdodCA9IGhhc2hbXCJ2cEhlaWdodFwiXVxuICAgICAgICBAem9vbUZhY3RvciA9IGhhc2hbXCJ6b29tRmFjdG9yXCJdID8gMVxuICAgICAgICBAY29vciA9IG5ldyBWZWN0b3IoIDEwMCwgMTAwIClcblxuICAgIHVwZGF0ZTogKGRlbHRhKSAtPlxuXG4gICAgYXBwbHk6IChjdHgsIGNhbGxiYWNrKSAtPlxuXG4gICAgICAgIHN3aXRjaCBAcHJvamVjdGlvblxuICAgICAgICAgICAgd2hlbiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgY3R4LnNhdmUoKVxuICAgICAgICAgICAgICAgIGN0eC50cmFuc2xhdGUgQHZwV2lkdGgvMiAtIEBjb29yLngsIEB2cEhlaWdodC8yIC0gQGNvb3IueVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKClcbiAgICAgICAgICAgICAgICBjdHgucmVzdG9yZSgpXG4gICAgICAgICAgICB3aGVuIFwiaXNvXCJcbiAgICAgICAgICAgICAgICBjdHguc2F2ZSgpXG4gICAgICAgICAgICAgICAgY3R4LnNjYWxlIDEsIDAuNVxuICAgICAgICAgICAgICAgIGN0eC5yb3RhdGUgTWF0aC5QSS80XG4gICAgICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSBAdnBXaWR0aC8yIC0gQGNvb3IueCwgQHZwSGVpZ2h0LzIgLSBAY29vci55XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgICAgICAgIGN0eC5yZXN0b3JlKClcblxubW9kdWxlLmV4cG9ydHMgPSBDYW1lcmFcbiIsIlxuY2xhc3MgRXZlbnRNYW5hZ2VyXG5cbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQGV2ZW50bGlzdCA9IHt9XG4gICAgICAgIEBvbiA9IEByZWdpc3RlciAjIGFsaWFzXG5cbiAgICByZWdpc3RlcjogKGV2ZW50LCBjYWxsYmFjaykgLT5cbiAgICAgICAgdW5sZXNzIEBldmVudGxpc3RbZXZlbnRdP1xuICAgICAgICAgICAgQGV2ZW50bGlzdFtldmVudF0gPSBbXVxuICAgICAgICBAZXZlbnRsaXN0W2V2ZW50XS5wdXNoIGNhbGxiYWNrXG5cbiAgICB0cmlnZ2VyOiAoZXZlbnQsIG9yaWdpbikgLT5cbiAgICAgICAgZm9yIGNhbGxiYWNrIGluIEBldmVudGxpc3RbZXZlbnRdXG4gICAgICAgICAgICBjYWxsYmFjayhvcmlnaW4pXG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRNYW5hZ2VyXG4iLCJcblNjZW5lTWFuYWdlciA9IHJlcXVpcmUgJy4vc2NlbmVtYW5hZ2VyLmNvZmZlZSdcbkhlbHBlcnMgPSByZXF1aXJlICcuL2hlbHBlcnMuY29mZmVlJ1xuXG5jbGFzcyBHYW1lXG5cbiAgICBAYWRkU2NlbmU6IChzY2VuZSkgLT5cbiAgICAgICAgQHNjZW5lTWFuYWdlciA/PSBuZXcgU2NlbmVNYW5hZ2VyKClcbiAgICAgICAgQHNjZW5lTWFuYWdlci5hZGRTY2VuZSBzY2VuZVxuXG4gICAgY29uc3RydWN0b3I6IChwYXJhbXMpIC0+XG5cbiAgICAgICAgQHBhcmFtcyA9IEhlbHBlcnMuZXh0ZW5kIHtcbiAgICAgICAgICAgIFwid2lkdGhcIiA6IDgwMCxcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IDYwMFxuICAgICAgICB9LCBwYXJhbXNcblxuICAgICAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdjYW52YXMnXG4gICAgICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUgXCJ3aWR0aFwiLCBAcGFyYW1zLndpZHRoXG4gICAgICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUgXCJoZWlnaHRcIiwgQHBhcmFtcy5oZWlnaHRcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYXBwZW5kQ2hpbGQoY2FudmFzKVxuXG4gICAgICAgIEBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICAgICAgICBAY3R4LmZvbnQgPSAnNDAwIDE4cHggSGVsdmV0aWNhLCBzYW5zLXNlcmlmJ1xuXG4gICAgICAgICMgdGhlIGluc3RhbmNlJ3Mgc2NlbmVtYW5hZ2VyIHBvaW50cyB0byB0aGUgQ2xhc3NlcyBTY2VuZW1hbmFnZXJcbiAgICAgICAgIyAob3IsIGlmIGl0IGRvZXNuJ3QgZXhpc3QsIGEgbmV3bHkgaW5zdGFudGlhdGVkIG9uZSlcbiAgICAgICAgQHNjZW5lTWFuYWdlciA9IEBjb25zdHJ1Y3Rvci5zY2VuZU1hbmFnZXIgfHwgbmV3IFNjZW5lTWFuYWdlcigpXG5cbiAgICBnYW1lbG9vcDogKHRpbWVzdGFtcCkgPT5cbiAgICAgICAgQGRlbHRhID0gdGltZXN0YW1wIC0gQGxhc3R0aW1lXG4gICAgICAgIEBsYXN0dGltZSA9IHRpbWVzdGFtcFxuXG4gICAgICAgIEB1cGRhdGUgQGRlbHRhXG4gICAgICAgIEByZW5kZXIoKVxuXG4gICAgICAgIEBsb29wSUQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgQGdhbWVsb29wIGlmIEBsb29wSURcblxuICAgIHN0YXJ0OiAtPlxuICAgICAgICBAbGFzdHRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKSAjIG1vcmUgYWNjdXJhdGUgdGhhbiBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICAgIEBsb29wSUQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgQGdhbWVsb29wXG5cbiAgICBzdG9wOiAtPlxuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSBAbG9vcElEXG4gICAgICAgIEBsb29wSUQgPSB1bmRlZmluZWRcblxuICAgIHVwZGF0ZTogKHRpbWVzdGFtcCkgLT5cbiAgICAgICAgIyBvdmVycmlkZSBpbiB0aGUgZ2FtZVxuXG4gICAgcmVuZGVyOiAtPlxuICAgICAgICBAY3R4LmNsZWFyUmVjdCAwLCAwLCBAcGFyYW1zLndpZHRoLCBAcGFyYW1zLmhlaWdodFxuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVcbiIsIlxuXG4jIGh0dHA6Ly9jb2ZmZWVzY3JpcHRjb29rYm9vay5jb20vY2hhcHRlcnMvYXJyYXlzL3NodWZmbGluZy1hcnJheS1lbGVtZW50c1xuQXJyYXk6OnNodWZmbGUgPSAtPiBAc29ydCAtPiAwLjUgLSBNYXRoLnJhbmRvbSgpXG5cbk51bWJlcjo6dG9IZXggPSAocGFkZGluZz0yKSAtPlxuICAgIGhleCA9IEB0b1N0cmluZyAxNlxuICAgIHdoaWxlIChoZXgubGVuZ3RoIDwgcGFkZGluZylcbiAgICAgICAgaGV4ID0gXCIwXCIgKyBoZXhcbiAgICByZXR1cm4gaGV4XG5cbmNsYXNzIEhlbHBlcnNcblxuICAgIEBleHRlbmQ6IChvYmplY3QsIHByb3BlcnRpZXMpIC0+XG4gICAgICAgIGZvciBrZXksIHZhbCBvZiBwcm9wZXJ0aWVzXG4gICAgICAgICAgICBvYmplY3Rba2V5XSA9IHZhbFxuICAgICAgICBvYmplY3RcblxubW9kdWxlLmV4cG9ydHMgPSBIZWxwZXJzXG4iLCJcbm1vZHVsZS5leHBvcnRzID1cbiAgICBBbmltYXRpb246IHJlcXVpcmUgJy4vc3ByaXRlL2FuaW1hdGlvbi5jb2ZmZWUnXG4gICAgQmFja2dyb3VuZDogcmVxdWlyZSAnLi9zcHJpdGUvYmFja2dyb3VuZC5jb2ZmZWUnXG4gICAgQm91bmRpbmdCb3g6IHJlcXVpcmUgJy4vYm91bmRpbmdib3guY29mZmVlJ1xuICAgIENhbWVyYTogcmVxdWlyZSAnLi9jYW1lcmEuY29mZmVlJ1xuICAgIEV2ZW50TWFuYWdlcjogcmVxdWlyZSAnLi9ldmVudG1hbmFnZXIuY29mZmVlJ1xuICAgIEdhbWU6IHJlcXVpcmUgJy4vZ2FtZS5jb2ZmZWUnXG4gICAgSGVscGVyczogcmVxdWlyZSAnLi9oZWxwZXJzLmNvZmZlZSdcbiAgICBLZXlib2FyZDogcmVxdWlyZSAnLi9rZXlib2FyZC5jb2ZmZWUnXG4gICAgTWFwOiByZXF1aXJlICcuL21hcC9tYXAuY29mZmVlJ1xuICAgIFNjZW5lOiByZXF1aXJlICcuL3NjZW5lLmNvZmZlZSdcbiAgICBTY2VuZU1hbmFnZXI6IHJlcXVpcmUgJy4vc2NlbmVtYW5hZ2VyLmNvZmZlZSdcbiAgICBTaGFwZTogcmVxdWlyZSAnLi9zcHJpdGUvc2hhcGUuY29mZmVlJ1xuICAgIFNwcml0ZTogcmVxdWlyZSAnLi9zcHJpdGUvc3ByaXRlLmNvZmZlZSdcbiAgICBUaWxlOiByZXF1aXJlICcuL21hcC90aWxlLmNvZmZlZSdcbiAgICBUaW1lcjogcmVxdWlyZSAnLi90aW1lci5jb2ZmZWUnXG4gICAgVmVjdG9yOiByZXF1aXJlICcuL3ZlY3Rvci5jb2ZmZWUnXG5cblxuIiwiXG5jbGFzcyBLZXlib2FyZFxuXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBtYXBwaW5nID1cbiAgICAgICAgICAgIDg6XCJiYWNrc3BhY2VcIlxuICAgICAgICAgICAgOTpcInRhYlwiXG4gICAgICAgICAgICAxMzpcInJldHVyblwiXG4gICAgICAgICAgICAxNjpcInNoaWZ0XCJcbiAgICAgICAgICAgIDE3OlwiY3RybFwiXG4gICAgICAgICAgICAxODpcImFsdFwiXG4gICAgICAgICAgICAyNzpcImVzY1wiXG4gICAgICAgICAgICAzMjpcInNwYWNlXCJcbiAgICAgICAgICAgIDM3OlwibGVmdFwiXG4gICAgICAgICAgICAzODpcInVwXCJcbiAgICAgICAgICAgIDM5OlwicmlnaHRcIlxuICAgICAgICAgICAgNDA6XCJkb3duXCJcbiAgICAgICAgICAgIDQ4OlwiMFwiXG4gICAgICAgICAgICA0OTpcIjFcIlxuICAgICAgICAgICAgNDk6XCIxXCJcbiAgICAgICAgICAgIDQ5OlwiMVwiXG4gICAgICAgICAgICA0OTpcIjFcIlxuICAgICAgICAgICAgNDk6XCIxXCJcbiAgICAgICAgICAgIDQ5OlwiNlwiXG4gICAgICAgICAgICA0OTpcIjdcIlxuICAgICAgICAgICAgNDk6XCI4XCJcbiAgICAgICAgICAgIDU3OlwiOVwiXG4gICAgICAgICAgICA2NTpcImFcIlxuICAgICAgICAgICAgNjY6XCJiXCJcbiAgICAgICAgICAgIDY3OlwiY1wiXG4gICAgICAgICAgICA2ODpcImRcIlxuICAgICAgICAgICAgNjk6XCJlXCJcbiAgICAgICAgICAgIDcwOlwiZlwiXG4gICAgICAgICAgICA3MTpcImdcIlxuICAgICAgICAgICAgNzI6XCJoXCJcbiAgICAgICAgICAgIDczOlwiaVwiXG4gICAgICAgICAgICA3NDpcImpcIlxuICAgICAgICAgICAgNzU6XCJrXCJcbiAgICAgICAgICAgIDc2OlwibFwiXG4gICAgICAgICAgICA3NzpcIm1cIlxuICAgICAgICAgICAgNzg6XCJuXCJcbiAgICAgICAgICAgIDc5Olwib1wiXG4gICAgICAgICAgICA4MDpcInBcIlxuICAgICAgICAgICAgODE6XCJxXCJcbiAgICAgICAgICAgIDgyOlwiclwiXG4gICAgICAgICAgICA4MzpcInNcIlxuICAgICAgICAgICAgODQ6XCJ0XCJcbiAgICAgICAgICAgIDg1OlwidVwiXG4gICAgICAgICAgICA4NzpcIndcIlxuICAgICAgICAgICAgODg6XCJ4XCJcbiAgICAgICAgICAgIDg5OlwieVwiXG4gICAgICAgICAgICA5MDpcInpcIlxuICAgICAgICAgICAgOTM6XCJjbWRcIlxuICAgICAgICAgICAgMTg4OlwiLFwiXG4gICAgICAgICAgICAxOTA6XCIuXCJcblxuICAgICAgICBAa2V5YXJyYXkgPSBbXVxuXG4gICAgICAgIGZvciBjb2RlLCBuYW1lIG9mIEBtYXBwaW5nXG4gICAgICAgICAgICBAa2V5YXJyYXlbbmFtZV0gPSBmYWxzZVxuXG4gICAgICAgIHJvb3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciAnaHRtbCdcblxuICAgICAgICByb290RWxlbWVudC5hZGRFdmVudExpc3RlbmVyIFwia2V5ZG93blwiLCAoZXZlbnQpID0+XG4gICAgICAgICAgICBAa2V5YXJyYXlbQG1hcHBpbmdbZXZlbnQud2hpY2hdXSA9IHRydWVcblxuICAgICAgICByb290RWxlbWVudC5hZGRFdmVudExpc3RlbmVyIFwia2V5dXBcIiwgKGV2ZW50KSA9PlxuICAgICAgICAgICAgQGtleWFycmF5W0BtYXBwaW5nW2V2ZW50LndoaWNoXV0gPSBmYWxzZVxuXG5cbiAgICBrZXk6ICh3aGljaCkgLT5cbiAgICAgICAgcmV0dXJuIEBrZXlhcnJheVt3aGljaF1cblxuICAgIGNoZWNrOiAtPlxuICAgICAgICByZXR1cm4gQGtleWFycmF5XG5cbm1vZHVsZS5leHBvcnRzID0gS2V5Ym9hcmRcbiIsIlxuY2xhc3MgRGF0YVNvdXJjZVxuXG4gICAgY29uc3RydWN0b3I6ICh7cmVhZCwgQGZpbGUsIEBjYWxsYmFja30pIC0+XG4gICAgICAgIEBtYXBEYXRhID0ge31cbiAgICAgICAgaWYgdHlwZW9mKHJlYWQpID09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgICAgQHJlYWQgPSByZWFkXG4gICAgICAgIHN3aXRjaCByZWFkXG4gICAgICAgICAgICB3aGVuIFwiaW1hZ2VcIlxuICAgICAgICAgICAgICAgIEByZWFkID0gQHJlYWRJbWFnZVxuICAgICAgICAgICAgd2hlbiBcImZpbGVcIlxuICAgICAgICAgICAgICAgIEByZWFkID0gQHJlYWRGaWxlXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgQHJlYWQgPSBAcmVhZExpdGVyYWxcblxuICAgICMgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy85MzQwMTIvZ2V0LWltYWdlLWRhdGEtaW4tamF2YXNjcmlwdFxuICAgIHJlYWRJbWFnZTogLT5cbiAgICAgICAgaW1nID0gbmV3IEltYWdlKClcbiAgICAgICAgaW1nLnNyYyA9IEBmaWxlXG4gICAgICAgIGltZy5vbmxvYWQgPSA9PlxuICAgICAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKVxuICAgICAgICAgICAgQG1hcERhdGEud2lkdGggPSBjYW52YXMud2lkdGggPSBpbWcud2lkdGhcbiAgICAgICAgICAgIEBtYXBEYXRhLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQgPSBpbWcuaGVpZ2h0XG4gICAgICAgICAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKCBpbWcsIDAsIDApXG4gICAgICAgICAgICBkYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLDAsQG1hcERhdGEud2lkdGgsQG1hcERhdGEuaGVpZ2h0KS5kYXRhXG5cbiAgICAgICAgICAgIGZvciBwLGkgaW4gZGF0YSBieSA0XG4gICAgICAgICAgICAgICAgcm93ID0gTWF0aC5mbG9vcigoaS80KS9AbWFwRGF0YS53aWR0aClcbiAgICAgICAgICAgICAgICBAbWFwRGF0YVtyb3ddID89IFtdXG4gICAgICAgICAgICAgICAgQG1hcERhdGFbcm93XS5wdXNoIFtOdW1iZXIoZGF0YVtpXSkudG9IZXgoKSxOdW1iZXIoZGF0YVtpKzFdKS50b0hleCgpLE51bWJlcihkYXRhW2krMl0pLnRvSGV4KCksTnVtYmVyKGRhdGFbaSszXSkudG9IZXgoKV1cblxuICAgICAgICAgICAgQGNhbGxiYWNrIEBtYXBEYXRhXG5cbiAgICAjIHVudGVzdGVkIVxuICAgIHJlYWRGaWxlOiAtPlxuICAgICAgICByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSAtPlxuICAgICAgICAgICAgQG1hcERhdGEgPSBKU09OLnBhcnNlIHJlcXVlc3QucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICBAY2FsbGJhY2sgQG1hcGRhdGFcbiAgICAgICAgcmVxdWVzdC5vcGVuIFwiR0VUXCIsIEBmaWxlLCB0cnVlXG4gICAgICAgIHJlcXVlc3Quc2VuZCgpXG5cbiAgICByZWFkTGl0ZXJhbDogLT5cbiAgICAgICAgQG1hcERhdGEgPSBAZmlsZVxuICAgICAgICBzZXRUaW1lb3V0ID0+XG4gICAgICAgICAgICBAY2FsbGJhY2sgQG1hcERhdGFcbiAgICAgICAgLDEwMFxuXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFTb3VyY2VcblxuIiwiXG5EYXRhU291cmNlID0gcmVxdWlyZSAnLi9kYXRhc291cmNlLmNvZmZlZSdcblJlYWRTdHJhdGVneSA9IHJlcXVpcmUgJy4vcmVhZHN0cmF0ZWd5LmNvZmZlZSdcbk1vdmVtZW50UnVsZXMgPSByZXF1aXJlICcuL21vdmVtZW50cnVsZXMuY29mZmVlJ1xuUGxhY2VtZW50U3RyYXRlZ3kgPSByZXF1aXJlICcuL3BsYWNlbWVudHN0cmF0ZWd5LmNvZmZlZSdcblxuY2xhc3MgTWFwXG4gICAgY29uc3RydWN0b3I6ICh7QHNwcml0ZSwgQHJlYWQsIEBwYXR0ZXJuLCBAbW92ZW1lbnQsIEB0aWxlUGxhY2VtZW50LCBAbWFwRmlsZSwgQGVkfSkgLT5cblxuICAgICAgICAjIGRlZmF1bHRzOlxuICAgICAgICBAcmVhZCA/PSBcImltYWdlXCIgIyByZWFkIE1hcCBEYXRhIGZyb20gYW4gaW1hZ2UsIGZyb20gYSBmaWxlIG9yIGZyb20gYSBsaXRlcmFsIG9iamVjdFxuICAgICAgICBAcGF0dGVybiA/PSBcInNpbXBsZVwiICMgaG93IHNob3VsZCB0aGUgbWFwRGF0YSBiZSBpbnRlcnByZXRlZD9cbiAgICAgICAgQG1vdmVtZW50ID89IFwibm9ydGhTb3V0aEVhc3RXZXN0XCIgIyB3aGF0IGFyZSB0aGUgbmVpZ2hib3JzIG9mIGFuIGluZGl2aWR1YWwgdGlsZT9cbiAgICAgICAgQHRpbGVQbGFjZW1lbnQgPz0gXCJncmlkXCIgIyBob3cgYXJlIHRoZSB0aWxlcyB0byBiZSB0cmFuc2xhdGVkIGJlZm9yZSByZW5kZXJpbmc/XG5cbiAgICAgICAgQHdpZHRoID0gMCAjIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIG1hcCBpbiB0aWxlcyAtIGNhbiBvbmx5IGJlIGRldGVybWluZWQgYWZ0ZXIgdGhlIG1hcGZpbGUgbG9hZGluZyBoYXMgY29tcGxldGVkXG4gICAgICAgIEBoZWlnaHQgPSAwXG4gICAgICAgIEByZCA9IG51bGwgIyByZW5kZXJEaXN0YW5jZVxuXG4gICAgICAgIG5ldyBEYXRhU291cmNlKFxuICAgICAgICAgICAgcmVhZDogQHJlYWRcbiAgICAgICAgICAgIGZpbGU6IEBtYXBGaWxlXG4gICAgICAgICAgICBjYWxsYmFjazogQHBhcnNlVG9UaWxlc1xuICAgICAgICApLnJlYWQoKVxuXG4gICAgICAgIEB0aWxlUGxhY2VtZW50U3RyYXRlZ3kgPSBuZXcgUGxhY2VtZW50U3RyYXRlZ3kgQHRpbGVQbGFjZW1lbnQsIHRoaXNcblxuICAgIHBhcnNlVG9UaWxlczogKG1hcERhdGEpID0+XG4gICAgICAgIHtAd2lkdGgsIEBoZWlnaHR9ID0gbWFwRGF0YVxuICAgICAgICBAdGlsZXMgPSAobmV3IFJlYWRTdHJhdGVneSBAcGF0dGVybix0aGlzKS5yZWFkIG1hcERhdGEsIEBzcHJpdGVcbiAgICAgICAgKG5ldyBNb3ZlbWVudFJ1bGVzIEBtb3ZlbWVudCkuYXBwbHlSdWxlcyB0aGlzXG4gICAgICAgIEBlZD8udHJpZ2dlciBcIm1hcC5maW5pc2hlZExvYWRpbmdcIlxuXG4gICAgcmVuZGVyRGlzdGFuY2U6IChjYW1lcmEpIC0+XG4gICAgICAgIHJldHVybiBAcmQgaWYgQHJkPyAjIGNhY2hlIHRoZSByZW5kZXIgRGlzdGFuY2VcbiAgICAgICAgQHJkID0gKE1hdGgucG93KGNhbWVyYS52cFdpZHRoKzIwLDIpICsgTWF0aC5wb3coY2FtZXJhLnZwSGVpZ2h0KzIwLDIpKS80XG5cbiAgICB0aWxlQXRWZWN0b3I6ICh2ZWMpIC0+XG4gICAgICAgIEB0aWxlc1tAdGlsZVBsYWNlbWVudFN0cmF0ZWd5LnRpbGVJbmRleCh2ZWMpXVxuXG4gICAgcmVuZGVyOiAoY3R4LCBjYW1lcmEpIC0+XG4gICAgICAgIGZvciB0aWxlIGluIEB0aWxlc1xuICAgICAgICAgICAgI2lmIHRpbGUuc3F1YXJlZERpc3RhbmNlVG8oY2FtZXJhLmNvb3IpIDwgQHJlbmRlckRpc3RhbmNlIGNhbWVyYVxuICAgICAgICAgICAgdGlsZS5yZW5kZXIoY3R4KVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcFxuXG4iLCJcbmNsYXNzIE1vdmVtZW50UnVsZXNcblxuICAgIGNvbnN0cnVjdG9yOiAocnVsZXMpIC0+XG4gICAgICAgIGlmIHR5cGVvZihydWxlcykgPT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgICBAcnVsZXMgPSBydWxlc1xuICAgICAgICBzd2l0Y2ggcnVsZXNcbiAgICAgICAgICAgIHdoZW4gXCJoZXhhZ29uXCJcbiAgICAgICAgICAgICAgICBAcnVsZXMgPSBAaGV4YWdvblxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIEBydWxlcyA9IEBub3J0aFNvdXRoRWFzdFdlc3RcblxuICAgIGFwcGx5UnVsZXM6IChtYXApIC0+XG4gICAgICAgIEBydWxlcyBtYXBcblxuICAgIG5vcnRoU291dGhFYXN0V2VzdDogKG1hcCkgLT5cbiAgICAgICAgZm9yIHRpbGUsIGluZGV4IGluIG1hcC50aWxlc1xuICAgICAgICAgICAgdGlsZS5uZWlnaGJvcltcIndcIl0gPSBtYXAudGlsZXNbaW5kZXgtMV1cbiAgICAgICAgICAgIHRpbGUubmVpZ2hib3JbXCJlXCJdID0gbWFwLnRpbGVzW2luZGV4KzFdXG4gICAgICAgICAgICB0aWxlLm5laWdoYm9yW1wiblwiXSA9IG1hcC50aWxlc1tpbmRleC1tYXAud2lkdGhdXG4gICAgICAgICAgICB0aWxlLm5laWdoYm9yW1wic1wiXSA9IG1hcC50aWxlc1tpbmRleCttYXAud2lkdGhdXG5cbiAgICBoZXhhZ29uOiAobWFwKSAtPlxuICAgICAgICAjIGltcGxlbWVudGF0aW9uIGxlZnQgYXMgYW4gZXhlcmNpc2UgdG8gdGhlIHJlYWRlclxuXG5tb2R1bGUuZXhwb3J0cyA9IE1vdmVtZW50UnVsZXNcblxuIiwiXG5WZWN0b3IgPSByZXF1aXJlIFwiLi4vdmVjdG9yLmNvZmZlZVwiXG5cbmNsYXNzIFBsYWNlbWVudFN0cmF0ZWd5XG5cbiAgICBjb25zdHJ1Y3RvcjogKEBzdHJhdGVneSwgQG1hcCkgLT5cbiAgICAgICAgQHRpbGVJbmRleCA9IEB0aWxlSW5kZXhHcmlkXG4gICAgICAgIGlmIHR5cGVvZihAc3RyYXRlZ3kpIGlzIFwiZnVuY3Rpb25cIlxuICAgICAgICAgICAgQGNvb3IgPSBAc3RyYXRlZ3lcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgc3dpdGNoIEBzdHJhdGVneVxuICAgICAgICAgICAgICAgIHdoZW4gXCJoZXhhZ29uXCJcbiAgICAgICAgICAgICAgICAgICAgQGNvb3IgPSBAY29vckhleFxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgQGNvb3IgPSBAY29vckdyaWRcblxuICAgIHRpbGVJbmRleEdyaWQ6ICh2ZWMpID0+XG4gICAgICAgIHggPSBNYXRoLmZsb29yKCB2ZWMueCAvIEBtYXAuc3ByaXRlLmlubmVyV2lkdGggKVxuICAgICAgICB5ID0gTWF0aC5mbG9vciggdmVjLnkgLyBAbWFwLnNwcml0ZS5pbm5lckhlaWdodCApXG4gICAgICAgIHJldHVybiB5ICogQG1hcC53aWR0aCArIHhcblxuICAgIGNvb3JHcmlkOiAoZGF0YSkgPT5cbiAgICAgICAgeCA9IGRhdGEuY29sICogQG1hcC5zcHJpdGUuaW5uZXJXaWR0aCArIEBtYXAuc3ByaXRlLmlubmVyV2lkdGgvMiAtIChkYXRhLnp8fDApXG4gICAgICAgIHkgPSBkYXRhLnJvdyAqIEBtYXAuc3ByaXRlLmlubmVySGVpZ2h0ICsgQG1hcC5zcHJpdGUuaW5uZXJIZWlnaHQvMiAtIChkYXRhLnp8fDApXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yIHgsIHlcblxuICAgIGNvb3JIZXg6IChkYXRhKSA9PlxuICAgICAgICB4T2Zmc2V0ID0gaWYgZGF0YS5yb3clMiA9PSAwIHRoZW4gQG1hcC5zcHJpdGUuaW5uZXJXaWR0aC8yIGVsc2UgMFxuICAgICAgICB4ID0gZGF0YS5jb2wgKiBAbWFwLnNwcml0ZS5pbm5lcldpZHRoICsgQG1hcC5zcHJpdGUuaW5uZXJXaWR0aC8yIC0geE9mZnNldFxuICAgICAgICB5ID0gZGF0YS5yb3cgKiBAbWFwLnNwcml0ZS5pbm5lckhlaWdodCArIEBtYXAuc3ByaXRlLmlubmVySGVpZ2h0LzJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IgeCwgeVxuXG5cbm1vZHVsZS5leHBvcnRzID0gUGxhY2VtZW50U3RyYXRlZ3lcbiIsIlxuVGlsZSA9IHJlcXVpcmUgXCIuL3RpbGUuY29mZmVlXCJcblxuY2xhc3MgUmVhZFN0cmF0ZWd5XG5cbiAgICBjb25zdHJ1Y3RvcjogKEBwYXR0ZXJuLCBAbWFwKSAtPlxuICAgICAgICBpZiB0eXBlb2YoQHBhdHRlcm4pIGlzIFwiZnVuY3Rpb25cIlxuICAgICAgICAgICAgQHJlYWQgPSBAcGF0dGVyblxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBzd2l0Y2ggQHBhdHRlcm5cbiAgICAgICAgICAgICAgICB3aGVuIFwic3F1YXJlXCJcbiAgICAgICAgICAgICAgICAgICAgQHJlYWQgPSBAcmVhZFNxdWFyZVxuICAgICAgICAgICAgICAgIHdoZW4gXCJjcm9zc1wiXG4gICAgICAgICAgICAgICAgICAgIEByZWFkID0gQHJlYWRDcm9zc1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgQHJlYWQgPSBAcmVhZFNpbXBsZVxuXG4gICAgcmVhZFNpbXBsZTogKG1hcERhdGEsIHNwcml0ZSkgLT5cbiAgICAgICAgdGlsZXMgPSBbXVxuICAgICAgICBmb3Igcm93IGluIFswLi5tYXBEYXRhLmhlaWdodC0xXVxuICAgICAgICAgICAgZm9yIGNvbCBpbiBbMC4ubWFwRGF0YS53aWR0aC0xXVxuICAgICAgICAgICAgICAgIHRpbGVzLnB1c2ggbmV3IFRpbGVcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRlOiBzcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgZGF0YTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbDogY29sXG4gICAgICAgICAgICAgICAgICAgICAgICByb3c6IHJvd1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCIje21hcERhdGFbcm93XVtjb2xdWzBdfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB3YWxrYWJsZTogcGFyc2VJbnQoIG1hcERhdGFbcm93XVtjb2xdWzFdLCAxNiApXG4gICAgICAgICAgICAgICAgICAgICAgICB6OiBwYXJzZUludCggbWFwRGF0YVtyb3ddW2NvbF1bMl0sIDE2IClcbiAgICAgICAgICAgICAgICAgICAgbWFwOiBAbWFwXG4gICAgICAgIHJldHVybiB0aWxlc1xuXG4gICAgcmVhZFNxdWFyZTogKG1hcERhdGEsIHNwcml0ZSkgLT5cbiAgICAgICAgdGlsZXMgPSBbXVxuICAgICAgICBmb3Igcm93IGluIFswLi5tYXBEYXRhLmhlaWdodC0yXVxuICAgICAgICAgICAgZm9yIGNvbCBpbiBbMC4ubWFwRGF0YS53aWR0aC0yXVxuICAgICAgICAgICAgICAgIHRpbGVzLnB1c2ggbmV3IFRpbGVcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRlOiBzcHJpdGVcbiAgICAgICAgICAgICAgICAgICAgZGF0YTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbDogY29sXG4gICAgICAgICAgICAgICAgICAgICAgICByb3c6IHJvd1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCIje21hcERhdGFbcm93XVtjb2xdWzBdfSN7bWFwRGF0YVtyb3ddW2NvbCsxXVswXX0je21hcERhdGFbcm93KzFdW2NvbF1bMF19I3ttYXBEYXRhW3JvdysxXVtjb2wrMV1bMF19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhbGthYmxlOiBwYXJzZUludCggbWFwRGF0YVtyb3ddW2NvbF1bMV0sIDE2IClcbiAgICAgICAgICAgICAgICAgICAgICAgIHo6IHBhcnNlSW50KCBtYXBEYXRhW3Jvd11bY29sXVsyXSwgMTYgKVxuICAgICAgICAgICAgICAgICAgICBtYXA6IEBtYXBcbiAgICAgICAgcmV0dXJuIHRpbGVzXG5cbiAgICByZWFkQ3Jvc3M6IChtYXBEYXRhLCBzcHJpdGUpIC0+XG4gICAgICAgIHRpbGVzID0gW11cbiAgICAgICAgZm9yIHJvdyBpbiBbMS4ubWFwRGF0YS5oZWlnaHQtMl0gYnkgMlxuICAgICAgICAgICAgZm9yIGNvbCBpbiBbMS4ubWFwRGF0YS53aWR0aC0yXSBieSAyXG4gICAgICAgICAgICAgICAgdW5sZXNzIG1hcERhdGFbcm93XVtjb2xdWzBdIGlzIFwiMDBcIlxuICAgICAgICAgICAgICAgICAgICB0aWxlcy5wdXNoIG5ldyBUaWxlXG4gICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGU6IHNwcml0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2w6IGNvbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogcm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCIje21hcERhdGFbcm93LTFdW2NvbF1bMF19I3ttYXBEYXRhW3Jvd11bY29sKzFdWzBdfSN7bWFwRGF0YVtyb3crMV1bY29sXVswXX0je21hcERhdGFbcm93XVtjb2wtMV1bMF19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxrYWJsZTogcGFyc2VJbnQoIG1hcERhdGFbcm93XVtjb2xdWzFdLCAxNiApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgejogcGFyc2VJbnQoIG1hcERhdGFbcm93XVtjb2xdWzJdLCAxNiApXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXA6IEBtYXBcbiAgICAgICAgcmV0dXJuIHRpbGVzXG5cbm1vZHVsZS5leHBvcnRzID0gUmVhZFN0cmF0ZWd5XG5cbiIsIlxuQm91bmRpbmdCb3ggPSByZXF1aXJlICcuLi9ib3VuZGluZ2JveC5jb2ZmZWUnXG5WZWN0b3IgPSByZXF1aXJlICcuLi92ZWN0b3IuY29mZmVlJ1xuXG5jbGFzcyBUaWxlXG4gICAgY29uc3RydWN0b3I6ICh7QHNwcml0ZSwgQGRhdGEsIEBtYXB9KSAtPlxuICAgICAgICBAbmVpZ2hib3IgPSBbXVxuICAgICAgICB7QHgsQHl9ID0gQG1hcC50aWxlUGxhY2VtZW50U3RyYXRlZ3kuY29vcihAZGF0YSlcbiAgICAgICAgQGJiID0gbmV3IEJvdW5kaW5nQm94IG5ldyBWZWN0b3IoIEB4LCBAeSApLCBuZXcgVmVjdG9yKCBAc3ByaXRlLmlubmVyV2lkdGgsIEBzcHJpdGUuaW5uZXJIZWlnaHQgKVxuICAgICAgICBAaXNXYWxrYWJsZSA9IHRydWUgdW5sZXNzIEBkYXRhLndhbGthYmxlID4gMFxuXG4gICAgcmVuZGVyOiAoY3R4KSA9PlxuICAgICAgICBjdHguc2F2ZSgpXG4gICAgICAgIGN0eC50cmFuc2xhdGUgQHgsIEB5XG4gICAgICAgIEBzcHJpdGUucmVuZGVyKCBAZGF0YS50eXBlLCBjdHggKVxuICAgICAgICBjdHgucmVzdG9yZSgpXG5cbm1vZHVsZS5leHBvcnRzID0gVGlsZVxuXG4iLCJjbGFzcyBTY2VuZVxuXG4gIGNvbnN0cnVjdG9yOiAtPlxuXG4gIHVwZGF0ZTogLT5cblxuICByZW5kZXI6IC0+XG5cbm1vZHVsZS5leHBvcnRzID0gU2NlbmVcbiIsIiMgIyBUaGUgU2NlbmVNYW5hZ2VyXG4jIGlzIHRoZSBjbGFzcyB0byBob2xkIGFuZCBtYW5hZ2UgKHN3aXRjaCBiZXR3ZWVuKSB0aGUgJ3NjZW5lcycgdGhhdCB5b3VyXG4jIEdhbWUgY29uc2lzdHMgb2YuIEl0IG1haW50YWluc1xuY2xhc3MgU2NlbmVNYW5hZ2VyXG4gICAgIyAqIGEgaGFzaCB3aXRoIGFsbCBTY2VuZXMgaW4gdGhlIGdhbWVcbiAgICAjICogYSByZWZlcmVuY2UgdG8gdGhlIHRoZSBzY2VuZSB0aGF0IGlzIGN1cnJlbnRseSBhY3RpdmVcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQHNjZW5lcyA9IHt9XG4gICAgICAgIEBjdXJyZW50U2NlbmUgPSBudWxsXG5cbiAgICBhZGRTY2VuZTogKHNjZW5lQ2xhc3MpIC0+XG4gICAgICAgIEBzY2VuZXNbc2NlbmVDbGFzcy5uYW1lXSA9XG4gICAgICAgICAgICBcImNsYXNzXCIgICAgOiBzY2VuZUNsYXNzXG4gICAgICAgICAgICBcImluc3RhbmNlXCIgOiBudWxsXG5cbiAgICBzZXRTY2VuZTogKHNjZW5lLCBwYXJlbnQpIC0+XG4gICAgICAgICMgY3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBzY2VuZSwgdW5sZXNzIGl0IGhhcyBiZWVuIGNyZWF0ZWQgYmVmb3JlXG4gICAgICAgIEBjdXJyZW50U2NlbmUgPSBAc2NlbmVzW3NjZW5lXS5pbnN0YW5jZSA/PSBuZXcgQHNjZW5lc1tzY2VuZV0uY2xhc3MocGFyZW50KVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjZW5lTWFuYWdlclxuIiwiXG5TaGFwZSA9IHJlcXVpcmUgJy4vc2hhcGUuY29mZmVlJ1xuVGltZXIgPSByZXF1aXJlICcuLi90aW1lci5jb2ZmZWUnXG5cbmNsYXNzIEFuaW1hdGlvblxuXG4gICAgY29uc3RydWN0b3I6IChAc3ByaXRlLCBwYXJhbXMpIC0+XG4gICAgICAgIEBmcHMgPSBwYXJhbXNbXCJmcHNcIl0gPyAzMFxuICAgICAgICBAbG9vcCA9IHBhcmFtc1tcImxvb3BcIl0gPyB0cnVlXG4gICAgICAgIEBjYWxsYmFjayA9IHBhcmFtc1tcImNhbGxiYWNrXCJdID8gbnVsbFxuICAgICAgICBAZnJhbWVzID0gZm9yIGluZGV4IGluIHBhcmFtc1tcImZyYW1lc1wiXVxuICAgICAgICAgICAgbmV3IFNoYXBlIEBzcHJpdGUsIGluZGV4XG4gICAgICAgIEBsYXN0RnJhbWUgPSBAZnJhbWVzLmxlbmd0aCAtIDFcbiAgICAgICAgQHRpbWVyID0gbmV3IFRpbWVyXG4gICAgICAgIEBjdXJyZW50RnJhbWUgPSAwXG4gICAgICAgIEBwbGF5aW5nID0gdHJ1ZVxuXG4gICAgcmVuZGVyOiAoY3R4KSAtPlxuICAgICAgICBpZiBAcGxheWluZ1xuICAgICAgICAgICAgQGN1cnJlbnRGcmFtZSA9IE1hdGguZmxvb3IoIEB0aW1lci50aW1lU2luY2VMYXN0UHVuY2goKSAvICgxMDAwIC8gQGZwcykgKVxuICAgICAgICAgICAgaWYgQGN1cnJlbnRGcmFtZSA+IEBsYXN0RnJhbWVcbiAgICAgICAgICAgICAgICBAY2FsbGJhY2s/KClcbiAgICAgICAgICAgICAgICBpZiBAbG9vcFxuICAgICAgICAgICAgICAgICAgICBAcmV3aW5kKClcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIEBjdXJyZW50RnJhbWUgPSBAbGFzdEZyYW1lXG4gICAgICAgICAgICAgICAgICAgIEBzdG9wKClcblxuICAgICAgICBAZnJhbWVzW0BjdXJyZW50RnJhbWVdLnJlbmRlcihjdHgpXG5cbiAgICBwbGF5OiAtPlxuICAgICAgICBAcGxheWluZyA9IHRydWVcblxuICAgIHN0b3A6IC0+XG4gICAgICAgIEBwbGF5aW5nID0gZmFsc2VcblxuICAgIHJld2luZDogLT5cbiAgICAgICAgQGN1cnJlbnRGcmFtZSA9IDBcbiAgICAgICAgQHRpbWVyLnB1bmNoKClcblxubW9kdWxlLmV4cG9ydHMgPSBBbmltYXRpb25cbiIsImNsYXNzIEJhY2tncm91bmRcbiAgICBjb25zdHJ1Y3RvcjogKEBzcHJpdGUpIC0+XG4gICAgICAgIEBzcHJpdGUuYWRkSW1hZ2UgXCJiYWNrZ3JvdW5kXCIsIDBcblxuICAgIHJlbmRlcjogKGN0eCkgLT5cbiAgICAgICAgQHNwcml0ZS5yZW5kZXIoIFwiYmFja2dyb3VuZFwiLCBjdHggKVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhY2tncm91bmRcbiIsIlxuY2xhc3MgU2hhcGVcblxuICAgIGNvbnN0cnVjdG9yOiAoQHNwcml0ZSwgaW5kZXgpIC0+XG4gICAgICAgIEBzeCA9ICggaW5kZXggKiBAc3ByaXRlLndpZHRoICkgJSBAc3ByaXRlLnRleFdpZHRoXG4gICAgICAgIEBzeSA9IE1hdGguZmxvb3IoKCBpbmRleCAqIEBzcHJpdGUud2lkdGggKSAvIEBzcHJpdGUudGV4V2lkdGgpICogQHNwcml0ZS5oZWlnaHRcblxuICAgIHJlbmRlcjogKGN0eCkgLT5cbiAgICAgICAgY3R4LnNhdmUoKVxuICAgICAgICBjdHgudHJhbnNsYXRlIC1Ac3ByaXRlLndpZHRoLzIsIC1Ac3ByaXRlLmhlaWdodC8yXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIEBzcHJpdGUudGV4dHVyZSwgQHN4LCBAc3ksIEBzcHJpdGUud2lkdGgsIEBzcHJpdGUuaGVpZ2h0LCAwLCAwLCBAc3ByaXRlLndpZHRoLCBAc3ByaXRlLmhlaWdodCApXG4gICAgICAgIGN0eC5yZXN0b3JlKClcblxubW9kdWxlLmV4cG9ydHMgPSBTaGFwZVxuIiwiXG4jIEV2ZXJ5IHNwcml0ZSBoYXMgYSBUZXh0dXJlIGFuZCBhIG51bWJlciBvZiBBc3NldHMuXG4jIFRoZXNlIEFzc2V0cyBjYW4gYmUgb2YgdHlwZSBTaGFwZSAoc2ltcGxlIEltYWdlcykgb3IgQW5pbWF0aW9uXG4jXG4jIHVzYWdlOlxuI1xuIyBzcHJpdGUgPSBuZXcgU3ByaXRlXG4jICAgXCJ0ZXh0dXJlXCI6IFwiaW1nL3RleHR1cmUucG5nXG4jICAgXCJ3aWR0aFwiOjUwXG4jICAgXCJoZWlnaHRcIjo1MFxuIyAgIFwia2V5XCI6XG4jICAgICBcInNwYWNlc2hpcFwiOiAxXG4jICAgICBcInJvY2tcIjogMlxuIyAgICAgXCJlbmVteVwiOiAzXG4jXG4jIHNwcml0ZS5yZW5kZXIoXCJzcGFjZXNoaXBcIilcbiNcblxuU2hhcGUgPSByZXF1aXJlICcuL3NoYXBlLmNvZmZlZSdcbkFuaW1hdGlvbiA9IHJlcXVpcmUgJy4vYW5pbWF0aW9uLmNvZmZlZSdcblxuY2xhc3MgU3ByaXRlXG4gICAgY29uc3RydWN0b3I6IChoYXNoKSAtPlxuICAgICAgICBAYXNzZXRzID0ge31cbiAgICAgICAgQHdpZHRoID0gaGFzaFtcIndpZHRoXCJdXG4gICAgICAgIEBoZWlnaHQgPSBoYXNoW1wiaGVpZ2h0XCJdXG4gICAgICAgIEB0ZXh0dXJlID0gbmV3IEltYWdlKClcbiAgICAgICAgQHRleHR1cmUuc3JjID0gaGFzaFtcInRleHR1cmVcIl1cbiAgICAgICAgQGtleSA9IGhhc2hbXCJrZXlcIl0gPyB7fVxuXG4gICAgICAgIGZvciBrZXksIGkgb2YgQGtleVxuICAgICAgICAgICAgQGFkZEltYWdlIGtleSwgaVxuXG4gICAgICAgIEBpbm5lcldpZHRoID0gaGFzaFtcImlubmVyV2lkdGhcIl0gPyBAd2lkdGhcbiAgICAgICAgQGlubmVySGVpZ2h0ID0gaGFzaFtcImlubmVySGVpZ2h0XCJdID8gQGhlaWdodFxuXG4gICAgYWRkSW1hZ2U6IChuYW1lLCBpbmRleCkgLT5cbiAgICAgICAgJChAdGV4dHVyZSkubG9hZCA9PlxuICAgICAgICAgICAgQHRleFdpZHRoID0gQHRleHR1cmUud2lkdGhcbiAgICAgICAgICAgIEBhc3NldHNbbmFtZV0gPSBuZXcgU2hhcGUgdGhpcywgaW5kZXhcblxuICAgIGFkZEFuaW1hdGlvbjogKG5hbWUsIHBhcmFtcykgLT5cbiAgICAgICAgJChAdGV4dHVyZSkubG9hZCA9PlxuICAgICAgICAgICAgQHRleFdpZHRoID0gQHRleHR1cmUud2lkdGhcbiAgICAgICAgICAgIEBhc3NldHNbbmFtZV0gPSBuZXcgQW5pbWF0aW9uIHRoaXMsIHBhcmFtc1xuXG4gICAgcmVuZGVyOiAobmFtZSwgY3R4KSAtPlxuICAgICAgICBAYXNzZXRzW25hbWVdLnJlbmRlcihjdHgpIGlmIEBhc3NldHNbbmFtZV0/XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFNwcml0ZVxuIiwiXG4jIEEgc2ltcGxlIFRpbWVyOlxuIyBpdCBoZWxwcyB5b3Uga2VlcCB0cmFjayBvZiB0aGUgdGltZSB0aGF0IGhhcyBlbGFwc2VkIHNpbmNlIHlvdSBsYXN0IFwicHVuY2goKVwiLWVkIGl0XG5cbmNsYXNzIFRpbWVyXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBsYXN0X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICBAZGVsdGEgPSAwXG5cbiAgICAjIHB1bmNoIHJlc2V0cyB0aGUgdGltZXIgYW5kIHJldHVybnMgdGhlIHRpbWUgKGluIG1zKSBiZXR3ZWVuIHRoZSBsYXN0IHR3byBwdW5jaGVzXG4gICAgcHVuY2g6IC0+XG4gICAgICAgIHRoaXNfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICAgIEBkZWx0YSA9IHRoaXNfdGltZSAtIEBsYXN0X3RpbWVcbiAgICAgICAgQGxhc3RfdGltZSA9IHRoaXNfdGltZVxuICAgICAgICByZXR1cm4gQGRlbHRhXG5cbiAgICAjIGRlbHRhIGdpdmVzIHlvdSB0aGUgdGltZSB0aGF0IGhhcyBlbGFwc2VkIHNpbmNlIHRoZSB0aW1lciB3YXMgcHVuY2hlZCB0aGUgbGFzdCB0aW1lXG4gICAgdGltZVNpbmNlTGFzdFB1bmNoOiAtPlxuICAgICAgICB0aGlzX3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICB0aGlzX3RpbWUgLSBAbGFzdF90aW1lXG5cbiAgICBmcHM6IC0+XG4gICAgICAgIDEwMDAgLyBAZGVsdGFcblxubW9kdWxlLmV4cG9ydHMgPSBUaW1lclxuIiwiI1xuIyAgdmVjdG9yLmNvZmZlZVxuI1xuIyAgQ3JlYXRlZCBieSBLb2xqYSBXaWxja2UgaW4gT2N0b2JlciAyMDExXG4jICBDb3B5cmlnaHQgMjAxMS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiNcbiMgIFRoZSB1bmRlcnNjb3JlIGF0IHRoZSBlbmQgb2YgYSBtZXRob2Qgc2lnbmlmaWVzIHRoYXQgaXQgb3BlcmF0ZXMgb24gaXRzZWxmXG4jXG5cbmNsYXNzIFZlY3RvclxuICAgIGNvbnN0cnVjdG9yOiAoeCA9IDAsIHkgPSAwKSAtPlxuICAgICAgICBAeCA9IHhcbiAgICAgICAgQHkgPSB5XG5cbiAgICBjbG9uZTogLT5cbiAgICAgICAgbmV3IFZlY3RvciBAeCwgQHlcblxuICAgICMgQWRkIGFub3RoZXIgVmVjdG9yXG4gICAgYWRkOiAodmVjKSAtPlxuICAgICAgICBuZXcgVmVjdG9yIEB4ICsgdmVjLngsIEB5ICsgdmVjLnlcblxuICAgIGFkZF86ICh2ZWMpIC0+XG4gICAgICAgIEB4ICs9IHZlYy54XG4gICAgICAgIEB5ICs9IHZlYy55XG5cbiAgICAjIFN1YnRyYWN0IGFub3RoZXIgVmVjdG9yXG4gICAgc3VidHJhY3Q6ICh2ZWMpIC0+XG4gICAgICAgIG5ldyBWZWN0b3IgQHggLSB2ZWMueCwgQHkgLSB2ZWMueVxuXG4gICAgc3VidHJhY3RfOiAodmVjKSAtPlxuICAgICAgICBAeCAtPSB2ZWMueFxuICAgICAgICBAeSAtPSB2ZWMueVxuXG4gICAgIyBtdWx0aXBseSB0aGUgdmVjdG9yIHdpdGggYSBOdW1iZXJcbiAgICBtdWx0OiAobnVtKSAtPlxuICAgICAgICBuZXcgVmVjdG9yIEB4ICogbnVtLCBAeSAqIG51bVxuXG4gICAgbXVsdF86IChudW0pIC0+XG4gICAgICAgIEB4ICo9IG51bVxuICAgICAgICBAeSAqPSBudW1cblxuICAgICMgcmV0dXJucyB0aGUgbGVuZ3RoIG9mIHRoZSB2ZWN0b3IgKEJldHJhZylcbiAgICBsZW5ndGg6IC0+XG4gICAgICAgIE1hdGguc3FydCBAeCpAeCArIEB5KkB5XG5cbiAgICAjIHJldHVybiB0aGUgbGVuZ3RoIHNxdWFyZWQgKGZvciBvcHRpbWlzYXRpb24pXG4gICAgbGVuZ3RoU3F1YXJlZDogLT5cbiAgICAgICAgQHgqQHggKyBAeSpAeVxuXG4gICAgIyByZXR1cm5zIHRoZSBub3JtYWxpemVkIHZlY3RvciAoTGVuZ3RoID0gMSlcbiAgICBub3JtOiAoZmFjdG9yPTEpIC0+XG4gICAgICAgIGlmICggQGxlbmd0aCgpID4gMCApXG4gICAgICAgICAgICByZXR1cm4gQG11bHQgZmFjdG9yL2xcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG51bGxcblxuICAgIG5vcm1fOiAoZmFjdG9yPTEpIC0+XG4gICAgICAgIGlmICggQGxlbmd0aCgpID4gMCApXG4gICAgICAgICAgICByZXR1cm4gQG11bHRfIGZhY3Rvci9sXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBudWxsXG5cbiAgICAjIHJldHVybnMgdGhlIHNjYWxhcnByb2R1Y3RcbiAgICBzY2FsYXJQcm9kdWN0OiAodmVjKSAtPlxuICAgICAgICBAeCAqIHZlYy54ICsgQHkgKiB2ZWMueVxuXG4gICAgc2FtZURpcmVjdGlvbjogKHZlYykgLT5cbiAgICAgICAgaWYgKEBsZW5ndGhTcXVhcmVkKCkgPCBAYWRkKHZlYykubGVuZ3RoU3F1YXJlZCgpKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAjIHJldHVybnMgdGhlIGFuZ2xlIGl0IGZvcm1zIHdpdGggYSBnaXZlbiB2ZWN0b3JcbiAgICBhbmdsZVdpdGg6ICh2ZWMpIC0+XG4gICAgICAgIE1hdGguYWNvcyggQHNjYWxhclByb2R1Y3QoIHZlYyApIC8gQGxlbmd0aCgpICogdmVjLmxlbmd0aCgpIClcblxuICAgICMgcmV0dXJucyB0aGUgdmVjdG9ycHJvZHVjdCAodmVjdG9yL0tyZXV6cHJvZHVrdCkgLS0gbm90IHlldCBpbXBsZW1lbnRlZFxuICAgIHZlY3RvclByb2R1Y3Q6ICh2ZWMpIC0+XG4gICAgICAgIHJldHVybiB0aGlzXG5cbiAgICAjIHJldHVybnMgdGhlIGNvbXBvbmVudCBwYXJhbGxlbCB0byBhIGdpdmVuIHZlY3RvclxuICAgIHByb2plY3RUbzogKHZlYykgLT5cbiAgICAgICAgdmVjLm11bHQoIEBzY2FsYXJQcm9kdWN0KHZlYykgLyB2ZWMubGVuZ3RoU3F1YXJlZCgpIClcblxuICAgIHByb2plY3RUb186ICh2ZWMpIC0+XG4gICAgICAgIG0gPSBAc2NhbGFyUHJvZHVjdCh2ZWMpIC8gdmVjLmxlbmd0aFNxdWFyZWQoKVxuICAgICAgICBAeCAqPSBtXG4gICAgICAgIEB5ICo9IG1cblxuXG4gICAgIyBDbGFzcyBtZXRob2Q6IGNoZWNrcyBpZiB0d28gdmVjdG9ycyBhcmUgaW50ZXJzZWN0aW5nIC0gcmV0dXJucyBpbnRlcnNlY3Rpb24gcG9pbnRcbiAgICBAaW50ZXJzZWN0aW5nOiAob2EsIGEsIG9iLCBiKSAtPlxuXG4gICAgICAgIGMgPSBvYi5zdWJ0cmFjdCBvYVxuICAgICAgICBiID0gYi5tdWx0IC0xXG4gICAgICAgIGNvbCA9IFtdXG5cbiAgICAgICAgY29sWzBdID0gYS5jbG9uZSgpXG4gICAgICAgIGNvbFsxXSA9IGIuY2xvbmUoKVxuICAgICAgICBjb2xbMl0gPSBjLmNsb25lKClcbiAgICAgICAgbD0wOyBtPTE7IG49MlxuXG4gICAgICAgICMgTXVsdGlwbGljYXRvclxuXG4gICAgICAgIG11bHQgPSBjb2xbMF0ueSAvIGNvbFswXS54XG5cbiAgICAgICAgIyBCcmluZyBNYXRyaXggaW50byBUcmlhbmd1bGFyIHNoYXBlXG5cbiAgICAgICAgY29sWzBdLnkgPSAwXG4gICAgICAgIGNvbFsxXS55ID0gY29sWzFdLnkgLSAobXVsdCAqIGNvbFsxXS54KVxuICAgICAgICBjb2xbMl0ueSA9IGNvbFsyXS55IC0gKG11bHQgKiBjb2xbMl0ueClcblxuICAgICAgICAjIFJldmVyc2UgU3Vic3RpdHV0aW9uXG5cbiAgICAgICAgbXUgPSBjb2xbbl0ueSAvIGNvbFttXS55XG4gICAgICAgICMgbGIgPSAoY29sW25dLnggLSAoY29sW21dLnggKiBtdSkpIC8gY29sW2xdLnggIyAgbXUgaXMgc3VmZmljaWVudCBzbyB0aGlzIGRvZXNuJ3QgbmVlZCB0byBiZSBkb25lXG5cbiAgICAgICAgcmV0dXJuIG9iLnN1YnRyYWN0KCBiLm11bHQobXUpIClcblxuICAgIHByaW50OiAtPlxuICAgICAgICByZXR1cm4gXCIoI3tAeH0sICN7QHl9KVwiXG5cbm1vZHVsZS5leHBvcnRzID0gVmVjdG9yXG4iXX0=
(6)
});
