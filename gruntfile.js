module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            app: {
                src: ['src/irf.coffee'],
                dest: 'lib/irf.js',
                options: { transform: ['coffeeify'] }
            }
        },
    });
    grunt.loadNpmTasks('grunt-browserify');
    grunt.task.registerTask('default', ['browserify']);
};
