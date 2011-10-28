
# A simple Timer:
# it helps you keep track of the time that has elapsed since you last "punch()"-ed it


class Timer
  constructor: ->
    @last_time = new Date().getTime()
    @delta = 1000
    
  punch: ->
    this_time = new Date().getTime()
    @delta = this_time - @last_time
    @last_time = this_time
    
  fps: ->
    1000 / @delta