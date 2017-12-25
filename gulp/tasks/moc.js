const gulp = require('gulp');
const config = require('../config');
const runSequence = require('run-sequence');
const rimraf = require('rimraf');
const $ = require("gulp-load-plugins")();
const extname = require('gulp-extname');


gulp.task('moc.clean', function (cb) {
  return rimraf(config.moc.dest, cb);
});
gulp.task('moc.copy', function () {
return gulp.src(config.moc.entry + '**')
      .pipe(gulp.dest(config.moc.dest));
});
gulp.task('moc.prettify', function() {
  return gulp.src(config.moc.dest + '*.html')
    .pipe($.prettify({indent_size: 2}))
    .pipe(gulp.dest(config.moc.dest))
});

gulp.task('moc.build',function() {
  runSequence(
    'moc.clean',
    'moc.copy',
    ['browserSync.reload','moc.prettify']
  );
});