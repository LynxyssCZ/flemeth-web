var inherits = require('util').inherits;
var React = require('react');


var ZonesPage = function(props, context) {
	React.Component.call(this, props, context);
}; ZonesPage.prototype.constructor = ZonesPage;
inherits(ZonesPage, React.Component);
module.exports = ZonesPage;
ZonesPage.displayName = 'ZonesPage';
ZonesPage.proptypes = {
	container: React.PropTypes.object.isRequired
};

ZonesPage.prototype.render = function () {
	return <div className='zones-page'>
			{ this.props.children }
		</div>;
};
