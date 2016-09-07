"use strict";

const express = require('express')
const bodyParser = require('body-parser')

const app = express() //new express


//get port from environment and store in Express
const port = process.env.PORT || 7575
app.set('port', port)

// pug configuration
app.set('view engine', 'pug')
// app.set('views', 'views')

if(process.env.NODE_ENV !== 'production'){
	app.locals.pretty = true
}
app.locals.company = "Oreo Pizza"

// middleware
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))


// routes
app.get("/", (req, res) => {
	res.render('index')
})
app.get("/about", (req, res) => {
	res.render('about', {page: 'About'})
})
app.get("/contact", (req, res) => {
	res.render('contact', {page: 'Contact'})
})
app.post("/contact", (req, res) => {
	console.log(req.body);
	// res.send("thanks for contacting us")
	res.redirect('/')
})


// listen to requests on the provided port and log when available
app.listen(port, () => {
	console.log(`listening on ${port}`);
})

