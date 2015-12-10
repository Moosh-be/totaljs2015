'use strict';

var View = require('./view');
var locSvc = require('lib/location');
var poiSvc = require('lib/places');
var CheckInUx = require('models/check_in_ux');
var _ = require('underscore');
var userName = require('lib/notifications').userName;
var store = require('lib/persistence');

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
			observe: ['places', 'placeId'],
			onGet: function() {
				return this.getRenderData().placeList;
			},
			updateMethod: 'html'
		},
		// http://nytimes.github.io/backbone.stickit/#attributes
		'button[type=submit]': {
			attributes: [{
				name: 'disabled',
				observe: 'checkInForbidden'
			}]
		},
	},
	events: {
		// La clé est composée du nom de l'événement et du sélecteur CSS.
		// La valeur est le nom de la méthode du controler
		'click .btn-info': 'fetchPlaces',
		'click #places li': 'selectPlace',
		'submit': 'checkIn'
	},
	checkIn: function(e) {
		e.preventDefault();
		if (this.model.get('checkInForbidden')) {
			return true;
		}
		var place = this.model.getPlace();
		var checkIn = {
			placeId: place.id,
			vicinity : place.vicinity,
			icon : place.icon,
			name : place.name,
			comment : this.model.get('comment'),
			userName : userName
		};
		store.addCheckIn(checkIn);
		this.model.set({
			comment : this.model.defaults.comment,
			placeId : this.model.defaults.placeId
		});
	},
	selectPlace: function(e) {
		// console.log(e.currentTarget, e.target, this);
		var elt = this.$(e.currentTarget);
		var placeId = elt.data('place-id');
		this.model.set('placeId', placeId);
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
				places: this.model.get('places'),
				placeId: this.model.get('placeId')
			}, this.placesTemplate)
		};
	},
	afterRender: function() {
		this.fetchPlaces();
	},
	fetchPlaces: function() {
		var that = this;
		that.model.set(that.model.defaults);
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