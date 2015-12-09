'use strict';

var Backbone = require('backbone');

// Bon, on n'a *rien* à rajouter aux capacités inhérentes
// de Backbone.Model, mais c'est toujours mieux de prévoir un
// module par modèle et par collection, donc voilà.

module.exports = Backbone.Model.extend({
	defaults: {
		lat:0,
		lng:0,
		places: [],
		placeId: null,
		comment:''
	}
});
