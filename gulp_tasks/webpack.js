'use strict';
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
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


gulp.task('webpack:dev', function() {
	// Start a webpack-dev-server
	var webpackCfg = Object.create(config);

	webpackCfg.entry.app.unshift('webpack-dev-server/client?http://127.0.0.1:8090');

	var compiler = webpack(webpackCfg);

	var server = new WebpackDevServer(compiler, webpackCfg.devServer);

	server.listen(8090, 'localhost', function(err) {
		if(err) throw new gutil.PluginError('webpack-dev-server', err);
		gutil.log('[webpack-dev-server]', 'Server from ' + webpackCfg.output.publicPath);
	});
});
