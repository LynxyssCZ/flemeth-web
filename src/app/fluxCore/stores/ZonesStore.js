var Map = require('immutable').Map;

module.exports = function(type, payload, state) {
	if (!state) {
		state = getDefaultState();
	}

	return state;
};

function getDefaultState() {
	return Map({});
}
