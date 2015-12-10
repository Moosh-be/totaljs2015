// Contrôleur principal
// ====================

'use strict';

var View = require('./view');
var userName = require('lib/notifications').userName;
var moment = require('moment');
var CheckInView = require('./check_in_views');
var HistoryView = require('./history_view');
var Connectivity = require('lib/connectivity');

module.exports = View.extend({
  // Le template principal
  '$onlineMarker' : null,
  template: require('./templates/home'),
  subscriptions: {
    'connectivity:online': 'syncMarker',
    'connectivity:offline' : 'syncMarker'
  },

  getRenderData: function() {
  	return {
  		userName: userName,
  		now: moment().format('dddd D MMMM YYYY HH:mm:ss')
  	};
  },

  afterRender: function afterHomeRender() {
  	this.startClock();
    this.syncMarker();
  	new CheckInView({
  		el: this.$('#checkInUI')
  	}).render();
    new HistoryView({
      el: this.$('#historyUI')
    }).render();
  },

  startClock: function () {
  	var clock = this.$('#ticker');
  	setInterval( function () {
  		var date = this.getRenderData().now;
  		clock.text(date);
  	}.bind(this), 1000);
  },

  syncMarker: function syncMarker () {
    this.$onlineMarker = this.$onlineMarker || this.$('#onlineMarker');
    if ( Connectivity.isOnline() ) {
      this.$onlineMarker.show();
    } else {
      this.$onlineMarker.hide();
    }
  }

});
