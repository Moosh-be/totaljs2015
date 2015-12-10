'use strict';

var CheckInsCollection = require('models/collection');
var collection = new CheckInsCollection();
var Backbone = require('backbone');

function addCheckIn(checkIn) {
	checkIn.key = checkIn.key || Date.now();

	if ('id' in checkIn) {
		collection.add(checkIn);
	} else {
		collection.create(checkIn);
	}
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

collection.on('reset', function() {
	// console.log('reset');
	Backbone.Mediator.publish('checkins:reset');
});

collection.on('add', function(model) {
	// console.log('reset');
	Backbone.Mediator.publish(
		'checkins:new', model.toJSON()
	);
});

module.exports = {
	addCheckIn: addCheckIn,
	getCheckIns: getCheckIns,
};