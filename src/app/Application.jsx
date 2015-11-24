var inherits = require('util').inherits;
var React = require('react');
var Navbar = require('./components/Navbar');


var Application = function(props, context) {
	React.Component.call(this, props, context);
}; Application.prototype.constructor = Application;
inherits(Application, React.Component);
module.exports = Application;

// Router related props
Application.proptypes = {};

Application.contextTypes = {
	container: React.PropTypes.object.isRequired
};

Application.prototype.render = function () {
	return <div className='flemeth-app container'>
		<Navbar currentPath={this.props.location.pathname} />
		{ this.props.children || 'No page :-<' }
	</div>;
};
