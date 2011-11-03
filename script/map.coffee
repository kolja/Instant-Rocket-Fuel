

class Map
  constructor: (file) ->
    
    @sprite = new Sprite "assets/images/sea_beach.png", 128, 128, 512 # Map has the sprite - no separate sprite for every Tile.
    @sprite.addImage "#.#.", 0
    @sprite.addImage "##..", 1
    @sprite.addImage ".#.#", 2
    @sprite.addImage "..##", 3
    @sprite.addImage "#.##", 4
    @sprite.addImage ".###", 5
    @sprite.addImage "###.", 6
    @sprite.addImage "##.#", 7
    @sprite.addImage ".#..", 8
    @sprite.addImage "#...", 9
    @sprite.addImage "...#", 10
    @sprite.addImage "..#.", 11
    @sprite.addImage ".##.", 12
    @sprite.addImage "#..#", 13
    @sprite.addImage ".XX.", 14
    @sprite.addImage "X..X", 15
    @sprite.addImage "....", 16
    @sprite.addImage "####", 17
    
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
        
  
  ## loadMapData and loadMapDataFrom image do not work.
  ## Struggling with same origin policy
  #loadMapData: (file) ->
  #  $.getJSON "assets/map.json", {}, (data) -> 
  #    console.log data
  # 
  ## http://stackoverflow.com/questions/934012/get-image-data-in-javascript
  #loadMapDataFromImage: (file) ->
  #  map = new Image()
  #  map.src = file
  #  # perhaps we need a callback that binds to the "load" event here?
  #  canvas = document.createElement("canvas")
  #  canvas.width = 50 #map.width 
  #  canvas.height = 50 #map.height
  #  ctx = canvas.getContext("2d")
  #  ctx.drawImage( map, 0, 0)
  #  ctx.getImageData(0,0,50,50).data 
    
class Tile
  constructor: (@sprite, @type, @row, @col) ->
    
  render: (ctx) ->
    ctx.save()
    ctx.translate @col*128, @row*128
    @sprite.render( @type, ctx )
    ctx.restore()
