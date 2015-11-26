var Map = require('immutable').Map;

function SensorsStore(type, payload, state) {
	if (!state) {
		state = getDefaultState();
	}

	if (type === 'Sensors.readFrame') {
		state = update(payload.sensors, state);
	}

	return state;
}

module.exports = SensorsStore;

function getDefaultState() {
	return Map();
}

function update(sensors, state) {
	sensors.forEach(function(sensor) {
		var newSensor = createSensor(sensor);
		state = state.set(newSensor.get('id'), newSensor);
	});

	return state;
}

function createSensor(initialData) {
	return Map({
		id: initialData.sensorId,
		type: initialData.type,
		reader: initialData.reader,
		values: [initialData.value],
		average: initialData.value,
		meta: initialData.meta,
		lastUpdate: initialData.time
	});
}
