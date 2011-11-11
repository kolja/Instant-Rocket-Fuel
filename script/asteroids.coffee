
# Main Game Controller / Root entry point
# Adjustments you make here will affect your whole Game.


class Asteroids extends Game
  
  constructor: (width, height) ->
    super width, height
    
    @stateManager = new Statemanager this, ["intro", "main"] # Add your own Gamestates or Levels
    
    $("html").keypress (event) =>
      console.log event
      directions = {37:"left",38:"up",39:"right",40:"down",32:"space"}
      
  update: ->
    super()
    @stateManager.currentState.update @timer.delta

  render: ->
    @ctx.clearRect 0, 0, @width, @height
    @ctx.save()
    @ctx.scale 1, 0.5
    @ctx.rotate Math.PI/4
    @ctx.translate 200, -400
    @stateManager.currentState.render @ctx
    @ctx.restore() 
    super()
    
  
$ ->
  asteroids = new Asteroids( 1024, 768 )
  asteroids.start()

  