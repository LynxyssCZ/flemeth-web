var inherits = require('util').inherits;
var React = require('react');


var SensorListPage = function(props, context) {
	React.Component.call(this, props, context);
}; SensorListPage.prototype.constructor = SensorListPage;
inherits(SensorListPage, React.Component);
module.exports = SensorListPage;

SensorListPage.proptypes = {

};

SensorListPage.prototype.render = function () {
	return <h2>SensorListPage</h2>;
};
