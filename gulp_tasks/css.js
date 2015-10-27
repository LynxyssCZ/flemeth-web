/**
 * Created by jbarot on 15.2.15.
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('css', function() {
	return gulp.src('./src/client/css/**/*.scss')
		.pipe(sass({
			includePaths: require('bourbon').includePaths
		}))
		.pipe(sourcemaps.write())
		.pipe(concatCss('app.css'))
		.pipe(gulp.dest('./dist/client/css'));
});
