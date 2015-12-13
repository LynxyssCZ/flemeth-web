var inherits = require('util').inherits;
var React = require('react');
var Link = require('react-router').Link;
var NavbarLink = require('./NavbarLink');


var Navbar = function(props, context) {
	React.Component.call(this, props, context);
}; Navbar.prototype.constructor = Navbar;
inherits(Navbar, React.Component);
module.exports = Navbar;

Navbar.displayName = 'Navbar';
Navbar.proptypes = {
	currentPath: React.PropTypes.string
};

Navbar.prototype.render = function () {
	return <nav className='navbar navbar-inverse navbar-fixed-top'>
		<div className='container'>
			<div className='navbar-header'>
				<button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar'>
					<span className='icon-bar'></span>
					<span className='icon-bar'></span>
					<span className='icon-bar'></span>
				</button>
				<Link to='/' className='navbar-brand'>Flemeth</Link>
			</div>
			<div id='navbar' className='navbar-collapse collapse'>
				<ul className='nav navbar-nav'>
					<NavbarLink currentPath={this.props.currentPath} path='/schedules'>Schedules</NavbarLink>
					<NavbarLink currentPath={this.props.currentPath} path='/zones'>Zones</NavbarLink>
					<NavbarLink currentPath={this.props.currentPath} path='/sensors'>Sensors</NavbarLink>
				</ul>
			</div>
		</div>
	</nav>;
};
