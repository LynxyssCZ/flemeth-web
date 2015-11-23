var inherits = require('util').inherits;
var React = require('react');


var SensorsPage = function(props, context) {
	React.Component.call(this, props, context);
}; SensorsPage.prototype.constructor = SensorsPage;
inherits(SensorsPage, React.Component);
module.exports = SensorsPage;

SensorsPage.proptypes = {

};

SensorsPage.childContextTypes = {

};

SensorsPage.prototype.getChildContext = function () {
	return {};
};

SensorsPage.prototype.render = function () {
	return <div className='panel panel-default'>
			<div className='panel-heading'>
				<h4>SensorsPage</h4>
			</div>
			<div className='sensors-page panel-body'>
				{ this.props.children }
			</div>
		</div>;
};
