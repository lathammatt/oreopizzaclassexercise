"use strict";

const {Router} = require('express')
const router = Router()

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
		console.log(req.body);
		res.redirect('/')
	})
	router.get("/404", (req, res) => {
		res.render('404', {page: '404'})
	})
// }

module.exports = router
