
class Map
  constructor: (hash) -> 
    @sprite = hash["sprite"]
    @tiles = []
    @width = 0 # width and height of the map in tiles - can only be determined after the mapfile loading has completed
    @height = 0
    @loadMapDataFromImage hash["mapfile"], hash["pattern"]

  render: (ctx, camera) ->
    for tile in @tiles
      if tile.squaredDistanceTo(camera.coor) < 300000
        tile.render(ctx)

  # http://stackoverflow.com/questions/3102819/chrome-disable-same-origin-policy
  # http://stackoverflow.com/questions/934012/get-image-data-in-javascript
  loadMapDataFromImage: (file, pattern) ->
    map = new Image()
    map.src = file
    m = []
    $(map).load =>
      canvas = document.createElement("canvas")
      @width = map.width
      @height = map.height
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
          for row in [0..map.height-1] 
            for col in [0..map.width-1]
              type = "#{m[row][col][0]}"
              green = parseInt( m[row][col][1], 16 )
              z = parseInt( m[row][col][2], 16 )          
              @tiles.push( new Tile( @sprite, type, row, col, green, z ))
        when "square"
          for row in [0..map.height-2] 
            for col in [0..map.width-2]
              type = "#{m[row][col][0]}#{m[row][col+1][0]}#{m[row+1][col][0]}#{m[row+1][col+1][0]}"
              green = parseInt( m[row][col][1], 16 )
              z = parseInt( m[row][col][2], 16 )
              @tiles.push( new Tile( @sprite, type, row, col, green, z ))
        when "cross"
          for row in [1..map.height-2] by 2
            for col in [1..map.width-2] by 2
              unless m[row][col][0] is "00"
                type = "#{m[row-1][col][0]}#{m[row][col+1][0]}#{m[row+1][col][0]}#{m[row][col-1][0]}"
                green = parseInt( m[row][col][1], 16 )
                z = parseInt( m[row][col][2], 16 )
                @tiles.push( new Tile( @sprite, type, row/2, col/2, green, z ))
  
  tileAtVector: (vec) ->
    x = Math.floor( vec.x / @sprite.innerWidth )
    y = Math.floor( vec.y / @sprite.innerHeight )
    index = y * @width + x
    return @tiles[index]

class Tile
  constructor: (@sprite, @type, @row, @col, @green=0, @z=0) ->
    
  isWalkable: -> 
    @green is 0

  squaredDistanceTo: (vec) ->
    x = @col * @sprite.width + @sprite.width/2
    y = @row * @sprite.height + @sprite.height/2
    vec.subtract( new Vector(x,y) ).lengthSquared() # maybe add a distance method to vector?

  render: (ctx) ->
    ctx.save()
    ctx.translate @col*@sprite.innerWidth - @z, @row*@sprite.innerHeight - @z
    @sprite.render( @type, ctx )
    ctx.restore()
