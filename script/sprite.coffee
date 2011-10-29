
# Every sprite has a Texture and a number of Assets.
# These Assets can be of type Shape (simple Images) or Animation
# 
# usage:
#
# sprite = new Sprite( "img/texture.png", 50, 50 )
# sprite.addImage "spaceship", 5 # use the sixth image on the texture as spaceship
# sprite.render("spaceship")
#

class Sprite
  constructor: ( file, @width, @height ) ->
    @texture = new Image()
    @texture.src = file
    @texWidth = 250
    @assets = {}
    
  addImage: (name, index) ->
    @assets[name] = new Shape this, index
    
  addAnimation: (name, params) ->
    @assets[name] = new Animation this, params
    
  render: (name, ctx) ->
    @assets[name].render(ctx)

class Shape
  constructor: (sprite, index) ->
    @sprite = sprite
    @sx = ( index * @sprite.width ) % @sprite.texWidth
    @sy = Math.floor(( index * @sprite.width ) / @sprite.texWidth) * @sprite.height
    
  render: (ctx) ->
    ctx.drawImage( @sprite.texture, @sx, @sy, @sprite.width, @sprite.height, 0, 0, @sprite.width, @sprite.height )

class Animation 
  constructor: (sprite, params) ->
    @sprite = sprite
    @fps = params["fps"] ? 30
    @loop = params["loop"] ? true
    @callback = params["callback"] ? null
    @frames = for index in params["frames"] 
      do (index) =>
        new Shape @sprite, index
    @lastFrame = @frames.length - 1
    @timer = new Timer
    @currentFrame = 0
    @playing = true
    
  render: (ctx) ->
    if @playing
      @currentFrame = Math.floor( @timer.timeSinceLastPunch() / (1000 / @fps) )
      if @currentFrame > @lastFrame
        @callback()
        if @loop
          @rewind()
        else
          @currentFrame = @lastFrame
          @stop()
        
    @frames[@currentFrame].render(ctx)
    
  play: ->
    @playing = true
    
  stop: ->
    @playing = false
    
  rewind: ->
    @currentFrame = 0
    @timer.punch()
    