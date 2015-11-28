var tagActions = require('fluxerino').Utils.tagActions;

module.exports = tagActions({
	Override: require('./OverrideActions'),
	Plans: require('./PlansActions'),
	Root: require('./RootActions'),
	Sensors: require('./SensorsActions'),
	SensorsValues: require('./SensorsValuesActions'),
	Settings: require('./SettingsActions'),
	Schedules: require('./SchedulesActions'),
	Switcher: require('./SwitcherActions'),
	TempChecker: require('./TempCheckerActions'),
	Zones: require('./ZonesActions'),
	ZonesTemps: require('./ZonesTempsActions')
});
