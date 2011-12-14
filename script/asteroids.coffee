
# Main Game Controller / Root entry point
# Adjustments you make here will affect your whole Game.


class Asteroids extends Game
  
  constructor: (width, height) ->
    super width, height
    
    @eventManager = new EventManager
    @keyboard = new Keyboard
    
    @sceneManager = new SceneManager this, ["bigbg", "jumpnrun", "iso", "maze", "height"] # Add your own Scenes or Levels
    @sceneManager.setScene "jumpnrun"

  update: ->
    super()
    @sceneManager.currentScene.update @timer.delta

  render: ->
    super()
    @sceneManager.currentScene.render @ctx
    @ctx.fillText( @timer.fps().toFixed(1), @width - 50, 20 )
    
jQuery ->
  asteroids = new Asteroids( 1024, 768 )
  asteroids.start()

  