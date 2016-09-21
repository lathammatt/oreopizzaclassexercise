'use strict';


const User = require('../models/user')
const bcrypt = require('bcrypt')


module.exports.new = (req, res) => {
	res.render('register')
})

module.exports.create = ({ body: { email, password, confirmation } }, res, err) => {
  if (password === confirmation) {
    User.findOne({ email })
      .then(user => {
        if (user) {
          res.render('register', { msg: 'Email is already registered' })
        } else {
          return new Promise((resolve, reject) => {
            bcrypt.hash(password, 13, (err, hash) => {
              if (err){
                reject(err)
              } else {
                resolve(hash)
              }
            })
          })
        }
      })
      .then(hash => User.create({email, password: hash}))
      .then(() => res.redirect('/login'), { msg: 'User created' })
      .catch(err)
  } else {
    res.render('register', { msg: 'Password & password confirmation do not match' })
  }
})