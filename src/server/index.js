'use strict';
const path = require('path');
const nunjucks = require('nunjucks-hapi');

nunjucks.configure({
	watch: false
});

class FlemethWeb {
	constructor(app, options) {
		this.app = app;
		this.options = options;
	}

	init(next) {
		this.app.methods.server.register([{
			register: this.registerToServer,
			attributes: require('../../package.json'),
			options: this.options
		}], next);
	}

	registerToServer(server, options, next) {
		const parsedRoutes = FlemethWeb.routes.map(function(path) {
			return {
				path: options.base + path,
				method: 'GET',
				handler: {
					view: 'index'
				}
			};
		});

		server.views({
			engines: {
				html: nunjucks
			},
			compileOptions: {
				watch: false
			},
			relativeTo: __dirname,
			path: './src/client/views',
			context: {
				title: 'Flemeth web',
				links: FlemethWeb.links,
				scripts: FlemethWeb.scripts
			}
		});


		server.route({
			path: options.base + '/dist/{path*}',
			method: 'GET',
			handler: {
				directory: {
					path: path.join(__dirname, '../client')
				}
			}
		});

		server.route(parsedRoutes);
		next();
	}
}

FlemethWeb.routes = ['/', '/zones', '/sensors', '/sensors/{sensorId}', '/schedules'];
FlemethWeb.assetsRoot = process.env.NODE_ENV === 'production' ? '/dist' : '//127.0.0.1:8090/dist/client';
FlemethWeb.links = [
	{type: 'icon', href: FlemethWeb.assetsRoot + '/favicon.ico'},
	{type: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'},
	{type: 'stylesheet', href: FlemethWeb.assetsRoot + '/css/app.css'}
];
FlemethWeb.scripts = [
	{path: '//code.jquery.com/jquery-2.1.4.min.js'},
	{path: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js'},
	{path: FlemethWeb.assetsRoot + '/js/react.min.js'},
	{path: FlemethWeb.assetsRoot + '/js/vendor.min.js'},
	{path: FlemethWeb.assetsRoot + '/js/app.min.js'}
];



module.exports = FlemethWeb;
