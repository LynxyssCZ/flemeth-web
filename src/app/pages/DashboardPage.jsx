var inherits = require('util').inherits;
var React = require('react');


var DashboardPage = function(props, context) {
	React.Component.call(this, props, context);
}; DashboardPage.prototype.constructor = DashboardPage;
inherits(DashboardPage, React.Component);
module.exports = DashboardPage;

// Router props
DashboardPage.proptypes = {

};

// Optional dashboard context stuff
DashboardPage.childContextTypes = {

};

DashboardPage.prototype.getChildContext = function () {
	return {};
};

DashboardPage.prototype.render = function () {
	return <div className='dashboard-page'>
		<span>Dashboard goes here, woot?</span>
	</div>;
};
