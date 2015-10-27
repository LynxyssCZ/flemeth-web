/**
 * Created by jbarot on 11.2.15.
 */
var path = require('path');
var gulp = require('gulp');
var config = require('../config/gulpConfig.json');

var rootDir = config.assets.rootDir;

gulp.task('assets', [
	'partials',
	'images',
	'favicon',
	'components'
]);

gulp.task('partials', function() {
	var partialsConfig = config.assets.partials;

	gulp.src(getGlob(partialsConfig))
		.pipe(gulp.dest(path.join(config.dstDir, partialsConfig.dst)));
});

gulp.task('components', function() {
	var componentsRoot = config.assets.componentsDir;

	gulp.src(componentsRoot + '/**/*.{js,css}')
		.pipe(gulp.dest(path.join(config.dstDir, 'components')));
});

gulp.task('static-css', function() {
});

gulp.task('images', function() {
	var imagesConfig = config.assets.images;

	gulp.src(getGlob(imagesConfig))
		.pipe(gulp.dest(path.join(config.dstDir, imagesConfig.dst)));
});

gulp.task('favicon', function() {
	gulp.src(rootDir + '/favicon*')
		.pipe(gulp.dest(config.dstDir));
});

var getGlob = function(config) {
	var glob = rootDir + '/';
	glob += '' + config.src + '';
	glob += '/**/*.' + config.extension;

	return glob
};