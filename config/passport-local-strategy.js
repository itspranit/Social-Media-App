const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;//?

passport.use(new LocalStrategy({
    username:'email'
},
   function(email,password,done){
    User.findOne({email:email},function(err,user){
        if(err){
            console.log('error in finding user -->passport');
            return done(err);
        }
        if(!user || user.password!=password){
            console.log('invalid username or password');
            return done(null,false);
        }
        return done(null,user);
    });
   } 
));

// serialize
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserialize
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding user -->passport');
            return done(err);
        }
        return done(null,user);
    });
});
// check if the user is authenticated
passport.checkAuthentication = function(req, res, next) {
    // if the user is signed in, then pass on the request to the next function (controller's action)
    if (req.isAuthenticated()) {
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
};

passport.setAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie 
        // and we are just sending the user to the locals for the views
        res.locals.user = req.user;
    }
    next();
};

module.exports=passport;