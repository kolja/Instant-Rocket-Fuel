
module.exports = (grunt) ->

    grunt.initConfig

        browserify:
            dist:
                files:
                    'lib/irf.js': ['src/irf.coffee']
                options:
                    debug: true
                    transform: ['coffeeify']
                    standalone: 'irf'

    grunt.loadNpmTasks 'grunt-browserify'
    grunt.task.registerTask 'default', ['browserify']
