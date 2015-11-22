var inherits = require('util').inherits;
var React = require('react');


var Zones = function(props, context) {
	React.Component.call(this, props, context);
}; Zones.prototype.constructor = Zones;
inherits(Zones, React.Component);
module.exports = Zones;

Zones.proptypes = {

};

Zones.childContextTypes = {

};

Zones.prototype.getChildContext = function () {
	return {};
};

Zones.prototype.render = function () {
	return <h2>Zones meh</h2>;
};
