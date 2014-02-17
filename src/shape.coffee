
class Shape

    constructor: (@sprite, index) ->
        @sx = ( index * @sprite.width ) % @sprite.texWidth
        @sy = Math.floor(( index * @sprite.width ) / @sprite.texWidth) * @sprite.height

    render: (ctx) ->
        ctx.save()
        ctx.translate -@sprite.width/2, -@sprite.height/2
        ctx.drawImage( @sprite.texture, @sx, @sy, @sprite.width, @sprite.height, 0, 0, @sprite.width, @sprite.height )
        ctx.restore()

module.exports = Shape
