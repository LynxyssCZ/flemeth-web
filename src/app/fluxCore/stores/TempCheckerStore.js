var Map = require('immutable').Map;
var TempCheckerActions = require('../actions').TempChecker;
var RootActions = require('../actions').Root;


function TempCheckerStore(type, payload, state) {
	if (!state) {
		state = getDefaultState();
	}

	switch (type) {
		case RootActions.loadDashboard.actionType:
		case TempCheckerActions.load.actionType:
			state = Map(payload.tempChecker);
			break;
	}

	return state;
}

module.exports = TempCheckerStore;

function getDefaultState() {
	return Map();
}
