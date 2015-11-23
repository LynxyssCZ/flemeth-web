var inherits = require('util').inherits;
var React = require('react');


var SensorDetailsPage = function(props, context) {
	React.Component.call(this, props, context);
}; SensorDetailsPage.prototype.constructor = SensorDetailsPage;
inherits(SensorDetailsPage, React.Component);
module.exports = SensorDetailsPage;

SensorDetailsPage.proptypes = {

};

SensorDetailsPage.prototype.render = function () {
	return <h2>SensorDetailsPage</h2>;
};
