var React = require('react');
var ReactDom = require('react-dom');
var History = require('history/lib/createBrowserHistory');
var assign = require('object-assign');
var HighCharts = require('highcharts');

var Router = require('react-router').Router;
var App = require('../../app');
var ServerApi = require('./ServerApi');

var api = new ServerApi({base: '/api/'});
var core = new App.FluxCore({api: api});
core.init(renderApp);

window.core = core;
window.api = api;

function renderApp() {
	ReactDom.render(React.createElement(Router, {
		routes: App.routes(),
		history: History(),
		createElement: createElement
	}), document.getElementById('app-container'));
}

function createElement(component, props) {
	return React.createElement(component, assign({
		container: core
	}, props));
}

require('highcharts/modules/no-data-to-display')(HighCharts);
require('highcharts/modules/exporting')(HighCharts);
require('highcharts/highcharts-more')(HighCharts);

HighCharts.setOptions({
	global: {
		useUTC: false
	}
});

//
// function flattenRoutes(plainRoutes, root) {
// 	return plainRoutes.reduce(function(reducedRoutes, route) {
// 		var routes = [];
//
// 		var routePath = (root + '/' +  route.path).replace('//', '/', 'g');
// 		routes.push(routePath);
//
// 		if (route.childRoutes) {
// 			routes = routes.concat(flattenRoutes(route.childRoutes, routePath));
// 		}
//
// 		return reducedRoutes.concat(routes);
// 	}, []);
// }
