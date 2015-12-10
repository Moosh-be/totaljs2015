'use strict';

var View = require('./view');
var store = require('lib/persistence');

module.exports = View.extend({
	// Le template principal
	template: require('./templates/history'),
	listTemplate: require('./templates/check_ins'),
	subscriptions: {
		'checkins:reset': 'render'
	},


	getRenderData: function() {
		return {
			'list': this.renderTemplate({
				checkIns: store.getCheckIns()
			}, this.listTemplate)
		};
	},
	afterRender: function afterHomeRender() {},
});