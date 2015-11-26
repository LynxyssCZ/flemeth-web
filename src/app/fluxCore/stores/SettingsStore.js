var Map = require('immutable').Map;
var RootActions = require('../actions').Root;
var SettingsActions = require('../actions').Settings;

function SettingsStore(type, payload, state) {
	if (!state) {
		state = getDefaultState();
	}

	switch (type) {
		case SettingsActions.create.actionType:
		case SettingsActions.update.actionType:
			state = updateSettings(payload.settings, state);
			break;
		case SettingsActions.delete.actionType:
			state = deleteSettings(payload.deletedSettings, state);
			break;
	}

	return state;
}

module.exports = SettingsStore;

function getDefaultState() {
	return Map();
}

function deleteSettings(ids, state) {
	if (ids) {
		ids.forEach(function(settingId) {
			state = state.delete(settingId);
		});
	}

	return state;
}

function updateSettings(settings, state) {
	if (settings) {
		settings.forEach(function(setting) {
			var newSetting = createSetting(setting);
			state = state.set(newSetting.get('key'), newSetting);
		});
	}

	return state;
}

function createSetting(initialData) {
	return Map({
		key: initialData.key,
		value: initialData.value,
		loading: initialData.loading
	});
}
