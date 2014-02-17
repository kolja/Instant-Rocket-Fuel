
# Every sprite has a Texture and a number of Assets.
# These Assets can be of type Shape (simple Images) or Animation
#
# usage:
#
# sprite = new Sprite
#   "texture": "img/texture.png
#   "width":50
#   "height":50
#   "key":
#     "spaceship": 1
#     "rock": 2
#     "enemy": 3
#
# sprite.render("spaceship")
#

Shape = require 'shape'
Animation = require 'animation'

class Sprite
    constructor: (hash) ->
        @assets = {}
        @width = hash["width"]
        @height = hash["height"]
        @texture = new Image()
        @texture.src = hash["texture"]
        @key = hash["key"] ? {}

        for key, i of @key
            @addImage key, i

        @innerWidth = hash["innerWidth"] ? @width
        @innerHeight = hash["innerHeight"] ? @height

    addImage: (name, index) ->
        $(@texture).load =>
            @texWidth = @texture.width
            @assets[name] = new Shape this, index

    addAnimation: (name, params) ->
        $(@texture).load =>
            @texWidth = @texture.width
            @assets[name] = new Animation this, params

    render: (name, ctx) ->
        @assets[name].render(ctx) if @assets[name]?



@irf.Sprite = Sprite
