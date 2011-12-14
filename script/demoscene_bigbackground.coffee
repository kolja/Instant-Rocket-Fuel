
sceneclass["bigbg"] = class SceneBigBackground extends Scene
  constructor: (@parent) ->
    
    console.log "width: #{@parent.width} -- height: #{@parent.height}" 
    
    backgroundsprite = new Sprite
      "texture": "assets/images/weltraum.jpg"
      "width": 500
      "height": 500
    @background = new Background backgroundsprite
    
    @spaceships = []
    for i in [0..3]
      @spaceships[i] = new Spaceship
    
  update: (delta) ->
    for spaceship in @spaceships
      spaceship.update delta
    
  render: (ctx) -> 
    @background.render(ctx)
    for spaceship in @spaceships
      spaceship.render ctx
