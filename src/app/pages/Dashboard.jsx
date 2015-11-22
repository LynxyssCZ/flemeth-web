var inherits = require('util').inherits;
var React = require('react');


var Dashboard = function(props, context) {
	React.Component.call(this, props, context);
}; Dashboard.prototype.constructor = Dashboard;
inherits(Dashboard, React.Component);
module.exports = Dashboard;

Dashboard.proptypes = {

};

Dashboard.childContextTypes = {

};

Dashboard.prototype.getChildContext = function () {
	return {};
};

Dashboard.prototype.render = function () {
	return <h2>Dashboard lol</h2>;
};
