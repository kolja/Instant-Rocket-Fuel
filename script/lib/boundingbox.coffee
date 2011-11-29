
class BoundingBox
  constructor: (@coor, @dim, @color="grey") ->
    @coor ?= new Vector
    @dim ?= new Vector
    
  intersect: (otherBB) ->
    @intersectv(otherBB) and @intersecth(otherBB)
  
  intersectv: (otherBB) ->
    if @coor.y < otherBB.coor.y
      if ((@dim.y + otherBB.dim.y) / 2) < (otherBB.coor.y - @coor.y)
        return false
      else 
        return true
    else
      if ((@dim.y + otherBB.dim.y) / 2) < (@coor.y - otherBB.coor.y)
        return false
      else 
        return true
    
  intersecth: (otherBB) ->
    if @coor.x < otherBB.coor.x
      if ((@dim.x + otherBB.dim.x) / 2) < (otherBB.coor.x - @coor.x)
        return false
      else 
        return true
    else
      if ((@dim.x + otherBB.dim.x) / 2) < (@coor.x - otherBB.coor.x)
        return false
      else 
        return true
  
  
  render: (ctx) ->
    ctx.strokeStyle = @color
    ctx.strokeRect @coor.x - @dim.x/2, @coor.y - @dim.y/2, @dim.x, @dim.y