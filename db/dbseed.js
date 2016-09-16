'use strict';

const {connect, disconnect} = require('./database')

const Sizes = require('../models/size')
const size = require('./sizes')
const Toppings = require('../models/toppings')
const topping = require('./toppings')

connect()
  .then(() => Sizes.remove({}))
  .then(() => Sizes.insertMany(size))
  .then(() => Toppings.remove({}))
  .then(() => Toppings.insertMany(topping))
  .then(disconnect)
  .catch(console.error)