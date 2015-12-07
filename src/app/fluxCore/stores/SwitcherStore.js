var Map = require('immutable').Map;
var SwitcherActions = require('../actions').Switcher;
var RootActions = require('../actions').Root;


function SwitchersStore(type, payload, state) {
	if (typeof state === 'undefined') {
		state = getDefaultState();
	}

	switch (type) {
		case SwitcherActions.load.actionType:
		case RootActions.loadDashboard.actionType:
			state = update(payload.switcher, state);
			break;
	}

	return state;
}

module.exports = SwitchersStore;

function getDefaultState() {
	return Map({

	});
}

function update(switcher, state) {
	if (!switcher) {
		return state;
	}

	if (switcher.loading) {
		state = state.merge(switcher);
	}
	else {
		state = Map(switcher);
	}

	return state;
}
