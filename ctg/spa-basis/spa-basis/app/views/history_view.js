'use strict';

var View = require('./view');
var store = require('lib/persistence');

module.exports = View.extend({
	// Le template principal
	template: require('./templates/history'),
	listTemplate: require('./templates/check_ins'),

	getRenderData: function() {
		console.log();
		return {
			'list':this.renderTemplate({checkIns:store.getCheckIns()},this.listTemplate)
		};
	},
	afterRender: function afterHomeRender() {},
});