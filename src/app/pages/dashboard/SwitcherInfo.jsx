var inherits = require('util').inherits;
var React = require('react');
var ClassNames = require('classnames');
var Moment = require('moment');


var SwitcherInfo = function(props, context) {
	React.Component.call(this, props, context);
}; SwitcherInfo.prototype.constructor = SwitcherInfo;
inherits(SwitcherInfo, React.Component);
module.exports = SwitcherInfo;
SwitcherInfo.displayName = 'SwitcherInfo';
SwitcherInfo.proptypes = {
	switcherState: React.PropTypes.object.isRequired
};

SwitcherInfo.prototype.render = function () {
	return <div className={this.props.className}>
		<div className={ClassNames('switcher-info panel panel-default')}>
			<div className='panel-heading'>
				<h4>Switcher</h4>
			</div>
			<div className='panel-body'>
				{this.renderContent()}
			</div>
		</div>
	</div>;
};

SwitcherInfo.prototype.renderContent = function () {
	var elements = [];
	var state = this.props.switcherState.toJS();

	elements.push(<span className='real-value' key='realValue'>Current value: <em className={state.realValue ? 'On' : 'Off'}>{state.realValue ? 'On' : 'Off'}</em></span>);

	if (state.realValue !== state.nextValue) {
		elements.push(<span className='next-value text-muted' key='nextValue'>Next value: {state.nextValue ? 'On' : 'Off'}</span>);
	}

	if (state.locked) {
		elements.push(<span className='lock-info text-warning' key='lock'>Locked: {Moment(state.lockStart).fromNow()}</span>);
	}

	return elements;
};
