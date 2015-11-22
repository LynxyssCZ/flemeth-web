var inherits = require('util').inherits;
var React = require('react');


var SchedulingPage = function(props, context) {
	React.Component.call(this, props, context);
}; SchedulingPage.prototype.constructor = SchedulingPage;
inherits(SchedulingPage, React.Component);
module.exports = SchedulingPage;

SchedulingPage.proptypes = {

};

SchedulingPage.childContextTypes = {

};

SchedulingPage.prototype.getChildContext = function () {
	return {};
};

SchedulingPage.prototype.render = function () {
	return <h2>SchedulingPage</h2>;
};
