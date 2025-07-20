const User = require('../models/user');

// Profile Page
module.exports.profile = async function(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            return res.render('user_profile', {
                title: "User Profile",
                profile_user: user
            });
        } else {
            return res.status(404).send("User not found");
        }
    } catch (err) {
        console.log('Error fetching user profile:', err);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.update=function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        })
    }else{
        res.status(401).send('Unauthorised');
    }
}

// Sign Up Page
module.exports.signUp = function(req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codial | Sign Up"
    });
};

// Sign In Page
module.exports.signIn = function(req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codial | Sign In"
    });
};


// Create New User
module.exports.create = async function(req, res) {

    try {
        if (req.body.password !== req.body.confirm_password) {
            return res.redirect('/users/sign-up');
        }

        const existingUser = await User.findOne({ email: req.body.email });

        if (!existingUser) {
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('/users/sign-up');
        }

    } catch (err) {
        console.log('Error in creating user:', err);
        return res.status(500).send('Internal Server Error');
    }
};

// Create Session (Login)
module.exports.createSession = function(req, res) {
    req.flash('success','Logged in successfully');
    return res.redirect('/users/profile/' + req.user._id);
};


module.exports.destroySession = function (req, res, next) {
    req.logout();
    req.flash('success','Logged out successfully');

    return res.redirect('/');
};
