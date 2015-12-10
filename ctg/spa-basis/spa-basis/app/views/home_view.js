'use strict';

var View = require('./view');
var userName = require('lib/notifications').userName;
var moment = require('moment');
var CheckInView = require('./check_in_view');
var HistoryInView = require('./history_view');
var connectivity = require('lib/connectivity');

module.exports = View.extend({
	// Le template principal
	template: require('./templates/home'),

	getRenderData: function() {
		return {
			userName: userName,
			now: moment().format('dddd D MMMM YYYY HH:mm:ss')
		};
	},
	subscriptions: {
		'connectivity:online': 'syncMarker',
		'connectivity:offline': 'syncMarker',
	},


	afterRender: function afterHomeRender() {
		this.startClock();
		this.syncMarker();
		new CheckInView({
			el: this.$('#checkInUI')
		}).render();
		new HistoryInView({
			el: this.$('#historyUI')
		}).render();
	},

	startClock: function() {
		var wally = this;
		var clock = this.$('#ticker');
		setInterval(function() {
			clock.text(wally.getRenderData().now);
		}, 1000);
	},

	syncMarker: function syncMarker() {
		this.$marker =
			this.$marker ||
			this.$('#onlineMarker');
		this.$marker[connectivity.isOnline() ? 'show' : 'hide']();
	}
});