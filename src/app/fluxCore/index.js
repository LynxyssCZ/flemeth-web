var Fluxerino = require('fluxerino');
var stores = require('./stores');
var actions = require('./actions');

var Container = function(context) {
	Fluxerino.Container.call(this, stores, context);
	this.actions = actions;
};
Container.prototype = Object.create(Fluxerino.Container.prototype);
Container.prototype.constructor = Container;

Container.prototype.init = function(next) {
	this.push(initializer, [], next);
};

module.exports = Container;

function initializer() {
	return true;
} initializer.actionType = 'LifeCycle.Init';
