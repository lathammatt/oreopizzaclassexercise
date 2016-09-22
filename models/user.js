'use strict';

const mongoose = require('mongoose')
const {compare, hash} = require('bcrypt')

const BCRYPT_DIFFICULTY = 15
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

//lifecycle methods
userSchema.pre('save', cb => {
  const user = this
  hash(user.password, BCRYPT_DIFFICULTY, (err, hashedpass) => {
    if (err) {
      return cb(err)
    }
    user.password = hashedpass
    cb()
  })
})

//class/static/model methods
userSchema.statics.findOneByEmail = (email, cb) => {
  const collection = this
  return collection.findOne({email}, cb)
}

// instance methods
userSchema.methods.comparePassword = function (password, cb) {
  const user = this

  // Support callback and `Promise` pattern. If comparePassword is called in Promise, it skips this part and goes to the Promise section below. If callback function (more common) it will run this code
  if (typeof cb === 'function') {
    return compare(password, user.password, cb)
  }

  return new Promise((resolve, reject) =>
    compare(password, user.password, (err, matches) =>
      err ? reject(err) : resolve(matches)
    )
  )
}

module.exports = mongoose.model('User', userSchema)