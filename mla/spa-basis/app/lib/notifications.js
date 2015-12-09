'use strict';

var $ = require('jquery');
var _ = require('underscore');
var userName = sessionStorage.userName || $.trim(prompt("Votre nom d’utilisateur"));

if (userName) {
	sessionStorage.userName = userName;
} else {
	userName = 'Anonymous' + _.random(1000, 10000);
}

exports.userName = userName;