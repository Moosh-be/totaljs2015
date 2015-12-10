'use stricts';

var Backbone = require('backbone');

var connectivity = require('lib/connectivity');
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

	if(!connectivity.isOnline()) return;
	
	collection.fetch({
		reset: true,
	});
}

collection.on('reset', function() {
	Backbone.Mediator.publish('checkins:reset');
});

collection.on('add', function(model) {
	console.log(model);
  Backbone.Mediator.publish('checkins:new', model.toJSON());
});

syncPending();

module.exports = {
	addCheckIn: addCheckIn,
	getCheckIns: getCheckIns,
};