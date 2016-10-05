var React = require('react');
var ZonesHistory = require('./ZonesHistory');
var ZonesList = require('./ZonesList');


class ZonesListPage extends React.Component {
	constructor (props, context) {
		super(props, context);

		this.state = this.selectState(props, context);
		this.update = this.update.bind(this);
	}

	selectState(props) {
		return props.container.getState([
			'Snapshots',
			'Zones'
		]);
	}

	update() {
		this.setState(this.selectState(this.props, this.context));
	}

	componentDidMount() {
		var container = this.props.container;

		this.subKey = container.subscribe([
			'Snapshots',
			'Zones'
		], this.update);

		this.updateData();

		this.updateTask = window.setInterval(this.updateData.bind(this), 30 * 1000, this);
	}

	updateData() {
		var container = this.props.container;
		var lastTime = this.state.Snapshots.getIn(['zones_temps', 'lastTime']);

		container.push(container.actions.Zones.load);
		container.push(container.actions.Snapshots.load, [(lastTime ? lastTime + 1 : null), null, 'zones_temps']);
	}

	componentWillUnmount() {
		this.props.container.unsubscribe(this.subKey);
		global.clearInterval(this.updateTask);
	}

	render() {
		return <div className='zones-list-page'>
			<ZonesHistory className='col-md-12' zones={this.state.Zones} zonesSnapshots={this.state.Snapshots.get('zones_temps')}/>
			<ZonesList className='col-md-12' zones={this.state.Zones.toList().toJS()}/>
		</div>;
	}
}
module.exports = ZonesListPage;

ZonesListPage.displayName = 'ZonesListPage';
ZonesListPage.proptypes = {
	container: React.PropTypes.object.isRequired
};
