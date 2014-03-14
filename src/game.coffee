class Game

    @addScene: (scene) ->
        @sceneManager ?= new SceneManager()
        @sceneManager.addScene scene

    constructor: (params) ->
        @params = Helpers.extend {
            "width": 800,
            "height": 600
        }, params

        # can't I already have a canvas and want to use that one?
        canvas = $('<canvas/>').attr({"width": @params.width, "height": @params.height})
        $("body").append(canvas)
        @ctx = canvas[0].getContext('2d')
        @ctx.font = '400 18px Helvetica, sans-serif'
        @ loop = null
        @timer = new Timer
        # the instance's scenemanager points to the Classes Scenemanager
        # (or, if it doesn't exist, a newly instantiated one)
        @sceneManager = @constructor.sceneManager || new SceneManager()

    gameloop: =>
        @update()
        @render()

    start: ->
        # can't you (shouldn't you) call setTimeout with 0 at the end of each invocation?
        @ loop = setInterval @gameloop, 1

    stop: ->
        # shouldn't this be clearInterval(loop) ?
        @ loop
        .
        clearInterval()

    update: ->
        @timer.punch()

    render: ->
        @ctx.clearRect 0, 0, @params.width, @params.height

@irf.Game = Game


# where is the action done exactly? I get the feeling I will have to extend
# Game and override render. This is not intuitive. I would expect to
# instantiate Game and then add stuff to it.