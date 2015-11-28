var assign = require('object-assign');


module.exports = {
	load: function() {
		return this.api.get('override/').then(onOverrideResponse);
	},
	create: function(override) {
		return [
			{ override: assign({loading: true}, override) },
			this.api.post('override/', override)
				.then(onOverrideResponse)
		];
	},

	update: function(override) {
		return [
			{ override: assign({loading: true}, override) },
			this.api.put('override/', override)
				.then(onOverrideResponse)
		];
	},

	remove: function() {
		return [
			{override: {loading: true, deleting: true}},
			this.api.remove('override/')
				.then(onOverrideResponse)
		];
	}
};

function onOverrideResponse(result) {
	return { override: result.override };
}
