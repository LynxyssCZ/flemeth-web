module.exports = {
	load: function() {
		return this.api.get('switcher/').then(function(response) {
			return {
				switcher: response.switcher
			};
		});
	}
};
