
class Eventmanager
  constructor: ->
    @eventlist = {} 
  
  register: (event, callback) ->
    unless @eventlist[event]?
      @eventlist[event] = []
    @eventlist[event].push callback

  trigger: (event, origin) ->
    for callback in @eventlist[event]
      callback(origin)