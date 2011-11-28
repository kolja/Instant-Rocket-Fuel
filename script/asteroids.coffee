
# Main Game Controller / Root entry point
# Adjustments you make here will affect your whole Game.


class Asteroids extends Game
  
  constructor: (width, height) ->
    super width, height
    
    @eventmanager = new Eventmanager
    @keyboard = new Keyboard
    
    @stateManager = new Statemanager this, ["bigbg", "jumpnrun", "iso", "maze", "height"] # Add your own Gamestates or Levels
    @stateManager.setState "jumpnrun"
    
    
  update: ->
    super()
    @stateManager.currentState.update @timer.delta

  render: ->
    @ctx.clearRect 0, 0, @width, @height
    @stateManager.currentState.render @ctx
    super()
    
    
$ ->
  asteroids = new Asteroids( 1024, 768 )
  asteroids.start()

  