'use strict';
var gulp = require('gulp');

gulp.task('dev-server',[
	'webpack:dev',
	'css:watch',
	'testServer'
], function() {

});

gulp.task('testServer', function() {
	require('../testServer');
});
