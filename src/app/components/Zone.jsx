var inherits = require('util').inherits;
var React = require('react');


var Zone = function(props, context) {
	React.Component.call(this, props, context);
}; Zone.prototype.constructor = Zone;
inherits(Zone, React.Component);
module.exports = Zone;

Zone.proptypes = {

};

Zone.prototype.render = function () {
	return;
};
