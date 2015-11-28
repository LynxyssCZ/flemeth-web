var Hash = require('object-hash');

module.exports = {
	load: function(fromTs, toTs, zones) {
		var requestMeta = {
			time: Date.now(),
			hash: Hash.sha1({
				to: toTs,
				from: fromTs,
				zones: zones
			})
		};

		if (zones && !Array.isArray(zones)) {
			zones = [zones];
		}

		return this.api.get('zonestemps/', {
			to: toTs,
			from: fromTs,
			zones: zones ? zones.join(';') : undefined
		}).then(function(result) {
			return {
				zonesTemps: groupValues(result.zonesTemps, getZoneTempKey, function(key, values) {
					return {
						zoneId: key,
						values: values,
						meta: requestMeta
					};
				})
			};
		});
	}
};

function getZoneTempKey(zoneTemp) {
	return zoneTemp.zoneId;
}

function groupValues(values, getKey, buildBundle) {
	var heap = values.reduce(function(heap, value) {
		var key = getKey(value);

		if (heap.hasOwnProperty(key)) {
			heap[key].push(value);
		}
		else {
			heap[key] = [value];
		}

		return heap;
	}, {});

	return Object.keys(heap).map(function(key) {
		return buildBundle(key, heap[key]);
	});
}
