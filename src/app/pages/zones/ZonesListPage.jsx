var inherits = require('util').inherits;
var React = require('react');


var ZonesListPage = function(props, context) {
	React.Component.call(this, props, context);
}; ZonesListPage.prototype.constructor = ZonesListPage;
inherits(ZonesListPage, React.Component);
module.exports = ZonesListPage;

ZonesListPage.proptypes = {

};

ZonesListPage.prototype.render = function () {
	return <h2>ZonesList</h2>;
};
