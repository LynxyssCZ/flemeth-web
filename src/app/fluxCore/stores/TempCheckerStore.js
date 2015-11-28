var Map = require('immutable').Map;
var TempCheckerActions = require('../actions').TempChecker;

function TempCheckerStore(type, payload, state) {
	if (!state) {
		state = getDefaultState();
	}

	switch (type) {
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
