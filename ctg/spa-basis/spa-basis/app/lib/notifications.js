'use strict';

var $ = require('jquery');
var _ = require('underscore');

var userName = sessionStorage.userName || $.trim(
	prompt("Votre nom ?")
);

if (userName) {
	sessionStorage.userName = userName;
} else {
	userName = 'Anon ' + _.random(1000,10000);
}

exports.userName = userName;