var tagActions = require('fluxerino').Utils.tagActions;

module.exports = tagActions({
	Override: require('./OverrideActions'),
	Plans: require('./PlansActions'),
	Root: require('./RootActions'),
	Sensors: require('./SensorsActions'),
	Settings: require('./SettingsActions'),
	Schedules: require('./SchedulesActions'),
	Snapshots: require('./SnapshotsActions'),
	Switcher: require('./SwitcherActions'),
	TempChecker: require('./TempCheckerActions'),
	Zones: require('./ZonesActions')
});
