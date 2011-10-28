

class Game
  constructor: (@width, @height) ->
    canvas = $('<canvas/>').attr({"width": 1024, "height": 768})
    $("body").append(canvas)                                     
    @ctx = canvas[0].getContext('2d')
    @ctx.font = '400 18px Helvetica, sans-serif'
    @loop = null
    @timer = new Timer

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
    @ctx.fillText( @timer.fps().toFixed(1), 960, 20 )

