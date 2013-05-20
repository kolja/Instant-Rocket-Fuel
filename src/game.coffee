class Game

  @addScene: (sceneName, scene) ->
    @sceneManager ?= new SceneManager()
    @sceneManager.addScene sceneName, scene

  constructor: (@width, @height) ->
    canvas = $('<canvas/>').attr({"width": @width, "height": @height})
    $("body").append(canvas)
    @ctx = canvas[0].getContext('2d')
    @ctx.font = '400 18px Helvetica, sans-serif'
    @loop = null
    @timer = new Timer
    # the instance's scenemanager points to the Classes Scenemanager
    # (or, if it doesn't exist, a newly instantiated one)
    @sceneManager = @constructor.sceneManager || new SceneManager()

  gameloop: =>
    @update()
    @render()

  start: ->
    @loop = setInterval @gameloop, 1 

  stop: ->
    @loop.clearInterval()

  update: ->
    @timer.punch()

  render: ->
    @ctx.clearRect 0, 0, @width, @height

@irf.Game = Game