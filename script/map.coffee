
class Map
  constructor: (hash) -> 
    @map = hash["map"]

    @pattern = hash["pattern"]
    @sprite = hash["sprite"]
    @tiles = []
    @loadMapDataFromImage @map

  render: (ctx) ->
    for tile in @tiles
      do (tile) ->
        tile.render(ctx)

  # http://stackoverflow.com/questions/3102819/chrome-disable-same-origin-policy
  # http://stackoverflow.com/questions/934012/get-image-data-in-javascript
  loadMapDataFromImage: (file) ->
    map = new Image()
    map.src = file
    m = []
    $(map).load =>
      canvas = document.createElement("canvas")
      canvas.width = map.width 
      canvas.height = map.height
      ctx = canvas.getContext("2d")
      ctx.drawImage( map, 0, 0)
      data = ctx.getImageData(0,0,15,15).data
      
      for p,i in data by 4
        row = Math.floor((i/4)/map.width)
        m[row] ?= []
        m[row].push [Number(data[i]).toHex(),Number(data[i+1]).toHex(),Number(data[i+2]).toHex(),Number(data[i+3]).toHex()]

      for row in [0..map.width-2] 
        for col in [0..map.height-2]
          type = "#{m[row][col][0]}#{m[row][col+1][0]}#{m[row+1][col][0]}#{m[row+1][col+1][0]}"
          z = parseInt( m[row][col][2], 16 )
          @tiles.push( new Tile( @sprite, type, row, col, z ))


class Tile
  constructor: (@sprite, @type, @row, @col, @z=0) ->
    
  render: (ctx) ->
    ctx.save()
    ctx.translate @col*87, @row*87 # - @z
    @sprite.render( @type, ctx )
    ctx.restore()
