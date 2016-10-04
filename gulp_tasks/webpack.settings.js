var path = require('path');
var url = require('url');
var webpack = require('webpack');
var config = require('../config/gulpConfig.json');
var ifyConfig = config.browserify;

var outputPath = 'dist/client/js/';

var entry = {};

for (var chunk in ifyConfig.chunks) {
	entry[chunk] = ifyConfig.chunks[chunk];
}

module.exports = {
	entry: entry,
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				loader: 'babel-loader',
				query: {
					plugins: [
						'transform-react-jsx',
						'transform-object-rest-spread',
						'transform-es2015-classes',
						'transform-es2015-block-scoping'
					]
				}
			}
		]
	},
	output: {
		path: path.join(__dirname, '..', outputPath),
		publicPath: url.resolve('/', outputPath),
		filename: '[name].min.js',
		chunkFilename: '[id].bundle.js',
		sourceMapFilename: '[file].map'
	},
	externals: ifyConfig.externals,
	plugins: getPlugins(),
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	devServer: {
		publicPath: url.resolve('/', outputPath),
		quiet: true,
		stats: {
			colors: true,
			warnings: false,
			timings: true,
			chunks: false
		}
	}
};

function getPlugins() {
	var plugins = [];

	if (ifyConfig.minify) {
		plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true, mangle: ifyConfig.mangle}));
	}

	if (ifyConfig.provide) {
		plugins.push(new webpack.ProvidePlugin(ifyConfig.provide));
	}

	if (ifyConfig.makeMaps) {
		plugins.push(new webpack.SourceMapDevToolPlugin('[file].map', null, '[resource]', '[resource]'));
	}

	plugins.push(new webpack.optimize.CommonsChunkPlugin(ifyConfig.commonChunks, '[name].min.js'));

	return plugins;
}
