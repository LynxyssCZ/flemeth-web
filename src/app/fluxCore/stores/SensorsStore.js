var Map = require('immutable').Map;
var SensorsActions = require('../actions').Sensors;

function SensorsStore(type, payload, state) {
	if (!state) {
		state = getDefaultState();
	}

	switch (type) {
		case SensorsActions.load.actionType:
			state = update(payload.sensors, getDefaultState());
			break;
	}

	return state;
}

module.exports = SensorsStore;

function getDefaultState() {
	return Map();
}

function createSensor(initialData) {
	return Map(initialData);
}

function update(sensors, state) {
	sensors.forEach(function(sensor) {
		var newSensor = createSensor(sensor);
		state = state.set(newSensor.get('id'), newSensor);
	});

	return state;
}
