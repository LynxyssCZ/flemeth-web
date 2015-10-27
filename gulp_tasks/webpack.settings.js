var path = require("path");
var webpack = require("webpack");
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
				//tell webpack to use jsx-loader for all *.jsx files
				test: /\.jsx$/,
				loader: 'jsx-loader?insertPragma=React.DOM&harmony'
			}
		]
	},
	output: {
		path: path.join(__dirname, '..', outputPath),
		publicPath: path.join('/', outputPath),
		filename: '[name].min.js',
		chunkFilename: "[id].bundle.js",
		sourceMapFilename: '[file].map'
	},
	resolve: {
		alias: ifyConfig.aliases
	},
	externals: ifyConfig.externals,
	plugins: getPlugins(),
	resolve: {
		extension: ['', '.js', '.jsx']
	}
}

function getPlugins() {
	var plugins = [];

	if (ifyConfig.minify) {
		plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true, mangle: ifyConfig.mangle}));
	}

	if (ifyConfig.provide) {
		plugins.push(new webpack.ProvidePlugin(ifyConfig.provide));
	}

	if (ifyConfig.makeMaps) {
		plugins.push(new webpack.SourceMapDevToolPlugin('[file].map', null, "[resource]", "[resource]"));
	}

	plugins.push(new webpack.optimize.CommonsChunkPlugin(ifyConfig.commonChunks, '[name].min.js'));

	return plugins;
}
