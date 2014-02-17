
SceneManager = require 'scenemanager'

class Game

    @addScene: (scene) ->
        @sceneManager ?= new SceneManager()
        @sceneManager.addScene scene

    constructor: (params) ->

        @params = Helpers.extend {
            "width" : 800,
            "height": 600
        }, params

        canvas = $('<canvas/>').attr({"width": @params.width, "height": @params.height})
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
        @ctx.clearRect 0, 0, @params.width, @params.height

module.exports = Game
