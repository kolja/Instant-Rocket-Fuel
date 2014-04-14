
BoundingBox = require '../boundingbox.coffee'
Vector = require '../vector.coffee'

class Tile
    constructor: ({@sprite, @data, @map}) ->
        @neighbor = []
        {@x,@y} = @map.tilePlacementStrategy.coor(@data)
        @bb = new BoundingBox new Vector( @x, @y ), new Vector( @sprite.innerWidth, @sprite.innerHeight )
        @isWalkable = true unless @data.walkable > 0

    render: (ctx) =>
        ctx.save()
        ctx.translate @x, @y
        @sprite.render( @data.type, ctx )
        ctx.restore()

module.exports = Tile

