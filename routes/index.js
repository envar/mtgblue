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

	/* GET login */
	router.get('/login', function(req, res) {
        // Display the Login page with any flash message, if any
        res.render('auth/login', { message: req.flash('message') });
	});

	/* POST Login */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash : true
	}));

	/* GET Registration */
	router.get('/signup', function(req, res){
		res.render('auth/signup',{message: req.flash('message')});
	});

	/* POST Registration */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash : true
	}));

	/* GET Logout */
	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});

	/* GET Home Page */
	router.get('/', isAuthenticated, function(req, res){
		res.render('index', { user: req.user });
	});

    /* Cards routes */
    router.use('/cards', require('./cards'));

    /* Decks routes */
    router.use('/decks', require('./decks'));

	return router;
}
