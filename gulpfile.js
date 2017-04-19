'user strict';

var gulp        = require('gulp');
var connect     = require('gulp-connect');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');

gulp.task('connect', function() {
    // content
    connect.server({
        port: 8888,
        livereload: true
    });
});

gulp.task('javascript', function(){
    return gulp.src('./js/main.js')
      .pipe(sourcemaps.init())
      .pipe(concat('main.min.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./js'))
      .on('error', function(err){
        console.error('Erro no compress', err.toString());
      });
});

gulp.task('sass', function() {
    // content
    return gulp.src('./scss/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sass({outputStyle:'compressed'}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./css'))
      .pipe(connect.reload());
});

gulp.task('watch', function() {
    // content
    gulp.watch(['./scss/*.scss', './js/main.js'], ['sass','javascript']);
});

gulp.task('default',['connect','sass','watch']);