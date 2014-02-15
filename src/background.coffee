class Background
  constructor: (@sprite) ->
    @sprite.addImage "background", 0

  render: (ctx) ->
    @sprite.render( "background", ctx )

module.exports = Background
