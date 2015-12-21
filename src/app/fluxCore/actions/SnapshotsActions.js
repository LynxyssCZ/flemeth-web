'use strict';
module.exports = {
	load: function(fromTs, toTs, snapshots) {
		if (snapshots && !Array.isArray(snapshots)) {
			snapshots = [snapshots];
		}

		return this.api.get('snapshots/', {
			from: fromTs,
			to: toTs,
			types: snapshots ? snapshots.join(';') : undefined
		}).then(function(result) {
			return {
				snapshots: result.snapshots
			};
		});
	}
};
