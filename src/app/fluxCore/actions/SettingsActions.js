var assign = require('object-assign');

module.exports = {
	load: function() {
		return this.api.get('setting/').then(onSettingsResponse);
	},
	update: function(setting) {
		return [
			{ settings: [ assign({loading: true}, setting) ] },
			this.api.put('settings/' + setting.key + '/', setting.value).then(onSettingsResponse)
		];
	},

	remove: function(settingId) {
		return [
			{ deletingSettings: [settingId]},
			this.api.del('settings/' + settingId + '/')
			.then(function() {
				return { deletedSettings: [settingId] };
			})
		];
	}
};


function onSettingsResponse(result) {
	return { settings: result.settings };
}
