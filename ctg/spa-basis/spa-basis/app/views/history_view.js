'use strict';

var View = require('./view');
var store = require('lib/persistence');
var Backbone = require('backbone');
module.exports = View.extend({
	// Le template principal
	template: require('./templates/history'),
	listTemplate: require('./templates/check_ins'),
	subscriptions: {
		'checkins:reset': 'render',
		'checkins:new': 'insertCheckin',
	},
	events: {
		'click li': 'showbrol'
	},
	showbrol: function showbrol(e) {
		var id = e.currentTarget.getAttribute('data-id');
		if (!id) {
			return;
		}
		Backbone.history.navigate('check-in/' + id, {
			trigger: true
		});
	},
	insertCheckin: function(checkIn) {
		console.log('insertCheckin', checkIn);
		checkIn.extra_class = 'new';
		var markup = this.renderTemplate({
			checkIns: [checkIn]
		}, this.listTemplate);
		var list = this.$('#history');
		list.prepend(markup);
		setTimeout(function() {
			list.find('li.new').removeClass('new');
		}, 20);
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