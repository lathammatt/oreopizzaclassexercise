"use strict";

const {Router} = require('express')
const router = Router()

const Contact = require('../models/contact')
const Order = require('../models/orders')
const Size = require('../models/size')
const Topping = require('../models/toppings')

// module.exports = function(app) {

router.get("/", (req, res) => {
	res.render('index')
})
router.get("/about", (req, res) => {
	res.render('about', {page: 'About'})
})
router.get("/contact", (req, res) => {
	res.render('contact', {page: 'Contact'})
})
router.post("/contact", (req, res, err) => {
	Contact
		.create(req.body)
		.then(() => res.redirect('/'))
		.catch(err)
})
router.get('/order', (req, res) => {
	Promise
		.all([
			Size.find().sort({inches: 1}),
			Topping.find().sort({name: 1})
	])
		.then(([sizes, toppings]) =>
	res.render('order', {page:'Order', sizes, toppings})
		)
})
router.post('/order', ({body}, res, err) =>
  Order
    .create(body)
    .then(() => res.redirect('/'))
    .catch(({ errors })  =>
      Promise.all([ // retrieve sizes and toppings again,
        Promise.resolve(errors), // but pass the errors along as well
        Size.find().sort({ inches: 1 }),
        Topping.find().sort({ name: 1 }),
      ])
    )
    .then(([
        errors,
        sizes,
        toppings,
      ]) =>
      // UI/UX additions
      // send errors to renderer to change styling and add error messages
      // also, send the req.body to use as initial form input values
      res.render('order', { page: 'Order', sizes, toppings, errors, body })
    )
    .catch(err)
)
router.get("/404", (req, res) => {
	res.render('404', {page: '404'})
})



module.exports = router

