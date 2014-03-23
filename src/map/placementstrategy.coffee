
Vector = require "../vector.coffee"

class PlacementStrategy

    constructor: (@strategy, @map) ->
        @tileIndex = @tileIndexGrid
        if typeof(@strategy) is "function"
            @coor = @strategy
        else
            switch @strategy
                when "hexagon"
                    @coor = @coorHex
                else
                    @coor = @coorGrid

    tileIndexGrid: (vec) =>
        x = Math.floor( vec.x / @map.sprite.innerWidth )
        y = Math.floor( vec.y / @map.sprite.innerHeight )
        return y * @map.width + x

    coorGrid: (data) =>
        x = data.col * @map.sprite.innerWidth + @map.sprite.innerWidth/2 - (data.z||0)
        y = data.row * @map.sprite.innerHeight + @map.sprite.innerHeight/2 - (data.z||0)
        return new Vector x, y

    coorHex: (data) =>
        xOffset = if data.row%2 == 0 then @map.sprite.innerWidth/2 else 0
        x = data.col * @map.sprite.innerWidth + @map.sprite.innerWidth/2 - xOffset
        y = data.row * @map.sprite.innerHeight + @map.sprite.innerHeight/2
        return new Vector x, y


module.exports = PlacementStrategy
