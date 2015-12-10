'use strict';

var _ = require('underscore');
var gpsService = require('lib/location');
var poiService = require('lib/places');

var CheckInUx = require('models/check_in_ux');
var View = require('./view');

module.exports = View.extend({
	bindings: {
		'#comment': 'comment',
		'#geoloc': {
			observe: ['lat', 'lng'],
			onGet: function(pos) {
				if (_.isString(pos[0]) || pos[0] === 0) {
					return 'Je suis...';
				}
				return _.map(pos, function(coord) {
					return coord.toFixed(3);
				}).join(' ');
			}
		},
		'#places': {
			observe: ['places'],
			onGet: function() {
				return this.getRenderData().placesList;
			},
			updateMethod: 'html',
		}
	},
	events: {
		'click .btn-info': 'fetchPlaces',
		'click #places li': 'selectPlaces',
	},
	template: require('./templates/check_in'),
	placesTemplate: require('./templates/places'),
	initialize: function() {
		View.prototype.initialize.apply(this, arguments);
		this.model = new CheckInUx();
	},
	afterRender: function afterHomeRender() {
		//this.fetchPlaces();
	},
	fetchPlaces: function fetchPlaces() {
		var that = this;
        that.model.set('places', this.model.get('places'));
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
	selectPlaces: function (e) {
		console.log(e);
		console.log(this);
		// $('').addClasse('active');
	},
	getRenderData: function() {
		return {
			placesList: this.renderTemplate({
				places: this.model.get('places')
			}, this.placesTemplate)
		};
	}
});