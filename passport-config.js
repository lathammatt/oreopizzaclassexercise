'use strict';

const passport = require('passport')
const {Strategy} = require('passport-local')
const bcrypt = require('bcrypt')
const User = require('./models/user')

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({_id}, cb);
});

passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  (email,password,cb) => {
    User.findOne({ email })
      .then(user => {
        if (user) {
          return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, matches) => {
              if (err) {
                reject(err)
              } else {
                resolve(matches && user)
              }
            })
          })
        } else {
          cb(null, null, {msg: "Email does not exist in our system"}) //internal error if there is one, user, flash message
        }
      })
      .then((user) => {
          cb(null, user, {msg: user ? "Successfully logged in" : "Password does not match"})
        }
      )
      .catch(cb)
}))