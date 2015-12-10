'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var connectivity = require('lib/connectivity');

module.exports = Backbone.Model.extend({
	defaults: {
		lat: 0,
		lng: 0,
		places: [],
		placeId: null,
		comment: '',
		checkInForbidden: true,
		fetchPlacesForbidden: false
	},
	initialize: function initialize() {
		this.on('change', checkCheckinable);
		var that = this;
		checkCheckinable();
        checkFetchable();
		
		Backbone.Mediator.subscribe('connectivity:online', checkFetchable);
		Backbone.Mediator.subscribe('connectivity:offline', checkFetchable);
		
		function checkCheckinable() {
			that.set('checkInForbidden', (that.get('placeId') === null));
		}
		function checkFetchable() {
			that.set('fetchPlacesForbidden', !connectivity.isOnline());
			console.log('connectivity.isOnline',connectivity.isOnline());
		}


	},
	getPlace: function() {
		return _.findWhere(
			this.get('places'), {
				id: this.get('placeId')
			});
	}
});