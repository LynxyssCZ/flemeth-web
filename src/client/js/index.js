var React = require('react');
var ReactDom = require('react-dom');
var History = require('history/lib/createBrowserHistory');
var Router = require('react-router').Router;

var App = require('../../app');
var core = new App.FluxCore({

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
