
DataSource = require './datasource.coffee'
ReadStrategy = require './readstrategy.coffee'
MovementRules = require './movementrules.coffee'
PlacementStrategy = require './placementstrategy.coffee'

class Map
    constructor: ({@sprite, @read, @pattern, @movement, @tilePlacement, @mapFile, @ed}) ->

        # defaults:
        @read ?= "image" # read Map Data from an image, from a file or from a literal object
        @pattern ?= "simple" # how should the mapData be interpreted?
        @movement ?= "northSouthEastWest" # what are the neighbors of an individual tile?
        @tilePlacement ?= "grid" # how are the tiles to be translated before rendering?

        @width = 0 # width and height of the map in tiles - can only be determined after the mapfile loading has completed
        @height = 0
        @rd = null # renderDistance

        new DataSource(
            read: @read
            file: @mapFile
            callback: @parseToTiles
        ).read()

        @tilePlacementStrategy = new PlacementStrategy @tilePlacement, this

    parseToTiles: (mapData) =>
        {@width, @height} = mapData
        @tiles = (new ReadStrategy @pattern,this).read mapData, @sprite
        (new MovementRules @movement).applyRules this
        @ed?.trigger "map.finishedLoading"

    renderDistance: (camera) ->
        return @rd if @rd? # cache the render Distance
        @rd = (Math.pow(camera.vpWidth+20,2) + Math.pow(camera.vpHeight+20,2))/4

    tileAtVector: (vec) ->
        @tiles[@tilePlacementStrategy.tileIndex(vec)]

    render: (ctx, camera) ->
        for tile in @tiles
            #if tile.squaredDistanceTo(camera.coor) < @renderDistance camera
            tile.render(ctx)

module.exports = Map

