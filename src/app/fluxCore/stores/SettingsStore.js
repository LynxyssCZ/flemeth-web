var Map = require('immutable').Map;
var SettingsActions = require('../actions').Settings;

function SettingsStore(type, payload, state) {
	if (!state) {
		state = getDefaultState();
	}

	switch (type) {
		case SettingsActions.load.actionType:
			state = update(payload.settings, state);
			break;
		case SettingsActions.update.actionType:
			state = update(payload.settings, state);
			break;
		case SettingsActions.remove.actionType:
			state = remove(payload.deletedSettings, state);
			break;
	}

	return state;
}

module.exports = SettingsStore;

function getDefaultState() {
	return Map();
}

function createSetting(initialData) {
	return Map(initialData);
}

function update(settings, state) {
	if (settings) {
		const settingsIds = [];

		settings.forEach(function(setting) {
			var newSetting;
			if (state.has(setting.id)) {
				newSetting = state.get(setting.id).merge(Map(setting));
			}
			else {
				newSetting = createSetting(setting);
			}

			state = state.set(setting.id, newSetting);
			settingsIds.push(setting.id);
		});

		state = state.filter(function(setting, settingId) {
			return (settingsIds.indexOf(settingId) > -1);
		});
	}

	return state;
}

function remove(settings, state) {
	if (settings) {
		settings.forEach(function(settingId) {
			state = state.delete(settingId);
		});
	}

	return state;
}
