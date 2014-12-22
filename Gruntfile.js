module.exports = function(grunt) {

    grunt.initConfig({
        angular_architecture_graph: {
            diagram: {
                files: {
                    'architecture': ['client/src/js/**/*.js', '!**/external/**']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-angular-architecture-graph');

    grunt.registerTask('default', ['angular_architecture_graph']);

};
