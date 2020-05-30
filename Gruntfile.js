module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            files: ['*.*'],
            options: {
                livereload: 'http://127.0.0.1:5000'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
};