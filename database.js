'use strict';

const {MongoClient: {connect}} = require('mongodb')

const MONGODB_URL = 'mongodb://localhost:27017/oreopizza'

let db

module.exports.connect = () => connect(MONGODB_URL).then (_db => db = _db)
module.exports.db = () => db

//the return of the connect promise is _db, then store it to db
