module.exports = {
	loadDashboard: function() {
		return [
			{ dashboard: { loading: true }},
			this.api.get('dashboard/').then(function(result) {
				return {
					dashboard: { time: Date.now() },
					override: result.override,
					switcher: result.switcher,
					tempChecker: result.tempChecker,
					zones: result.zones
				};
			})
		];
	}
};
