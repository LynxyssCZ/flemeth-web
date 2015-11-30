var inherits = require('util').inherits;
var React = require('react');


var OverrideInfo = function(props, context) {
	React.Component.call(this, props, context);

	this.state = {
		editing: false
	};
}; OverrideInfo.prototype.constructor = OverrideInfo;
inherits(OverrideInfo, React.Component);
module.exports = OverrideInfo;

OverrideInfo.proptypes = {
	override: React.PropTypes.object.isRequired
};

OverrideInfo.prototype.render = function () {
	return <div className={this.props.className}>
		<div className='override-info panel panel-default'>
			<div className='panel-heading'>
				{this.renderButtons()}
				<h4>Override</h4>
			</div>
			<div className='panel-body'>
				{this.renderContent()}
			</div>
		</div>
	</div>;
};

OverrideInfo.prototype.renderButtons = function () {
	var elements = [];

	if (this.props.override !== false && this.props.override.has('value')) {
		elements.push(<button key='update' type='button' className='btn btn-warning'>Update</button>);
	}

	elements.push(<button key='create' type='button' className='btn btn-success'>Create</button>);

	return <div className='btn-group override-buttons'>{elements}</div>;
};

OverrideInfo.prototype.renderContent = function () {
	if (!this.props.override || !this.props.override.has('value')) {
		return <div>No Override</div>;
	}

	var value = this.props.override.get('value');

	return [
		<div key='reason'>Reason: "{this.props.override.get('reason')}"</div>,
		<div key='value'>
			Value: <em className={value ? 'value-on' : 'value-off'}>
				{value ? 'On' : 'Off'}
			</em>
		</div>,
		<div key='time'></div>
	];
};
