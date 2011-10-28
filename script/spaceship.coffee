

class Spaceship

  constructor: ->
    @state = "normal"
    @sprite = new Sprite( "assets/images/test.png", 50, 50 )
    @sprite.addImage "normal", Math.floor Math.random() * 10
    # @sprite.addAnimation "explode", { frames: [1,2,3,4,5], loop: false }
    @coor = new Vector( Math.random() * 1024, Math.random() * 768 )
    @speed = new Vector( 0.1, 0.1 )
    if Math.random() > 0.5
      @speed = @speed.mult -1
  
  update: (delta) ->
    @coor = @coor.add( @speed.mult delta )

    if @coor.x > 1024 or @coor.x < 0
      @speed.x = @speed.x * -1
    if @coor.y > 768 or @coor.y < 0
      @speed.y = @speed.y * -1

  render: (ctx) ->
    ctx.save()
    ctx.translate @coor.x, @coor.y
    @sprite.render( @state, ctx )
    ctx.restore()