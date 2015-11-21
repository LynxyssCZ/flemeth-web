var React = require('react');
var ReactRouter = require('react-router');
var Application = require('./Application');
var Dashboard = require('./pages/Dashboard');

var Router = ReactRouter.Router;

var routes = {
	path: '/',
	component: Application,
	indexRoute: {
		component: Dashboard
	},
	childRoutes: [

	]
};

module.exports = function() {
	return <Router routes={routes} />;
};
