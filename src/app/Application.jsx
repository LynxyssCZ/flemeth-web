var inherits = require('util').inherits;
var React = require('react');


var Application = function(props, context) {
	React.Component.call(this, props, context);
}; Application.prototype.constructor = Application;
inherits(Application, React.Component);
module.exports = Application;

Application.proptypes = {

};

Application.childContextTypes = {

};

Application.prototype.getChildContext = function () {
	return {};
};

Application.prototype.render = function () {
	return <div>
		<h2>Hello - App</h2>
		{ this.props.children || 'No page' }
	</div>;
};
