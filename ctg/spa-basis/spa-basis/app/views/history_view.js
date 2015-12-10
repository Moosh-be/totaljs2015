'use strict';

var View = require('./view');
var store = require('lib/persistence');

module.exports = View.extend({
	// Le template principal
	template: require('./templates/history'),
	listTemplate: require('./templates/check_ins'),

	getRenderData: function() {
		return {};
	},
	afterRender: function afterHomeRender() {},
});