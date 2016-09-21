'use strict';

const {Router} = require('express')

const router = Router()

const login = require('../controllers/login')


router.get("/login", login.new)

router.post('/login', login.create)

module.exports = router