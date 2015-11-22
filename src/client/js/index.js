var React = require('react');
var ReactDom = require('react-dom');
var Router = require('react-router').Router;
var App = require('../../app');

ReactDom.render(React.createElement(Router, {
	routes: App.Routes()
}), document.getElementById('app-container'));
