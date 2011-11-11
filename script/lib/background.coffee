

class Background

  constructor: ->
    @sprite = new Sprite
      "texture": "assets/images/weltraum.jpg"
      "width": 500
      "height": 500
      "texWidth": 500
      
    @sprite.addImage "background", 0
  

  render: (ctx) ->
    @sprite.render( "background", ctx )
    
        