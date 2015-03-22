var gulp = require('gulp');
var stylus = require('gulp-stylus');
var connect = require('gulp-connect');

// stylus
gulp.task('stylus', function () {
  gulp.src('stylus/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('css'));
});

// webserver
gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});

// run webserver on html
gulp.task('html', function () {
  gulp.src('*.html')
    .pipe(connect.reload());
});

// watch for changes, livereload
gulp.task('watch', function () {
  gulp.watch(['*.html'], ['html']);
  gulp.watch(['stylus/*.styl'], ['stylus']);
  gulp.watch(['css/*'],['html']);
});

//run all the things
gulp.task('default', ['stylus','connect', 'watch']);