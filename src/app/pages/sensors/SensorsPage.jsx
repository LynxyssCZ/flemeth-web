var inherits = require('util').inherits;
var React = require('react');


var SensorsPage = function(props, context) {
	React.Component.call(this, props, context);
}; SensorsPage.prototype.constructor = SensorsPage;
inherits(SensorsPage, React.Component);
module.exports = SensorsPage;

SensorsPage.displayName = 'SensorsPage';
SensorsPage.proptypes = {
	container: React.PropTypes.object.isRequired
};

SensorsPage.prototype.render = function () {
	return <div className='sensors-page'>
			{ this.props.children }
		</div>;
};
