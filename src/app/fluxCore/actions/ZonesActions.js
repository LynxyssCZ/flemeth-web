var assign = require('object-assign');


module.exports = {
	create: function(zone) {
		return [
			{ zones: [assign({ loading: true, id: generateKey() }, zone)] },
			this.api.post('zones', zone).then(onZonesResponse)
		];
	},

	update: function(zone) {
		return [
			{ zones: [ assign({loading: true}, zone) ] },
			this.api.put('zones/' + zone.id, zone).then(onZonesResponse)
		];
	},

	delete: function(zoneId) {
		return [
			{ deletingZones: [zoneId]},
			this.api.put('zones/' + zoneId)
			.then(function() {
				return { deletedZones: [zoneId] };
			})
		];
	}
};


var IntSize = Math.pow(2, 32);

function generateKey() {
	return 'loading_' + (Math.random()*IntSize).toString(16);
}

function onZonesResponse(result) {
	return { zones: result.zones };
}
