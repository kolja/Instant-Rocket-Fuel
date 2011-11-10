
class Map
  constructor: (hash) -> 
    @map = hash["map"]
    @sprite = hash["sprite"]
    @tiles = []
    @loadMapDataFromImage @map, hash["pattern"]

  render: (ctx) ->
    for tile in @tiles
      do (tile) ->
        tile.render(ctx)

  # http://stackoverflow.com/questions/3102819/chrome-disable-same-origin-policy
  # http://stackoverflow.com/questions/934012/get-image-data-in-javascript
  loadMapDataFromImage: (file, pattern) ->
    map = new Image()
    map.src = file
    m = []
    $(map).load =>
      canvas = document.createElement("canvas")
      canvas.width = map.width 
      canvas.height = map.height
      ctx = canvas.getContext("2d")
      ctx.drawImage( map, 0, 0)
      data = ctx.getImageData(0,0,map.width,map.height).data
      
      for p,i in data by 4
        row = Math.floor((i/4)/map.width)
        m[row] ?= []
        m[row].push [Number(data[i]).toHex(),Number(data[i+1]).toHex(),Number(data[i+2]).toHex(),Number(data[i+3]).toHex()]

      switch pattern
        when "simple"
          for row in [0..map.width-1] 
            for col in [0..map.height-1]
              type = m[row][col][0]
              z = parseInt( m[row][col][2], 16 )
              @tiles.push( new Tile( @sprite, type, row, col, z ))
        when "square"
          for row in [0..map.width-2] 
            for col in [0..map.height-2]
              type = "#{m[row][col][0]}#{m[row][col+1][0]}#{m[row+1][col][0]}#{m[row+1][col+1][0]}"
              z = parseInt( m[row][col][2], 16 )
              @tiles.push( new Tile( @sprite, type, row, col, z ))
        when "cross"
          for row in [1..map.width-2] by 2
            for col in [1..map.height-2] by 2
              unless m[row][col][0] is "00"
                type = "#{m[row-1][col][0]}#{m[row][col+1][0]}#{m[row+1][col][0]}#{m[row][col-1][0]}"
                z = parseInt( m[row][col][2], 16 )
                @tiles.push( new Tile( @sprite, type, row/2, col/2, z ))
      

class Tile
  constructor: (@sprite, @type, @row, @col, @z=0) ->
    
  render: (ctx) ->
    ctx.save()
    ctx.translate @col*@sprite.innerWidth, @row*@sprite.innerHeight # - @z
    @sprite.render( @type, ctx )
    ctx.restore()
