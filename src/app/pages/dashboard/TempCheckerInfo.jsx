var inherits = require('util').inherits;
var React = require('react');
var ClassNames = require('classnames');


var TempCheckerInfo = function(props, context) {
	React.Component.call(this, props, context);
}; TempCheckerInfo.prototype.constructor = TempCheckerInfo;
inherits(TempCheckerInfo, React.Component);
module.exports = TempCheckerInfo;

TempCheckerInfo.proptypes = {
	tempChecker: React.PropTypes.object.isRequired,
	zones: React.PropTypes.object.isRequired
};

TempCheckerInfo.prototype.render = function () {
	return <div className={this.props.className}>
		<div className={ClassNames('tempchecker-info panel panel-default')}>
			<div className='panel-heading'>
				<h4>Temperature Checker</h4>
			</div>
			<div className='panel-body'>
				{this.renderContent()}
			</div>
		</div>
	</div>;
};

TempCheckerInfo.prototype.renderContent = function () {
	var elements = [];

	return elements;
};
