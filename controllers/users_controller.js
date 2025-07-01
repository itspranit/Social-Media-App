const User = require('../models/user');

// Profile Page
module.exports.profile = async function(req, res) {
    try {
        if (req.cookies.user_id) {
            const user = await User.findById(req.cookies.user_id);
            if (user) {
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                });
            }
        }
        return res.redirect('/users/sign-in');
    } catch (err) {
        console.log('Error fetching user profile:', err);
        return res.status(500).send('Internal Server Error');
    }
};

// Sign Up Page
module.exports.signUp = function(req, res) {
    return res.render('user_sign_up', {
        title: "Codial | Sign Up"
    });
};

// Sign In Page
module.exports.signIp = function(req, res) {
    return res.render('user_sign_in', {
        title: "Codial | Sign In"
    });
};

// Sign out

module.exports.signOut = function(req, res) {
    res.clearCookie('user_id');
    return res.redirect('/users/sign-in');
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
module.exports.createSession = async function(req, res) {
    
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            if (user.password !== req.body.password) {
                return res.redirect('/users/sign-in');
            }

            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        } else {
            return res.redirect('/users/sign-in');

        }

    } catch (err) {
        console.log('Error in signing in:', err);
        return res.status(500).send('Internal Server Error');
    }


};
