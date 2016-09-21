'use strict';

const mongoose = require('mongoose')
const {compare} = require('bcrypt')

const HTML5_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    match: [HTML5_EMAIL_REGEX, 'Enter a valid email address'],
    index: {unique: true}, //makes sure emails must be unique
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', cb => {
  const user = this
  bcrypt.hash(user.password, 15, (err, hash) => {
    if (err) {
      return cb(err)
    }
    user.password = hash
    cb()
  })
})

userSchema.statics.findOneByEmail = (email, cb) => {
  return this.findOne({email}, cb)
}

userSchema.statics.comparePassword = function(password, cb) {
  const user = this
  return compare(password, this.password, cb)
}

module.exports = mongoose.model('User', userSchema)