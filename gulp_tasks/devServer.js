'use strict';
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var gulp = require('gulp');
var gutil = require('gulp-util');

var config = require('./webpack.settings');

gulp.task('dev-server',[
	'webpack-dev-server',
	'watchCss'
], function() {

});

gulp.task('watchCss', function() {
	var watcher = gulp.watch('./public/css/**/*.scss', ['css']);

	watcher.on('change', function() {});
	watcher.on('error', function() {
		console.log(arguments);
	});
});

gulp.task('webpack-dev-server', function() {
	// Start a webpack-dev-server
	var webpackCfg = Object.create(config);
//	config.output.path = path.join(__dirname, 'dist/js');

	// webpackCfg.entry.app.unshift('webpack-dev-server/client?http://localhost:8090');

	var compiler = webpack(webpackCfg);

	new WebpackDevServer(compiler, {
		publicPath: webpackCfg.output.publicPath,
		stats: {
			colors: true
		}
	}).listen(8090, 'localhost', function(err) {
		if(err) throw new gutil.PluginError('webpack-dev-server', err);
		gutil.log('[webpack-dev-server]', 'http://localhost:8090/webpack-dev-server/index.html');
	});
});
