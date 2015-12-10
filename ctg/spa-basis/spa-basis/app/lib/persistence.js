'use stricts';

var CheckInsCollection = require('models/collection');
var collection = new CheckInsCollection();

function addCheckIn(checkIn) {
	checkIn.key = checkIn.key || Date.now();
	collection.add(checkIn);
}

exports.addCheckIn = addCheckIn;