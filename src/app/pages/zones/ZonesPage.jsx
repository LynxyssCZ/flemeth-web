var inherits = require('util').inherits;
var React = require('react');


var ZonesPage = function(props, context) {
	React.Component.call(this, props, context);
}; ZonesPage.prototype.constructor = ZonesPage;
inherits(ZonesPage, React.Component);
module.exports = ZonesPage;

ZonesPage.proptypes = {

};

ZonesPage.childContextTypes = {

};

ZonesPage.prototype.getChildContext = function () {
	return {};
};

ZonesPage.prototype.render = function () {
	return <div className='panel panel-default'>
			<div className='panel-heading'>
				<h4>ZonesPage</h4>
			</div>
			<div className='zones-page panel-body'>
				{ this.props.children }
			</div>
		</div>;
};
