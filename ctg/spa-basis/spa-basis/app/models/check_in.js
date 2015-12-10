// Modèle : CheckIn
// ================

'use strict';

var Backbone = require('backbone');
var connectivity = require('lib/connectivity');

module.exports = Backbone.Model.extend({
	sync: function(method, model, options) {
		if (!connectivity.isOnline()) return;
		return Backbone.sync(method, model, options);
	}

});