// Collection : Check-Ins
// ======================

'use strict';

var Backbone = require('backbone');

// Définition de la collection qu'on va employer (collection
// Backbone de check-ins).  On exploite ici plusieurs aspects
// pratiques des collections Backbone.

module.exports = Backbone.Collection.extend({
  model: require('./check_in'),
  url:'/api/v1/checkins',
});
