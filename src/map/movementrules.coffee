
class MovementRules

    constructor: (rules) ->
        if typeof(rules) == "function"
            @rules = rules
        switch rules
            when "hexagon"
                @rules = @hexagon
            else
                @rules = @northSouthEastWest

    applyRules: (map) ->
        @rules map

    northSouthEastWest: (map) ->
        for tile, index in map.tiles
            tile.neighbor["w"] = map.tiles[index-1]
            tile.neighbor["e"] = map.tiles[index+1]
            tile.neighbor["n"] = map.tiles[index-map.width]
            tile.neighbor["s"] = map.tiles[index+map.width]

    hexagon: (map) ->
        # implementation left as an exercise to the reader

module.exports = MovementRules

