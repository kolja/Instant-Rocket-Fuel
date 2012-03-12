

class Spaceship
  constructor: (@eventManager, @keyboard) ->
    @state = "normal"
    @sprite = new Sprite
      "texture": "assets/images/test.png"
      "width": 50
      "height": 50

    @sprite.addImage "normal", Math.floor Math.random() * 10
    # @sprite.addAnimation "normal", { frames: [0,1,2,3,4].shuffle(), fps: 3, loop: true, callback: @hello }
    @coor = new Vector( Math.random() * 1024, Math.random() * 768 )
    @speed = new Vector( 0.1, 0.1 )
    if Math.random() > 0.5
      @speed = @speed.mult -1

  update: (delta) ->
    @coor = @coor.add( @speed.mult delta )

    if @coor.x > 1024
      @speed.x = @speed.x * -1
      @coor.x = 1024
      @eventManager.trigger "touchdown"
    if @coor.x < 0
      @speed.x = @speed.x * -1
      @coor.x = 0
    if @coor.y > 768
      @speed.y = @speed.y * -1
      @coor.y = 768
    if @coor.y < 0
      @speed.y = @speed.y * -1
      @coor.y = 0

  touchdown: ->
    console.log "Spaceship says: Touchdown"

  render: (ctx) ->
    ctx.save()
    ctx.translate @coor.x, @coor.y
    @sprite.render( @state, ctx )
    ctx.restore()

  hello: ->
    console.log "hello!"

