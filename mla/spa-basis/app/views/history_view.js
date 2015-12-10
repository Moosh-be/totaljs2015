'use strict';

var View = require('./view');
var store = require('lib/persistence');

module.exports = View.extend({
  // Le template principal
  template: require('./templates/history'),
  listTemplate: require('./templates/check_ins'),

  getRenderData: function() {
    return {
      list: this.renderTemplate({
        checkIns: store.getCheckIns()
      }, this.listTemplate)
    };
  },

  afterRender: function() {},

  // https://github.com/chalbert/Backbone-Mediator
  subscriptions: {
    'checkins:reset': 'render',
    'checkins:new': 'insertCheckin'
  },

  insertCheckin: function(checkin) {
    checkin.extra_class = 'new';

    var markup = this.renderTemplate({
      checkIns: [checkin]
    }, this.listTemplate);
    this.$el.find('ul').prepend(markup);

    setTimeout(function () {
      this.$el.find('ul > li').removeClass('new');
    }.bind(this));

  }

});