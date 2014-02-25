# # The SceneManager
# is the class to hold and manage (switch between) the 'scenes' that your
# Game consists of. It maintains
class SceneManager
    # * a hash with all Scenes in the game
    # * a reference to the the scene that is currently active
    constructor: ->
        @scenes = {}
        @currentScene = null

    addScene: (sceneClass) ->
        @scenes[sceneClass.name] =
            "class"    : sceneClass
            "instance" : null

    setScene: (scene, parent) ->
        # create an instance of the scene, unless it has been created before
        @currentScene = @scenes[scene].instance ?= new @scenes[scene].class(parent)

module.exports = SceneManager
