'use strict';
const SensorsList = require('./SensorsList');
const SensorsHistory = require('./SensorsHistory');
const React = require('react');

class SensorsListPage extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = this.selectState(props, context);
		this.update = this.update.bind(this);
	}

	selectState(props) {
		return props.container.getState([
			'Sensors',
			'Snapshots'
		]);
	}

	update() {
		this.setState(this.selectState(this.props, this.context));
	}

	componentDidMount() {
		var container = this.props.container;

		this.subKey = container.subscribe([
			'Sensors',
			'Snapshots'
		], this.update);

		this.updateData();
		this.updateTask = window.setInterval(this.updateData.bind(this), 30 * 1000, this);
	}

	updateData() {
		var container = this.props.container;
		var lastTime = this.state.Snapshots.getIn(['sensors_values', 'lastTime']);

		container.push(container.actions.Sensors.load);
		container.push(container.actions.Snapshots.load, [(lastTime ? lastTime + 1 : null), null, 'sensors_values']);
	}

	componentWillUnmount() {
		this.props.container.unsubscribe(this.subKey);
		global.clearInterval(this.updateTask);
	}

	render() {
		return <div className='sensors-list-page'>
			<SensorsHistory className='col-md-12' sensors={this.state.Sensors} sensorsSnapshots={this.state.Snapshots.get('sensors_values')}/>
			<SensorsList className='col-md-12' sensors={this.state.Sensors.toList().toJS()}/>
		</div>;
	}
}
SensorsListPage.displayName = 'SensorsListPage';
SensorsListPage.proptypes = {
	container: React.PropTypes.object.isRequired
};

module.exports = SensorsListPage;
