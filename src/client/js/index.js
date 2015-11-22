var React = require('react');
var ReactDom = require('react-dom');
var History = require('history/lib/createBrowserHistory');
var Router = require('react-router').Router;
var App = require('../../app');

ReactDom.render(React.createElement(Router, {
	routes: App.Routes(),
	history: History()
}), document.getElementById('app-container'));
