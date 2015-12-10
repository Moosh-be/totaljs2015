'use stricts';

var CheckInsCollection = require('models/collection');
var collection = new CheckInsCollection();

function addCheckIn(checkIn) {
	checkIn.key = checkIn.key || Date.now();
	collection[('id' in checkIn) ? 'add' : 'create'](checkIn);
}

function getCheckIns() {
	return collection.toJSON();
}

function syncPending() {
	collection.fetch({
		reset: true,
	});
}

syncPending();

module.exports = {
	addCheckIn: addCheckIn,
	getCheckIns: getCheckIns,
};