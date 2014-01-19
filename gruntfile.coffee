
module.exports = (grunt) ->

    grunt.initConfig

        coffee_build:
            options:
              globalAliases: ['irf']
              src: 'src/*.coffee'
              main: 'src/index.coffee'
            browser:
              options:
                dest: 'lib/irf.js'

    grunt.loadNpmTasks 'grunt-coffee-build'
    grunt.task.registerTask 'default', ['coffee_build']
