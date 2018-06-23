var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('node', () => {
  return gulp
    .src('src/**')
    .pipe(babel())
    .pipe(gulp.dest('dist/node'));
});

gulp.task('default', gulp.parallel('node'));
