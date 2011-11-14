

class Hero

  constructor: ->
    @state = "normal"
    @sprite = new Sprite
      "texture": "assets/images/test.png"
      "width": 50
      "height": 50
      "key":
        "normal": 3
        "jumping": 5

    @coor = new Vector( 100, 100 )
    @speed = new Vector( 0, 0 )
    @force = 0.01
    @gravity = 0.01

    @camera = new Camera "normal"

    # Eventhandling stuff:

    @key = []
    for direction in ['left', 'up', 'right', 'down', 'space']
      @key[direction] = false

    $("html").bind "keydown", (event) =>
      directions = {37:"left",38:"up",39:"right",40:"down",32:"space"}
      @key[directions[event.which]] = true
      
    $("html").bind "keyup", (event) =>
      directions = {37:"left",38:"up",39:"right",40:"down",32:"space"}
      @key[directions[event.which]] = false
  
  update: (delta, map) ->
    
    # apply gravity
    if map.tileAtVector(@coor).isWalkable()
      @speed.y += @gravity
    else
      @speed.y = 0
      @state = "normal"
    
    # left/right movement
    if @key["right"] 
      @speed.x += @force 
    else if @key["left"]
      @speed.x -= @force 
    else
      if @speed.x > 0
        @speed.x -= @force
      else
        @speed.x += @force
      
    
    # jump
    if @key["space"] and @state isnt "jumping"
      @state = "jumping"
      @speed.y = -0.5
       
    @coor = @coor.add( @speed.mult delta )
    @camera.coor = @coor

  render: (ctx) ->
    ctx.save()
    ctx.translate @coor.x, @coor.y
    @sprite.render( @state, ctx )
    ctx.restore()



