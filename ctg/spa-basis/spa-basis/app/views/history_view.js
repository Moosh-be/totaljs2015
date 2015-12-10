'use strict';

var View = require('./view');
var store = require('lib/persistence');

module.exports = View.extend({
	// Le template principal
	template: require('./templates/history'),
	listTemplate: require('./templates/check_ins'),
	subscriptions: {
		'checkins:reset': 'render',
		'checkins:new': 'insertCheckin',
	},

	insertCheckin: function(checkIn) {
		console.log('insertCheckin', checkIn);
		checkIn.extra_class = 'new';
		var markup = this.renderTemplate({
			checkIns: [checkIn]
		}, this.listTemplate);
		var list = this.$('#history');
		list.prepend(markup);
		setTimeout(function  () {
			list.find('li.new').removeClass('new');
		},20);
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