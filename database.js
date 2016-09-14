'use strict';

const mongoose = require('mongoose')

const MONGODB_URL = 'mongodb://localhost:27017/oreopizza'

mongoose.Promise = Promise // use the native Node Promise library

mongoose.model('Contact', {
  name: String,
  email: String,
  phone: String,
  message: String
})


module.exports.connect = () => mongoose.connect(MONGODB_URL)


//the return of the connect promise is _db, then store it to db
