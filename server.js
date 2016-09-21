"use strict";

const express = require('express')
const bodyParser = require('body-parser')
const {cyan, red} = require('chalk')
const session = require('express-session')
const passport = require('passport')
var RedisStore = require('connect-redis')(session); //requires and then execute


const routes = require('./routes/') // same as ./routes/index.js
const {connect} = require('./db/database')

require('./passport-config')
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
// app.locals.user = {email: 'a@b.com'}

// middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(session({
	store: new RedisStore({
		url: process.env.REDIS_URL || 'redis://localhost:6379'
		// if setup heroku with redis addon
	}),
	secret: "oreopizzaserioussecretkey"
})) //salt for the hash, session object gets saved to database

app.use((req, res, next) => {
	app.locals.email = req.user && req.user.email
	next()
})

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



// 404 custom page and pass to error-handling middleware
app.use((req, res, next) => {
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

