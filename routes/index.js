var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect to the login page
	res.redirect('/login');
}

module.exports = function(passport){

	/* POST Login */
	router.post('/api/login', passport.authenticate('login'));

	/* POST Registration */
	router.post('/api/signup', passport.authenticate('signup'));

	/* GET Logout */
	router.get('/api/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

    /* Cards routes */
    router.use('/api/cards', require('./api/cards'));

    /* Decks routes */
    router.use('/api/decks', require('./api/decks'));

	/* GET Main Application */
	router.get('*', function(req, res) {
		res.render('index', { user: req.user });
	});

	return router;
}
