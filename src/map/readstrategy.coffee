
Tile = require "./tile.coffee"

class ReadStrategy

    constructor: (@pattern) ->
        if typeof(@pattern) is "function"
            @read = @pattern
        else
            switch @pattern
                when "square"
                    @read = @readSquare
                when "cross"
                    @read = @readCross
                else
                    @read = @readSimple

    readSimple: (mapData, sprite) ->
        tiles = []
        for row in [0..mapData.height-1]
            for col in [0..mapData.width-1]
                type = "#{mapData[row][col][0]}"
                green = parseInt( mapData[row][col][1], 16 )
                z = parseInt( mapData[row][col][2], 16 )
                tiles.push( new Tile( sprite, type, row, col, green, z ))
        return tiles

    readSquare: (mapData, sprite) ->
        tiles = []
        for row in [0..mapData.height-2]
            for col in [0..mapData.width-2]
                type = "#{mapData[row][col][0]}#{mapData[row][col+1][0]}#{mapData[row+1][col][0]}#{mapData[row+1][col+1][0]}"
                green = parseInt( mapData[row][col][1], 16 )
                z = parseInt( mapData[row][col][2], 16 )
                tiles.push( new Tile( sprite, type, row, col, green, z ))
        return tiles

    readCross: (mapData, sprite) ->
        tiles = []
        for row in [1..mapData.height-2] by 2
            for col in [1..mapData.width-2] by 2
                unless mapData[row][col][0] is "00"
                    type = "#{mapData[row-1][col][0]}#{mapData[row][col+1][0]}#{mapData[row+1][col][0]}#{mapData[row][col-1][0]}"
                    green = parseInt( mapData[row][col][1], 16 )
                    z = parseInt( mapData[row][col][2], 16 )
                    tiles.push( new Tile( sprite, type, row/2, col/2, green, z ))
        return tiles

module.exports = ReadStrategy

