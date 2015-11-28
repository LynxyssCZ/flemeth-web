var IntSize = Math.pow(2, 32);

module.exports.generateKey = function() {
	return 'loading_' + (Math.random()*IntSize).toString(16);
};

module.exports.groupValues = function(values, getKey, buildBundle) {
	var heap = values.reduce(function(heap, value) {
		var key = getKey(value);

		if (heap.hasOwnProperty(key)) {
			heap[key].push(value);
		}
		else {
			heap[key] = [value];
		}

		return heap;
	}, {});

	return Object.keys(heap).map(function(key) {
		return buildBundle(key, heap[key]);
	});
};
