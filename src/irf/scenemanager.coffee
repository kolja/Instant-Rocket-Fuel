class SceneManager
  constructor: (@parent, scenes) ->
    @scenearray = {}
    @currentScene = null
    for scene in scenes
      @addScene scene

  addScene: (scene) ->
    #@scenearray[scene] = new sceneclass[scene](@parent)
    @scenearray[scene] = new scene(@parent)
    @setScene scene unless @currentScene? # when a scene is added for the first time, it automatically becomes the @currentScene

  setScene: (scene) ->
    @currentScene = @scenearray[scene]

