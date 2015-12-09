// Contrôleur principal
// ====================

'use strict';

var View = require('./view');
var userName = require('lib/notifications').userName;
var moment = require('moment');
var CheckInView = require('./check_in_views');

module.exports = View.extend({
  // Le template principal
  template: require('./templates/home'),

  getRenderData: function() {
  	return {
  		userName: userName,
  		now: moment().format('dddd D MMMM YYYY HH:mm:ss')
  	};
  },

  afterRender: function afterHomeRender() {
  	this.startClock();
  	new CheckInView({
  		el: this.$('#checkInUI')
  	}).render();
  },

  startClock: function () {
  	var clock = this.$('#ticker');
  	setInterval( function () {
  		var date = this.getRenderData().now;
  		clock.text(date);
  	}.bind(this), 1000);
  }

});
