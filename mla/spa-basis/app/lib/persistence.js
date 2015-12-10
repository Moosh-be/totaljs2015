'use strict';

var CheckInsCollection = require('models/collection');
var collection = new CheckInsCollection();

function addCheckIn(checkIn) {
	checkIn.key = checkIn.key || Date.now();
	collection.create(checkIn);
	//console.log(checkIn);
}

function getCheckIns() {
	return collection.toJSON();
}

function syncPending() {
	return collection.fetch({
		reset: true
	});
}
syncPending();

module.exports = {
	addCheckIn: addCheckIn,
	getCheckIns: getCheckIns,
};