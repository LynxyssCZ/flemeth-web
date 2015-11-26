var assign = require('object-assign');


module.exports = {
	create: function(override) {
		return [
			{ override: assign({loading: true}, override) },
			this.api.post('override', override)
				.then(onOverrideResponse)
		];
	},

	update: function(override) {
		return [
			{ override: assign({loading: true}, override) },
			this.api.put('override', override)
				.then(onOverrideResponse)
		];
	},

	delete: function() {
		return [
			{override: {loading: true}},
			this.api.delete('override')
				.then(onOverrideResponse)
		];
	}
};

function onOverrideResponse(result) {
	return { override: result.override };
}
