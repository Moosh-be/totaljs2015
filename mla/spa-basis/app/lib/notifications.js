'use strict';

var $ = require('jquery');
var _ = require('underscore');
var userName = sessionStorage.userName || $.trim(prompt("Votre nom d’utilisateur"));

var io = require('socket.io');
var socket = io.connect();
var store = require('lib/persistence');
socket.on('checking', store.addCheckIn);

if (userName) {
	sessionStorage.userName = userName;
} else {
	userName = 'Anonymous' + _.random(1000, 10000);
}

exports.userName = userName;