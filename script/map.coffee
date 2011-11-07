
class Map
  constructor: (hash) ->
    
    @map = hash["map"]
    @pattern = hash["pattern"]
    @sprite = hash["sprite"]
    
    @loadMapDataFromImage @map

    m = root.mapdata
    numRows = m.length
    numCols = m[0].length
    @tiles = []
    for row in [0..numRows-2] 
      do =>
        for col in [0..numCols-2]
          do =>
            type = "#{m[row][col]}#{m[row][col+1]}#{m[row+1][col]}#{m[row+1][col+1]}"
            @tiles.push( new Tile( @sprite, type, row, col))
      
  render: (ctx) ->
    for tile in @tiles
      do (tile) ->
        tile.render(ctx)
        
  # Same-Origin-Policy: Chrome must be started with 
  # http://stackoverflow.com/questions/934012/get-image-data-in-javascript
  loadMapDataFromImage: (file) ->
    map = new Image()
    map.src = file
    $(map).load ->
      canvas = document.createElement("canvas")
      canvas.width = map.width 
      canvas.height = map.height
      ctx = canvas.getContext("2d")
      ctx.drawImage( map, 0, 0)
      data = ctx.getImageData(0,0,15,15).data
      console.log data
    
class Tile
  constructor: (@sprite, @type, @row, @col) ->
    
  render: (ctx) ->
    #ctx.save()
    #ctx.scale 1, 0.5
    #ctx.rotate 45
    #ctx.translate 200, -1000
    ctx.save()
    ctx.translate @col*87, @row*87
    @sprite.render( @type, ctx )
    ctx.restore()
    #ctx.restore()
