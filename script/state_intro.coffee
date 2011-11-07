
class StateIntro extends State
  constructor: ->
    beach3d = new Sprite
      "texture": "assets/images/beach3d.png"
      "width": 107
      "height": 107
      "texWidth": 428
      "key":
        "#.##": 0
        ".###": 1
        "##.#": 2
        "###.": 3
        "#.#.": 4
        "..##": 5
        ".#.#": 6
        "##..": 7
        "..#.": 8
        "...#": 9
        ".#..": 10
        "#...": 11
        "####": 12
        "....": 13
        "#..#": 14
        ".##.": 15

    
    @map = new Map
      "map": "assets/minimap.png"
      "pattern": "square"
      "sprite": beach3d
    
    #"#.#.", 0
    #"##..", 1
    #".#.#", 2
    #"..##", 3
    #"#.##", 4
    #".###", 5
    #"###.", 6
    #"##.#", 7
    #".#..", 8
    #"#...", 9
    #"...#", 10
    #"..#.", 11
    #".##.", 12
    #"#..#", 13
    #"....", 16
    #"####", 17
    
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
