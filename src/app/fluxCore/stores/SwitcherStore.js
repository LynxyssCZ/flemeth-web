var Map = require('immutable').Map;
var SwitcherActions = require('../actions').Switcher;

function SwitcherStore(type, payload, state) {
	if (!state) {
		state = getDefaultState();
	}

	switch (type) {
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
