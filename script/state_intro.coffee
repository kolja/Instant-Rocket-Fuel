
class StateIntro extends State
  constructor: ->
    beach3d = new Sprite
      "texture": "assets/images/beach3d.png"
      "width": 107
      "height": 107
      "innerWidth": 87
      "innerHeight": 87
      "texWidth": 428
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
    
    maze = new Sprite
      "texture": "assets/images/walls.png"
      "width": 100
      "height": 100
      "innerWidth": 50
      "innerHeight": 50
      "texWidth": 600
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
      "map": "assets/minimap.png"
      "overlap": 87 
      "pattern": "square"
      "sprite": beach3d

    #@background = new Map
    #  "map": "assets/maze.png"
    #  "overlap": 50
    #  "pattern": "cross"
    #  "sprite": maze

    # @background = new Background
    
    @spaceships = []
    for i in [0..3]
      do (i) =>
        @spaceships[i] = new Spaceship
    
  update: (delta) ->
    for spaceship in @spaceships
      do (spaceship) =>
        spaceship.update delta
    
  render: (ctx) -> 
    @background.render(ctx)
    for spaceship in @spaceships
      do (spaceship) =>
        spaceship.render ctx
