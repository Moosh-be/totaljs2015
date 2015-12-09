'use strict';

var View = require('./view');

module.exports = View.extend({
  // Le template principal
  template: require('./templates/check_in'),

  getRenderData: function() {
  	return {
  	};
  },

  afterRender: function () {
  },

});