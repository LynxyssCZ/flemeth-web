var routes = [{
	path: '/',
	component: require('./Application'),
	indexRoute: {
		component: require('./pages/Dashboard')
	},
	childRoutes: [
		{
			path: '/zones',
			component: require('./pages/Zones')
		}
	]
}];

module.exports = function() {
	return routes;
};
