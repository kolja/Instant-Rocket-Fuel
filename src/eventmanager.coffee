
class EventManager

    constructor: ->
        @eventlist = {}
        @on = @register # alias

    register: (event, callback) ->
        unless @eventlist[event]?
            @eventlist[event] = []
        @eventlist[event].push callback

    trigger: (event, origin) ->
        for callback in @eventlist[event]
            callback(origin)

module.exports = EventManager
