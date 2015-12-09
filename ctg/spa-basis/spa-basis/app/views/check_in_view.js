'use strict';

var View = require('./view');
var gpsService = require('lib/location');
var _ = require('underscore');
var poiService = require('lib/places');
var CheckInUx = require('models/check_in_ux');

module.exports = View.extend({
	bindings: {
		'#comment': 'comment',
		'#geoloc': 'lat'
	},
	template: require('./templates/check_in'),
	placesTemplate: require('./templates/places'),
	initialize: function() {
		View.prototype.initialize.apply(this, arguments);
		this.model = new CheckInUx();
	},
	afterRender: function afterHomeRender() {
		this.fetchPlaces();
	},
	fetchPlaces: function fetchPlaces() {
		var that = this;
		gpsService.getCurrentLocation(function(lat, lng) {
			if (_.isString(lat)) {
				return;
			}

			that.model.set({
				lat: lat,
				lng: lng
			});

			poiService.lookupPlaces(lat, lng, function(places) {
				console.table(places);
				that.model.set('places', places);
				//			that.render();
			});
		});
	},
	getRenderData: function() {
		return {
			placesList: this.renderTemplate({
					places: this.model.get('places')
				},
				this.placesTemplate
			)

		};
	}

});