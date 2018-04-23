var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    cssnext = require('postcss-cssnext'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import'),
    mixins = require('postcss-mixins'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

gulp.task('default', function () {
    console.log('default task');
});

gulp.task('watch', function () {

    browserSync.init({
        server: {
            baseDir: 'app'
        }
    });

    watch('./app/index.html', function () {
        browserSync.reload();
    });

    watch('./app/assets/styles/**/*.css', function () {
        gulp.start('cssInject');
    });
});

gulp.task('html', function () {
    console.log('html task');
});

gulp.task('styles', function () {
    return gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss([cssImport, mixins, cssvars, nested, cssnext]))
        .on('error', function (errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('cssInject', ['styles'], function () {
    return gulp.src('./app/assets/styles/styles.css').pipe(browserSync.stream());
});