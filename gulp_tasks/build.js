/**
 * Created by jbarot on 11.2.15.
 */
var gulp = require('gulp');
var del = require('del');


gulp.task('build', [
	'webpack',
	'css',
	'assets'
]);

gulp.task('clean', function(cb) {
	del(['./dist/**'], cb);
});
