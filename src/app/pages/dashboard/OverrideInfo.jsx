var inherits = require('util').inherits;
var React = require('react');

var defaultState = {
	editing: false,
	reason: null,
	length: 5,
	value: 'on'
};


var OverrideInfo = function(props, context) {
	React.Component.call(this, props, context);

	this.state = defaultState;

	this._onDelete = this._onDelete.bind(this);
	this._onUpdate = this._onUpdate.bind(this);
	this._onCreate = this._onCreate.bind(this);
	this._onChange = this._onChange.bind(this);
	this._onSubmit = this._onSubmit.bind(this);
	this._onCancel = this._onCancel.bind(this);
}; OverrideInfo.prototype.constructor = OverrideInfo;
inherits(OverrideInfo, React.Component);
module.exports = OverrideInfo;
OverrideInfo.displayName = 'OverrideInfo';
OverrideInfo.proptypes = {
	container: React.PropTypes.object.isRequired,
	override: React.PropTypes.object.isRequired
};

OverrideInfo.prototype.render = function () {
	return <div className={this.props.className}>
		<div className='override-info panel panel-default'>
			<div className='panel-heading'>
				{ this.state.editing ? null : this.renderButtons() }
				<h4>Override</h4>
			</div>
			<div className='panel-body'>
				{ this.state.editing ? this.renderForm() : this.renderValue() }
			</div>
		</div>
	</div>;
};

OverrideInfo.prototype.renderButtons = function () {
	var elements = [];

	if (this.props.override.get('value') !== null) {
		elements.push(<button key='update' type='button' onClick={this._onUpdate} className='btn btn-warning'>Update</button>);
		elements.push(<button key='delete' type='button' onClick={this._onDelete} className='btn btn-danger'>Delete</button>);
	}
	else {
		elements.push(<button key='create' type='button' onClick={this._onCreate} className='btn btn-success'>Create</button>);
	}


	return <div className='btn-group override-buttons'>{elements}</div>;
};

OverrideInfo.prototype.renderValue = function () {
	if (this.props.override.get('value') === null) {
		return <div>No Override</div>;
	}

	var value = this.props.override.get('value');

	return [
		<div key='reason'>Reason: '{this.props.override.get('reason')}'</div>,
		<div key='value'>
			Value: <em className={value ? 'value-on' : 'value-off'}>
				{value ? 'On' : 'Off'}
			</em>
		</div>,
		<div key='time'></div>
	];
};

OverrideInfo.prototype.renderForm = function () {
	return <form className='override-form' onSubmit={this._onSubmit}>
		<div className='form-group'>
			<input name='reason' type='text'
				onChange={this._onChange}
				value={this.state.reason} className='form-control'
				required placeholder='Reason for the override'>
			</input>
		</div>
		<div className='form-group half'>
			<select name='value' value={this.state.value}
				className='form-control' onChange={this._onChange}>
				<option value='on'>On</option>
				<option value='off'>Off</option>
			</select>
		</div>
		<div className='form-group half'>
			<input name='length' type='number' min='1' max='360'
				value={this.state.length} className='form-control'
				onChange={this._onChange} required>
			</input>
		</div>
		<div className='btn-group'>
			<button type='submit' className='btn btn-primary'>Submit</button>
			<button type='reset' onClick={this._onCancel} className='btn btn-default'>Cancel</button>
		</div>
	</form>;
};

OverrideInfo.prototype._onDelete = function () {
	this.props.container.push(this.props.container.actions.Override.remove);
};

OverrideInfo.prototype._onUpdate = function () {
	this.setState({ editing: true });
};

OverrideInfo.prototype._onCreate = function () {
	this.setState({ editing: true });
};

OverrideInfo.prototype._onSubmit = function (event) {
	event.preventDefault();

	var values = {
		reason: this.state.reason,
		value: this.state.value === 'on',
		length: this.state.length
	};

	this.props.container.push(this.props.container.actions.Override.create, [
		values
	]);
	this.setState(defaultState);
};

OverrideInfo.prototype._onCancel = function (event) {
	event.preventDefault();
	this.setState(defaultState);
};

OverrideInfo.prototype._onChange = function (event) {
	if (!this.state.editing) {
		return;
	}

	var update = {};
	update[event.target.name] = event.target.value;
	this.setState(update);
};
