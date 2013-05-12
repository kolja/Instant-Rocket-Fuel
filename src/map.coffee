@irf.Map = class Map
  constructor: (hash) ->
    @sprite = hash["sprite"]
    @tiles = []
    @width = 0 # width and height of the map in tiles - can only be determined after the mapfile loading has completed
    @height = 0

    # in hash["pattern"] you can either pass a string like "simple", "square" or "cross"
    # in which case the respective method will be called. Alternatively, you can pass your own custom function.
    if typeof hash["pattern"] is "function"
      @read = hash["pattern"]
    else
      switch hash["pattern"]
        when "simple"
          @read = @readSimple
        when "square"
          @read = @readSquare
        when "cross"
          @read = @readCross

    @map = new Image()
    @map.src = hash["mapfile"]
    @mapData = []

    @loadMapDataFromImage()

  render: (ctx, camera) ->
    for tile in @tiles
      if tile.squaredDistanceTo(camera.coor) < 100000
        tile.render(ctx)

  # http://stackoverflow.com/questions/3102819/chrome-disable-same-origin-policy
  # http://stackoverflow.com/questions/934012/get-image-data-in-javascript
  loadMapDataFromImage: ->
    $(@map).load =>
      canvas = document.createElement("canvas")
      @width = @map.width
      @height = @map.height
      canvas.width = @map.width
      canvas.height = @map.height
      ctx = canvas.getContext("2d")
      ctx.drawImage( @map, 0, 0)
      data = ctx.getImageData(0,0,@map.width,@map.height).data

      for p,i in data by 4
        row = Math.floor((i/4)/@map.width)
        @mapData[row] ?= []
        @mapData[row].push [Number(data[i]).toHex(),Number(data[i+1]).toHex(),Number(data[i+2]).toHex(),Number(data[i+3]).toHex()]

      @read()

      for tile, index in @tiles
        tile.neighbor["w"] = @tiles[index-1]
        tile.neighbor["e"] = @tiles[index+1]
        tile.neighbor["n"] = @tiles[index-@width]
        tile.neighbor["s"] = @tiles[index+@width]


  readSimple: ->
    for row in [0..@map.height-1]
      for col in [0..@map.width-1]
        type = "#{@mapData[row][col][0]}"
        green = parseInt( @mapData[row][col][1], 16 )
        z = parseInt( @mapData[row][col][2], 16 )
        @tiles.push( new Tile( @sprite, type, row, col, green, z ))

  readSquare: ->
    for row in [0..@map.height-2]
      for col in [0..@map.width-2]
        type = "#{@mapData[row][col][0]}#{@mapData[row][col+1][0]}#{@mapData[row+1][col][0]}#{@mapData[row+1][col+1][0]}"
        green = parseInt( @mapData[row][col][1], 16 )
        z = parseInt( @mapData[row][col][2], 16 )
        @tiles.push( new Tile( @sprite, type, row, col, green, z ))

  readCross: ->
    for row in [1..@map.height-2] by 2
      for col in [1..@map.width-2] by 2
        unless @mapData[row][col][0] is "00"
          type = "#{@mapData[row-1][col][0]}#{@mapData[row][col+1][0]}#{@mapData[row+1][col][0]}#{@mapData[row][col-1][0]}"
          green = parseInt( @mapData[row][col][1], 16 )
          z = parseInt( @mapData[row][col][2], 16 )
          @tiles.push( new Tile( @sprite, type, row/2, col/2, green, z ))

  tileAtVector: (vec) ->
    x = Math.floor( vec.x / @sprite.innerWidth )
    y = Math.floor( vec.y / @sprite.innerHeight )
    index = y * @width + x
    return @tiles[index]

@irf.Tile = class Tile
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

