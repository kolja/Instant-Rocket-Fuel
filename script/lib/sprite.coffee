
# Every sprite has a Texture and a number of Assets.
# These Assets can be of type Shape (simple Images) or Animation
# 
# usage:
#
# sprite = new Sprite
#   "texture": "img/texture.png
#   "width":50
#   "height":50
#   "key":
#     "spaceship": 1
#     "rock": 2
#     "enemy": 3
# 
# sprite.render("spaceship")
#

class Sprite
  constructor: (hash) ->
    @assets = {}
    @width = hash["width"]
    @height = hash["height"]
    @texture = new Image()
    @texture.src = hash["texture"]
    @key = hash["key"] ? {}
      
    for key, i of @key
      @addImage key, i

    @innerWidth = hash["innerWidth"] ? @width
    @innerHeight = hash["innerHeight"] ? @height
    
  addImage: (name, index) ->
    $(@texture).load =>
      @texWidth = @texture.width
      @assets[name] = new Shape this, index
    
  addAnimation: (name, params) ->
    $(@texture).load =>
      @texWidth = @texture.width
      @assets[name] = new Animation this, params
    
  render: (name, ctx) ->
    @assets[name].render(ctx) if @assets[name]?

class Shape
  constructor: (@sprite, index) ->
    @sx = ( index * @sprite.width ) % @sprite.texWidth
    @sy = Math.floor(( index * @sprite.width ) / @sprite.texWidth) * @sprite.height
    
  render: (ctx) ->
    ctx.save()
    ctx.translate -@sprite.width/2, -@sprite.height/2
    ctx.drawImage( @sprite.texture, @sx, @sy, @sprite.width, @sprite.height, 0, 0, @sprite.width, @sprite.height )
    ctx.restore()

class Animation 
  constructor: (@sprite, params) ->
    @fps = params["fps"] ? 30
    @loop = params["loop"] ? true
    @callback = params["callback"] ? null
    @frames = for index in params["frames"]
      new Shape @sprite, index
    @lastFrame = @frames.length - 1
    @timer = new Timer
    @currentFrame = 0
    @playing = true
    
  render: (ctx) ->
    if @playing
      @currentFrame = Math.floor( @timer.timeSinceLastPunch() / (1000 / @fps) )
      if @currentFrame > @lastFrame
        @callback?()
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
    