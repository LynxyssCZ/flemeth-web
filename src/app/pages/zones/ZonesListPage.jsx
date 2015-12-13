var inherits = require('util').inherits;
var React = require('react');


var ZonesListPage = function(props, context) {
	React.Component.call(this, props, context);
}; ZonesListPage.prototype.constructor = ZonesListPage;
inherits(ZonesListPage, React.Component);
module.exports = ZonesListPage;

ZonesListPage.displayName = 'ZonesListPage';
ZonesListPage.proptypes = {
	container: React.PropTypes.object.isRequired
};

ZonesListPage.prototype.render = function () {
	return <span>ZonesList</span>;
};
