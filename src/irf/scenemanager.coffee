class SceneManager
  constructor: (@parent, scenes) ->
    @scenearray = {}
    @currentScene = null
    for name, klass of scenes
      @addScene(name, klass)

  addScene: (name, klass) ->
    @scenearray[name] = new klass(@parent)
    # when a scene is added for the first time, it automatically becomes the @currentScene
    @setScene name unless @currentScene?

  setScene: (scene) ->
    @currentScene = @scenearray[scene]

