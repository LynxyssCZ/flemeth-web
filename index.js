var path = require('path');
var routes = ['/'];

var assetsRoot = '/dist';

var scripts = [
	{path: 'https://code.jquery.com/jquery-2.1.4.min.js'},
	{path: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js'},
	{path: assetsRoot + '/js/vendor.min.js'},
	{path: assetsRoot + '/js/app.min.js'}
];
var links = [
	{type: 'icon', href: assetsRoot + '/favicon.ico'},
	{type: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'},
	{type: 'stylesheet', href: assetsRoot + '/css/app.css'}
];

var register = function(server, options, next) {
	server.views({
		engines: {
			html: require('nunjucks-hapi')
		},
		relativeTo: __dirname,
		path: './src/client/views',
		context: {
			title: 'Flemeth web',
			links: links,
			scripts: scripts
		}
	});

	var parsedRoutes = routes.map(function(path) {
		return {
			path: options.base + path,
			method: 'GET',
			handler: {
				view: 'index'
			}
		};
	});

	server.route({
		path: options.base + '/dist/{path*}',
		method: 'GET',
		handler: {
			directory: {
				path: path.join(__dirname, '/dist/client')
			}
		}
	});

	server.route(parsedRoutes);
	next();
};
register.attributes = {
	pkg: require('./package.json')
};

module.exports.register = register;
