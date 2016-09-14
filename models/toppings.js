'use strict';

const mongoose = require('mongoose')

module.exports = mongoose.model('Toppings', {
  name: String,
})