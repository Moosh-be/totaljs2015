'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

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
		checkInForbidden: true
	},
	initialize: function() {
		this.on('change', checkCheckInAvailable.bind(this));
		checkCheckInAvailable.call(this);

		function checkCheckInAvailable() {
			return this.set('checkInForbidden', (this.get('placeId') === null) ? true : false);
		}

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