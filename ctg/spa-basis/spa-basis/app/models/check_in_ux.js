'use strict';

var _ = require('underscore');
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	defaults: {
		lat: 0,
		lng: 0,
		places: [],
		placeId: null,
		comment: '',
		checkInForbidden: true,
	},
	initialize: function initialize() {
		this.on('change', checkCheckinable);
		var that = this;
		checkCheckinable();

		function checkCheckinable() {
			that.set('checkInForbidden', (that.get('placeId') === null));
		}
	},
	getPlace: function() {
		return _.findWhere(
			this.get('places'), {
				id: this.get('placeId')
			});
	}
});