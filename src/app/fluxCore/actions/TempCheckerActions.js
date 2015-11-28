module.exports = {
	load: function() {
		return this.api.get('tempchecker/').then(function(response) {
			return {
				tempChecker: response.tempChecker
			};
		});
	}
};
