(function() {
  var Asteroids, Hero, SceneBigBackground, SceneHeight, SceneIso, SceneJumpNRun, SceneMaze, Spaceship, k, sceneclass, v;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  for (k in IRF) {
    v = IRF[k];
    eval("var " + k + " = v");
  }
  sceneclass = sceneclass != null ? sceneclass : {};
  Asteroids = (function() {
    __extends(Asteroids, Game);
    function Asteroids(width, height) {
      Asteroids.__super__.constructor.call(this, width, height);
      this.eventManager = new EventManager;
      this.keyboard = new Keyboard;
      this.sceneManager = new SceneManager(this, sceneclass);
      this.sceneManager.setScene("maze");
    }
    Asteroids.prototype.update = function() {
      Asteroids.__super__.update.call(this);
      return this.sceneManager.currentScene.update(this.timer.delta);
    };
    Asteroids.prototype.render = function() {
      Asteroids.__super__.render.call(this);
      this.sceneManager.currentScene.render(this.ctx);
      return this.ctx.fillText(this.timer.fps().toFixed(1), this.width - 50, 20);
    };
    return Asteroids;
  })();
  jQuery(function() {
    var asteroids;
    asteroids = new Asteroids(800, 600);
    return asteroids.start();
  });
  Hero = (function() {
    function Hero(eventManager, keyboard) {
      this.eventManager = eventManager;
      this.keyboard = keyboard;
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
      this.force = new Vector(0.01, 0);
      this.gravity = new Vector(0, 0.01);
      this.bb = new BoundingBox(this.coor, new Vector(50, 50));
      this.bb.color = "red";
      this.eventManager.register("touchdown", this.touchdown);
    }
    Hero.prototype.touchdown = function() {
      return console.log("Hero says: Touchdown occurred");
    };
    Hero.prototype.update = function(delta, map) {
      var tileBelow;
      tileBelow = map.tileAtVector(this.coor).neighbor["s"];
      this.speed.add_(this.gravity);
      if (this.bb.intersect(tileBelow.bb) && !(typeof tileBelow.isWalkable === "function" ? tileBelow.isWalkable() : void 0)) {
        this.speed.y = 0;
        this.state = "normal";
      }
      if (this.keyboard.key("right")) {
        this.speed.add_(this.force);
      } else if (this.keyboard.key("left")) {
        this.speed.subtract_(this.force);
      } else {
        if (this.speed.x > 0) {
          this.speed.subtract_(this.force);
        } else {
          this.speed.add_(this.force);
        }
      }
      if (this.keyboard.key("space") && this.state !== "jumping") {
        this.state = "jumping";
        this.speed.y = -0.7;
      }
      this.coor = this.coor.add(this.speed.mult(delta));
      return this.bb.coor = this.coor;
    };
    Hero.prototype.render = function(ctx) {
      ctx.save();
      ctx.translate(this.coor.x, this.coor.y);
      this.sprite.render(this.state, ctx);
      ctx.restore();
      return this.bb.render(ctx);
    };
    return Hero;
  })();
  Spaceship = (function() {
    function Spaceship(eventManager, keyboard) {
      this.eventManager = eventManager;
      this.keyboard = keyboard;
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
        this.eventManager.trigger("touchdown");
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
    Spaceship.prototype.touchdown = function() {
      return console.log("Spaceship says: Touchdown");
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
  sceneclass["bigbg"] = SceneBigBackground = (function() {
    __extends(SceneBigBackground, Scene);
    function SceneBigBackground(parent) {
      var backgroundsprite, i;
      this.parent = parent;
      backgroundsprite = new Sprite({
        "texture": "assets/images/weltraum.jpg",
        "width": 500,
        "height": 500
      });
      this.background = new Background(backgroundsprite);
      console.log(this.background);
      this.spaceships = [];
      for (i = 0; i <= 3; i++) {
        this.spaceships[i] = new Spaceship(this.parent.eventManager);
      }
    }
    SceneBigBackground.prototype.update = function(delta) {
      var spaceship, _i, _len, _ref, _results;
      _ref = this.spaceships;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        spaceship = _ref[_i];
        _results.push(spaceship.update(delta));
      }
      return _results;
    };
    SceneBigBackground.prototype.render = function(ctx) {
      var spaceship, _i, _len, _ref, _results;
      ctx.save();
      ctx.translate(250, 250);
      this.background.render(ctx);
      ctx.restore();
      _ref = this.spaceships;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        spaceship = _ref[_i];
        _results.push(spaceship.render(ctx));
      }
      return _results;
    };
    return SceneBigBackground;
  })();
  sceneclass["height"] = SceneHeight = (function() {
    __extends(SceneHeight, Scene);
    function SceneHeight(parent) {
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
      this.camera = new Camera({
        "projection": "normal",
        "vpWidth": this.parent.width,
        "vpHeight": this.parent.height
      });
    }
    SceneHeight.prototype.update = function(delta) {};
    SceneHeight.prototype.render = function(ctx) {
      return this.background.render(ctx, this.camera);
    };
    return SceneHeight;
  })();
  sceneclass["iso"] = SceneIso = (function() {
    __extends(SceneIso, Scene);
    function SceneIso(parent) {
      var beach3d;
      this.parent = parent;
      this.camera = new Camera({
        "projection": "iso",
        "vpWidth": this.parent.width,
        "vpHeight": this.parent.height
      });
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
    SceneIso.prototype.update = function(delta) {};
    SceneIso.prototype.render = function(ctx) {
      return this.camera.apply(ctx, __bind(function() {
        return this.background.render(ctx, this.camera);
      }, this));
    };
    return SceneIso;
  })();
  sceneclass["jumpnrun"] = SceneJumpNRun = (function() {
    __extends(SceneJumpNRun, Scene);
    function SceneJumpNRun(parent) {
      var customReadFunction, i, jumpnrunSprite;
      this.parent = parent;
      this.hero = new Hero(this.parent.eventManager, this.parent.keyboard);
      this.camera = new Camera({
        "projection": "normal",
        "vpWidth": this.parent.width,
        "vpHeight": this.parent.height
      });
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
          "bb": 11
        }
      });
      customReadFunction = function() {
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
      this.background = new Map({
        "mapfile": "assets/jumpnrun_map.png",
        "pattern": customReadFunction,
        "sprite": jumpnrunSprite
      });
      this.spaceships = [];
      for (i = 0; i <= 3; i++) {
        this.spaceships[i] = new Spaceship(this.parent.eventManager, this.parent.keyboard);
      }
    }
    SceneJumpNRun.prototype.update = function(delta) {
      var spaceship, _i, _len, _ref, _results;
      this.hero.update(delta, this.background);
      this.camera.coor = this.hero.coor;
      _ref = this.spaceships;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        spaceship = _ref[_i];
        _results.push(spaceship.update(delta));
      }
      return _results;
    };
    SceneJumpNRun.prototype.render = function(ctx) {
      return this.camera.apply(ctx, __bind(function() {
        var spaceship, _i, _len, _ref, _results;
        this.background.render(ctx, this.camera);
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
    return SceneJumpNRun;
  })();
  sceneclass["maze"] = SceneMaze = (function() {
    __extends(SceneMaze, Scene);
    function SceneMaze(parent) {
      var i, maze;
      this.parent = parent;
      this.camera = new Camera({
        "projection": "normal",
        "vpWidth": this.parent.width,
        "vpHeight": this.parent.height
      });
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
        this.spaceships[i] = new Spaceship(this.parent.eventManager, this.parent.keyboard);
      }
    }
    SceneMaze.prototype.update = function(delta) {
      var spaceship, _i, _len, _ref, _results;
      _ref = this.spaceships;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        spaceship = _ref[_i];
        _results.push(spaceship.update(delta));
      }
      return _results;
    };
    SceneMaze.prototype.render = function(ctx) {
      var spaceship, _i, _len, _ref, _results;
      this.background.render(ctx, this.camera);
      _ref = this.spaceships;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        spaceship = _ref[_i];
        _results.push(spaceship.render(ctx));
      }
      return _results;
    };
    return SceneMaze;
  })();
}).call(this);
