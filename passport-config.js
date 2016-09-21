'use strict';

const passport = require('passport')
const {Strategy} = require('passport-local')
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
          user.compare(password, (err, matches)=> {
            if (matches) {
              cb(null, null)
            }
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