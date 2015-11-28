var hapi = require('hapi');
var web = require('./index.js');


var server = new hapi.Server();

server.connection({ host: '0.0.0.0', port: 8097 });
server.register([
	require('inert'),
	require('h2o2'),
	require('vision'),
	{
		register: web,
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
					host: '127.0.0.1',
					port: '8098',
					protocol: 'http',
					xforward: true
				}
			}
		});

		server.start(function() {
			console.log('Server running at:', server.info.uri);
		});
	}
});
