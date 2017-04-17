'user strict';

var gulp      = require('gulp');
var connect   = require('gulp-connect');
var sass      = require('gulp-sass');

gulp.task('connect', function() {
    // content
    connect.server({
        port: 8888,
        livereload: true
    });
});

gulp.task('sass', function() {
    // content
    return gulp.src('./scss/*.scss')
      .pipe(sass().on('error',sass.logError))
      //.pipe(sass({outputStyle:'compressed'}))
      .pipe(gulp.dest('./css'))
      .pipe(connect.reload());
});

gulp.task('watch', function() {
    // content
    gulp.watch(['./scss/*.scss'], ['sass']);
});

gulp.task('default',['connect','sass','watch']);