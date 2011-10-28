class Statemanager
  
  constructor: ->
    @statearray = {}
    @currentState = null

  addState: (state) ->
    
    switch state
      when "intro" then @statearray[state] = new StateIntro
      when "main" then  @statearray[state] = new StateMain
      
    @setState state unless @currentState? # when a state is added for the first time, it automatically becomes the @currentState

  setState: (state) ->
    @currentState = @statearray[state]
  	