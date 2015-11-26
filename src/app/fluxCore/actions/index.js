var tagActions = require('fluxerino').Utils.tagActions;

module.exports = tagActions({
	Override: require('./OverrideActions'),
	Plans: require('./PlansActions'),
	Root: require('./RootActions'),
	Schedules: require('./SchedulesActions'),
	SensorsValues: require('./SensorsValuesActions'),
	Settings: require('./SettingsActions'),
	Zones: require('./ZonesActions'),
	ZonesTemps: require('./ZonesTempsActions')
});
