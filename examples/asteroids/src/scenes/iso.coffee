
sceneclass["iso"] = class SceneIso extends Scene
  constructor: (@parent) ->

    @camera = new Camera {"projection": "iso", "vpWidth": @parent.width, "vpHeight": @parent.height}
    # @camera.coor = new Vector(2500,1050)

    beach3d = new Sprite
      "texture": "assets/images/beach3d.png"
      "width": 107
      "height": 107
      "innerWidth": 87
      "innerHeight": 87
      "key":
        "dd00dddd": 0
        "00dddddd": 1
        "dddd00dd": 2
        "dddddd00": 3
        "dd00dd00": 4
        "0000dddd": 5
        "00dd00dd": 6
        "dddd0000": 7
        "0000dd00": 8
        "000000dd": 9
        "00dd0000": 10
        "dd000000": 11
        "dddddddd": 12
        "00000000": 13
        "dd0000dd": 14
        "00dddd00": 15

    @background = new Map
      "mapfile": "assets/map.png"
      "pattern": "square"
      "sprite": beach3d


  update: (delta) ->

  render: (ctx) ->
    @camera.apply ctx, =>
      @background.render(ctx, @camera)

