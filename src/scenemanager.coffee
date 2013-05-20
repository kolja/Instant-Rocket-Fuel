# # The SceneManager
# is the class to hold and manage (switch between) the 'scenes' that your
# Game consists of. It maintains
class SceneManager
  # * a hash with all Scenes in the game
  # * a reference to the the scene that is currently active
  constructor: ->
    @scenes = {}
    @currentScene = null

  addScene: (sceneName, sceneClass) ->
    @scenes[sceneName] = sceneClass

  setScene: (scene, parent) ->
    @currentScene = new @scenes[scene](parent)

@irf.SceneManager = SceneManager