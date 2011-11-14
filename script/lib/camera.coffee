

class Camera

  constructor: (@projection) ->
    @coor = new Vector( 100, 100 )
        
  update: (delta) ->

  apply: (ctx, callback) ->
    
    switch @projection
      when "normal"
        ctx.save()
        ctx.translate 500-@coor.x, 300-@coor.y
        callback()
        ctx.restore()
      when "iso"       
        ctx.save()
        ctx.scale 1, 0.5
        ctx.rotate Math.PI/4
        ctx.translate 200, -400
        callback()
        ctx.restore()
    
    
        