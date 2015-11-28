var inherits = require('util').inherits;
var React = require('react');
var SwitcherInfo = require('../components/SwitcherInfo');
var maxAge = 5 * 60 * 1000;

var DashboardPage = function(props, context) {
	React.Component.call(this, props, context);

	this.state = this.selectState(props, context);
	this.update = this.update.bind(this);
}; DashboardPage.prototype.constructor = DashboardPage;
inherits(DashboardPage, React.Component);
module.exports = DashboardPage;

DashboardPage.contextTypes = {
	container: React.PropTypes.object.isRequired
};

DashboardPage.prototype.selectState = function (props, context) {
	return context.container.getState([
		'Override',
		'Root',
		'Switcher',
		'TempChecker',
		'Zones'
	]);
};

DashboardPage.prototype.update = function () {
	this.setState(this.selectState(this.props, this.context));
};

DashboardPage.prototype.componentDidMount = function () {
	var container = this.context.container;
	var dashboardState = this.state.Root.get('dashboard');

	this.subKey = container.subscribe([
		'Override',
		'Root',
		'Switcher',
		'TempChecker',
		'Zones'
	], this.update);

	if (!this.isFresh(dashboardState)) {
		container.push(container.actions.Root.loadDashboard);
	}

	this.updateTask = window.setInterval(function() {
		container.push(container.actions.Root.loadDashboard);
	}, 30 * 1000);
};

DashboardPage.prototype.componentWillUnmount = function () {
	this.context.container.unsubscribe(this.subKey);
	global.clearInterval(this.updateTask);
};

DashboardPage.prototype.isFresh = function (dashboardState) {
	var dashboardTime = dashboardState.get('time');

	if (!dashboardTime && !dashboardState.has('loading')) {
		return false;
	}
	else if (dashboardTime && dashboardTime < Date.now() - maxAge) {
		return false;
	}
};

DashboardPage.prototype.render = function () {
	return <div className='dashboard-page'>
		<SwitcherInfo className='col-md-4' switcherState={this.state.Switcher} />
	</div>;
};
