'use strict';

var View = require('./view');
var store = require('lib/persistence');
var Backbone = require('backbone');

module.exports = View.extend({
  // Le template principal
  template: require('./templates/history'),
  listTemplate: require('./templates/check_ins'),

  events : {
    'click li' : 'showCheckInDetail'
  },

  showCheckInDetail : function (e) {
    var id = this.$(e.currentTarget).data('id');
    Backbone.history.navigate('check-in/'+id, {trigger:true});
  },

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