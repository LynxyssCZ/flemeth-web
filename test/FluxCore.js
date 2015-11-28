var data = require('./FluxCoreData');
var stores = require('../src/app/fluxCore/stores');
var actions = require('../src/app/fluxCore/actions');

describe('FluxCore', function() {
	context('Stores', function() {
		it('#load', storesTestSuite('load'));
		it('#create', storesTestSuite('create'));
		it('#update', storesTestSuite('update'));
		it('#remove', storesTestSuite('remove'));
	});

	context('Actions', function() {
		it('#load');
		it('#create');
		it('#update');
		it('#remove');
	});
});

function storesTestSuite(action) {

}
