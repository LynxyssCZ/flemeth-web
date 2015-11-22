var hapi = require('hapi');
var web = require('./index.js');


var server = new hapi.Server();

server.connection({ host: '0.0.0.0', port: 8097 });
server.register([
	require('inert'),
	require('vision'),
	{
		register: web,
		options: {
			base: ''
		}
	}
], function(err) {
	if (!err) {
		server.start(function() {
			console.log('Server running at:', server.info.uri);
		});
	}
});
