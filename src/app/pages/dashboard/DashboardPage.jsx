var React = require('react');
var SwitcherInfo = require('./SwitcherInfo');
var TempCheckerInfo = require('./TempCheckerInfo');
var OverrideInfo = require('./OverrideInfo');
var TempCheckerHistory = require('./TempCheckerHistory');

var maxAge = 5 * 60 * 1000;


class DashboardPage extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = this.selectState(props, context);
		this.update = this.update.bind(this);
	}

	selectState(props) {
		return props.container.getState([
			'Override',
			'Root',
			'Snapshots',
			'Switcher',
			'TempChecker',
			'Zones'
		]);
	}

	update() {
		this.setState(this.selectState(this.props, this.context));
	}

	componentDidMount() {
		var container = this.props.container;
		var dashboardState = this.state.Root.get('dashboard');

		this.subKey = container.subscribe([
			'Override',
			'Root',
			'Snapshots',
			'Switcher',
			'TempChecker',
			'Zones'
		], this.update);

		if (!this.isFresh(dashboardState)) {
			this.updateDashboard();
		}

		this.updateTask = window.setInterval(this.updateDashboard.bind(this), 30 * 1000, this);
	}

	updateDashboard() {
		var container = this.props.container;
		var lastTime = this.state.Snapshots.getIn(['temp_checker', 'lastTime']);

		container.push(container.actions.Root.loadDashboard);
		container.push(container.actions.Snapshots.load, [(lastTime ? lastTime + 1 : null), null, 'temp_checker']);
	}

	componentWillUnmount() {
		this.props.container.unsubscribe(this.subKey);
		global.clearInterval(this.updateTask);
	}

	isFresh(dashboardState) {
		var dashboardTime = dashboardState.get('time');

		if (!dashboardTime && !dashboardState.has('loading')) {
			return false;
		}
		else if (dashboardTime && dashboardTime < Date.now() - maxAge) {
			return false;
		}
	}

	render() {
		return <div className='dashboard-page'>
			<TempCheckerHistory className='col-md-12' tempCheckerSnapshots={this.state.Snapshots.get('temp_checker')}/>
			<TempCheckerInfo className='col-md-4' tempChecker={this.state.TempChecker} zones={this.state.Zones} />
			<OverrideInfo className='col-md-4' override={this.state.Override} container={this.props.container} />
			<SwitcherInfo className='col-md-4' switcherState={this.state.Switcher} />
		</div>;
	}
}
module.exports = DashboardPage;

DashboardPage.displayName = 'DashboardPage';
DashboardPage.propTypes = {
	container: React.PropTypes.object.isRequired
};
