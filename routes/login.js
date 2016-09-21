'use strict';

const {Router} = require('express')
const passport = require('passport')

const router = Router()

const login = require('../controllers/session')


router.get("/login", login.new)

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}))

module.exports = router