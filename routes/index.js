"use strict";

const {Router} = require('express')

const router = Router()

// const about = require("./about")
// const contact = require("./contact")
// const login = require("./login")
// const logout = require("./logout")
// const order = require("./order")
// const register = require("./register")
// const root = require("./root")

// public routes
router.use(require("./about"))
router.use(require("./contact"))
router.use(require("./login"))
router.use(require("./register"))
router.use(require("./root"))


// guard middleware
router.use((req, res, next) => {
  if (req.session.email){
    next()
  } else {
    res.redirect('/login')
  }
})

// private routes
router.use(require("./order"))
router.use(require("./logout"))


module.exports = router

