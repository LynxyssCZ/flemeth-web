var inherits = require('util').inherits;
var React = require('react');


var SensorsPage = function(props, context) {
	React.Component.call(this, props, context);
}; SensorsPage.prototype.constructor = SensorsPage;
inherits(SensorsPage, React.Component);
module.exports = SensorsPage;

SensorsPage.proptypes = {

};

SensorsPage.childContextTypes = {

};

SensorsPage.prototype.getChildContext = function () {
	return {};
};

SensorsPage.prototype.render = function () {
	return <h2>SensorsPage meh</h2>;
};
