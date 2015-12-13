var inherits = require('util').inherits;
var React = require('react');


var SchedulingPage = function(props, context) {
	React.Component.call(this, props, context);
}; SchedulingPage.prototype.constructor = SchedulingPage;
inherits(SchedulingPage, React.Component);
module.exports = SchedulingPage;

SchedulingPage.displayName = 'SchedulingPage';
SchedulingPage.proptypes = {
	container: React.PropTypes.object.isRequired
};

SchedulingPage.prototype.render = function () {
	return <div className='panel panel-default'>
			<div className='panel-heading'>
				<h4>Scheduling</h4>
			</div>
			<div className='scheduling-page panel-body'>
				{ this.props.children }
			</div>
		</div>;
};
