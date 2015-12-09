'use strict';

var $ = require('jquery');

var userName = sessionStorage.userName || $.trim(
	prompt("Votre nom ?")
);

if (userName) {
	sessionStorage.userName = userName;
} else {
	userName = 'Anon';
}

exports.userName = userName;