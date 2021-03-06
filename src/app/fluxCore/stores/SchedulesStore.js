var Map = require('immutable').Map;
var SchedulesActions = require('../actions').Schedules;

function SchedulesStore(type, payload, state) {
	if (!state) {
		state = getDefaultState();
	}

	switch (type) {
		case SchedulesActions.load.actionType:
			state = update(payload.schedules, state);
			break;
		case SchedulesActions.update.actionType:
		case SchedulesActions.create.actionType:
			state = update(payload.schedules, state);
			break;
		case SchedulesActions.remove.actionType:
			state = remove(payload.deletedSchedules, state);
			break;
	}

	return state;
}

module.exports = SchedulesStore;

function getDefaultState() {
	return Map();
}

function createSchedule(initialData) {
	return Map(initialData);
}

function update(schedules, state) {
	if (schedules) {
		const schedulesIds = [];

		schedules.forEach(function(schedule) {
			var newSchedule;
			if (state.has(schedule.id)) {
				newSchedule = state.get(schedule.id).merge(Map(schedule));
			}
			else {
				newSchedule = createSchedule(schedule);
			}

			state = state.set(schedule.id, newSchedule);
			schedulesIds.push(schedule.id);
		});

		state = state.filter(function(schedule, scheduleId) {
			return (schedulesIds.indexOf(scheduleId) > -1);
		});
	}

	return state;
}

function remove(schedules, state) {
	if (schedules) {
		schedules.forEach(function(scheduleId) {
			state = state.delete(scheduleId);
		});
	}

	return state;
}
