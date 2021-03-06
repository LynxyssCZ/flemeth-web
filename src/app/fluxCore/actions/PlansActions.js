var assign = require('object-assign');


module.exports = {
	load: function() {
		return this.api.get('plans/').then(onPlansResponse);
	},
	create: function(plan) {
		return [
			{ plans: [assign({ loading: true, id: generateKey() }, plan)] },
			this.api.post('plans/', plan).then(onPlansResponse)
		];
	},

	update: function(plan) {
		return [
			{ plans: [ assign({loading: true}, plan) ] },
			this.api.put('plans/' + plan.id + '/', plan).then(onPlansResponse)
		];
	},

	remove: function(planId) {
		return [
			{ deletingPlans: [planId]},
			this.api.del('plans/' + planId + '/')
			.then(function() {
				return { deletedPlans: [planId] };
			})
		];
	}
};


var IntSize = Math.pow(2, 32);

function generateKey() {
	return 'loading_' + (Math.random()*IntSize).toString(16);
}

function onPlansResponse(result) {
	return { plans: result.plans };
}
