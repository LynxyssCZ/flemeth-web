module.exports = function(path) {
	return {
		path: path,
		component: require('./ZonesPage'),
		indexRoute: {
			component: require('./ZonesListPage')
		},
		childRoutes: [
			{
				path: ':id',
				component: require('./ZoneDetailsPage')
			}
		]
	};
};
