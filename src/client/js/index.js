var React = require('react');
var ReactDom = require('react-dom');
var History = require('history/lib/createBrowserHistory');
var Router = require('react-router').Router;
var App = require('../../app');
var ServerApi = require('./ServerApi');

var api = new ServerApi({
	base: 'http://127.0.0.1:8098/api/'
});

var core = new App.FluxCore({
	api: api
});

ReactDom.render(React.createElement(App.Context,
	{
		container: core
	},
	React.createElement(Router, {
		routes: App.routes(),
		history: History()
	})
), document.getElementById('app-container'));

window.core = core;
window.api = api;

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
