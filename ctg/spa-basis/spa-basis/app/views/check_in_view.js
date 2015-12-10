'use strict';

var _ = require('underscore');
var gpsService = require('lib/location');
var poiService = require('lib/places');
var store = require('lib/persistence');
var userName = require('lib/notifications').userName;

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
			observe: ['places', 'placeId'],
			onGet: function() {
				return this.getRenderData().placesList;
			},
			updateMethod: 'html',
		},
		'button[type=submit]': {
			attributes: [{
				name: 'disabled',
				observe: 'checkInForbidden',
			}],
		},
	},
	events: {
		'click .btn-info': 'fetchPlaces',
		'click #places li': 'selectPlaces',
		'submit': 'checkIn',
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
		that.model.set(this.model.defaults);
		gpsService.getCurrentLocation(function(lat, lng) {
			if (_.isString(lat)) {
				return;
			}

			that.model.set({
				lat: lat,
				lng: lng
			});

			poiService.lookupPlaces(lat, lng, function(places) {
//				console.table(places);
				that.model.set('places', places);
			});
		});
	},

	selectPlaces: function(e) {
		var clicked = this.$(e.currentTarget);
		var placeId = clicked.data('place-id');
		this.model.set('placeId', placeId);
	},

	checkIn: function(e) {
		e.preventDefault();
		if (this.model.get('checkInForbidden')) {
			return;
		}
		var place = this.model.getPlace();
		var checkIn = {
			placeId: place.id,
			vicinity: place.vicinity,
			icon: place.icon,
			name: place.name,
			comment: this.model.get('comment'),
			userName: userName
		};
		this.model.set({
			'comment': this.model.defaults.comment,
			'placeId': this.model.defaults.placeId,
		});
		store.addCheckIn(checkIn);
	},
	getRenderData: function() {
		return {
			placesList: this.renderTemplate({
				places: this.model.get('places'),
				placeId: this.model.get('placeId')
			}, this.placesTemplate)
		};
	}
});