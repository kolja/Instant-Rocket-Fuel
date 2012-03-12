# Require all Class of IRF, so we won't need namespace here
# TODO: get rid of eval
eval("var #{k} = v") for k,v of IRF

# Main Game Controller / Root entry point
# Adjustments you make here will affect your whole Game.
sceneclass = sceneclass ? {}

class Asteroids extends Game

  constructor: (width, height) ->
    super width, height

    @eventManager = new EventManager
    @keyboard = new Keyboard

    #@sceneManager = new SceneManager this, ["bigbg", "jumpnrun", "iso", "maze", "height"] # Add your own Scenes or Levels
    @sceneManager = new SceneManager(this, sceneclass)
    @sceneManager.setScene "jumpnrun"

  update: ->
    super()
    @sceneManager.currentScene.update @timer.delta

  render: ->
    super()
    @sceneManager.currentScene.render @ctx
    @ctx.fillText( @timer.fps().toFixed(1), @width - 50, 20 )

jQuery ->
  asteroids = new Asteroids(800, 600)
  asteroids.start()

