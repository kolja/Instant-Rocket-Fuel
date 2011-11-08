
class StateIntro extends State
  constructor: ->
    beach3d = new Sprite
      "texture": "assets/images/beach3d.png"
      "width": 107
      "height": 107
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

    
    @map = new Map
      "map": "assets/minimap.png"
      "pattern": "square"
      "sprite": beach3d
    
    #"dd00dd00", 0
    #"dddd0000", 1
    #"00dd00dd", 2
    #"0000dddd", 3
    #"dd00dddd", 4
    #"00dddddd", 5
    #"dddddd00", 6
    #"dddd00dd", 7
    #"00dd0000", 8
    #"dd000000", 9
    #"000000dd", 10
    #"0000dd00", 11
    #"00dddd00", 12
    #"dd0000dd", 13
    #"00000000", 16
    #"dddddddd", 17
    
    @spaceships = []
    for i in [0..3]
      do (i) =>
        @spaceships[i] = new Spaceship
    
  update: (delta) ->
    for spaceship in @spaceships
      do (spaceship) =>
        spaceship.update delta
    
  render: (ctx) ->
    @map.render(ctx)
    for spaceship in @spaceships
      do (spaceship) =>
        spaceship.render ctx
