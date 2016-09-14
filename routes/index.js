"use strict";

const {Router} = require('express')
const router = Router()

const Contact = require('../models/contact')
const Order = require('../models/orders')
const Size = require('../models/size')

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
	Size.find().then(sizes =>
	res.render('order', {page:'Order', sizes}))
})
router.post('/order', (req, res, err) => {
	Order
		.create(req.body)
		.then(() => res.redirect('/'))
		.catch(err)
})
router.get("/404", (req, res) => {
	res.render('404', {page: '404'})
})



module.exports = router

