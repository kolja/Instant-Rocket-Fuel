

class Camera

  constructor: ->
    @state = "normal"
    @sprite = new Sprite
      "texture": "assets/images/test.png"
      "width": 50
      "height": 50
      
    for direction in ['left', 'up', 'right', 'down', 'space']
      @key[direction] = false
      
    @sprite.addImage "normal", 4
    @coor = new Vector( 100, 100 )
    @speed = new Vector( 0.1, 0.1 )
    
    $("html").bind "keydown", (event) =>
      directions = {37:"left",38:"up",39:"right",40:"down",32:"space"}
      @key[directions[event.which]] = true
      console.log event.which
  
  update: (delta) ->
    @coor = @coor.add( @speed.mult delta )

  render: (ctx) ->
    ctx.save()
    ctx.translate @coor.x, @coor.y
    @sprite.render( @state, ctx )
    ctx.restore()
    
  hello: ->
    console.log "hello!"
    
        