var inherits = require('util').inherits;
var React = require('react');
var ClassNames = require('classnames');


var ZonesHistory = function(props, context) {
	React.Component.call(this, props, context);
}; ZonesHistory.prototype.constructor = ZonesHistory;
inherits(ZonesHistory, React.Component);
module.exports = ZonesHistory;

ZonesHistory.proptypes = {
	tempChecker: React.PropTypes.object.isRequired,
	zones: React.PropTypes.object.isRequired
};

ZonesHistory.prototype.render = function () {
	return <div className={this.props.className}>
		<div className={ClassNames('zones-history panel panel-default')}>
			<div className='panel-heading'>
				<h4>Zones History</h4>
			</div>
			<div className='panel-body'>
				{this.renderContent()}
			</div>
		</div>
	</div>;
};

ZonesHistory.prototype.renderContent = function () {
	var elements = [];

	return elements;
};
