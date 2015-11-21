'use strict';
var webpack = require('webpack');
var gulp = require('gulp');
var gutil = require('gulp-util');

var config = require('./webpack.settings');

gulp.task('webpack', function(callback) {
	var webpackCfg = Object.create(config);

	// run webpack
	webpack(webpackCfg, function(err, stats) {
		if(err) throw new gutil.PluginError('webpack', err);
		gutil.log('[webpack]', stats.toString({}));
		callback();
	});
});
