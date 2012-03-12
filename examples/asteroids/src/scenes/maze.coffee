sceneclass["maze"] = class SceneMaze extends Scene
  constructor: (@parent) ->
    @camera = new Camera {"projection": "normal", "vpWidth": @parent.width, "vpHeight": @parent.height}
    maze = new Sprite
      "texture": "assets/images/walls.png"
      "width": 100
      "height": 100
      "innerWidth": 50
      "innerHeight": 50
      "key":
        "dddddddd": 0
        "dd00dddd": 1
        "dddd00dd": 2
        "dddddd00": 3
        "00dddddd": 4
        "00000000": 5
        "00dddd00": 6
        "0000dddd": 7
        "dd0000dd": 8
        "dddd0000": 9
        "00dd00dd": 12
        "dd00dd00": 13
        "00dd0000": 14
        "0000dd00": 15
        "000000dd": 16
        "dd000000": 17

    @background = new Map
      "mapfile": "assets/maze.png"
      "pattern": "cross"
      "sprite": maze

    @spaceships = []
    for i in [0..3]
      @spaceships[i] = new Spaceship(@parent.eventManager, @parent.keyboard)

  update: (delta) ->
    for spaceship in @spaceships
      spaceship.update delta

  render: (ctx) ->
    @background.render(ctx, @camera)
    for spaceship in @spaceships
      spaceship.render ctx

