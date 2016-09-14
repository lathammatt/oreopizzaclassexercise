"use strict";

const {Router} = require('express')
const router = Router()

const Contact = require('../models/contact')
const Order = require('../models/orders')

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
	router.post("/contact", (req, res) => {
		const msg = new Contact(req.body)
		msg.save()
			.then(() => res.redirect('/'))
			.catch(() => res.send('bad'))
	})
	router.get('/order', (req, res) => {
		res.render('order', {page:'Order'})
	})
	router.post('/order', (req, res) => {
		const msg = new Order(req.body)
		msg.save()
			.then(() => res.redirect('/'))
			.catch(() => res.send('bad'))
	})
	router.get("/404", (req, res) => {
		res.render('404', {page: '404'})
	})



module.exports = router
