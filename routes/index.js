"use strict";

const {Router} = require('express')
const router = Router()

const {db} = require('../database')

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
		db().collection('contact')
			.insertOne(req.body)
			.then(() => res.redirect('/'))
			.catch(() => res.send('bad'))
	})
	router.get("/404", (req, res) => {
		res.render('404', {page: '404'})
	})



module.exports = router
