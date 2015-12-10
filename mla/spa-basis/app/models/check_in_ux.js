'use strict';

var Backbone = require('backbone');
var _ = require('underscore');
var connectivity =require('lib/connectivity');

// Bon, on n'a *rien* à rajouter aux capacités inhérentes
// de Backbone.Model, mais c'est toujours mieux de prévoir un
// module par modèle et par collection, donc voilà.

module.exports = Backbone.Model.extend({
	defaults: {
		lat: 0,
		lng: 0,
		places: [],
		placeId: null,
		comment: '',
		checkInForbidden: true,
		checkFetchable: false

	},
	initialize: function() {
		var that = this;

		this.on('change', checkCheckInAvailable.bind(this));
		checkCheckInAvailable();
		checkFetchable();

		function checkCheckInAvailable() {
			return that.set('checkInForbidden', (that.get('placeId') === null) ? true : false);
		}

		function checkFetchable() {
			return that.set('fetchPlacesForbidden', !connectivity.isOnline());
		}

		Backbone.Mediator.subscribe('connectivity:online', checkFetchable);
		Backbone.Mediator.subscribe('connectivity:offline', checkFetchable);

	},
	getPlace : function () {

		var place =  _.findWhere(
				this.get('places'), {
					id: this.get('placeId')
				}
			);
		return place;
	}
});