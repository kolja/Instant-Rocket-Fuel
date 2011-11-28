

class Hero
  constructor: (@eventmanager, @keyboard) ->
    
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
    @force = new Vector( 0.01, 0 )
    @gravity = new Vector( 0, 0.01 )

    @bb = new BoundingBox @coor, new Vector( 50, 50 )

    # event Manager
    @eventmanager.register "touchdown", @touchdown
  
  touchdown: ->
    console.log "Hero says: Touchdown occurred" 
  
  update: (delta, map) ->
    
    # apply gravity
    walkable = map.tileAtVector(@coor).neighbor["s"].isWalkable?() 
    if walkable
      @speed.add_ @gravity
    else
      @speed.y = 0
      @state = "normal"
    
    # left/right movement
    if @keyboard.key("right")
      @speed.add_ @force 
    else if @keyboard.key("left")
      @speed.subtract_ @force 
    else
      if @speed.x > 0
        @speed.subtract_ @force
      else
        @speed.add_ @force
      
    # jump
    if @keyboard.key("space") and @state isnt "jumping"
      @state = "jumping"
      @speed.y = -0.5
      
    @coor = @coor.add( @speed.mult delta )
    @bb.coor = @coor

  render: (ctx) ->
    ctx.save()
    ctx.translate @coor.x, @coor.y
    @sprite.render( @state, ctx )
    ctx.restore()
    
    # the BoundingBox has Coordinates. A sprite doesn't. So the bounding-box is rendered outside of the save/resotore area.
    # it will take care of the propper displacement itself.
    @bb.render ctx



