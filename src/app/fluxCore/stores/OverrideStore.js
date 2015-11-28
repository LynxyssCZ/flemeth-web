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
	return Map();
}

function createOverride(initialData) {
	return Map(initialData);
}

function update(override, state) {
	if (override) {
		state = createOverride(override);
	}
	else {
		state = override;
	}

	return state;
}

function remove(override, state) {
	if (override) {
		state = state.merge(override);
	}
	else {
		state = false;
	}

	return state;
}
