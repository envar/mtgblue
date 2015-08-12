var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bcrypt = require('bcrypt');

var generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = function(passport) {
    passport.use('signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
        },

        function(req, email, password, done) {
            // find a user in Mongo with provided username
            User.findOne({'email': email}, function(err, user) {
                // In case of any error return
                if (err){
                    console.log('Error in signup: '+err);
                    return done(err);
                }
                // already exists
                if (user) {
                    console.log('User already exists');
                    return done(null, false, req.flash('error','User already exists'));
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUser = new User();
                    // set the user's local credentials
                    newUser.email = email;
                    newUser.password = generateHash(password);

                    // save the user
                    newUser.save(function(err) {
                        if (err){
                            console.log('Error saving user: '+err);
                            throw err;
                        }
                        console.log('User registration successful');
                        return done(null, newUser);
                    });
                }
            });
        }
    ));
};
