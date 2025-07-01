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

module.exports=passport;