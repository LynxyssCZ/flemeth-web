var inherits = require('util').inherits;
var React = require('react');


var SensorsListPage = function(props, context) {
	React.Component.call(this, props, context);
}; SensorsListPage.prototype.constructor = SensorsListPage;
inherits(SensorsListPage, React.Component);
module.exports = SensorsListPage;

SensorsListPage.proptypes = {

};

SensorsListPage.prototype.render = function () {
	return <h2>SensorsList</h2>;
};
