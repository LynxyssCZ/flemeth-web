var Map = require('immutable').Map;
var ZonesActions = require('../actions').Zones;
var RootActions = require('../actions').Root;


function ZonesStore(type, payload, state) {
	if (!state) {
		state = getDefaultState();
	}

	switch (type) {
		case ZonesActions.load.actionType:
		case RootActions.loadDashboard.actionType:
			state = update(payload.zones, getDefaultState());
			break;
		case ZonesActions.update.actionType:
		case ZonesActions.create.actionType:
			state = update(payload.zones, state);
			break;
		case ZonesActions.remove.actionType:
			state = remove(payload.deletedZones, state);
			break;
	}

	return state;
}

module.exports = ZonesStore;

function getDefaultState() {
	return Map();
}

function createZone(initialData) {
	return Map(initialData);
}

function update(zones, state) {
	if (zones) {
		zones.forEach(function(zone) {
			var newZone;
			if (state.has(zone.id)) {
				newZone = state.get(zone.id).merge(Map(zone));
			}
			else {
				newZone = createZone(zone);
			}

			state = state.set(newZone.get('id'), newZone);
		});
	}

	return state;
}

function remove(zones, state) {
	if (zones) {
		zones.forEach(function(zoneId) {
			state = state.delete(zoneId);
		});
	}

	return state;
}
