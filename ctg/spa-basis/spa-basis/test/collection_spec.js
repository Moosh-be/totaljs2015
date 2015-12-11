'use stricts';

/* global describe, before, it, beforeEach */

var chai = require('chai');

describe('The collection', function() {
	before(function() {
		chai.should();
	}); // Avant l'ensemble du `describe`

	beforeEach(function() {
//		console.log('after');

	}); // Avant chaque `it`

	// Et aussi : `after`, `afterEach`

	it('should maintain the natural order', function() {
		// Setup du test et assertions ici
	});
});

