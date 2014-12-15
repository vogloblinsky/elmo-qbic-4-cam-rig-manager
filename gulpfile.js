var gulp        = require('gulp'),
    nodemon     = require('gulp-nodemon');

gulp.task('default', function() {
    nodemon({
        script: 'server/index.js',
        ext: 'js html',
        env: {
            NODE_ENV: 'production'
        }
    });
});
