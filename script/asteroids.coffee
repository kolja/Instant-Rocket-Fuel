
# Main Game Controller / Root entry point
# Adjustments you make here will affect your whole Game.


class Asteroids extends Game
  
  constructor: (width, height) ->
    super width, height
    
    @eventManager = new EventManager
    @keyboard = new Keyboard
    
    @sceneManager = new SceneManager this, ["bigbg", "jumpnrun", "iso", "maze", "height"] # Add your own Scenes or Levels
    @sceneManager.setScene "jumpnrun"
    @renderTimer = false

  update: ->
    super()
    @sceneManager.currentScene.update @timer.delta

  render: ->
    @ctx.clearRect 0, 0, @width, @height
    @sceneManager.currentScene.render @ctx
    super()
    
    
$ ->
  asteroids = new Asteroids( 1024, 768 )
  asteroids.start()

  