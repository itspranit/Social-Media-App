const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user'); // Adjust path if needed

// Use Local Strategy with async/await
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback:true
}, async function(email, password, done) {
    try {
        const user = await User.findOne({ email: email });

        if (!user || user.password !== password) {
            req.flash('error','Invalid Username/Password');
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        req.flash('error',err);
        console.log('Error in finding user --> passport');
        return done(err);
    }
}));

// Serialize user
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// Deserialize user with async/await
passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id);
        return done(null, user);
    } catch (err) {
        console.log('Error in finding user --> passport');
        return done(err);
    }
});

// Middleware to check authentication
passport.checkAuthentication = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/users/sign-in');
};

// Middleware to set authenticated user in res.locals
passport.setAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
};

module.exports = passport;
