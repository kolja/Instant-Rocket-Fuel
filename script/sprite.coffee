
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
    
  addAnimation: ->
    # todo: implement this
    
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
  constructor: (sprite) ->
    
  render: (ctx) ->
    ctx.drawImage( @texture, @assets[name].sx, @assets[name].sy, @width, @height, 0, 0, @width, @height )