'use strict';

const {Router} = require('express')

const router = Router()

const register = require('../controllers/register')


router.get("/register", register.new)

router.post('/register', register.create)

module.exports = router