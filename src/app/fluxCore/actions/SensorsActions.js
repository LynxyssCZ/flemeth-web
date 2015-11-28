module.exports = {
	load: function() {
		return this.api.get('sensors/').then(function(response) {
			return {
				sensors: response.sensors
			};
		});
	}
};
