var SuperAgent = require('superagent');
var Promise = require('bluebird');

var ServerApi = function(config) {
	this.baseUri = config.base;
	this.requestAsync = Promise.promisify(this.request, {
		context: this
	});
}; ServerApi.prototype.constructor = ServerApi;

module.exports = ServerApi;

ServerApi.prototype.getPath = function (sub) {
	return this.baseUri + sub;
};

ServerApi.prototype.get = function (path, query) {
	var req = SuperAgent.get(this.getPath(path))
		.query(query);

	return this.requestAsync(req);
};

ServerApi.prototype.post = function (path, data) {
	var req = SuperAgent.post(this.getPath(path))
		.set('Content-Type', 'application/json')
		.send(data);

	return this.requestAsync(req);
};

ServerApi.prototype.put = function (path, data) {
	var req = SuperAgent.put(this.getPath(path))
		.set('Content-Type', 'application/json')
		.send(data);

	return this.requestAsync(req);
};

ServerApi.prototype.del = function (path) {
	var req = SuperAgent.del(this.getPath(path));
	return this.requestAsync(req);
};

ServerApi.prototype.request = function (req, callback) {
	req.set('Accept', 'application/json')
		.end(function(err, res) {
			if (res.ok) {
				return callback(null, res.body);
			}

			return callback(err, null);
		});
};
