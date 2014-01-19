
# A simple Timer:
# it helps you keep track of the time that has elapsed since you last "punch()"-ed it


class Timer
  constructor: ->
    @last_time = new Date().getTime()
    @delta = 0

  # punch resets the timer and returns the time (in ms) between the last two punches
  punch: ->
    this_time = new Date().getTime()
    @delta = this_time - @last_time
    @last_time = this_time
    return @delta

  # delta gives you the time that has elapsed since the timer was punched the last time
  timeSinceLastPunch: ->
    this_time = new Date().getTime()
    this_time - @last_time

  fps: ->
    1000 / @delta

module.exports = Timer
