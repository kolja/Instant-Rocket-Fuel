
sceneclass["jumpnrun"] = class SceneJumpNRun extends Scene
  constructor: (@parent) ->
    @hero = new Hero(@parent.eventManager, @parent.keyboard)

    @camera = new Camera {"projection": "normal", "vpWidth": @parent.width, "vpHeight": @parent.height}
    # @camera.coor = new Vector(2500,1050)

    jumpnrunSprite = new Sprite
      "texture": "assets/images/jumpnrun.png"
      "width": 100
      "height": 100
      "innerWidth": 95
      "innerHeight": 95
      "key":
        "00": 0
        "11": 1
        '22': 2
        "33": 3
        "44": 4
        '55': 5
        "66": 6
        "77": 7
        '88': 8
        "99": 9
        "aa": 10
        "bb": 11

    # this whole function can actually be replaced by the string "sinple"
    # you can, however use it to override the Maps standard Mapfile interpretation mechanism.
    customReadFunction = ->
      for row in [0..@map.height-1]
        for col in [0..@map.width-1]
          type = "#{@mapData[row][col][0]}"
          green = parseInt( @mapData[row][col][1], 16 )
          z = parseInt( @mapData[row][col][2], 16 )
          @tiles.push( new Tile( @sprite, type, row, col, green, z ))

    @background = new Map
      "mapfile": "assets/jumpnrun_map.png"
      "pattern": customReadFunction
      "sprite": jumpnrunSprite

    @spaceships = []
    for i in [0..3]
      @spaceships[i] = new Spaceship @parent.eventManager, @parent.keyboard

  update: (delta) ->
    @hero.update(delta, @background)
    @camera.coor = @hero.coor
    for spaceship in @spaceships
      spaceship.update delta

  render: (ctx) ->
    @camera.apply ctx, =>
      @background.render(ctx, @camera)
      @hero.render(ctx)
      for spaceship in @spaceships
        spaceship.render ctx

