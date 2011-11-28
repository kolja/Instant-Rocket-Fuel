
class BoundingBox
  constructor: (@coor, @dim) ->
    @coor ?= new Vector
    @dim ?= new Vector
    
  intersects: (otherBB) ->
    # to be implemented 
  
  render: (ctx) ->
    ctx.strokeStyle "red"
    ctx.strokeRect @coor.x, @coor.y, @dim.x, @dim.y