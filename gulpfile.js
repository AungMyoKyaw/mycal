const gulp = require('gulp');
const webpack = require('webpack');
const webpack_config = require('./webpack.config.js');
const babel = require('gulp-babel');

/**
 * Build for NPM
 */

gulp.task('node', () => {
  return gulp
    .src('src/**')
    .pipe(babel())
    .pipe(gulp.dest('dist/node'));
});

/**
 * Build for Browser
 */

gulp.task('client', () => {
  return new Promise((resolve, reject) => {
    webpack(webpack_config).run((err, stats) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(stats.toString());
        resolve(true);
      }
    });
  });
});

gulp.task('default', gulp.parallel('node', 'client'));
