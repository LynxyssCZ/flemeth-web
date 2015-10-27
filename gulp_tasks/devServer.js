'use strict';
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var gulp = require('gulp');
var gutil = require('gulp-util');

var config = require('./webpack.settings');

gulp.task('dev-server',[
	'webpack-dev-server',
	'watchCss'
], function(callback) {

});

gulp.task('watchCss', function(callback) {
	var watcher = gulp.watch('./public/css/**/*.scss', ['css']);

	watcher.on('change', function(event) {});
	watcher.on('error', function(err) {
		console.log(arguments);
	});
});

gulp.task('webpack-dev-server', function(callback) {
	// Start a webpack-dev-server
	var webpackCfg = Object.create(config);
//	config.output.path = path.join(__dirname, 'dist/js');

	var compiler = webpack(webpackCfg);

	new WebpackDevServer(compiler, {
		publicPath: webpackCfg.output.publicPath,
		https: true,
		stats: {
			colors: true
		}
	}).listen(8090, 'localhost', function(err) {
		if(err) throw new gutil.PluginError('webpack-dev-server', err);
		gutil.log('[webpack-dev-server]', 'http://localhost:8090/webpack-dev-server/index.html');
	});
});