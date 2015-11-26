var Map = require('immutable').Map;
var TempCheckerActions = require('../actions').TempChecker;

function TempCheckerStore(type, payload, state) {
	if (!state) {
		state = getDefaultState();
	}

	switch (type) {

	}

	return state;
}

module.exports = TempCheckerStore;

function getDefaultState() {
	return Map();
}


function update(newState) {
	return Map(newState);
}
