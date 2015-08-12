var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {
    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
        },

        function(req, email, password, done) {
            User.findOne({ email: email}, function (err, user) {
                if (err) {
                   console.log('An error occured on login');
                   console.log(err);
                   return done(err);
                }
                if (!user) {
                    console.log('Incorrect email on login');
                    return done(null, false, req.flash('message', 'Incorrect email.') );
                }
                if (!user.validPassword(password)) {
                    console.log('Incorrect password on login');
                    return done(null, false, req.flash('message', 'Incorrect password.'));
                }
                console.log('Login successful');
                req.session.user = user;
                return done(null, user);
            });
        }
    ));
};
