var Map = require('immutable').Map;
var RootActions = require('../actions').Root;

function SwitcherStore(type, payload, state) {
	if (!state) {
		state = getDefaultState();
	}

	switch (type) {
		case RootActions.loadDashboard.actionType:
			state = loadDashboard(payload.dashboard, state);
			break;
	}

	return state;
}

module.exports = SwitcherStore;

function getDefaultState() {
	return Map({
		dashboard: Map()
	});
}

function loadDashboard(dashboard, state) {
	return state.set('dashboard', Map(dashboard));
}
