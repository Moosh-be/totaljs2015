'use strict';

var View = require('./view');
var locSvc = require('lib/location');
var poiSvc = require('lib/places');
var CheckInUx = require('models/check_in_ux');
var _ = require('underscore');

module.exports = View.extend({
	bindings: {
		// sélecteur CSS -> descripteur de binding, +/- avancé
		'#comment': 'comment',
		'#geoloc': {
			observe: ['lat', 'lng'],
			onGet: function(observeit) {
				if (_.isString(observeit[0]) || observeit[0] === 0) {
					return 'Je suis...';
				} else {
					return observeit[0].toFixed(3) + ' ' + observeit[1].toFixed(3);
				}
			},
			updateMethod: 'html'
		},
		'#places': {
			observe: ['places'],
			onGet: function() {
				return this.getRenderData().placeList;
			},
			updateMethod: 'html'
		},
		// …
	},
	// Le template principal
	template: require('./templates/check_in'),
	placesTemplate: require('./templates/places'),
	initialize: function() {
		View.prototype.initialize.apply(this, arguments);
		this.model = new CheckInUx();
	},
	getRenderData: function() {
		return {
			placeList: this.renderTemplate({
				places: this.model.get('places')
			}, this.placesTemplate)
		};
	},
	afterRender: function() {
		this.fetchPlaces();
	},
	fetchPlaces: function() {
		var that = this;
		locSvc.getCurrentLocation(function(lat, lng) {
			if (_.isString(lat)) {
				return;
			}
			that.model.set({
				'lat': lat,
				'lng': lng
			});
			poiSvc.lookupPlaces(lat, lng, function(places) {
				that.model.set('places', places);
			});
		});
	}

});