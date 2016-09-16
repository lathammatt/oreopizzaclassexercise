'use strict';

const mongoose = require('mongoose')

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/oreopizza'
// const MONGODB_URL = 'mongodb://nodey:nodey1@ds033056.mlab.com:33056/oreopizza'

mongoose.Promise = Promise // use the native Node Promise library

module.exports.connect = () => mongoose.connect(MONGODB_URL)
module.exports.disconnect = () => mongoose.disconnect()


