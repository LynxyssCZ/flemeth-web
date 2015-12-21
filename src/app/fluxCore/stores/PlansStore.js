var Map = require('immutable').Map;
var PlansActions = require('../actions').Plans;

function PlansStore(type, payload, state) {
	if (!state) {
		state = getDefaultState();
	}

	switch (type) {
		case PlansActions.load.actionType:
			state = update(payload.plans, state);
			break;
		case PlansActions.update.actionType:
		case PlansActions.create.actionType:
			state = update(payload.plans, state);
			break;
		case PlansActions.remove.actionType:
			state = remove(payload.deletedPlans, state);
			break;
	}

	return state;
}

module.exports = PlansStore;

function getDefaultState() {
	return Map();
}

function createPlan(initialData) {
	return Map(initialData);
}

function update(plans, state) {
	if (plans) {
		const plansIds = [];

		plans.forEach(function(plan) {
			var newPlan;
			if (state.has(plan.id)) {
				newPlan = state.get(plan.id).merge(Map(plan));
			}
			else {
				newPlan = createPlan(plan);
			}

			state = state.set(plan.id, newPlan);
			plansIds.push(plan.id);
		});

		state = state.filter(function(plan, planId) {
			return (plansIds.indexOf(planId) > -1);
		});
	}

	return state;
}

function remove(plans, state) {
	if (plans) {
		plans.forEach(function(planId) {
			state = state.delete(planId);
		});
	}

	return state;
}
