
Shape = require './shape.coffee'
Timer = require '../timer.coffee'

class Animation

    constructor: (@sprite, params) ->
        @fps = params["fps"] ? 30
        @loop = params["loop"] ? true
        @callback = params["callback"] ? null
        @frames = for index in params["frames"]
            new Shape @sprite, index
        @lastFrame = @frames.length - 1
        @timer = new Timer
        @currentFrame = 0
        @playing = true

    render: (ctx) ->
        if @playing
            @currentFrame = Math.floor( @timer.timeSinceLastPunch() / (1000 / @fps) )
            if @currentFrame > @lastFrame
                @callback?()
                if @loop
                    @rewind()
                else
                    @currentFrame = @lastFrame
                    @stop()

        @frames[@currentFrame].render(ctx)

    play: ->
        @playing = true

    stop: ->
        @playing = false

    rewind: ->
        @currentFrame = 0
        @timer.punch()

module.exports = Animation
