var gulp        = require('gulp'),
    nodemon     = require('gulp-nodemon');

require('gulp-grunt')(gulp);

gulp.task('default', function() {
    nodemon({
        script: 'server/index.js',
        ext: 'js html',
        env: {
            NODE_ENV: 'production'
        }
    });
});

console.log(gulp);

gulp.task('graph', [
  'angular_architecture_graph'
]);