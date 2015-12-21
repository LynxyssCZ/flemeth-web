var Immutable = require('immutable');
var SnapshotsActions = require('../actions').Snapshots;

function SnapshotsStore(type, payload, state) {
	if (!state) {
		state = getDefaultState();
	}

	switch (type) {
		case SnapshotsActions.load.actionType:
			state = state.withMutations(function update(state) {
				load(payload.snapshots, state);
			});
			break;
	}

	return state;
}

module.exports = SnapshotsStore;

function getDefaultState() {
	return Immutable.Map();
}

function load(snapshots, state) {
	if (snapshots) {
		snapshots.forEach(function storeSnapshot(snapshot) {
			state = state.setIn([snapshot.type, 'data', snapshot.time], snapshot);
			state = state.setIn([snapshot.type, 'lastTime'],
				Math.max(state.getIn([snapshot.type, 'lastTime']) || 0, snapshot.time)
			);
		});
	}

	return state;
}
