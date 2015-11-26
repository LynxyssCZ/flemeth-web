var assign = require('object-assign');

module.exports = {
	update: function(setting) {
		return [
			{ settings: [ assign({loading: true}, setting) ] },
			this.api.put('settings/' + setting.id, setting).then(onSettingsResponse)
		];
	},

	delete: function(settingId) {
		return [
			{ deletingSettings: [settingId]},
			this.api.put('settings/' + settingId)
			.then(function() {
				return { deletedSettings: [settingId] };
			})
		];
	}
};


function onSettingsResponse(result) {
	return { settings: result.settings };
}
