var routes = [{
	path: '/',
	component: require('./Application'),
	indexRoute: {
		component: require('./pages/DashboardPage')
	},
	childRoutes: [
		require('./pages/sensors')('sensors'),
		require('./pages/schedules')('schedules'),
		require('./pages/zones')('zones')
	]
}];

module.exports = function() {
	return routes;
};
