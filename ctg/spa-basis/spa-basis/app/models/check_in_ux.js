'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	defaults: {
		lat: 0,
		lng: 0,
		places: [],
		placeId: null,
		comment: '',
	}
});