
module.exports = (grunt) ->

    grunt.initConfig

        browserify:
            dist:
                files:
                    'lib/irf.js': ['src/irf.coffee']
                options:
                    debug: true
                    alias: [
                        'src/animation.coffee:animation'
                        'src/background.coffee:background'
                        'src/boundingBox.coffee:boundingBox'
                        'src/camera.coffee:camera'
                        'src/eventmanager.coffee:eventmanager'
                        'src/game.coffee:game'
                        'src/helpers.coffee:helpers'
                        'src/keyboard.coffee:keyboard'
                        'src/map.coffee:map'
                        'src/scene.coffee:scene'
                        'src/scenemanager.coffee:scenemanager'
                        'src/shape.coffee:shape'
                        'src/sprite.coffee:sprite'
                        'src/tile.coffee:tile'
                        'src/timer.coffee:timer'
                        'src/vector.coffee:vector'
                    ]
                    transform: ['coffeeify']

    grunt.loadNpmTasks 'grunt-browserify'
    grunt.task.registerTask 'default', ['browserify']
