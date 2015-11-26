var assign = require('object-assign');

module.exports = {
	create: function(schedule) {
		return [
			{ schedules: [assign({ loading: true, id: generateKey() }, schedule)] },
			this.api.post('schedules', schedule).then(onSchedulesResponse)
		];
	},

	update: function(schedule) {
		return [
			{ schedules: [ assign({loading: true}, schedule) ] },
			this.api.put('schedules/' + schedule.id, schedule).then(onSchedulesResponse)
		];
	},

	delete: function(scheduleId) {
		return [
			{ deletingSchedules: [scheduleId]},
			this.api.put('schedules/' + scheduleId)
			.then(function() {
				return { deletedSchedules: [scheduleId] };
			})
		];
	}
};


var IntSize = Math.pow(2, 32);

function generateKey() {
	return 'loading_' + (Math.random()*IntSize).toString(16);
}

function onSchedulesResponse(result) {
	return { schedules: result.schedules };
}
