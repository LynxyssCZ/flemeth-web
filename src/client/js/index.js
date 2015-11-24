var React = require('react');
var ReactDom = require('react-dom');
var History = require('history/lib/createBrowserHistory');
var Router = require('react-router').Router;
var App = require('../../app');
var core = new App.FluxCore({

});

console.log(flattenRoutes(App.routes(), ''));

ReactDom.render(React.createElement(App.Context,
	{
		container: core
	},
	React.createElement(Router, {
		routes: App.routes(),
		history: History()
	})
), document.getElementById('app-container'));

function flattenRoutes(plainRoutes, root) {
	return plainRoutes.reduce(function(reducedRoutes, route) {
		var routes = [];

		var routePath = (root + '/' +  route.path).replace('//', '/', 'g');
		routes.push(routePath);

		if (route.childRoutes) {
			routes = routes.concat(flattenRoutes(route.childRoutes, routePath));
		}

		return reducedRoutes.concat(routes);
	}, []);
}
