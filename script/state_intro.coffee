
class StateIntro extends State
  constructor: ->
    # @spaceship = new Spaceship
    @spaceships = []
    for i in [0..200]
      do (i) =>
        @spaceships[i] = new Spaceship
    
  update: (delta) ->
    for spaceship in @spaceships
      do (spaceship) =>
        spaceship.update delta
    # @spaceship.update delta
    
  render: (ctx) ->
    for spaceship in @spaceships
      do (spaceship) =>
        spaceship.render ctx
    # @spaceship.render ctx
