var Map = require('immutable').Map;
var OverrideActions = require('../actions').Override;
var RootActions = require('../actions').Root;


function OverridesStore(type, payload, state) {
	if (typeof state === 'undefined') {
		state = getDefaultState();
	}

	switch (type) {
		case OverrideActions.load.actionType:
		case OverrideActions.update.actionType:
		case OverrideActions.create.actionType:
		case RootActions.loadDashboard.actionType:
			state = update(payload.override, state);
			break;
		case OverrideActions.remove.actionType:
			state = remove(payload.override, state);
			break;
	}

	return state;
}

module.exports = OverridesStore;

function getDefaultState() {
	return Map({
		reason: null,
		value: null,
		length: null,
		created: null,
		loading: true
	});
}

function update(override, state) {
	if (!override) {
		return state;
	}

	if (override.loading) {
		state = state.merge(override);
	}
	else {
		state = Map(override);
	}

	return state;
}

function remove(override, state) {
	if (!override) {
		return state;
	}

	if (override.loading) {
		state = getDefaultState();
	}
	else {
		state = Map(override);
	}

	return state;
}
