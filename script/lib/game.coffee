

class Game
  constructor: (@width, @height) ->
    canvas = $('<canvas/>').attr({"width": @width, "height": @height})
    $("body").append(canvas)                                     
    @ctx = canvas[0].getContext('2d')
    @ctx.font = '400 18px Helvetica, sans-serif'
    @loop = null
    @timer = new Timer
    @renderTimer = false

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
    if @renderTimer then @ctx.fillText( @timer.fps().toFixed(1), @width - 50, 20 )
