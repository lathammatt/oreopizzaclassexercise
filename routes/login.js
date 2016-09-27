'use strict';

const {Router} = require('express')
// const passport = require('passport')

const router = Router()

const session = require('../controllers/session')


router.get('/login', session.new)
router.post('/login', session.create)

module.exports = router