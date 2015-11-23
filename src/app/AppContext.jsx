var inherits = require('util').inherits;
var React = require('react');


var AppContext = function(props, context) {
	React.Component.call(this, props, context);
}; AppContext.prototype.constructor = AppContext;
inherits(AppContext, React.Component);
module.exports = AppContext;

AppContext.proptypes = {
	container: React.PropTypes.object.isRequired,
	api: React.PropTypes.object.isRequired
};

AppContext.childContextTypes = {
	container: React.PropTypes.object.isRequired,
	api: React.PropTypes.object
};

AppContext.prototype.getChildContext = function () {
	return {
		container: this.props.container,
		api: this.props.api
	};
};

AppContext.prototype.render = function () {
	return this.props.children;
};
