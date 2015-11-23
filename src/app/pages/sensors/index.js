module.exports = function(path) {
	return {
		path: path,
		component: require('./SensorsPage'),
		indexRoute: {
			component: require('./SensorsListPage')
		},
		childRoutes: [
			{
				path: ':id',
				component: require('./SensorDetailsPage')
			}
		]
	};
};
