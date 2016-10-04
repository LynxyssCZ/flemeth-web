var hapi = require('hapi');
var Web = require('./src/server/index.js');

const web = new Web({}, {});


var server = new hapi.Server();

server.connection({ host: '0.0.0.0', port: 8097 });
server.register([
	require('inert'),
	require('h2o2'),
	require('vision'),
	{
		register: web.registerToServer,
		options: {
			base: ''
		}
	}
], function(err) {
	if (!err) {

		server.route({
			path: '/api/{path*}',
			method: '*',
			handler: {
				proxy: {
					host: process.env.HOST || '127.0.0.1',
					port: process.env.PORT || '8098',
					protocol: 'http',
					passThrough: true,
					xforward: true
				}
			}
		});

		server.start(function() {
			console.log('Server running at:', server.info.uri);
		});
	}
});
