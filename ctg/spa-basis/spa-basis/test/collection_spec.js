'use stricts';

/* global describe, before, it, beforeEach */

var chai = require('chai');

describe('The collection', function() {
	before(function() {
		chai.should();
	}); // Avant l'ensemble du `describe`

	var collection;
	beforeEach(function() {
		var Collection = require('models/collection');
		collection = new Collection();

	}); // Avant chaque `it`

	// Et aussi : `after`, `afterEach`

	it('should maintain the natural order', function() {
		var currentDate = Date.now();
		var oldCheckin = {
			key: currentDate - 12345
		};
		var currentCheckin = {
			key: currentDate
		};
		var futureCheckin = {
			key: currentDate + 12345
		};
		collection.add(oldCheckin);
		collection.add(futureCheckin);
		collection.add(currentCheckin);

		collection.at(0).toJSON().should.deep.equal(futureCheckin);
		collection.at(1).toJSON().should.deep.equal(currentCheckin);
		collection.at(2).toJSON().should.deep.equal(oldCheckin);
	});

	it('vlug', function(done) {
		setTimeout(done, 60);
	});


});