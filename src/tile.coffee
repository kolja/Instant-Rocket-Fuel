
BoundingBox = require './boundingBox.coffee'
Vector = require './vector.coffee'

class Tile
    constructor: (@sprite, @type, @row, @col, @green=0, @z=0) ->
        @neighbor = []
        @x = @col * @sprite.innerWidth + @sprite.innerWidth/2
        @y = @row * @sprite.innerHeight + @sprite.innerHeight/2
        @bb = new BoundingBox new Vector( @x, @y ), new Vector( @sprite.innerWidth, @sprite.innerHeight )
        @bb.color = "green"

    isWalkable: ->
        @green is 0

    squaredDistanceTo: (vec) ->
        vec.subtract( new Vector(@x,@y) ).lengthSquared() # maybe add a distance (class-)method to vector?

    render: (ctx) ->
        ctx.save()
        ctx.translate @x - @z, @y - @z
        @sprite.render( @type, ctx )
        ctx.restore()

        # @bb.render ctx

module.exports = Tile

