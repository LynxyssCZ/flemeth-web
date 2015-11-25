'use strict';
var gulp = require('gulp');

gulp.task('dev-server',[
	'webpack:dev',
	'css:watch'
], function() {

});
