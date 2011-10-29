
class StateIntro extends State
  constructor: ->
    @spaceships = []
    for i in [0..50]
      do (i) =>
        @spaceships[i] = new Spaceship
    
  update: (delta) ->
    for spaceship in @spaceships
      do (spaceship) =>
        spaceship.update delta
    
  render: (ctx) ->
    for spaceship in @spaceships
      do (spaceship) =>
        spaceship.render ctx
