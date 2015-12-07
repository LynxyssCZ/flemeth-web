var Map = require('immutable').Map;
var TempCheckerActions = require('../actions').TempChecker;
var RootActions = require('../actions').Root;


function TempCheckersStore(type, payload, state) {
	if (typeof state === 'undefined') {
		state = getDefaultState();
	}

	switch (type) {
		case TempCheckerActions.load.actionType:
		case RootActions.loadDashboard.actionType:
			state = update(payload.tempChecker, state);
			break;
	}

	return state;
}

module.exports = TempCheckersStore;

function getDefaultState() {
	return Map({

	});
}

function update(tempChecker, state) {
	if (!tempChecker) {
		return state;
	}

	if (tempChecker.loading) {
		state = state.merge(tempChecker);
	}
	else {
		state = Map(tempChecker);
	}

	return state;
}
