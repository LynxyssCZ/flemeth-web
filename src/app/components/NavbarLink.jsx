var inherits = require('util').inherits;
var React = require('react');
var ClassNames = require('classnames');
var Link = require('react-router').Link;


var NavbarLink = function(props, context) {
	React.Component.call(this, props, context);
}; NavbarLink.prototype.constructor = NavbarLink;
inherits(NavbarLink, React.Component);
module.exports = NavbarLink;

NavbarLink.proptypes = {
	currentPath: React.PropTypes.string,
	className: React.PropTypes.string,
	path: React.PropTypes.string.isRequired,
	query: React.PropTypes.object
};

NavbarLink.prototype.render = function () {
	return <li className={ClassNames(this.props.className, {active: this.props.currentPath === this.props.path})}>
		<Link to={this.props.path} query={this.props.query}>
			{this.props.children}
		</Link>
	</li>;
};
