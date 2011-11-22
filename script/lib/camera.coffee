

class Camera

  constructor: (hash) ->
    @projection = hash["projection"]
    @vpWidth = hash["vpWidth"]   # Viewport
    @vpHeight = hash["vpHeight"]
    @zoomFactor = hash["zoomFactor"] ? 1
    @coor = new Vector( 100, 100 )
        
  update: (delta) ->

  apply: (ctx, callback) ->
    
    switch @projection
      when "normal"
        ctx.save()
        ctx.translate @vpWidth/2 - @coor.x, @vpHeight/2 - @coor.y
        callback()
        ctx.restore()
      when "iso"
        ctx.save()
        ctx.scale 1, 0.5
        ctx.rotate Math.PI/4
        ctx.translate 200, -400
        callback()
        ctx.restore()
    
    
        