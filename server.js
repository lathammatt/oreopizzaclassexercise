"use strict";

const express = require('express')
const bodyParser = require('body-parser')
const {cyan, red} = require('chalk')

const routes = require('./routes/') // same as ./routes/index.js
const {connect} = require('./db/database')

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
app.locals.errors = {} // errors & body added to avoid guard statements
app.locals.body = {} // i.e. value=(body && body.name) vs. value=body.name


// middleware
app.use(({method, url, headers: {'user-agent': agent}}, res, next) => {
	const timestamp = new Date()
	console.log(`[${timestamp}] "${cyan(`${method} ${url}`)}" "${agent}"`);
	next()
})
app.use((req, res, next) => {
	console.log("Request sent to", req.url);
	next()
})
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))


// routes
app.use(routes)



// app.get("/", (req, res) => {
// 	res.render('index')
// })
// app.get("/about", (req, res) => {
// 	res.render('about', {page: 'About'})
// })
// app.get("/contact", (req, res) => {
// 	res.render('contact', {page: 'Contact'})
// })
// app.post("/contact", (req, res) => {
// 	console.log(req.body);
// 	res.redirect('/')
// })
// app.get("/404", (req, res) => {
// 	res.render('404', {page: '404'})
// })

// 404 custom page and pass to error-handling middleware
app.use((req, res, next) => {
	// const err = Error('Not Found')
	// err.status = 404
	// next(err)
	res.render('404')
})


// Error-handling middleware
app.use((err, {method, url, headers: {'user-agent': agent}}, res, next) => {
	res.sendStatus(err.status || 500)
	const timestamp = new Date()
	console.error(`[${timestamp}] "${red(`${method} ${url}`)}" Error(${res.statusCode}) :"${res.statusMessage}"`);
	console.error(err.stack)
})


// listen to requests on the provided port and log when available
connect()
	.then(() => {
	app.listen(port, () => {
	console.log(`listening on ${port}`);
})
})
.catch(console.error)

