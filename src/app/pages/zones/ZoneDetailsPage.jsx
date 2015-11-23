var inherits = require('util').inherits;
var React = require('react');


var ZoneDetailsPage = function(props, context) {
	React.Component.call(this, props, context);
}; ZoneDetailsPage.prototype.constructor = ZoneDetailsPage;
inherits(ZoneDetailsPage, React.Component);
module.exports = ZoneDetailsPage;

ZoneDetailsPage.proptypes = {

};

ZoneDetailsPage.prototype.render = function () {
	return <span>Zone</span>;
};
