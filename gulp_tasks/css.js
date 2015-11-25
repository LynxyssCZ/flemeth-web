/**
 * Created by jbarot on 15.2.15.
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var concatCss = require('gulp-concat-css');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('css', function() {
	return gulp.src('./src/client/css/**/*.scss')
		.pipe(sass({
			includePaths: require('bourbon').includePaths
		}).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(concatCss('app.css'))
		.pipe(gulp.dest('./dist/client/css'));
});

gulp.task('css:watch', ['css'], function() {
	var watcher = gulp.watch('./src/client/css/**/*.scss', ['css']);

	watcher.on('error', function(err) {
		throw new gutil.PluginError('css:watch', err);
	});
});
