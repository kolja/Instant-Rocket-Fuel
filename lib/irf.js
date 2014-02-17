require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"K+WEMh":[function(require,module,exports){
var Animation, Shape, Timer;

Shape = require('shape');

Timer = require('timer');

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


},{"shape":"J7rr2Y","timer":"UMv0NE"}],"animation":[function(require,module,exports){
module.exports=require('K+WEMh');
},{}],"qbjtyG":[function(require,module,exports){
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


},{}],"background":[function(require,module,exports){
module.exports=require('qbjtyG');
},{}],"ASJV33":[function(require,module,exports){
var BoundingBox, Vector;

Vector = require('vector');

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


},{"vector":"YvDWQC"}],"boundingBox":[function(require,module,exports){
module.exports=require('ASJV33');
},{}],"VUzWT/":[function(require,module,exports){
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


},{}],"camera":[function(require,module,exports){
module.exports=require('VUzWT/');
},{}],"kr8rhl":[function(require,module,exports){
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


},{}],"eventmanager":[function(require,module,exports){
module.exports=require('kr8rhl');
},{}],"EomYzy":[function(require,module,exports){
var Game, SceneManager,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

SceneManager = require('scenemanager');

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


},{"scenemanager":"qoaJxz"}],"game":[function(require,module,exports){
module.exports=require('EomYzy');
},{}],"helpers":[function(require,module,exports){
module.exports=require('NleGFF');
},{}],"NleGFF":[function(require,module,exports){
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


},{}],15:[function(require,module,exports){
var foo;

foo = "hello, World!";

require('sprite');

module.exports = "blork--------------";


},{"sprite":"x+STBx"}],"keyboard":[function(require,module,exports){
module.exports=require('fzknrZ');
},{}],"fzknrZ":[function(require,module,exports){
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


},{}],"map":[function(require,module,exports){
module.exports=require('58WdLB');
},{}],"58WdLB":[function(require,module,exports){
var Map, Tile;

Tile = require('tile');

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


},{"tile":"l1tHAW"}],"scene":[function(require,module,exports){
module.exports=require('ixIrtY');
},{}],"ixIrtY":[function(require,module,exports){
var Scene;

Scene = (function() {
  function Scene() {}

  Scene.prototype.update = function() {};

  Scene.prototype.render = function() {};

  return Scene;

})();

module.exports = Scene;


},{}],"scenemanager":[function(require,module,exports){
module.exports=require('qoaJxz');
},{}],"qoaJxz":[function(require,module,exports){
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


},{}],"shape":[function(require,module,exports){
module.exports=require('J7rr2Y');
},{}],"J7rr2Y":[function(require,module,exports){
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


},{}],"x+STBx":[function(require,module,exports){
var Animation, Shape, Sprite;

Shape = require('shape');

Animation = require('animation');

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


},{"animation":"K+WEMh","shape":"J7rr2Y"}],"sprite":[function(require,module,exports){
module.exports=require('x+STBx');
},{}],"l1tHAW":[function(require,module,exports){
var BoundingBox, Tile, Vector;

BoundingBox = require('boundingBox');

Vector = require('vector');

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


},{"boundingBox":"ASJV33","vector":"YvDWQC"}],"tile":[function(require,module,exports){
module.exports=require('l1tHAW');
},{}],"timer":[function(require,module,exports){
module.exports=require('UMv0NE');
},{}],"UMv0NE":[function(require,module,exports){
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


},{}],"vector":[function(require,module,exports){
module.exports=require('YvDWQC');
},{}],"YvDWQC":[function(require,module,exports){
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


},{}]},{},[15])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvcHJpdmF0ZS92YXIvd3d3L2lyZi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL3ByaXZhdGUvdmFyL3d3dy9pcmYvc3JjL2FuaW1hdGlvbi5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvYmFja2dyb3VuZC5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvYm91bmRpbmdCb3guY29mZmVlIiwiL3ByaXZhdGUvdmFyL3d3dy9pcmYvc3JjL2NhbWVyYS5jb2ZmZWUiLCIvcHJpdmF0ZS92YXIvd3d3L2lyZi9zcmMvZXZlbnRtYW5hZ2VyLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy9nYW1lLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy9oZWxwZXJzLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy9pcmYuY29mZmVlIiwiL3ByaXZhdGUvdmFyL3d3dy9pcmYvc3JjL2tleWJvYXJkLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy9tYXAuY29mZmVlIiwiL3ByaXZhdGUvdmFyL3d3dy9pcmYvc3JjL3NjZW5lLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy9zY2VuZW1hbmFnZXIuY29mZmVlIiwiL3ByaXZhdGUvdmFyL3d3dy9pcmYvc3JjL3NoYXBlLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy9zcHJpdGUuY29mZmVlIiwiL3ByaXZhdGUvdmFyL3d3dy9pcmYvc3JjL3RpbGUuY29mZmVlIiwiL3ByaXZhdGUvdmFyL3d3dy9pcmYvc3JjL3RpbWVyLmNvZmZlZSIsIi9wcml2YXRlL3Zhci93d3cvaXJmL3NyYy92ZWN0b3IuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQ0EsSUFBQSxtQkFBQTs7QUFBQSxDQUFBLEVB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RWUsTUFBQyxJQUFoQjtDQUNJLEdBQUEsT0FBTztDQXBFWCxFQW1FZTs7Q0FuRWYsRUF1RVcsTUFBWDtDQUNRLEVBQUQsQ0FBSCxPQUFBLEVBQVU7Q0F4RWQsRUF1RVc7O0NBdkVYLEVBMEVZLE1BQUMsQ0FBYjtDQUNJLE9BQUE7Q0FBQSxFQUFJLENBQUosU0FBSTtDQUFKLEdBQ0E7Q0FDQyxHQUFBLE9BQUQ7Q0E3RUosRUEwRVk7O0NBMUVaLENBaUZBLENBQWUsR0FBZCxHQUFlLEdBQWhCO0NBRUksT0FBQSxpQkFBQTtDQUFBLENBQU0sQ0FBRixDQUFKLElBQUk7QUFDUSxDQURaLEVBQ0ksQ0FBSjtDQURBLENBQUEsQ0FFQSxDQUFBO0NBRkEsRUFJSSxDQUFKLENBQVM7Q0FKVCxFQUtJLENBQUosQ0FBUztDQUxULEVBTUksQ0FBSixDQUFTO0NBTlQsRUFPRSxDQUFGO0NBUEEsRUFPTyxDQUFGO0NBUEwsRUFPWSxDQUFGO0NBUFYsRUFXTyxDQUFQO0NBWEEsRUFlSSxDQUFKO0NBZkEsRUFnQkksQ0FBSjtDQWhCQSxFQWlCSSxDQUFKO0NBakJBLENBcUJBLENBQUssQ0FBTDtDQUdBLENBQVMsRUFBVyxJQUFiLEdBQUE7Q0EzR1gsRUFpRmU7O0NBakZmLEVBNkdPLEVBQVAsSUFBTztDQUNILEVBQVEsQ0FBRyxPQUFIO0NBOUdaLEVBNkdPOztDQTdHUDs7Q0FESjs7QUFpSEEsQ0FqSEEsRUFpSGlCLEdBQVgsQ0FBTiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG5TaGFwZSA9IHJlcXVpcmUgJ3NoYXBlJ1xuVGltZXIgPSByZXF1aXJlICd0aW1lcidcblxuY2xhc3MgQW5pbWF0aW9uXG5cbiAgICBjb25zdHJ1Y3RvcjogKEBzcHJpdGUsIHBhcmFtcykgLT5cbiAgICAgICAgQGZwcyA9IHBhcmFtc1tcImZwc1wiXSA/IDMwXG4gICAgICAgIEBsb29wID0gcGFyYW1zW1wibG9vcFwiXSA/IHRydWVcbiAgICAgICAgQGNhbGxiYWNrID0gcGFyYW1zW1wiY2FsbGJhY2tcIl0gPyBudWxsXG4gICAgICAgIEBmcmFtZXMgPSBmb3IgaW5kZXggaW4gcGFyYW1zW1wiZnJhbWVzXCJdXG4gICAgICAgICAgICBuZXcgU2hhcGUgQHNwcml0ZSwgaW5kZXhcbiAgICAgICAgQGxhc3RGcmFtZSA9IEBmcmFtZXMubGVuZ3RoIC0gMVxuICAgICAgICBAdGltZXIgPSBuZXcgVGltZXJcbiAgICAgICAgQGN1cnJlbnRGcmFtZSA9IDBcbiAgICAgICAgQHBsYXlpbmcgPSB0cnVlXG5cbiAgICByZW5kZXI6IChjdHgpIC0+XG4gICAgICAgIGlmIEBwbGF5aW5nXG4gICAgICAgICAgICBAY3VycmVudEZyYW1lID0gTWF0aC5mbG9vciggQHRpbWVyLnRpbWVTaW5jZUxhc3RQdW5jaCgpIC8gKDEwMDAgLyBAZnBzKSApXG4gICAgICAgICAgICBpZiBAY3VycmVudEZyYW1lID4gQGxhc3RGcmFtZVxuICAgICAgICAgICAgICAgIEBjYWxsYmFjaz8oKVxuICAgICAgICAgICAgICAgIGlmIEBsb29wXG4gICAgICAgICAgICAgICAgICAgIEByZXdpbmQoKVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgQGN1cnJlbnRGcmFtZSA9IEBsYXN0RnJhbWVcbiAgICAgICAgICAgICAgICAgICAgQHN0b3AoKVxuXG4gICAgICAgIEBmcmFtZXNbQGN1cnJlbnRGcmFtZV0ucmVuZGVyKGN0eClcblxuICAgIHBsYXk6IC0+XG4gICAgICAgIEBwbGF5aW5nID0gdHJ1ZVxuXG4gICAgc3RvcDogLT5cbiAgICAgICAgQHBsYXlpbmcgPSBmYWxzZVxuXG4gICAgcmV3aW5kOiAtPlxuICAgICAgICBAY3VycmVudEZyYW1lID0gMFxuICAgICAgICBAdGltZXIucHVuY2goKVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFuaW1hdGlvblxuIiwiY2xhc3MgQmFja2dyb3VuZFxuICAgIGNvbnN0cnVjdG9yOiAoQHNwcml0ZSkgLT5cbiAgICAgICAgQHNwcml0ZS5hZGRJbWFnZSBcImJhY2tncm91bmRcIiwgMFxuXG4gICAgcmVuZGVyOiAoY3R4KSAtPlxuICAgICAgICBAc3ByaXRlLnJlbmRlciggXCJiYWNrZ3JvdW5kXCIsIGN0eCApXG5cbm1vZHVsZS5leHBvcnRzID0gQmFja2dyb3VuZFxuIiwiXG5WZWN0b3IgPSByZXF1aXJlICd2ZWN0b3InXG5cbmNsYXNzIEJvdW5kaW5nQm94XG4gICAgY29uc3RydWN0b3I6IChAY29vciwgQGRpbSwgQGNvbG9yPVwiZ3JleVwiKSAtPlxuICAgICAgICBAY29vciA/PSBuZXcgVmVjdG9yXG4gICAgICAgIEBkaW0gPz0gbmV3IFZlY3RvclxuXG4gICAgICAgIGludGVyc2VjdDogKG90aGVyQkIpIC0+XG4gICAgICAgICAgICBAaW50ZXJzZWN0dihvdGhlckJCKSBhbmQgQGludGVyc2VjdGgob3RoZXJCQilcblxuICAgICAgICBpbnRlcnNlY3R2OiAob3RoZXJCQikgLT5cbiAgICAgICAgICAgIGlmIEBjb29yLnkgPCBvdGhlckJCLmNvb3IueVxuICAgICAgICAgICAgICAgIGlmICgoQGRpbS55ICsgb3RoZXJCQi5kaW0ueSkgLyAyKSA8IChvdGhlckJCLmNvb3IueSAtIEBjb29yLnkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBpZiAoKEBkaW0ueSArIG90aGVyQkIuZGltLnkpIC8gMikgPCAoQGNvb3IueSAtIG90aGVyQkIuY29vci55KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG5cbiAgICAgICAgaW50ZXJzZWN0aDogKG90aGVyQkIpIC0+XG4gICAgICAgICAgICBpZiBAY29vci54IDwgb3RoZXJCQi5jb29yLnhcbiAgICAgICAgICAgICAgICBpZiAoKEBkaW0ueCArIG90aGVyQkIuZGltLngpIC8gMikgPCAob3RoZXJCQi5jb29yLnggLSBAY29vci54KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgaWYgKChAZGltLnggKyBvdGhlckJCLmRpbS54KSAvIDIpIDwgKEBjb29yLnggLSBvdGhlckJCLmNvb3IueClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuXG5cbiAgICAgICAgcmVuZGVyOiAoY3R4KSAtPlxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gQGNvbG9yXG4gICAgICAgICAgICBjdHguc3Ryb2tlUmVjdCBAY29vci54IC0gQGRpbS54LzIsIEBjb29yLnkgLSBAZGltLnkvMiwgQGRpbS54LCBAZGltLnlcblxuICBtb2R1bGUuZXhwb3J0cyA9IEJvdW5kaW5nQm94XG4iLCJcbmNsYXNzIENhbWVyYVxuICAgIGNvbnN0cnVjdG9yOiAoaGFzaCkgLT5cbiAgICAgICAgQHByb2plY3Rpb24gPSBoYXNoW1wicHJvamVjdGlvblwiXVxuICAgICAgICBAdnBXaWR0aCA9IGhhc2hbXCJ2cFdpZHRoXCJdICAgIyBWaWV3cG9ydFxuICAgICAgICBAdnBIZWlnaHQgPSBoYXNoW1widnBIZWlnaHRcIl1cbiAgICAgICAgQHpvb21GYWN0b3IgPSBoYXNoW1wiem9vbUZhY3RvclwiXSA/IDFcbiAgICAgICAgQGNvb3IgPSBuZXcgVmVjdG9yKCAxMDAsIDEwMCApXG5cbiAgICB1cGRhdGU6IChkZWx0YSkgLT5cblxuICAgIGFwcGx5OiAoY3R4LCBjYWxsYmFjaykgLT5cblxuICAgICAgICBzd2l0Y2ggQHByb2plY3Rpb25cbiAgICAgICAgICAgIHdoZW4gXCJub3JtYWxcIlxuICAgICAgICAgICAgICAgIGN0eC5zYXZlKClcbiAgICAgICAgICAgICAgICBjdHgudHJhbnNsYXRlIEB2cFdpZHRoLzIgLSBAY29vci54LCBAdnBIZWlnaHQvMiAtIEBjb29yLnlcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgICAgICAgICAgY3R4LnJlc3RvcmUoKVxuICAgICAgICAgICAgd2hlbiBcImlzb1wiXG4gICAgICAgICAgICAgICAgY3R4LnNhdmUoKVxuICAgICAgICAgICAgICAgIGN0eC5zY2FsZSAxLCAwLjVcbiAgICAgICAgICAgICAgICBjdHgucm90YXRlIE1hdGguUEkvNFxuICAgICAgICAgICAgICAgIGN0eC50cmFuc2xhdGUgMjAwLCAtNDAwXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgICAgICAgIGN0eC5yZXN0b3JlKClcblxubW9kdWxlLmV4cG9ydHMgPSBDYW1lcmFcbiIsIlxuY2xhc3MgRXZlbnRNYW5hZ2VyXG5cbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQGV2ZW50bGlzdCA9IHt9XG5cbiAgICByZWdpc3RlcjogKGV2ZW50LCBjYWxsYmFjaykgLT5cbiAgICAgICAgdW5sZXNzIEBldmVudGxpc3RbZXZlbnRdP1xuICAgICAgICAgICAgQGV2ZW50bGlzdFtldmVudF0gPSBbXVxuICAgICAgICBAZXZlbnRsaXN0W2V2ZW50XS5wdXNoIGNhbGxiYWNrXG5cbiAgICB0cmlnZ2VyOiAoZXZlbnQsIG9yaWdpbikgLT5cbiAgICAgICAgZm9yIGNhbGxiYWNrIGluIEBldmVudGxpc3RbZXZlbnRdXG4gICAgICAgICAgICBjYWxsYmFjayhvcmlnaW4pXG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRNYW5hZ2VyXG4iLCJcblNjZW5lTWFuYWdlciA9IHJlcXVpcmUgJ3NjZW5lbWFuYWdlcidcblxuY2xhc3MgR2FtZVxuXG4gICAgQGFkZFNjZW5lOiAoc2NlbmUpIC0+XG4gICAgICAgIEBzY2VuZU1hbmFnZXIgPz0gbmV3IFNjZW5lTWFuYWdlcigpXG4gICAgICAgIEBzY2VuZU1hbmFnZXIuYWRkU2NlbmUgc2NlbmVcblxuICAgIGNvbnN0cnVjdG9yOiAocGFyYW1zKSAtPlxuXG4gICAgICAgIEBwYXJhbXMgPSBIZWxwZXJzLmV4dGVuZCB7XG4gICAgICAgICAgICBcIndpZHRoXCIgOiA4MDAsXG4gICAgICAgICAgICBcImhlaWdodFwiOiA2MDBcbiAgICAgICAgfSwgcGFyYW1zXG5cbiAgICAgICAgY2FudmFzID0gJCgnPGNhbnZhcy8+JykuYXR0cih7XCJ3aWR0aFwiOiBAcGFyYW1zLndpZHRoLCBcImhlaWdodFwiOiBAcGFyYW1zLmhlaWdodH0pXG4gICAgICAgICQoXCJib2R5XCIpLmFwcGVuZChjYW52YXMpXG4gICAgICAgIEBjdHggPSBjYW52YXNbMF0uZ2V0Q29udGV4dCgnMmQnKVxuICAgICAgICBAY3R4LmZvbnQgPSAnNDAwIDE4cHggSGVsdmV0aWNhLCBzYW5zLXNlcmlmJ1xuICAgICAgICBAbG9vcCA9IG51bGxcbiAgICAgICAgQHRpbWVyID0gbmV3IFRpbWVyXG4gICAgICAgICMgdGhlIGluc3RhbmNlJ3Mgc2NlbmVtYW5hZ2VyIHBvaW50cyB0byB0aGUgQ2xhc3NlcyBTY2VuZW1hbmFnZXJcbiAgICAgICAgIyAob3IsIGlmIGl0IGRvZXNuJ3QgZXhpc3QsIGEgbmV3bHkgaW5zdGFudGlhdGVkIG9uZSlcbiAgICAgICAgQHNjZW5lTWFuYWdlciA9IEBjb25zdHJ1Y3Rvci5zY2VuZU1hbmFnZXIgfHwgbmV3IFNjZW5lTWFuYWdlcigpXG5cbiAgICBnYW1lbG9vcDogPT5cbiAgICAgICAgQHVwZGF0ZSgpXG4gICAgICAgIEByZW5kZXIoKVxuXG4gICAgc3RhcnQ6IC0+XG4gICAgICAgIEBsb29wID0gc2V0SW50ZXJ2YWwgQGdhbWVsb29wLCAxXG5cbiAgICBzdG9wOiAtPlxuICAgICAgICBAbG9vcC5jbGVhckludGVydmFsKClcblxuICAgIHVwZGF0ZTogLT5cbiAgICAgICAgQHRpbWVyLnB1bmNoKClcblxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgQGN0eC5jbGVhclJlY3QgMCwgMCwgQHBhcmFtcy53aWR0aCwgQHBhcmFtcy5oZWlnaHRcblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lXG4iLCJcblxuIyBodHRwOi8vY29mZmVlc2NyaXB0Y29va2Jvb2suY29tL2NoYXB0ZXJzL2FycmF5cy9zaHVmZmxpbmctYXJyYXktZWxlbWVudHNcbkFycmF5OjpzaHVmZmxlID0gLT4gQHNvcnQgLT4gMC41IC0gTWF0aC5yYW5kb20oKVxuXG5OdW1iZXI6OnRvSGV4ID0gKHBhZGRpbmc9MikgLT5cbiAgICBoZXggPSBAdG9TdHJpbmcgMTZcbiAgICB3aGlsZSAoaGV4Lmxlbmd0aCA8IHBhZGRpbmcpXG4gICAgICAgIGhleCA9IFwiMFwiICsgaGV4XG4gICAgcmV0dXJuIGhleFxuXG5jbGFzcyBIZWxwZXJzXG5cbiAgICBAZXh0ZW5kOiAob2JqZWN0LCBwcm9wZXJ0aWVzKSAtPlxuICAgICAgICBmb3Iga2V5LCB2YWwgb2YgcHJvcGVydGllc1xuICAgICAgICAgICAgb2JqZWN0W2tleV0gPSB2YWxcbiAgICAgICAgb2JqZWN0XG5cbm1vZHVsZS5leHBvcnRzID0gSGVscGVyc1xuIiwiXG5mb28gPSBcImhlbGxvLCBXb3JsZCFcIlxucmVxdWlyZSAnc3ByaXRlJ1xubW9kdWxlLmV4cG9ydHMgPSBcImJsb3JrLS0tLS0tLS0tLS0tLS1cIlxuIiwiY2xhc3MgS2V5Ym9hcmRcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQG1hcHBpbmcgPVxuICAgICAgICAgICAgODpcImJhY2tzcGFjZVwiXG4gICAgICAgICAgICA5OlwidGFiXCJcbiAgICAgICAgICAgIDEzOlwicmV0dXJuXCJcbiAgICAgICAgICAgIDE2Olwic2hpZnRcIlxuICAgICAgICAgICAgMTc6XCJjdHJsXCJcbiAgICAgICAgICAgIDE4OlwiYWx0XCJcbiAgICAgICAgICAgIDI3OlwiZXNjXCJcbiAgICAgICAgICAgIDMyOlwic3BhY2VcIlxuICAgICAgICAgICAgMzc6XCJsZWZ0XCJcbiAgICAgICAgICAgIDM4OlwidXBcIlxuICAgICAgICAgICAgMzk6XCJyaWdodFwiXG4gICAgICAgICAgICA0MDpcImRvd25cIlxuICAgICAgICAgICAgNDg6XCIwXCJcbiAgICAgICAgICAgIDQ5OlwiMVwiXG4gICAgICAgICAgICA0OTpcIjFcIlxuICAgICAgICAgICAgNDk6XCIxXCJcbiAgICAgICAgICAgIDQ5OlwiMVwiXG4gICAgICAgICAgICA0OTpcIjFcIlxuICAgICAgICAgICAgNDk6XCI2XCJcbiAgICAgICAgICAgIDQ5OlwiN1wiXG4gICAgICAgICAgICA0OTpcIjhcIlxuICAgICAgICAgICAgNTc6XCI5XCJcbiAgICAgICAgICAgIDY1OlwiYVwiXG4gICAgICAgICAgICA2NjpcImJcIlxuICAgICAgICAgICAgNjc6XCJjXCJcbiAgICAgICAgICAgIDY4OlwiZFwiXG4gICAgICAgICAgICA2OTpcImVcIlxuICAgICAgICAgICAgNzA6XCJmXCJcbiAgICAgICAgICAgIDcxOlwiZ1wiXG4gICAgICAgICAgICA3MjpcImhcIlxuICAgICAgICAgICAgNzM6XCJpXCJcbiAgICAgICAgICAgIDc0OlwialwiXG4gICAgICAgICAgICA3NTpcImtcIlxuICAgICAgICAgICAgNzY6XCJsXCJcbiAgICAgICAgICAgIDc3OlwibVwiXG4gICAgICAgICAgICA3ODpcIm5cIlxuICAgICAgICAgICAgNzk6XCJvXCJcbiAgICAgICAgICAgIDgwOlwicFwiXG4gICAgICAgICAgICA4MTpcInFcIlxuICAgICAgICAgICAgODI6XCJyXCJcbiAgICAgICAgICAgIDgzOlwic1wiXG4gICAgICAgICAgICA4NDpcInRcIlxuICAgICAgICAgICAgODU6XCJ1XCJcbiAgICAgICAgICAgIDg3Olwid1wiXG4gICAgICAgICAgICA4ODpcInhcIlxuICAgICAgICAgICAgODk6XCJ5XCJcbiAgICAgICAgICAgIDkwOlwielwiXG4gICAgICAgICAgICA5MzpcImNtZFwiXG4gICAgICAgICAgICAxODg6XCIsXCJcbiAgICAgICAgICAgIDE5MDpcIi5cIlxuXG4gICAgICBAa2V5YXJyYXkgPSBbXVxuXG4gICAgICBmb3IgY29kZSwgbmFtZSBvZiBAbWFwcGluZ1xuICAgICAgICAgIEBrZXlhcnJheVtuYW1lXSA9IGZhbHNlXG5cbiAgICAgICQoXCJodG1sXCIpLmJpbmQgXCJrZXlkb3duXCIsIChldmVudCkgPT5cbiAgICAgICAgICBAa2V5YXJyYXlbQG1hcHBpbmdbZXZlbnQud2hpY2hdXSA9IHRydWVcblxuICAgICAgJChcImh0bWxcIikuYmluZCBcImtleXVwXCIsIChldmVudCkgPT5cbiAgICAgICAgICBAa2V5YXJyYXlbQG1hcHBpbmdbZXZlbnQud2hpY2hdXSA9IGZhbHNlXG5cblxuICAgIGtleTogKHdoaWNoKSAtPlxuICAgICAgICByZXR1cm4gQGtleWFycmF5W3doaWNoXVxuXG4gICAgY2hlY2s6IC0+XG4gICAgICAgIHJldHVybiBAa2V5YXJyYXlcblxubW9kdWxlLmV4cG9ydHMgPSBLZXlib2FyZFxuIiwiXG5UaWxlID0gcmVxdWlyZSAndGlsZSdcblxuY2xhc3MgTWFwXG4gICAgY29uc3RydWN0b3I6IChoYXNoKSAtPlxuICAgICAgICBAc3ByaXRlID0gaGFzaFtcInNwcml0ZVwiXVxuICAgICAgICBAdGlsZXMgPSBbXVxuICAgICAgICBAd2lkdGggPSAwICMgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgbWFwIGluIHRpbGVzIC0gY2FuIG9ubHkgYmUgZGV0ZXJtaW5lZCBhZnRlciB0aGUgbWFwZmlsZSBsb2FkaW5nIGhhcyBjb21wbGV0ZWRcbiAgICAgICAgQGhlaWdodCA9IDBcblxuICAgICAgICAjIGluIGhhc2hbXCJwYXR0ZXJuXCJdIHlvdSBjYW4gZWl0aGVyIHBhc3MgYSBzdHJpbmcgbGlrZSBcInNpbXBsZVwiLCBcInNxdWFyZVwiIG9yIFwiY3Jvc3NcIlxuICAgICAgICAjIGluIHdoaWNoIGNhc2UgdGhlIHJlc3BlY3RpdmUgbWV0aG9kIHdpbGwgYmUgY2FsbGVkLiBBbHRlcm5hdGl2ZWx5LCB5b3UgY2FuIHBhc3MgeW91ciBvd24gY3VzdG9tIGZ1bmN0aW9uLlxuICAgICAgICBpZiB0eXBlb2YgaGFzaFtcInBhdHRlcm5cIl0gaXMgXCJmdW5jdGlvblwiXG4gICAgICAgICAgICBAcmVhZCA9IGhhc2hbXCJwYXR0ZXJuXCJdXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHN3aXRjaCBoYXNoW1wicGF0dGVyblwiXVxuICAgICAgICAgICAgICAgIHdoZW4gXCJzaW1wbGVcIlxuICAgICAgICAgICAgICAgICAgICBAcmVhZCA9IEByZWFkU2ltcGxlXG4gICAgICAgICAgICAgICAgd2hlbiBcInNxdWFyZVwiXG4gICAgICAgICAgICAgICAgICAgIEByZWFkID0gQHJlYWRTcXVhcmVcbiAgICAgICAgICAgICAgICB3aGVuIFwiY3Jvc3NcIlxuICAgICAgICAgICAgICAgICAgICBAcmVhZCA9IEByZWFkQ3Jvc3NcblxuICAgICAgICBAbWFwID0gbmV3IEltYWdlKClcbiAgICAgICAgQG1hcC5zcmMgPSBoYXNoW1wibWFwZmlsZVwiXVxuICAgICAgICBAbWFwRGF0YSA9IFtdXG5cbiAgICAgICAgQGxvYWRNYXBEYXRhRnJvbUltYWdlKClcblxuICAgIHJlbmRlcjogKGN0eCwgY2FtZXJhKSAtPlxuICAgICAgICBmb3IgdGlsZSBpbiBAdGlsZXNcbiAgICAgICAgICAgIGlmIHRpbGUuc3F1YXJlZERpc3RhbmNlVG8oY2FtZXJhLmNvb3IpIDwgMTAwMDAwXG4gICAgICAgICAgICAgICAgdGlsZS5yZW5kZXIoY3R4KVxuXG4gICAgIyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMxMDI4MTkvY2hyb21lLWRpc2FibGUtc2FtZS1vcmlnaW4tcG9saWN5XG4gICAgIyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzkzNDAxMi9nZXQtaW1hZ2UtZGF0YS1pbi1qYXZhc2NyaXB0XG4gICAgbG9hZE1hcERhdGFGcm9tSW1hZ2U6IC0+XG4gICAgICAgICQoQG1hcCkubG9hZCA9PlxuICAgICAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKVxuICAgICAgICAgICAgQHdpZHRoID0gQG1hcC53aWR0aFxuICAgICAgICAgICAgQGhlaWdodCA9IEBtYXAuaGVpZ2h0XG4gICAgICAgICAgICBjYW52YXMud2lkdGggPSBAbWFwLndpZHRoXG4gICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gQG1hcC5oZWlnaHRcbiAgICAgICAgICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIilcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoIEBtYXAsIDAsIDApXG4gICAgICAgICAgICBkYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLDAsQG1hcC53aWR0aCxAbWFwLmhlaWdodCkuZGF0YVxuXG4gICAgICAgICAgICBmb3IgcCxpIGluIGRhdGEgYnkgNFxuICAgICAgICAgICAgICAgIHJvdyA9IE1hdGguZmxvb3IoKGkvNCkvQG1hcC53aWR0aClcbiAgICAgICAgICAgICAgICBAbWFwRGF0YVtyb3ddID89IFtdXG4gICAgICAgICAgICAgICAgQG1hcERhdGFbcm93XS5wdXNoIFtOdW1iZXIoZGF0YVtpXSkudG9IZXgoKSxOdW1iZXIoZGF0YVtpKzFdKS50b0hleCgpLE51bWJlcihkYXRhW2krMl0pLnRvSGV4KCksTnVtYmVyKGRhdGFbaSszXSkudG9IZXgoKV1cblxuICAgICAgICAgICAgQHJlYWQoKVxuXG4gICAgICAgICAgICBmb3IgdGlsZSwgaW5kZXggaW4gQHRpbGVzXG4gICAgICAgICAgICAgICAgdGlsZS5uZWlnaGJvcltcIndcIl0gPSBAdGlsZXNbaW5kZXgtMV1cbiAgICAgICAgICAgICAgICB0aWxlLm5laWdoYm9yW1wiZVwiXSA9IEB0aWxlc1tpbmRleCsxXVxuICAgICAgICAgICAgICAgIHRpbGUubmVpZ2hib3JbXCJuXCJdID0gQHRpbGVzW2luZGV4LUB3aWR0aF1cbiAgICAgICAgICAgICAgICB0aWxlLm5laWdoYm9yW1wic1wiXSA9IEB0aWxlc1tpbmRleCtAd2lkdGhdXG5cblxuICAgIHJlYWRTaW1wbGU6IC0+XG4gICAgICAgIGZvciByb3cgaW4gWzAuLkBtYXAuaGVpZ2h0LTFdXG4gICAgICAgICAgICBmb3IgY29sIGluIFswLi5AbWFwLndpZHRoLTFdXG4gICAgICAgICAgICAgICAgdHlwZSA9IFwiI3tAbWFwRGF0YVtyb3ddW2NvbF1bMF19XCJcbiAgICAgICAgICAgICAgICBncmVlbiA9IHBhcnNlSW50KCBAbWFwRGF0YVtyb3ddW2NvbF1bMV0sIDE2IClcbiAgICAgICAgICAgICAgICB6ID0gcGFyc2VJbnQoIEBtYXBEYXRhW3Jvd11bY29sXVsyXSwgMTYgKVxuICAgICAgICAgICAgICAgIEB0aWxlcy5wdXNoKCBuZXcgVGlsZSggQHNwcml0ZSwgdHlwZSwgcm93LCBjb2wsIGdyZWVuLCB6ICkpXG5cbiAgICByZWFkU3F1YXJlOiAtPlxuICAgICAgICBmb3Igcm93IGluIFswLi5AbWFwLmhlaWdodC0yXVxuICAgICAgICAgICAgZm9yIGNvbCBpbiBbMC4uQG1hcC53aWR0aC0yXVxuICAgICAgICAgICAgICAgIHR5cGUgPSBcIiN7QG1hcERhdGFbcm93XVtjb2xdWzBdfSN7QG1hcERhdGFbcm93XVtjb2wrMV1bMF19I3tAbWFwRGF0YVtyb3crMV1bY29sXVswXX0je0BtYXBEYXRhW3JvdysxXVtjb2wrMV1bMF19XCJcbiAgICAgICAgICAgICAgICBncmVlbiA9IHBhcnNlSW50KCBAbWFwRGF0YVtyb3ddW2NvbF1bMV0sIDE2IClcbiAgICAgICAgICAgICAgICB6ID0gcGFyc2VJbnQoIEBtYXBEYXRhW3Jvd11bY29sXVsyXSwgMTYgKVxuICAgICAgICAgICAgICAgIEB0aWxlcy5wdXNoKCBuZXcgVGlsZSggQHNwcml0ZSwgdHlwZSwgcm93LCBjb2wsIGdyZWVuLCB6ICkpXG5cbiAgICByZWFkQ3Jvc3M6IC0+XG4gICAgICAgIGZvciByb3cgaW4gWzEuLkBtYXAuaGVpZ2h0LTJdIGJ5IDJcbiAgICAgICAgICAgIGZvciBjb2wgaW4gWzEuLkBtYXAud2lkdGgtMl0gYnkgMlxuICAgICAgICAgICAgICAgIHVubGVzcyBAbWFwRGF0YVtyb3ddW2NvbF1bMF0gaXMgXCIwMFwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBcIiN7QG1hcERhdGFbcm93LTFdW2NvbF1bMF19I3tAbWFwRGF0YVtyb3ddW2NvbCsxXVswXX0je0BtYXBEYXRhW3JvdysxXVtjb2xdWzBdfSN7QG1hcERhdGFbcm93XVtjb2wtMV1bMF19XCJcbiAgICAgICAgICAgICAgICAgICAgZ3JlZW4gPSBwYXJzZUludCggQG1hcERhdGFbcm93XVtjb2xdWzFdLCAxNiApXG4gICAgICAgICAgICAgICAgICAgIHogPSBwYXJzZUludCggQG1hcERhdGFbcm93XVtjb2xdWzJdLCAxNiApXG4gICAgICAgICAgICAgICAgICAgIEB0aWxlcy5wdXNoKCBuZXcgVGlsZSggQHNwcml0ZSwgdHlwZSwgcm93LzIsIGNvbC8yLCBncmVlbiwgeiApKVxuXG4gICAgdGlsZUF0VmVjdG9yOiAodmVjKSAtPlxuICAgICAgICB4ID0gTWF0aC5mbG9vciggdmVjLnggLyBAc3ByaXRlLmlubmVyV2lkdGggKVxuICAgICAgICB5ID0gTWF0aC5mbG9vciggdmVjLnkgLyBAc3ByaXRlLmlubmVySGVpZ2h0IClcbiAgICAgICAgaW5kZXggPSB5ICogQHdpZHRoICsgeFxuICAgICAgICByZXR1cm4gQHRpbGVzW2luZGV4XVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcFxuXG4iLCJjbGFzcyBTY2VuZVxuXG4gIGNvbnN0cnVjdG9yOiAtPlxuXG4gIHVwZGF0ZTogLT5cblxuICByZW5kZXI6IC0+XG5cbm1vZHVsZS5leHBvcnRzID0gU2NlbmVcbiIsIiMgIyBUaGUgU2NlbmVNYW5hZ2VyXG4jIGlzIHRoZSBjbGFzcyB0byBob2xkIGFuZCBtYW5hZ2UgKHN3aXRjaCBiZXR3ZWVuKSB0aGUgJ3NjZW5lcycgdGhhdCB5b3VyXG4jIEdhbWUgY29uc2lzdHMgb2YuIEl0IG1haW50YWluc1xuY2xhc3MgU2NlbmVNYW5hZ2VyXG4gICAgIyAqIGEgaGFzaCB3aXRoIGFsbCBTY2VuZXMgaW4gdGhlIGdhbWVcbiAgICAjICogYSByZWZlcmVuY2UgdG8gdGhlIHRoZSBzY2VuZSB0aGF0IGlzIGN1cnJlbnRseSBhY3RpdmVcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQHNjZW5lcyA9IHt9XG4gICAgICAgIEBjdXJyZW50U2NlbmUgPSBudWxsXG5cbiAgICBhZGRTY2VuZTogKHNjZW5lQ2xhc3MpIC0+XG4gICAgICAgIEBzY2VuZXNbc2NlbmVDbGFzcy5uYW1lXSA9XG4gICAgICAgICAgICBcImNsYXNzXCIgICAgOiBzY2VuZUNsYXNzXG4gICAgICAgICAgICBcImluc3RhbmNlXCIgOiBudWxsXG5cbiAgICBzZXRTY2VuZTogKHNjZW5lLCBwYXJlbnQpIC0+XG4gICAgICAgICMgY3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBzY2VuZSwgdW5sZXNzIGl0IGhhcyBiZWVuIGNyZWF0ZWQgYmVmb3JlXG4gICAgICAgIEBjdXJyZW50U2NlbmUgPSBAc2NlbmVzW3NjZW5lXS5pbnN0YW5jZSA/PSBuZXcgQHNjZW5lc1tzY2VuZV0uY2xhc3MocGFyZW50KVxuXG5AaXJmLlNjZW5lTWFuYWdlciA9IFNjZW5lTWFuYWdlclxuIiwiXG5jbGFzcyBTaGFwZVxuXG4gICAgY29uc3RydWN0b3I6IChAc3ByaXRlLCBpbmRleCkgLT5cbiAgICAgICAgQHN4ID0gKCBpbmRleCAqIEBzcHJpdGUud2lkdGggKSAlIEBzcHJpdGUudGV4V2lkdGhcbiAgICAgICAgQHN5ID0gTWF0aC5mbG9vcigoIGluZGV4ICogQHNwcml0ZS53aWR0aCApIC8gQHNwcml0ZS50ZXhXaWR0aCkgKiBAc3ByaXRlLmhlaWdodFxuXG4gICAgcmVuZGVyOiAoY3R4KSAtPlxuICAgICAgICBjdHguc2F2ZSgpXG4gICAgICAgIGN0eC50cmFuc2xhdGUgLUBzcHJpdGUud2lkdGgvMiwgLUBzcHJpdGUuaGVpZ2h0LzJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSggQHNwcml0ZS50ZXh0dXJlLCBAc3gsIEBzeSwgQHNwcml0ZS53aWR0aCwgQHNwcml0ZS5oZWlnaHQsIDAsIDAsIEBzcHJpdGUud2lkdGgsIEBzcHJpdGUuaGVpZ2h0IClcbiAgICAgICAgY3R4LnJlc3RvcmUoKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNoYXBlXG4iLCJcbiMgRXZlcnkgc3ByaXRlIGhhcyBhIFRleHR1cmUgYW5kIGEgbnVtYmVyIG9mIEFzc2V0cy5cbiMgVGhlc2UgQXNzZXRzIGNhbiBiZSBvZiB0eXBlIFNoYXBlIChzaW1wbGUgSW1hZ2VzKSBvciBBbmltYXRpb25cbiNcbiMgdXNhZ2U6XG4jXG4jIHNwcml0ZSA9IG5ldyBTcHJpdGVcbiMgICBcInRleHR1cmVcIjogXCJpbWcvdGV4dHVyZS5wbmdcbiMgICBcIndpZHRoXCI6NTBcbiMgICBcImhlaWdodFwiOjUwXG4jICAgXCJrZXlcIjpcbiMgICAgIFwic3BhY2VzaGlwXCI6IDFcbiMgICAgIFwicm9ja1wiOiAyXG4jICAgICBcImVuZW15XCI6IDNcbiNcbiMgc3ByaXRlLnJlbmRlcihcInNwYWNlc2hpcFwiKVxuI1xuXG5TaGFwZSA9IHJlcXVpcmUgJ3NoYXBlJ1xuQW5pbWF0aW9uID0gcmVxdWlyZSAnYW5pbWF0aW9uJ1xuXG5jbGFzcyBTcHJpdGVcbiAgICBjb25zdHJ1Y3RvcjogKGhhc2gpIC0+XG4gICAgICAgIEBhc3NldHMgPSB7fVxuICAgICAgICBAd2lkdGggPSBoYXNoW1wid2lkdGhcIl1cbiAgICAgICAgQGhlaWdodCA9IGhhc2hbXCJoZWlnaHRcIl1cbiAgICAgICAgQHRleHR1cmUgPSBuZXcgSW1hZ2UoKVxuICAgICAgICBAdGV4dHVyZS5zcmMgPSBoYXNoW1widGV4dHVyZVwiXVxuICAgICAgICBAa2V5ID0gaGFzaFtcImtleVwiXSA/IHt9XG5cbiAgICAgICAgZm9yIGtleSwgaSBvZiBAa2V5XG4gICAgICAgICAgICBAYWRkSW1hZ2Uga2V5LCBpXG5cbiAgICAgICAgQGlubmVyV2lkdGggPSBoYXNoW1wiaW5uZXJXaWR0aFwiXSA/IEB3aWR0aFxuICAgICAgICBAaW5uZXJIZWlnaHQgPSBoYXNoW1wiaW5uZXJIZWlnaHRcIl0gPyBAaGVpZ2h0XG5cbiAgICBhZGRJbWFnZTogKG5hbWUsIGluZGV4KSAtPlxuICAgICAgICAkKEB0ZXh0dXJlKS5sb2FkID0+XG4gICAgICAgICAgICBAdGV4V2lkdGggPSBAdGV4dHVyZS53aWR0aFxuICAgICAgICAgICAgQGFzc2V0c1tuYW1lXSA9IG5ldyBTaGFwZSB0aGlzLCBpbmRleFxuXG4gICAgYWRkQW5pbWF0aW9uOiAobmFtZSwgcGFyYW1zKSAtPlxuICAgICAgICAkKEB0ZXh0dXJlKS5sb2FkID0+XG4gICAgICAgICAgICBAdGV4V2lkdGggPSBAdGV4dHVyZS53aWR0aFxuICAgICAgICAgICAgQGFzc2V0c1tuYW1lXSA9IG5ldyBBbmltYXRpb24gdGhpcywgcGFyYW1zXG5cbiAgICByZW5kZXI6IChuYW1lLCBjdHgpIC0+XG4gICAgICAgIEBhc3NldHNbbmFtZV0ucmVuZGVyKGN0eCkgaWYgQGFzc2V0c1tuYW1lXT9cblxuXG5cbkBpcmYuU3ByaXRlID0gU3ByaXRlXG4iLCJcbkJvdW5kaW5nQm94ID0gcmVxdWlyZSAnYm91bmRpbmdCb3gnXG5WZWN0b3IgPSByZXF1aXJlICd2ZWN0b3InXG5cbmNsYXNzIFRpbGVcbiAgICBjb25zdHJ1Y3RvcjogKEBzcHJpdGUsIEB0eXBlLCBAcm93LCBAY29sLCBAZ3JlZW49MCwgQHo9MCkgLT5cbiAgICAgICAgQG5laWdoYm9yID0gW11cbiAgICAgICAgQHggPSBAY29sICogQHNwcml0ZS5pbm5lcldpZHRoICsgQHNwcml0ZS5pbm5lcldpZHRoLzJcbiAgICAgICAgQHkgPSBAcm93ICogQHNwcml0ZS5pbm5lckhlaWdodCArIEBzcHJpdGUuaW5uZXJIZWlnaHQvMlxuICAgICAgICBAYmIgPSBuZXcgQm91bmRpbmdCb3ggbmV3IFZlY3RvciggQHgsIEB5ICksIG5ldyBWZWN0b3IoIEBzcHJpdGUuaW5uZXJXaWR0aCwgQHNwcml0ZS5pbm5lckhlaWdodCApXG4gICAgICAgIEBiYi5jb2xvciA9IFwiZ3JlZW5cIlxuXG4gICAgaXNXYWxrYWJsZTogLT5cbiAgICAgICAgQGdyZWVuIGlzIDBcblxuICAgIHNxdWFyZWREaXN0YW5jZVRvOiAodmVjKSAtPlxuICAgICAgICB2ZWMuc3VidHJhY3QoIG5ldyBWZWN0b3IoQHgsQHkpICkubGVuZ3RoU3F1YXJlZCgpICMgbWF5YmUgYWRkIGEgZGlzdGFuY2UgKGNsYXNzLSltZXRob2QgdG8gdmVjdG9yP1xuXG4gICAgcmVuZGVyOiAoY3R4KSAtPlxuICAgICAgICBjdHguc2F2ZSgpXG4gICAgICAgIGN0eC50cmFuc2xhdGUgQHggLSBAeiwgQHkgLSBAelxuICAgICAgICBAc3ByaXRlLnJlbmRlciggQHR5cGUsIGN0eCApXG4gICAgICAgIGN0eC5yZXN0b3JlKClcblxuICAgICAgICAjIEBiYi5yZW5kZXIgY3R4XG5cbm1vZHVsZS5leHBvcnRzID0gVGlsZVxuXG4iLCJcbiMgQSBzaW1wbGUgVGltZXI6XG4jIGl0IGhlbHBzIHlvdSBrZWVwIHRyYWNrIG9mIHRoZSB0aW1lIHRoYXQgaGFzIGVsYXBzZWQgc2luY2UgeW91IGxhc3QgXCJwdW5jaCgpXCItZWQgaXRcblxuXG5jbGFzcyBUaW1lclxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAbGFzdF90aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgQGRlbHRhID0gMFxuXG4gICAgIyBwdW5jaCByZXNldHMgdGhlIHRpbWVyIGFuZCByZXR1cm5zIHRoZSB0aW1lIChpbiBtcykgYmV0d2VlbiB0aGUgbGFzdCB0d28gcHVuY2hlc1xuICAgIHB1bmNoOiAtPlxuICAgICAgICB0aGlzX3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICBAZGVsdGEgPSB0aGlzX3RpbWUgLSBAbGFzdF90aW1lXG4gICAgICAgIEBsYXN0X3RpbWUgPSB0aGlzX3RpbWVcbiAgICAgICAgcmV0dXJuIEBkZWx0YVxuXG4gICAgIyBkZWx0YSBnaXZlcyB5b3UgdGhlIHRpbWUgdGhhdCBoYXMgZWxhcHNlZCBzaW5jZSB0aGUgdGltZXIgd2FzIHB1bmNoZWQgdGhlIGxhc3QgdGltZVxuICAgIHRpbWVTaW5jZUxhc3RQdW5jaDogLT5cbiAgICAgICAgdGhpc190aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgdGhpc190aW1lIC0gQGxhc3RfdGltZVxuXG4gICAgZnBzOiAtPlxuICAgICAgICAxMDAwIC8gQGRlbHRhXG5cbm1vZHVsZS5leHBvcnRzID0gVGltZXJcbiIsIiNcbiMgIHZlY3Rvci5jb2ZmZWVcbiNcbiMgIENyZWF0ZWQgYnkgS29samEgV2lsY2tlIGluIE9jdG9iZXIgMjAxMVxuIyAgQ29weXJpZ2h0IDIwMTEuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4jXG4jICBUaGUgdW5kZXJzY29yZSBhdCB0aGUgZW5kIG9mIGEgbWV0aG9kIHNpZ25pZmllcyB0aGF0IGl0IG9wZXJhdGVzIG9uIGl0c2VsZlxuI1xuXG5jbGFzcyBWZWN0b3JcbiAgICBjb25zdHJ1Y3RvcjogKHggPSAwLCB5ID0gMCkgLT5cbiAgICAgICAgQHggPSB4XG4gICAgICAgIEB5ID0geVxuXG4gICAgY2xvbmU6IC0+XG4gICAgICAgIG5ldyBWZWN0b3IgQHgsIEB5XG5cbiAgICAjIEFkZCBhbm90aGVyIFZlY3RvclxuICAgIGFkZDogKHZlYykgLT5cbiAgICAgICAgbmV3IFZlY3RvciBAeCArIHZlYy54LCBAeSArIHZlYy55XG5cbiAgICBhZGRfOiAodmVjKSAtPlxuICAgICAgICBAeCArPSB2ZWMueFxuICAgICAgICBAeSArPSB2ZWMueVxuXG4gICAgIyBTdWJ0cmFjdCBhbm90aGVyIFZlY3RvclxuICAgIHN1YnRyYWN0OiAodmVjKSAtPlxuICAgICAgICBuZXcgVmVjdG9yIEB4IC0gdmVjLngsIEB5IC0gdmVjLnlcblxuICAgIHN1YnRyYWN0XzogKHZlYykgLT5cbiAgICAgICAgQHggLT0gdmVjLnhcbiAgICAgICAgQHkgLT0gdmVjLnlcblxuICAgICMgbXVsdGlwbHkgdGhlIHZlY3RvciB3aXRoIGEgTnVtYmVyXG4gICAgbXVsdDogKG51bSkgLT5cbiAgICAgICAgbmV3IFZlY3RvciBAeCAqIG51bSwgQHkgKiBudW1cblxuICAgIG11bHRfOiAobnVtKSAtPlxuICAgICAgICBAeCAqPSBudW1cbiAgICAgICAgQHkgKj0gbnVtXG5cbiAgICAjIHJldHVybnMgdGhlIGxlbmd0aCBvZiB0aGUgdmVjdG9yIChCZXRyYWcpXG4gICAgbGVuZ3RoOiAtPlxuICAgICAgICBNYXRoLnNxcnQgQHgqQHggKyBAeSpAeVxuXG4gICAgIyByZXR1cm4gdGhlIGxlbmd0aCBzcXVhcmVkIChmb3Igb3B0aW1pc2F0aW9uKVxuICAgIGxlbmd0aFNxdWFyZWQ6IC0+XG4gICAgICAgIEB4KkB4ICsgQHkqQHlcblxuICAgICMgcmV0dXJucyB0aGUgbm9ybWFsaXplZCB2ZWN0b3IgKExlbmd0aCA9IDEpXG4gICAgbm9ybTogKGZhY3Rvcj0xKSAtPlxuICAgICAgICBpZiAoIEBsZW5ndGgoKSA+IDAgKVxuICAgICAgICAgICAgcmV0dXJuIEBtdWx0IGZhY3Rvci9sXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBudWxsXG5cbiAgICBub3JtXzogKGZhY3Rvcj0xKSAtPlxuICAgICAgICBpZiAoIEBsZW5ndGgoKSA+IDAgKVxuICAgICAgICAgICAgcmV0dXJuIEBtdWx0XyBmYWN0b3IvbFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgIyByZXR1cm5zIHRoZSBzY2FsYXJwcm9kdWN0XG4gICAgc2NhbGFyUHJvZHVjdDogKHZlYykgLT5cbiAgICAgICAgQHggKiB2ZWMueCArIEB5ICogdmVjLnlcblxuICAgIHNhbWVEaXJlY3Rpb246ICh2ZWMpIC0+XG4gICAgICAgIGlmIChAbGVuZ3RoU3F1YXJlZCgpIDwgQGFkZCh2ZWMpLmxlbmd0aFNxdWFyZWQoKSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgIyByZXR1cm5zIHRoZSBhbmdsZSBpdCBmb3JtcyB3aXRoIGEgZ2l2ZW4gdmVjdG9yXG4gICAgYW5nbGVXaXRoOiAodmVjKSAtPlxuICAgICAgICBNYXRoLmFjb3MoIEBzY2FsYXJQcm9kdWN0KCB2ZWMgKSAvIEBsZW5ndGgoKSAqIHZlYy5sZW5ndGgoKSApXG5cbiAgICAjIHJldHVybnMgdGhlIHZlY3RvcnByb2R1Y3QgKHZlY3Rvci9LcmV1enByb2R1a3QpIC0tIG5vdCB5ZXQgaW1wbGVtZW50ZWRcbiAgICB2ZWN0b3JQcm9kdWN0OiAodmVjKSAtPlxuICAgICAgICByZXR1cm4gdGhpc1xuXG4gICAgIyByZXR1cm5zIHRoZSBjb21wb25lbnQgcGFyYWxsZWwgdG8gYSBnaXZlbiB2ZWN0b3JcbiAgICBwcm9qZWN0VG86ICh2ZWMpIC0+XG4gICAgICAgIHZlYy5tdWx0KCBAc2NhbGFyUHJvZHVjdCh2ZWMpIC8gdmVjLmxlbmd0aFNxdWFyZWQoKSApXG5cbiAgICBwcm9qZWN0VG9fOiAodmVjKSAtPlxuICAgICAgICBtID0gQHNjYWxhclByb2R1Y3QodmVjKSAvIHZlYy5sZW5ndGhTcXVhcmVkKClcbiAgICAgICAgQHggKj0gbVxuICAgICAgICBAeSAqPSBtXG5cblxuICAgICMgQ2xhc3MgbWV0aG9kOiBjaGVja3MgaWYgdHdvIHZlY3RvcnMgYXJlIGludGVyc2VjdGluZyAtIHJldHVybnMgaW50ZXJzZWN0aW9uIHBvaW50XG4gICAgQGludGVyc2VjdGluZzogKG9hLCBhLCBvYiwgYikgLT5cblxuICAgICAgICBjID0gb2Iuc3VidHJhY3Qgb2FcbiAgICAgICAgYiA9IGIubXVsdCAtMVxuICAgICAgICBjb2wgPSBbXVxuXG4gICAgICAgIGNvbFswXSA9IGEuY2xvbmUoKVxuICAgICAgICBjb2xbMV0gPSBiLmNsb25lKClcbiAgICAgICAgY29sWzJdID0gYy5jbG9uZSgpXG4gICAgICAgIGw9MDsgbT0xOyBuPTJcblxuICAgICAgICAjIE11bHRpcGxpY2F0b3JcblxuICAgICAgICBtdWx0ID0gY29sWzBdLnkgLyBjb2xbMF0ueFxuXG4gICAgICAgICMgQnJpbmcgTWF0cml4IGludG8gVHJpYW5ndWxhciBzaGFwZVxuXG4gICAgICAgIGNvbFswXS55ID0gMFxuICAgICAgICBjb2xbMV0ueSA9IGNvbFsxXS55IC0gKG11bHQgKiBjb2xbMV0ueClcbiAgICAgICAgY29sWzJdLnkgPSBjb2xbMl0ueSAtIChtdWx0ICogY29sWzJdLngpXG5cbiAgICAgICAgIyBSZXZlcnNlIFN1YnN0aXR1dGlvblxuXG4gICAgICAgIG11ID0gY29sW25dLnkgLyBjb2xbbV0ueVxuICAgICAgICAjIGxiID0gKGNvbFtuXS54IC0gKGNvbFttXS54ICogbXUpKSAvIGNvbFtsXS54ICMgIG11IGlzIHN1ZmZpY2llbnQgc28gdGhpcyBkb2Vzbid0IG5lZWQgdG8gYmUgZG9uZVxuXG4gICAgICAgIHJldHVybiBvYi5zdWJ0cmFjdCggYi5tdWx0KG11KSApXG5cbiAgICBwcmludDogLT5cbiAgICAgICAgcmV0dXJuIFwiKCN7QHh9LCAje0B5fSlcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IFZlY3RvclxuIl19
