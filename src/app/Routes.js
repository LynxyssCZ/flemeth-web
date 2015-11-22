var Application = require('./Application');
var Dashboard = require('./pages/Dashboard');

var routes = [{
	path: '/',
	component: Application,
	indexRoute: {
		component: Dashboard
	},
	childRoutes: [

	]
}];

module.exports = function() {
	return routes;
};
