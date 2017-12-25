const gulp = require('gulp');
const config = require('../config');
const $ = require("gulp-load-plugins")();
const runSequence = require('run-sequence');
const rimraf = require('rimraf');
var concat = require('gulp-concat-util');

gulp.task('css.clean', function (cb) {
  return rimraf(config.stylesheet.dest, cb);
});

gulp.task('css.libs',function(){
  return gulp.src(config.stylesheet.entry + 'libs/*')
  .pipe(gulp.dest(config.stylesheet.dest))
})

gulp.task('css.app', function () {
  return  gulp.src([config.stylesheet.entry + 'core/*',
    config.stylesheet.entry + 'page/*',])
      .pipe(concat('style.css'))
    .pipe(gulp.dest(config.stylesheet.dest));
});

gulp.task('css.autoprefixer', function () {
  return  gulp.src(config.stylesheet.dest + '**.css')
          .pipe($.autoprefixer({
              browsers: ['android>=4.4','ios>=8'],
              cascade: false
          }))
          .pipe(gulp.dest(config.stylesheet.dest));
});

gulp.task('css.min', function () {
  return  gulp.src(['!' + config.stylesheet.dest + '*.min.css', config.stylesheet.dest + '*.css'])
          .pipe($.cssmin())
          .pipe($.rename({
              suffix: '.min'
          }))
          .pipe(gulp.dest(config.stylesheet.dest));
});

gulp.task('css.build',function() {
  runSequence(
    'css.clean',
    'css.libs',
    'css.app',
    'css.autoprefixer',
    ['browserSync.reload','css.min']
  );
});