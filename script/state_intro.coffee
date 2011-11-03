
class StateIntro extends State
  constructor: ->
    
    @map = new Map "assets/map.png"
    
    @spaceships = []
    for i in [0..3]
      do (i) =>
        @spaceships[i] = new Spaceship
    
  update: (delta) ->
    for spaceship in @spaceships
      do (spaceship) =>
        spaceship.update delta
    
  render: (ctx) ->
    @map.render(ctx)
    for spaceship in @spaceships
      do (spaceship) =>
        spaceship.render ctx
