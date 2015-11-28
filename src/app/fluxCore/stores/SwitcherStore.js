var Map = require('immutable').Map;
var SwitcherActions = require('../actions').Switcher;
var RootActions = require('../actions').Root;


function SwitcherStore(type, payload, state) {
	if (!state) {
		state = getDefaultState();
	}

	switch (type) {
		case RootActions.loadDashboard.actionType:
		case SwitcherActions.load.actionType:
			state = Map(payload.switcher);
			break;
	}

	return state;
}

module.exports = SwitcherStore;

function getDefaultState() {
	return Map();
}
