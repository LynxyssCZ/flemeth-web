var Map = require('immutable').Map;
var SwitcherActions = require('../actions').Switcher;

function SwitcherStore(type, payload, state) {
	if (!state) {
		state = getDefaultState();
	}

	switch (type) {

	}

	return state;
}
module.exports = SwitcherStore;

function getDefaultState() {
	return Map();
}

function updateSwitcher(value) {
	return Map(value);
}
