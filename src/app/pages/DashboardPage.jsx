var inherits = require('util').inherits;
var React = require('react');


var DashboardPage = function(props, context) {
	React.Component.call(this, props, context);
}; DashboardPage.prototype.constructor = DashboardPage;
inherits(DashboardPage, React.Component);
module.exports = DashboardPage;

DashboardPage.proptypes = {

};

DashboardPage.childContextTypes = {

};

DashboardPage.prototype.getChildContext = function () {
	return {};
};

DashboardPage.prototype.render = function () {
	return <h2>DashboardPage lol</h2>;
};
