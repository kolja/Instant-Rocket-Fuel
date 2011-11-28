
class BoundingBox
  constructor: (@coor, @dim) ->
    @coor ?= new Vector
    @dim ?= new Vector
    
  intersects: (otherBB) ->
    # to be implemented 
  
  render: (ctx, color="#f00") ->
    ctx.strokeStyle = color
    ctx.strokeRect @coor.x - @dim.x/2, @coor.y - @dim.y/2, @dim.x, @dim.y