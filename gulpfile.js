var gulp = require('gulp');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var cssImport = require('postcss-import');
var mixins = require('postcss-mixins');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

gulp.task('default', function() {
  console.log('default task');
});

gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });

  watch('./app/index.html', function() {
    browserSync.reload();
  });

  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('cssInject');
  });
});

gulp.task('html', function() {
  console.log('html task');
});

gulp.task('styles', function() {
  return gulp
    .src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, cssnext]))
    .on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('cssInject', ['styles'], function() {
  return gulp.src('./app/assets/styles/styles.css').pipe(browserSync.stream());
});
