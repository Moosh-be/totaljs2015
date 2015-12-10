// Détection online/offline
// ========================

'use strict';
var Backbone = require('backbone');
var $ = require('jquery');

exports.isOnline = function() {
	return true;
};

if ('undefinded' !== typeof navigator && 'onLine' in navigator) {
	exports.isOnline = function() {
		console.log(navigator.onLine, 'isOnline');
		return navigator.onLine;
	};

	$(window).on('online offline', checkStatus);
	checkStatus();
}

function checkStatus() {
	Backbone.Mediator.publish(
		exports.isOnline() ? 'connectivity:online' : 'connectivity:offline'
	);
}