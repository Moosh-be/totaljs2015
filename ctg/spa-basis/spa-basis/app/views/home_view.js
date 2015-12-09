// Contrôleur principal
// ====================

'use strict';

var View = require('./view');
var userName = require('lib/notifications').userName;
var moment = require('moment');

module.exports = View.extend({
	// Le template principal
	template: require('./templates/home'),

	getRenderData: function() {
		console.log(userName);
		return {
			userName: userName,
			now: moment().format('dddd D MMMM YYYY HH:mm:ss')
		};
	},

	afterRender: function afterHomeRender() {
		this.startClock();
	},

	startClock: function() {
		var wally = this;
		var clock = this.$('#ticker');
		setInterval(function() {
			clock.text(wally.getRenderData().now);
		}, 1000);
	}
});